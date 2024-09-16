package com.companionnuri.nuri.exception;

import lombok.extern.slf4j.Slf4j;

public class CategoryNotFoundException extends BadRequestException {
    public CategoryNotFoundException() {
        super("[ERROR] 존재하지 않는 카테고리입니다.");
    }
}
