var api = "http://192.168.18.104:8881/testDemoRest/blackList/";
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
    var url = api+"blackDetail?favorId="+encodeURI(favorId);
    var userId =null;
    var mainId =null
    var replyTime = null;
    var sourceType = null;
    $.getJSON(url,function (data)   {
        data = data.datas[0]==null?"":data.datas[0];
        if(data!=""){
            $('.mt15').empty();
            var cheatType = data.PAR_NAME;
            $('.mt15').append("<tr>\n" +
                "                         <td align=\"right\" class=\"wr ft1\">欺诈类型：</td>\n" +
                "                         <td colspan=\"7\">"+cheatType+"</td>\n" +
                "                     </tr>\n" +
                "                     <tr>\n" +
                "                         <td align=\"right\" class=\"wr ft1\">涉事区服：</td>\n" +
                "                         <td colspan=\"7\">"+data.BELONG_QF+"</td>\n" +
                "                     </tr>\n" +
                "                     <tr>\n" +
                "                         <td align=\"right\" class=\"wr ft1\">门派体型：</td>\n" +
                "                         <td colspan=\"7\">"+data.TIXIN+"</td>\n" +
                "                     </tr>\n" +
                "                     <tr>\n" +
                "                         <td align=\"right\" class=\"wr ft1\">角色名：</td>\n" +
                "                         <td colspan=\"7\">"+data.ROLE_NAME+"</td>\n" +
                "                     </tr>\n" +
                "                     <tr>\n" +
                "                         <td align=\"right\" class=\"wr ft1\">被黑经历：</td>\n" +
                "                         <td colspan=\"7\">"+data.CHEAT_INTRO+"</td>\n" +
                "                     </tr>\n" +
                "                     <tr>\n" +
                "                         <td align=\"right\" class=\"wr ft1\">资料信息：</td>\n" +
                "                         <td colspan=\"7\">"+data.CHEAT_INFO+"</td>\n" +
                "                     </tr>\n" +
                "                     <tr>\n" +
                "                     </tr>");
            var imgSrc = data.PIC_PATH;
            imgSrc = '/testDemo/dist/css/images/jx3/game05.jpg';
            $('.bigimgs img').attr('src',imgSrc);
            $('.scrollimg').empty();
            for(var i= 0;i<5;i++){
                var imgHtml = "";
                var num = parseInt(5-i);
                if(i==0) {
                    imgHtml = "<img class=\"moveimg cur\" src=\"/testDemo/dist/css/images/jx3/game0"+num+".jpg\" style=\"margin-left: 0px;\">";
                    $('.scrollimg').append(imgHtml)
                }else{
                    imgHtml = "<img src=\"/testDemo/dist/css/images/jx3/game0"+num+".jpg\" style=\"margin-left: 0px;\">";
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
    }).error(function () {
        layer.msg("请求数据有误或者数据库并未查询到相关数据!")
    });
}