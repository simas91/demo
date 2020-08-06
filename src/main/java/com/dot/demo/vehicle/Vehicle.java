package com.dot.demo.vehicle;
import com.fasterxml.jackson.annotation.JsonProperty;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import java.util.UUID;

public class Vehicle {

    private final UUID vehicleId;
    @NotBlank
    private final String registration;
    @NotBlank
    private final String manufacturer;
    @NotBlank
    private final String model;
    @NotBlank
    private final int year;
    @NotNull
    private final HPIclear hpiClear;


    public Vehicle(@JsonProperty("vehicleId") UUID vehicleId,
                   @JsonProperty("registration") String registration,
                   @JsonProperty("manufacturer") String manufacturer,
                   @JsonProperty("model") String model,
                   @JsonProperty("year") int year,
                   @JsonProperty("hpiClear") HPIclear hpiClear) {
        this.vehicleId = vehicleId;
        this.registration = registration;
        this.manufacturer = manufacturer;
        this.model = model;
        this.year = year;
        this.hpiClear = hpiClear;
    }

    enum HPIclear {
        YES, NO, yes, no
    }

    public String getRegistration() {
        return registration;
    }

    public String getManufacturer() {
        return manufacturer;
    }

    public String getModel() {
        return model;
    }

    public int getYear() {
        return year;
    }

    public HPIclear getHpiClear() {
        return hpiClear;
    }
}
