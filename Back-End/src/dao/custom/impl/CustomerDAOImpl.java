package dao.custom.impl;

import dao.custom.CustomerDAO;
import entity.Customer;

import javax.json.Json;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;
import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;


public class CustomerDAOImpl implements CustomerDAO {

    @Override
    public boolean add(Customer customer, DataSource dataSource) throws SQLException, ClassNotFoundException {
        Connection connection = dataSource.getConnection();
        PreparedStatement stm = connection.prepareStatement("INSERT INTO Customer VALUES (?,?,?,?)");
        stm.setString(1, customer.getCustId());
        stm.setString(2, customer.getCustName());
        stm.setString(3, customer.getAddress());
        stm.setDouble(4, Double.parseDouble(customer.getSalary()));

        if (stm.executeUpdate() > 0) {
            connection.close();
            return true;
        } else {
            return false;
        }
    }

    @Override
    public boolean delete(String s, DataSource dataSource) throws SQLException, ClassNotFoundException {
        Connection connection = dataSource.getConnection();
        if (connection.prepareStatement("DELETE FROM Customer WHERE ItemCode='" + s + "'").executeUpdate() > 0) {
            connection.close();
            return true;
        } else {
            return false;
        }
    }

    @Override
    public boolean update(Customer customer, DataSource dataSource) throws SQLException, ClassNotFoundException {
        Connection connection = dataSource.getConnection();
        PreparedStatement stm = connection.prepareStatement("UPDATE Customer SET CustName=?, Address=?, Salary=? WHERE CustId=?");

        stm.setObject(1, customer.getCustName());
        stm.setObject(2, customer.getAddress());
        stm.setObject(3, customer.getSalary());
        stm.setObject(4, customer.getCustId());

        if (stm.executeUpdate() > 0) {
            connection.close();
            return true;
        } else {
            return false;
        }
    }

    @Override
    public JsonObjectBuilder search(String s, DataSource dataSource) throws SQLException, ClassNotFoundException {
        return null;
    }

    @Override
    public JsonArrayBuilder getAll(DataSource dataSource) throws SQLException, ClassNotFoundException {
        JsonArrayBuilder arrayBuilder = Json.createArrayBuilder();
        JsonObjectBuilder objectBuilder = Json.createObjectBuilder();

        try {
            Connection connection = dataSource.getConnection();
            PreparedStatement stm = connection.prepareStatement("select * from Customer");
            ResultSet resultSet = stm.executeQuery();

            while (resultSet.next()) {
                String CustId = resultSet.getString(1);
                String CustName = resultSet.getString(2);
                String Address = resultSet.getString(3);
                String Salary = resultSet.getString(4);

                objectBuilder.add("custId", CustId);
                objectBuilder.add("custName", CustName);
                objectBuilder.add("address", Address);
                objectBuilder.add("salary", Salary);

                JsonObject build = objectBuilder.build();
                arrayBuilder.add(build);
            }

            connection.close();

            return arrayBuilder;

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }
}
