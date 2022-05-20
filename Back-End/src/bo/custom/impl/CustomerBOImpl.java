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
    public JsonArrayBuilder loadAllCustomerforTable(DataSource d) throws SQLException, ClassNotFoundException {
        return customerDAO.getAll(d);
    }

    @Override
    public boolean deleteCustomer(String id, DataSource dataSource) throws SQLException, ClassNotFoundException {
        return customerDAO.delete(id,dataSource);
    }

    @Override
    public boolean updateCustomer(CustomerDTO c, DataSource dataSource) throws SQLException, ClassNotFoundException {
        return customerDAO.update(new Customer(c.getCustId(), c.getCustName(), c.getAddress(), c.getSalary()),dataSource);
    }

    @Override
    public JsonObjectBuilder getCustomer(String id, DataSource dataSource) throws SQLException, ClassNotFoundException {
        return customerDAO.search(id,dataSource);
    }

}
