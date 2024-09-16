package com.companionnuri.nuri.controller;

import com.companionnuri.nuri.exception.CategoryNotFoundException;
import com.companionnuri.nuri.exception.LocationNotFoundException;
import com.companionnuri.nuri.exception.RegionNotFoundException;
import com.companionnuri.nuri.exception.SearchResultNotFoundException;
import com.companionnuri.nuri.model.dto.LocationDto;
import com.companionnuri.nuri.model.dto.LocationListDto;
import com.companionnuri.nuri.model.service.NuriInfoService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/nuri")
@RequiredArgsConstructor
@Slf4j
public class NuriInfoController {

    private final NuriInfoService nuriInfoService;

    @ApiOperation(value = "해당 카테고리에 해당하는 서울 내 모든 Location을 반환한다.", notes = "카테고리 ID를 URL에 입력해야 함")
    @GetMapping("/category/{categoryId}")
    public ResponseEntity<?> getLocationCategory(@PathVariable int categoryId) {

        Map<String, Object> resultMap = new HashMap<>();
        List<LocationListDto> list = nuriInfoService.getLocationCategory(categoryId);
        validateCategoryList(list);
        resultMap.put("locations", list);
        return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);

    }

    private void validateCategoryList(List<LocationListDto> list) {
        if (list.isEmpty()) {
            throw new CategoryNotFoundException();
        }
    }

    @ApiOperation(value = "해당 지역의 중심좌표와 서울 전역의 모든 Location을 반환한다.", notes = "지역코드 5자리를 URL에 입력해야 함: 예시로 관악구는 11680, 종로구는 11110")
    @GetMapping("/region/{regionCode}")
    public ResponseEntity<?> getLocationRegion(@PathVariable int regionCode) {

        Map<String, Object> resultMap = new HashMap<>();
        Map<String, String> regionProj = nuriInfoService.getRegionProj(regionCode);
        validateRegionCode(regionProj);
        resultMap.put("regionProj", regionProj);
        resultMap.put("locations", nuriInfoService.getLocationAll());
        return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
    }

    private void validateRegionCode(Map<String, String> regionProj) {
        if (regionProj == null || regionProj.isEmpty()) {
            throw new RegionNotFoundException();
        }
    }

    @ApiOperation(value = "해당 ID값을 가진 Location의 상세정보를 반환한다.")
    @GetMapping("/detail/{locationId}")
    public ResponseEntity<?> getLocationDetail(@PathVariable int locationId) {

        Map<String, Object> resultMap = new HashMap<>();
        LocationDto locationDto = nuriInfoService.getLocationDetail(locationId);
        validateLocationId(locationDto);
        resultMap.put("location", locationDto);
        return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);

    }

    private void validateLocationId(LocationDto locationDto) {
        if (locationDto == null) {
            throw new LocationNotFoundException();
        }
    }

    @ApiOperation(value = "입력된 검색어(query)에 대해, 장소이름에 해당 검색어가 포함되는 Location의 목록을 반환한다.", notes = "각 Location은 카테고리(cafe, restaurant, hospital, house, park)로 분류되며, 배열의 형태로 반환된다. \n  좌표 정보는 검색결과에 필요하지 않을 것 같아 일단 비워둠.")
    @GetMapping("/search/{query}")
    public ResponseEntity<?> searchByQuery(@PathVariable String query) {
        List<LocationListDto> list = nuriInfoService.searchByQuery(query);
        validateSearchList(list);
        Map<String, Object> resultMap = searchResult(list);
        return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
    }

    private void validateSearchList(List<LocationListDto> list) {
        if (list.isEmpty()) {
            throw new SearchResultNotFoundException();
        }
    }

    // 이거 서비스로 옮기기
    private Map<String, Object> searchResult(List<LocationListDto> list) {
        List<LocationListDto> cafes = new ArrayList<>();
        List<LocationListDto> foods = new ArrayList<>();
        List<LocationListDto> houses = new ArrayList<>();
        List<LocationListDto> hospitals = new ArrayList<>();
        List<LocationListDto> parks = new ArrayList<>();

        for (LocationListDto location : list) {
            int category = location.getCategoryId();

            switch (category) {
                case 1:
                    cafes.add(location);
                    break;
                case 2:
                    foods.add(location);
                    break;
                case 3:
                    houses.add(location);
                    break;
                case 4:
                    hospitals.add(location);
                    break;
                case 5:
                    parks.add(location);
                    break;
            }
        }

        Map<String, Object> result = new HashMap<>();
        result.put("cafe", cafes);
        result.put("restaurant", foods);
        result.put("house", houses);
        result.put("hospital", hospitals);
        result.put("park", parks);

        return result;
    }
}
