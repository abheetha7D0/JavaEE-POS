package servlet;

import bo.BOFactory;
import bo.custom.CustomerBO;
import dto.CustomerDTO;

import javax.annotation.Resource;
import javax.json.Json;
import javax.json.JsonObjectBuilder;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;

@WebServlet (urlPatterns = "/*")

public class CustomerServlet extends HttpServlet {

    private final CustomerBO customerBO = (CustomerBO) BOFactory.getBOFactory().getBO(BOFactory.BoTypes.Customer);

    @Resource (name = "java:comp/env/jdbc/pool")
    DataSource dataSource;

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

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
                resp.setStatus(HttpServletResponse.SC_CREATED);

                objectBuilder.add("status", 200);
                objectBuilder.add("message", "done");
                objectBuilder.add("data", "Successfully Added !");
                writer.print(objectBuilder.build());
            }
        } catch (SQLException throwables) {
            JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
            resp.setStatus(HttpServletResponse.SC_CREATED);

            objectBuilder.add("status", 400);
            objectBuilder.add("message", "done");
            objectBuilder.add("data", throwables.getLocalizedMessage());
            writer.print(objectBuilder.build());
        } catch (ClassNotFoundException e) {

            JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
            resp.setStatus(HttpServletResponse.SC_CREATED);

            objectBuilder.add("status", 400);
            objectBuilder.add("message", "done");
            objectBuilder.add("data", e.getLocalizedMessage());
            writer.print(objectBuilder.build());
        }

    }
}
