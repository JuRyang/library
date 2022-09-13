package com.example.common.test.service;

import com.example.common.test.mapper.TestMapper;
import com.example.common.test.mapper.dto.TestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TestService {

    private final TestMapper testMapper;

    public String getTest() {

        TestDto test = testMapper.getTest();
        return test.getTest();
    }
}
