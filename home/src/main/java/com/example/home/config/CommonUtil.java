package com.example.home.config;


import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * CommonUtil
 * 
 * @author tslee
 *
 */
public class CommonUtil {
	private Log log = LogFactory.getLog(CommonUtil.class);
	
	public static String getVersion(String Path) {
		Date from = new Date();
		SimpleDateFormat transFormat = new SimpleDateFormat("yyyyMMddHHmmss");
		String versionName = transFormat.format(from);
		Path += "?version="+versionName;
		return Path;
	}

}
