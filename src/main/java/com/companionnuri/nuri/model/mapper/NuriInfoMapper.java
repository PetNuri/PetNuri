package com.companionnuri.nuri.model.mapper;

import com.companionnuri.nuri.model.dto.LocationDto;
import com.companionnuri.nuri.model.dto.LocationListDto;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import javax.xml.stream.Location;
import java.util.List;
import java.util.Map;

@Repository
public interface NuriInfoMapper {

    List<LocationListDto> getLocationCategory(int categoryId);

    List<LocationListDto> getLocationAll();

    Map<String, String> getRegionProj(int regionCode);

    LocationDto getLocationDetail(int locationId);

    List<LocationListDto> searchByQuery(String query);

}
