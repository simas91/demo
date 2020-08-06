package com.dot.demo.vehicle;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public class VehicleDAO {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public VehicleDAO(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    List<Vehicle> selectAllVehicles() {
        String sql = "" +
                "SELECT vehicle_id, " +
                "registration, " +
                "manufacturer, " +
                "model, " +
                "year," +
                "hpiClear " +
                "FROM vehicle";

        return jdbcTemplate.query(sql, mapVehicleFromDb());
    }

    private RowMapper<Vehicle> mapVehicleFromDb() {
        return (resultSet, i) -> {

            UUID vehicleId = UUID.fromString(resultSet.getString("vehicle_id"));
            String registration = resultSet.getString("registration");
            String manufacturer = resultSet.getString("manufacturer");
            String model = resultSet.getString("model");
            int year = resultSet.getInt("year");

            String hpiClearString = resultSet.getString("hpiclear");
            Vehicle.HPIclear hpiClear = Vehicle.HPIclear.valueOf(hpiClearString);

            return new Vehicle(
                    vehicleId, registration, manufacturer, model, year, hpiClear
            );
        };
    }

    int insertVehicle(UUID vehicleId, Vehicle vehicle) {

        String sql = "" +
                "INSERT INTO vehicle (vehicle_id, registration, manufacturer, model, year, hpiClear) " +
                "VALUES (?, ?, ?, ?, ?, ?)";

        return jdbcTemplate.update(sql,
                vehicleId,
                vehicle.getRegistration(),
                vehicle.getManufacturer(),
                vehicle.getModel(),
                vehicle.getYear(),
                vehicle.getHpiClear().name().toUpperCase()
        );
    }

    @SuppressWarnings("ConstantConditions")
    boolean isRegistrationTaken(String registration) {

        String sql = "" +
                "SELECT EXISTS ( " +
                "SELECT 1 " +
                "FROM vehicle " +
                "WHERE registration = ?" +
                ")";

        return jdbcTemplate.queryForObject(
                sql,
                new Object[] {registration},
                (resultSet, i) -> resultSet.getBoolean(1)
        );
    }
}
