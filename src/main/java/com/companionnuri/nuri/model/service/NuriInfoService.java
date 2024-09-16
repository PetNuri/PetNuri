package com.companionnuri.nuri.model.service;

import com.companionnuri.nuri.model.dto.LocationDto;
import com.companionnuri.nuri.model.dto.LocationListDto;

import java.util.List;
import java.util.Map;

public interface NuriInfoService {

    List<LocationListDto> getLocationCategory(int categoryId);

    List<LocationListDto> getLocationAll();

    Map<String, String> getRegionProj(int regionCode);

    LocationDto getLocationDetail(int locationId);

    List<LocationListDto> searchByQuery(String query);

}
