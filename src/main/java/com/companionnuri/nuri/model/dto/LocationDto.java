package com.companionnuri.nuri.model.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class LocationDto {

    private int locationId;
    private int categoryId;
    private String locationName;
    private String locationAddr;
    private String locationRoadAddr;
    private String locationTel;
    private String locationLat;
    private String locationLng;

}
