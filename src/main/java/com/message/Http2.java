package com.message;

import com.utils.Commons;
import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.HttpException;
import org.apache.commons.httpclient.NameValuePair;
import org.apache.commons.httpclient.methods.PostMethod;
import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.net.URLEncoder;
import java.util.Random;

@RestController
@RequestMapping("/message")
public class Http2 {

    @RequestMapping(value="sendMessage",method = RequestMethod.GET)
    public String sendMessage(
            @RequestParam(value="tel",required=true) String tel,
            @RequestParam(value="type",required=true) int type
    ) throws  IOException {
        if(Commons.checkNumMap.size()>100){
            Commons.checkNumMap.clear();
        }
		String numStr="0123456789";
		StringBuilder sb=new StringBuilder(4);
		for(int i=0;i<4;i++)
		{
			char ch=numStr.charAt(new Random().nextInt(numStr.length()));
			sb.append(ch);
		}
		String checkNum  = sb.toString();
		String Text="������֤�룺8859�����š�";
		if(type==1) {
            Text = "�����������𾴵��û��������������û�ע�����֤�룺" + checkNum + "���������ʣ�����ϵ������ҳ�ͷ���";
        }else {
        Text = "�����������𾴵��û��������������޸��������֤�룺"+checkNum+"���������ʣ�����ϵ������ҳ�ͷ���";
        }
		String Url="http://sh2.cshxsp.com/sms.aspx?action=send";
		HttpClient client=new HttpClient();
		PostMethod post=new PostMethod(Url);
		post.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
		NameValuePair userid=new NameValuePair("userid","");
		NameValuePair account=new NameValuePair("account","jksc940");
		NameValuePair password=new NameValuePair("password","ab12563011");
		NameValuePair mobile=new NameValuePair("mobile",tel);
		NameValuePair content=new NameValuePair("content",Text);
		NameValuePair sendTime=new NameValuePair("sendTime","");
		NameValuePair extno=new NameValuePair("extno","");
		post.setRequestBody(new NameValuePair[]{userid,account,password,mobile,content,sendTime,extno});
		int statu=client.executeMethod(post);
		System.out.println("statu="+statu);
		String str=post.getResponseBodyAsString();
		
		System.out.println(str);
		
		try {
			//���ַ�ת��ΪXML
			Document doc= DocumentHelper.parseText(str);
			//��ȡ���ڵ�
			Element rootElt=doc.getRootElement();
			//��ȡ���ڵ��µ��ӽڵ��ֵ
			String returnstatus=rootElt.elementText("returnstatus").trim();
			String message=rootElt.elementText("message").trim();
			String remainpoint=rootElt.elementText("remainpoint").trim();
			String taskID=rootElt.elementText("taskID").trim();
			String successCounts=rootElt.elementText("successCounts").trim();
			
			System.out.println("����״̬Ϊ��"+returnstatus);
			System.out.println("������Ϣ��ʾ��"+message);
			System.out.println("������"+remainpoint);
			System.out.println("�����������Σ�"+taskID);
			System.out.println("���سɹ�������"+successCounts);
		} catch (Exception e) {
			// TODO: handle exception
			System.out.println(e);
            return "������֤��ʧ��!";
		}
        Commons.checkNumMap.put(tel,checkNum);
        System.out.println("�û�"+tel+"����֤��Ϊ:"+checkNum);
        return "�ѷ�����֤��!";
	}

    @RequestMapping(value="checkNum",method = RequestMethod.GET)
    public String checkNum(
            @RequestParam(value="tel",required=true) String tel,
            @RequestParam(value="checkNum",required=true) String checkNum
    ) throws  IOException {
        String num = Commons.checkNumMap.get(tel);
        try {
            if (num.equals(checkNum)) {
                return "1";
            } else {
                return "0";
            }
        }catch (Exception e){
            return "0";
        }
    }

}
