package com.utils;

import javax.crypto.SecretKey;
import javax.websocket.Session;
import java.util.Map;

public class Commons {
	public static final String  author ="hupeng";   //区域站小时数据

	static public String timeTemp = null;

	public static void maxInputTime(String inputtime){
		timeTemp=inputtime;
	}

	public static Map<Integer,Session> allSessionTemp ;

	public static int heartConnection = 0;//心跳链接测试值

}
