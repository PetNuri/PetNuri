package com.companionnuri.nuri.model.service;

import com.companionnuri.nuri.exception.CategoryNotFoundException;
import com.companionnuri.nuri.model.dto.LocationDto;
import com.companionnuri.nuri.model.dto.LocationListDto;
import com.companionnuri.nuri.model.mapper.NuriInfoMapper;
import com.google.common.collect.ImmutableMap;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class NuriInfoServiceImpl implements NuriInfoService {

    private final NuriInfoMapper nuriInfoMapper;

    @Override
    public List<LocationListDto> getLocationCategory(int categoryId) {
        return nuriInfoMapper.getLocationCategory(categoryId);
    }

    @Override
    public List<LocationListDto> getLocationAll() {
        return nuriInfoMapper.getLocationAll();
    }

    @Override
    public Map<String, String> getRegionProj(int regionCode) {
        return nuriInfoMapper.getRegionProj(regionCode);
    }

    @Override
    public LocationDto getLocationDetail(int locationId) {
        return nuriInfoMapper.getLocationDetail(locationId);
    }

    @Override
    public List<LocationListDto> searchByQuery(String query) {
        if (isCategorySearch(query)) {
            log.info("[Category Search] : QUERY [{}] -> CATEGORY [{}]", query, getCategoryFromQuery(query));
            return nuriInfoMapper.getLocationCategory(getCategoryFromQuery(query));
        }
        return nuriInfoMapper.searchByQuery(query);
    }

    private boolean isCategorySearch(String query) {
        if (CATEGORY_QUERY.containsKey(query)) {
            return true;
        }
        return false;
    }

    private int getCategoryFromQuery(String query) {
        return CATEGORY_QUERY.get(query);
    }

    private static final Map<String, Integer> CATEGORY_QUERY = ImmutableMap.<String, Integer>builder()
            .put("카페", 1).put("커피", 1)
            .put("식당", 2).put("음식점", 2)
            .put("숙박", 3).put("호텔", 3).put("모텔", 3).put("펜션", 3)
            .put("병원", 4).put("동물병원", 4)
            .put("공원", 5)
            .build();

}
