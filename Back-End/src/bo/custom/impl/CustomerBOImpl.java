package bo.custom.impl;

import bo.custom.CustomerBO;
import dao.DAOFactory;
import dao.custom.CustomerDAO;
import dto.CustomerDTO;
import entity.Customer;

import javax.json.JsonArrayBuilder;
import javax.json.JsonObjectBuilder;
import javax.sql.DataSource;
import java.sql.SQLException;


public class CustomerBOImpl implements CustomerBO {
    private final CustomerDAO customerDAO= (CustomerDAO) DAOFactory.getDaoFactory().getDAO(DAOFactory.DAOTypes.CUSTOMER);

    @Override
    public boolean addNewCustomer(CustomerDTO dto, DataSource d) throws SQLException, ClassNotFoundException {
        return customerDAO.add(new Customer(dto.getCustId(), dto.getCustName(), dto.getAddress(), dto.getSalary()),d);
    }

    @Override
    public JsonArrayBuilder loadAllCustomerForTable(DataSource d) throws SQLException, ClassNotFoundException {
        return null;
    }

    @Override
    public boolean deleteCustomer(String id, DataSource dataSource) throws SQLException, ClassNotFoundException {
        return false;
    }

    @Override
    public boolean updateCustomer(CustomerDTO c, DataSource dataSource) throws SQLException, ClassNotFoundException {
        return false;
    }

    @Override
    public JsonObjectBuilder getCustomer(String id, DataSource dataSource) throws SQLException, ClassNotFoundException {
        return null;
    }
}
