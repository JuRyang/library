package com.example.common.test.mapper;

import com.example.common.test.mapper.dto.TestDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface TestMapper {
    TestDto getTest();

    List<TestDto> test();
}
