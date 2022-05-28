package servlet;

import bo.BOFactory;
import bo.custom.CustomerBO;
import dto.CustomerDTO;

import javax.annotation.Resource;
import javax.json.*;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.logging.Logger;

@WebServlet (urlPatterns = "/customer")
public class CustomerServlet extends HttpServlet {

    private final CustomerBO customerBO = (CustomerBO) BOFactory.getBOFactory().getBO(BOFactory.BoTypes.Customer);

    @Resource (name = "java:comp/env/jdbc/pool")
    DataSource dataSource;

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("application/json");

        try {

            JsonArrayBuilder jsonArrayBuilder = customerBO.loadAllCustomerForTable(dataSource);
            PrintWriter writer = resp.getWriter();
            JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
            objectBuilder.add("status", 200);
            objectBuilder.add("message", "done");
            objectBuilder.add("data", jsonArrayBuilder.build());
            writer.print(objectBuilder.build());

        } catch (SQLException | ClassNotFoundException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String custId = req.getParameter("custId");
        String custName = req.getParameter("custName");
        String address = req.getParameter("Address");
        String salary = req.getParameter("Salary");

        resp.setContentType("application/jason");

        CustomerDTO customerDTO = new CustomerDTO(
                custId,custName,address,salary
        );

        PrintWriter writer = resp.getWriter();


        try {
            if (customerBO.addNewCustomer(customerDTO,dataSource)){
                JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
                resp.setStatus(HttpServletResponse.SC_OK);
                objectBuilder.add("status", 200);
                objectBuilder.add("message", "done");
                objectBuilder.add("data", "Sucessfully Added !");
                writer.print(objectBuilder.build());
            }
        } catch (SQLException | ClassNotFoundException throwables) {
            JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
            resp.setStatus(HttpServletResponse.SC_CREATED);
            System.out.println(throwables);
            objectBuilder.add("status", 400);
            objectBuilder.add("message", "Fail");
            objectBuilder.add("data", throwables.getLocalizedMessage());
            writer.print(objectBuilder.build());
        }

    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        JsonReader reader = Json.createReader(req.getReader());
        JsonObject jsonObject = reader.readObject();

        resp.setContentType("application/jason");
        PrintWriter writer = resp.getWriter();

        String custId = jsonObject.getString("custId");
        String custName = jsonObject.getString("custName");
        String address = jsonObject.getString("Address");
        String salary = jsonObject.getString("Salary");

        CustomerDTO customerDTO = new CustomerDTO(
                custId,custName,address,salary
        );
        try {
            if(customerBO.updateCustomer(customerDTO,dataSource)){
                JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
                objectBuilder.add("data","");
                objectBuilder.add("message","Update Done");
                objectBuilder.add("status",200);
                writer.print(objectBuilder.build());
            }
        } catch (SQLException | ClassNotFoundException e) {
            JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
            objectBuilder.add("data",e.getLocalizedMessage());
            objectBuilder.add("message","Error");
            objectBuilder.add("status",500);
            writer.print(objectBuilder.build());
        }
    }
}
