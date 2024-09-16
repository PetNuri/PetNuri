package com.companionnuri.nuri.model.service;

import com.companionnuri.nuri.model.dto.SidoDto;
import com.companionnuri.nuri.model.dto.SigunguDto;

import java.util.List;

public interface RegionSelectService {

    List<SidoDto> getSidoList();

    List<SigunguDto> getSigunguList(int sidoCode);
}
