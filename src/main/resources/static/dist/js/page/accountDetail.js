var api = "http://127.0.0.1:8881/testDemoRest/accountList/";
$(function () {
    var favorId = getUrlParam('favorId');
    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg); //匹配目标参数
        if (r != null) return unescape(r[2]); return null; //返回参数值
    }
    initDetail(favorId);
});

function initDetail(favorId) {
    var url = api+"accountDetail?favorId="+encodeURI(favorId);
    var userId =null;
    var mainId =null
    var replyTime = null;
    var sourceType = null;
    $.getJSON(url,function (data) {
        data = data.datas[0]==null?"":data.datas[0];
        if(data!=""){
            $('.account').empty();
            $('.account').append(data.REPLY_CONTENT);
            mainId = data.MAIN_ID==null?1:data.MAIN_ID;
            replyTime = data.REPLY_TIME==null?"":data.REPLY_TIME;
            sourceType =data.SOURCE_TYPE==null?1:data.SOURCE_TYPE;
            userId = data.userId==null?1:data.userId;
            var imgSrc = data.PIC_PATH;
            imgSrc = '/testDemo/dist/css/images/jx3/game05.jpg';
            $('.bigimgs img').attr('src',imgSrc);
            $('.scrollimg').empty();
            for(var i= 0;i<5;i++){
                var imgHtml = "";
                var num = parseInt(5-i);
                if(i==0) {
                    imgHtml = "<img class=\"moveimg cur\" src=\"/testDemo/dist/css/images/jx3/game0"+num+".jpg\" style=\"margin-left: 0px;\">"
                    $('.scrollimg').append(imgHtml)
                }else{
                    imgHtml = "<img src=\"/testDemo/dist/css/images/jx3/game0"+num+".jpg\" style=\"margin-left: 0px;\">"
                    $('.scrollimg').append(imgHtml)
                }
            }

            //图片轮播
            $(".scrollimg img").click(function(){
                $(".scrollimg img").removeClass('cur');
                $(this).addClass('cur');
                $(".bigimgs img").attr("src",$(this).attr('src'));
            });
            var startnum=0;
            var imglen=$(".scrollimg img").length;
            $(".lefttg").click(function(){
                if(startnum==0) return;
                startnum++;
                $('.moveimg').css("margin-left",startnum*270+"px")
            });
            $(".righttg").click(function(){
                if(startnum<(4-imglen)) return;
                startnum--;
                $('.moveimg').css("margin-left",startnum*270+"px")
            });
        }else {
            layer.msg("请求数据有误或者数据库并未查询到相关数据!")
        }
    }).complete(function () {
        //收藏
        $('.icon-save').unbind('click');
        $('.icon-save').click(function(){
            var isValided = null;
            var username = $('#userName').text();
            if(username==""){
                location.href = '/testDemo/login';
            }else {
                if($(this).attr('class').indexOf("cur")==-1){
                    $(this).addClass('cur');
                    $(this).parent().find('label').text('已收藏');
                    isValided = 1;
                }else{
                    $(this).removeClass('cur');
                    $(this).parent().find('label').text('收藏');
                    isValided = 0;
                }
                var url = api+'userIsvalid?userName='+encodeURI(username)+
                    '&mainId='+encodeURI(mainId)+
                    '&isValided='+encodeURI(isValided)+
                    '&replyTime='+encodeURI(replyTime);
                $.getJSON(url,function (data) {
                    layer.msg(data.info);
                });
            }
        });
        //查看源
        $('.modalBtn').unbind('click');
        $('.modalBtn').click(function () {
            var sourceType =  $('#sourceType').val()==""?1:2;
            sourceType=2;
            if(sourceType==1){
                $('#myModal').addClass('madalHide');
                initTable();
            }else{
                var url = api+'accountDetailSource?mainId='+encodeURI(mainId)+
                    '&sourceType='+encodeURI(sourceType)+
                    '&userId='+encodeURI(userId);
                $.getJSON(url,function (data) {
                    if(data.datas.length<1){
                        layer.msg('未查看用户联系方式,可能方式已缺失!');
                    }else{
                        $('#identifier').addClass('madalHide');
                        data =data.datas[0].USER_QQ==null?"null":data.datas[0].USER_QQ;
                        var $table = $('#identifier').find('table');
                        $table.empty();
                        $table.append("<p>用户联系方式：</p>\n" +
                            "                    <p>QQ："+data+"</p>\n" +
                            "                    <p>特别提示：请注意交易安全，本平台不对信息真实性和信息的安全性提供保证。若有疑问，请联系客服。</p>\n" +
                            "                    <p>客服QQ：153435143</p>")
                    }
                });
            }
        });
        var colose = $('.close');
        var cancel = $('.btn-default');
        $(colose,cancel).unbind('click');
        $(colose,cancel).click(function () {
            $(this).parents('.modal').removeClass('madalHide');
        });

        //提交失效
        $('.sumbitIsvalid').unbind('click');
        $('.sumbitIsvalid').click(function () {
            var url =api+"accountDetailSubmitIsValid?favorId="+encodeURI(favorId);
            $.getJSON(url,function (data) {
               layer.msg(data.info);
            });
        });
    });
    function initTable(url,keyNum) {
        var startNum = 0;
        var endNum =10;
        if(keyNum!=null){
            endNum = 10*keyNum;
            startNum = endNum-10;
        }
        var url = api+'accountDetailSource?mainId='+encodeURI(mainId)+
            '&sourceType='+encodeURI(sourceType)+
            '&userId='+encodeURI(userId)+
            '&startNum='+encodeURI(startNum)+
            '&endNum='+encodeURI(endNum);
        var dateTemp = null;
        $.getJSON(url,function (data) {
            dateTemp = data;
            data =data.datas==null?'':data.datas;
            $('#source1').empty();
            $('#source1').append("<tr>\n" +
                "                        <td align=\"center\"  valign=\"middle\" bgcolor=\"#ccc\" width=\"150px\" height=\"30\">发布时间</td>\n" +
                "                        <td align=\"center\"  valign=\"middle\" bgcolor=\"#ccc\" width=\"300px\" height=\"30\">页面链接</td>\n" +
                "                        <td align=\"center\"  valign=\"middle\" bgcolor=\"#ccc\" width=\"150px\" height=\"30\">贴吧楼层</td>\n" +
                "                    </tr>");
            $.each(data,function (i,value) {
                $('#source1').append("<tr>\n" +
                    "                        <td align=\"center\"  valign=\"middle\" width=\"150px\" height=\"30\">"+value.REPLY_TIME+"</td>\n" +
                    "                        <td align=\"center\"  valign=\"middle\" width=\"300x\" height=\"30\"><a href=\""+value.PAGE_URL+"\">"+value.PAGE_URL+"</a></td>\n" +
                    "                        <td align=\"center\"  valign=\"middle\" width=\"150px\" height=\"30\">"+value.BELONG_FLOOR+"</td>\n" +
                    "                    </tr>")
            });
        }).complete(function () {
            var pageList = dataTemp.pageList==null?"":dataTemp.pageList;
            if(pageList!=""){
                initPage(pageList,keyNum);
            }else{
                $('.pagination').empty();
                layer.msg("分页组件加载失败!")
            }
        });
    }
    function initPage(pageList,keyNum) {
        var pageDatas = pageList;
        pageList = pageList==null?100:pageList;
        var pageNum = parseInt(pageList/10)+1;
        $('.pagination').empty();
        if(keyNum==null) {
            if (pageNum > 6) {
                $('.pagination').append(
                    "          <li class=\"disabled\"><a href=\"javascrpit:void(0)\">首页</a></li>\n" +
                    "          <li class=\"disabled\"><a href=\"javascrpit:void(0)\">上一页</a></li>\n" +
                    "          <li class=\"active\"><a href=\"javascrpit:void(0)\">1</a></li>\n" +
                    "          <li><a href=\"javascrpit:void(0)\">2</a></li>\n" +
                    "          <li><a href=\"javascrpit:void(0)\">3</a></li>\n" +
                    "          <li><a href=\"javascrpit:void(0)\">...</a></li>\n" +
                    "          <li><a href=\"javascrpit:void(0)\">" + pageNum - 1 + "</a></li>\n" +
                    "          <li><a href=\"javascrpit:void(0)\">" + pageNum + "</a></li>\n" +
                    "          <li><a href=\"javascrpit:void(0)\">下一页</a></li>\n" +
                    "          <li><a href=\"javascrpit:void(0)\">尾页</a></li>\n"
                );
            } else {
                $('.pagination').append(
                    "          <li class=\"disabled\"><a href=\"javascrpit:void(0)\">首页</a></li>\n" +
                    "          <li class=\"disabled\"><a href=\"javascrpit:void(0)\">上一页</a></li>\n"
                );
                for (var i = 1; i <= pageNum; i++) {
                    if(i==1){
                        $('.pagination').append(
                            "          <li class=\"active\"><a href=\"javascrpit:void(0)\">" + i + "</a></li>\n"
                        );
                    }else {
                        $('.pagination').append(
                            "          <li><a href=\"javascrpit:void(0)\">" + i + "</a></li>\n"
                        );
                    }
                }
                if (pageNum == 1) {
                    $('.pagination').append(
                        "          <li class=\"disabled\"><a href=\"javascrpit:void(0)\">下一页</a></li>\n" +
                        "          <li class=\"disabled\"><a href=\"javascrpit:void(0)\">尾页</a></li>\n"
                    );
                } else {
                    $('.pagination').append(
                        "          <li><a href=\"javascrpit:void(0)\">下一页</a></li>\n" +
                        "          <li><a href=\"javascrpit:void(0)\">尾页</a></li>\n"
                    );
                }
            }
        }else{
            keyNum=parseInt(keyNum);
            if(keyNum>pageNum){
                layer.msg("分页组件加载错误!");
            }else if(keyNum==1){
                initPage(pageDatas);
            }else if(keyNum==2){
                if (pageNum > 6) {
                    $('.pagination').append(
                        "          <li><a href=\"javascrpit:void(0)\">首页</a></li>\n" +
                        "          <li><a href=\"javascrpit:void(0)\">上一页</a></li>\n" +
                        "          <li><a href=\"javascrpit:void(0)\">1</a></li>\n" +
                        "          <li class=\"active\"><a href=\"javascrpit:void(0)\">2</a></li>\n" +
                        "          <li><a href=\"javascrpit:void(0)\">3</a></li>\n" +
                        "          <li><a href=\"javascrpit:void(0)\">...</a></li>\n" +
                        "          <li><a href=\"javascrpit:void(0)\">" + pageNum - 1 + "</a></li>\n" +
                        "          <li><a href=\"javascrpit:void(0)\">" + pageNum + "</a></li>\n" +
                        "          <li><a href=\"javascrpit:void(0)\">下一页</a></li>\n" +
                        "          <li><a href=\"javascrpit:void(0)\">尾页</a></li>\n"
                    );
                } else {
                    $('.pagination').append(
                        "          <li><a href=\"javascrpit:void(0)\">首页</a></li>\n" +
                        "          <li><a href=\"javascrpit:void(0)\">上一页</a></li>\n"
                    );
                    for (var i = 1; i <= pageNum; i++) {
                        if(i==keyNum){
                            $('.pagination').append(
                                "          <li class=\"active\"><a href=\"javascrpit:void(0)\">" + i + "</a></li>\n"
                            );
                        }else {
                            $('.pagination').append(
                                "          <li><a href=\"javascrpit:void(0)\">" + i + "</a></li>\n"
                            );
                        }
                    }
                    if(pageNum!=2) {
                        $('.pagination').append(
                            "          <li><a href=\"javascrpit:void(0)\">下一页</a></li>\n" +
                            "          <li><a href=\"javascrpit:void(0)\">尾页</a></li>\n"
                        );
                    }else{
                        $('.pagination').append(
                            "          <li class=\"disabled\"><a href=\"javascrpit:void(0)\">下一页</a></li>\n" +
                            "          <li class=\"disabled\"><a href=\"javascrpit:void(0)\">尾页</a></li>\n"
                        );
                    }
                }
            }else if(keyNum==3){
                if (pageNum > 6) {
                    $('.pagination').append(
                        "          <li><a href=\"javascrpit:void(0)\">首页</a></li>\n" +
                        "          <li><a href=\"javascrpit:void(0)\">上一页</a></li>\n" +
                        "          <li><a href=\"javascrpit:void(0)\">1</a></li>\n" +
                        "          <li><a href=\"javascrpit:void(0)\">2</a></li>\n" +
                        "          <li  class=\"active\"><a href=\"javascrpit:void(0)\">3</a></li>\n" +
                        "          <li><a href=\"javascrpit:void(0)\">...</a></li>\n" +
                        "          <li><a href=\"javascrpit:void(0)\">" + pageNum - 1 + "</a></li>\n" +
                        "          <li><a href=\"javascrpit:void(0)\">" + pageNum + "</a></li>\n" +
                        "          <li><a href=\"javascrpit:void(0)\">下一页</a></li>\n" +
                        "          <li><a href=\"javascrpit:void(0)\">尾页</a></li>\n"
                    );
                } else {
                    $('.pagination').append(
                        "          <li><a href=\"javascrpit:void(0)\">首页</a></li>\n" +
                        "          <li><a href=\"javascrpit:void(0)\">上一页</a></li>\n"
                    );
                    for (var i = 1; i <= pageNum; i++) {
                        if(i==keyNum){
                            $('.pagination').append(
                                "          <li class=\"active\"><a href=\"javascrpit:void(0)\">" + i + "</a></li>\n"
                            );
                        }else {
                            $('.pagination').append(
                                "          <li><a href=\"javascrpit:void(0)\">" + i + "</a></li>\n"
                            );
                        }
                    }
                    if(pageNum==3){
                        $('.pagination').append(
                            "          <li class=\"disabled\"><a href=\"javascrpit:void(0)\">下一页</a></li>\n" +
                            "          <li class=\"disabled\"><a href=\"javascrpit:void(0)\">尾页</a></li>\n"
                        );
                    }else {
                        $('.pagination').append(
                            "          <li><a href=\"javascrpit:void(0)\">下一页</a></li>\n" +
                            "          <li><a href=\"javascrpit:void(0)\">尾页</a></li>\n"
                        );
                    }
                }
            }else if(pageNum-keyNum>3&&keyNum>4){
                $('.pagination').append(
                    "          <li><a href=\"javascrpit:void(0)\">首页</a></li>\n" +
                    "          <li><a href=\"javascrpit:void(0)\">上一页</a></li>\n" +
                    "          <li><a href=\"javascrpit:void(0)\">1</a></li>\n" +
                    "          <li><a href=\"javascrpit:void(0)\">...</a></li>\n"
                );
                $('.pagination').append(
                    "          <li><a href=\"javascrpit:void(0)\">" + keyNum-1 + "</a></li>\n"+
                    "          <li  class=\"active\"><a href=\"javascrpit:void(0)\">" + keyNum + "</a></li>\n"+
                    "          <li><a href=\"javascrpit:void(0)\">" + keyNum+1 + "</a></li>\n"
                );
                $('.pagination').append(
                    "          <li><a href=\"javascrpit:void(0)\">...</a></li>\n"+
                    "          <li><a href=\"javascrpit:void(0)\">" + pageNum + "</a></li>\n" +
                    "          <li><a href=\"javascrpit:void(0)\">下一页</a></li>\n" +
                    "          <li><a href=\"javascrpit:void(0)\">尾页</a></li>\n"
                );
            }else if(keyNum==pageNum){
                $('.pagination').append(
                    "          <li><a href=\"javascrpit:void(0)\">首页</a></li>\n" +
                    "          <li><a href=\"javascrpit:void(0)\">上一页</a></li>\n" +
                    "          <li><a href=\"javascrpit:void(0)\">1</a></li>\n" +
                    "          <li><a href=\"javascrpit:void(0)\">2</a></li>\n" +
                    "          <li><a href=\"javascrpit:void(0)\">3</a></li>\n" +
                    "          <li><a href=\"javascrpit:void(0)\">...</a></li>\n" +
                    "          <li><a href=\"javascrpit:void(0)\">" + pageNum - 1 + "</a></li>\n" +
                    "          <li   class=\"active\"><a href=\"javascrpit:void(0)\">" + pageNum + "</a></li>\n" +
                    "          <li  class=\"disabled\"><a href=\"javascrpit:void(0)\">下一页</a></li>\n" +
                    "          <li  class=\"disabled\"><a href=\"javascrpit:void(0)\">尾页</a></li>\n"
                );
            }else{
                $('.pagination').append(
                    "          <li><a href=\"javascrpit:void(0)\">首页</a></li>\n" +
                    "          <li><a href=\"javascrpit:void(0)\">上一页</a></li>\n" +
                    "          <li><a href=\"javascrpit:void(0)\">1</a></li>\n" +
                    "          <li><a href=\"javascrpit:void(0)\">2</a></li>\n" +
                    "          <li><a href=\"javascrpit:void(0)\">3</a></li>\n" +
                    "          <li><a href=\"javascrpit:void(0)\">...</a></li>\n" +
                    "          <li><a href=\"javascrpit:void(0)\">" + keyNum - 1 + "</a></li>\n" +
                    "          <li   class=\"active\"><a href=\"javascrpit:void(0)\">" + keyNum + "</a></li>\n" +
                    "          <li><a href=\"javascrpit:void(0)\">...</a></li>\n" +
                    "          <li><a href=\"javascrpit:void(0)\">" + pageNum + "</a></li>\n" +
                    "          <li><a href=\"javascrpit:void(0)\">下一页</a></li>\n" +
                    "          <li><a href=\"javascrpit:void(0)\">尾页</a></li>\n"
                );
            }
        }
        $('.pagination li').each(function () {
            $(this).unbind("click");
            if($(this).attr("class")!='disabled' && $(this).attr("class")!='active'){
                $(this).click(function () {
                    var num = $(this).find('a').text();
                    if(num=='首页'){
                        initTable();
                    }else if(num=='上一页'){
                        var num = parseInt($('.pagination').find('.active').find('a').text())-1;
                        initTable(null,num);
                    }else if(num=='下一页'){
                        var num = parseInt($('.pagination').find('.active').find('a').text())+1;
                        initTable(null,num);
                    }else if(num=='尾页'){
                        initTable(null,pageNum);
                    }else{
                        initTable(null,num);
                    }
                });
            }
        })
    }
}