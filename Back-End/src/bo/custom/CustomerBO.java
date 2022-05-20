package bo.custom;

import bo.SuperBO;
import dto.CustomerDTO;

import javax.json.JsonArrayBuilder;
import javax.json.JsonObjectBuilder;
import javax.sql.DataSource;
import java.sql.SQLException;

public interface CustomerBO extends SuperBO {
    boolean addNewCustomer(CustomerDTO dto , DataSource d)throws SQLException, ClassNotFoundException ;
    JsonArrayBuilder loadAllCustomerforTable(DataSource d) throws SQLException, ClassNotFoundException;
    boolean deleteCustomer(String id,DataSource dataSource) throws SQLException, ClassNotFoundException;
    boolean updateCustomer(CustomerDTO  c,DataSource dataSource)throws SQLException, ClassNotFoundException;
    JsonObjectBuilder getCustomer(String id, DataSource dataSource)throws SQLException, ClassNotFoundException;

}
