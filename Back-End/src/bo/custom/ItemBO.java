package bo.custom;

import bo.SuperBO;
import dto.ItemDTO;

import javax.json.JsonArrayBuilder;
import javax.json.JsonObjectBuilder;
import javax.sql.DataSource;
import java.sql.SQLException;

public interface ItemBO extends SuperBO {
    boolean addNewItem(ItemDTO dto , DataSource d)throws SQLException, ClassNotFoundException ;
    JsonArrayBuilder loadAllItem(DataSource d) throws SQLException, ClassNotFoundException;
    boolean deleteItem(String id,DataSource dataSource) throws SQLException, ClassNotFoundException;
    boolean updateItem(ItemDTO i,DataSource dataSource)throws SQLException, ClassNotFoundException;
    JsonObjectBuilder getItem(String id, DataSource dataSource)throws SQLException, ClassNotFoundException;

}
