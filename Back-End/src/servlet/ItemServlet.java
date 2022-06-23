package servlet;

import bo.BOFactory;
import bo.custom.ItemBO;
import dto.CustomerDTO;
import dto.ItemDTO;

import javax.annotation.Resource;
import javax.json.Json;
import javax.json.JsonArrayBuilder;
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

@WebServlet(urlPatterns = "/item")
public class ItemServlet extends HttpServlet {
    private final ItemBO itemBO = (ItemBO) BOFactory.getBOFactory().getBO(BOFactory.BoTypes.Item);

    @Resource(name = "java:comp/env/jdbc/pool")
    DataSource dataSource;

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("application/json");

        try {

            JsonArrayBuilder jsonArrayBuilder = itemBO.loadAllItem(dataSource);
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
        String itemCode = req.getParameter("itemCode");
        String itemName = req.getParameter("itemName");
        String qty = req.getParameter("qty");
        String unitPrice = req.getParameter("unitPrice");

        resp.setContentType("application/json");

        ItemDTO dto=new ItemDTO(
                itemCode,itemName,qty,unitPrice
        );


        PrintWriter writer = resp.getWriter();


        try {
            if (itemBO.addNewItem(dto,dataSource)){
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

        String itemCode = req.getParameter("itemUCode");
        String itemName = req.getParameter("itemUName");
        String qty = req.getParameter("uQty");
        String unitPrice = req.getParameter("uUnitPrice");

        ItemDTO itemDTO = new ItemDTO(
                itemCode, itemName, qty, unitPrice
        );
        PrintWriter writer = resp.getWriter();
        resp.setContentType("application/json");
        try {
            if (itemBO.updateItem(itemDTO, dataSource)) {
                JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
                objectBuilder.add("data", "");
                objectBuilder.add("message", "Update Done");
                objectBuilder.add("status", 200);
                writer.print(objectBuilder.build());

            }
        } catch (SQLException | ClassNotFoundException e) {
            JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
            objectBuilder.add("data", e.getLocalizedMessage());
            objectBuilder.add("message", "Error");
            objectBuilder.add("status", 500);
            writer.print(objectBuilder.build());
        }


    }
    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String itemCode = req.getParameter("itemCode");
        PrintWriter writer = resp.getWriter();
        resp.setContentType("application/json");

        try {
            if (itemBO.deleteItem(itemCode, dataSource)) {

                JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
                objectBuilder.add("data", "");
                objectBuilder.add("message", "Successfully Deleted");
                objectBuilder.add("status", 200);
                writer.print(objectBuilder.build());
            } else {

                JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
                objectBuilder.add("data", "");
                objectBuilder.add("message", "Unsuccessfully Deleted");
                objectBuilder.add("status", 400);
                writer.print(objectBuilder.build());
            }
        } catch (SQLException | ClassNotFoundException e) {

            resp.setStatus(200);
            JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
            objectBuilder.add("data", e.getLocalizedMessage());
            objectBuilder.add("messages", "Error");
            objectBuilder.add("status", 500);
            writer.print(objectBuilder.build());

        }
    }
}
