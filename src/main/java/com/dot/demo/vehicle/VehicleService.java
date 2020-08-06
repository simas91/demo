package com.dot.demo.vehicle;

import com.dot.demo.RegistrationValidator;
import com.dot.demo.exception.ApiRequestException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class VehicleService {

    private final VehicleDAO vehicleDAO;
    private final RegistrationValidator registrationValidator;

    public VehicleService(VehicleDAO vehicleDAO, RegistrationValidator registrationValidator) {
        this.vehicleDAO = vehicleDAO;
        this.registrationValidator = registrationValidator;
    }

    public List<Vehicle> getAllVehicles() {
        return vehicleDAO.selectAllVehicles();
    }

    void addNewVehicle(Vehicle vehicle) {
        addNewVehicle(null, vehicle);
    }

    void addNewVehicle(UUID vehicleId, Vehicle vehicle) {

       UUID newVehicleId = Optional.ofNullable(vehicleId).orElse(UUID.randomUUID());

       if (!registrationValidator.test(vehicle.getRegistration())) {
           throw new ApiRequestException(vehicle.getRegistration() + " is not valid registration");
       }

       if (vehicleDAO.isRegistrationTaken(vehicle.getRegistration())) {
           throw new ApiRequestException(vehicle.getRegistration() + " registration already taken");
       }

       vehicleDAO.insertVehicle(newVehicleId, vehicle);
    }
}
