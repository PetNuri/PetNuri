package com.companionnuri.nuri.model.mapper;

import com.companionnuri.nuri.model.dto.SidoDto;
import com.companionnuri.nuri.model.dto.SigunguDto;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RegionSelectMapper {

    List<SidoDto> getSidoList();

    List<SigunguDto> getSigunguList(int sidoCode);
}
