package com.message;

import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.NameValuePair;
import org.apache.commons.httpclient.methods.PostMethod;
import org.json.JSONObject;
import sun.misc.BASE64Encoder;

import java.text.SimpleDateFormat;
import java.util.Date;


public class HttpEnsms {
	/**
	 * http����
	 * @param args
	 */
	public static void main(String[] args) {

		SimpleDateFormat df=new SimpleDateFormat("MMddHHmmss");		
		String Stamp = df.format(new Date());
		String password="123456";
		String Secret=MD5.GetMD5Code(password+Stamp).toUpperCase();
		
		try {
			JSONObject j=new JSONObject();
			j.put("UserName", "qq");
			j.put("Stamp", Stamp);
			j.put("Secret", Secret);
			j.put("Moblie", "18910815601");
			j.put("Text", "������֤���ǣ�8859�����š�");
			j.put("Ext", "");
			j.put("SendTime", "");
			//��ȡjson�ַ���
			String json=j.toString();
			byte[] data=json.getBytes("utf-8");
			byte[] key=password.getBytes();
			//��ȡ���ܵ�key
			byte[] nkey=new byte[8];
			System.arraycopy(key, 0, nkey, 0, key.length > 8 ? 8 : key.length);
			//Des���ܣ�base64ת��
			String str=new BASE64Encoder().encode(DesHelper.encrypt(data, nkey)); 
			
			System.out.println(str);
			//url����
			//str=URLEncoder.encode(str, "utf-8");
			
			//����http����
			String Url="http://sh2.cshxsp.com/ensms.ashx";
			HttpClient client=new HttpClient();
			PostMethod post=new PostMethod(Url);
			post.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
			NameValuePair UserId=new NameValuePair("UserId","1");
			NameValuePair Text64=new NameValuePair("Text64",str);
			post.setRequestBody(new NameValuePair[]{UserId,Text64});
			int statu=client.executeMethod(post);
			System.out.println("statu="+statu);
			//���ؽ��
			String result=post.getResponseBodyAsString();
			System.out.println("result="+result);

		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}

}
