package com.example.home.common;
import lombok.Data;

@Data
public class ResCode {
	private String retcode = "0000";
	private String retmsg = "성공";
	private Object retdata;
}
