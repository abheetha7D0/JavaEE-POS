package bo.custom;

import bo.SuperBO;

import javax.json.JsonArrayBuilder;
import javax.sql.DataSource;
import java.sql.SQLException;

public interface OrderDetailsBO extends SuperBO {
    JsonArrayBuilder loadAllOrderDetails(DataSource d) throws SQLException, ClassNotFoundException;

}
