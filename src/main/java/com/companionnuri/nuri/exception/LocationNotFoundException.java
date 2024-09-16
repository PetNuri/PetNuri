package com.companionnuri.nuri.exception;

import lombok.extern.slf4j.Slf4j;

public class LocationNotFoundException extends BadRequestException {

    public LocationNotFoundException() {
        super("[ERROR] 입력된 ID값을 가지는 장소가 존재하지 않습니다.");
    }
}
