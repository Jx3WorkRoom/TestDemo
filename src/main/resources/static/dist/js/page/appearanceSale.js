var api = "http://127.0.0.1:8881/testDemoRest/appearanceSale/";
//设置一个省的公共下标
var pIndex = -1;
var preEle = document.getElementById("pre");
var cityEle = document.getElementById("city");
var areaEle = document.getElementById("area");
$(function () {
    initTable();
    initSeach();
    timer();
});


function timer() {
    setInterval("timeFun()",10*60*1000)
    function timeFun() {
        initTable();
        initSeach();
    }
}
//url 查询时传入新的url
//keyNum page组件点击的第几页
function initTable(url,keyNum) {
    var startNum = 0;
    var endNum =20;
    if(keyNum!=null){
        endNum = 20*keyNum;
        startNum = endNum-20;
    }
    if(url==null) {
        var tradeType = $('.dropdown.all-camera-dropdown').find("a").eq(0).text().trim();
        if(tradeType=="求购"){
            tradeType=1;
        }else{
            tradeType=2;
        }
        var str = getUrlParam('tradeType');
        function getUrlParam(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
            var r = window.location.search.substr(1).match(reg); //匹配目标参数
            if (r != null) return unescape(r[2]); return null; //返回参数值
        }
        if(parseInt(str)==1){
            tradeType=1;
            var sefont=$(".nav-pills ul li").eq(0).find('a').text();
            $(".nav-pills ul li").eq(0).parents('.nav-pills').find('.dropdown-toggle').html(sefont+'<b class="caret"></b>')
        }else if(parseInt(str)==2){
            tradeType=2;
            var sefont=$(".nav-pills ul li").eq(1).find('a').text();
            $(".nav-pills ul li").eq(0).parents('.nav-pills').find('.dropdown-toggle').html(sefont+'<b class="caret"></b>')
        }
        url = api+'appearanceSale?tradeType='+encodeURI(tradeType)+'&startNum='+encodeURI(startNum)+'&endNum='+encodeURI(endNum);
    }
    $(".table").empty();
    $(".table").append("<div class=\"table-tr tablered\">\n" +
        "        <div class=\"table-th table-th1\" style=\"width: 11% !important;padding-left: 30px;\">区服</div>\n" +
        "        <div class=\"table-th\">外观名</div>\n" +
        "        <div class=\"table-th\">介绍说明</div>\n" +
        "          <div class=\"table-th\">收/售<div class=\"sort\"><p class=\"top00\"></p><p class=\"down00\"></p></div></div>\n" +
        "        <div class=\"table-th\">价格（元）<div class=\"sort\"><p class=\"top00\"></p><p class=\"down00\"></p></div></div>\n" +
        "        <div class=\"table-th\">关注度<div class=\"sort\"><p class=\"top00\"></p><p class=\"down00\"></p></div></div>\n" +
        "        <div class=\"table-th\">上架时间<div class=\"sort\"><p class=\"top00\"></p><p class=\"down00\"></p></div></div>\n" +
        "        <div class=\"table-th\">状态报告<div class=\"sort\"><p class=\"top00\"></p><p class=\"down00\"></p></div></div>\n" +
        "        <div class=\"table-th\">收藏</div>\n" +
        "      </div>");
    layer.load();
    var dataTemp = null;
    $.ajax({
        url:url,
        async:false,
        success:function (data) {
            dataTemp = data;
            //填充表格数据
            var tableDatas = data.datas==null?"":data.datas;
            $.each(tableDatas,function (i,value) {
                var time = sumTime(value.REPLY_TIME);
                var tradeType = value.TRADE_TYPE==1?"求购":"出售";
                if(value.ISVALID==1){
                    $(".table").append(" <div class=\"table-tr\">\n" +
                        "        <div class=\"table-td main_id\" style='display: none'>"+value.MAIN_ID+"</div>\n" +
                        "        <div class=\"table-td replyTime\" style='display: none'>"+value.REPLY_TIME+"</div>\n" +
                        "        <div class=\"table-td\">"+value.BELONG_QF+"</div>\n" +
                        "        <div class=\"table-td\">"+value.VIEW_NAME+"</div>\n" +
                        "        <div class=\"table-td table_lw\"><a class=\"modalBtn\" href=\"javascript:;\">"+value.POST_CONTENT+"</a></div>\n" +
                        "          <div class=\"table-td\">"+tradeType+"</div>\n" +
                        "        <div class=\"table-td\">"+value.PRICE_NUM+"</div>\n" +
                        "        <div class=\"table-td\">"+value.USER_FOLLOW+"</div>\n" +
                        "        <div class=\"table-td\">"+time+"</div>\n" +
                        "        <div class=\"table-td\">正常</div>\n" +
                        "        <div class=\"table-td\"><i class=\"icon-save\"></i></div>\n" +
                        "      </div>");
                }else {
                    $(".table").append(" <div class=\"table-tr\">\n" +
                        "        <div class=\"table-td main_id\" style='display: none'>"+value.MAIN_ID+"</div>\n" +
                        "        <div class=\"table-td replyTime\" style='display: none'>"+value.REPLY_TIME+"</div>\n" +
                        "        <div class=\"table-td\">"+value.BELONG_QF+"</div>\n" +
                        "        <div class=\"table-td\">"+value.VIEW_NAME+"</div>\n" +
                        "        <div class=\"table-td table_lw\"><a class=\"modalBtn\" href=\"javascript:;\">"+value.POST_CONTENT+"</a></div>\n" +
                        "          <div class=\"table-td\">"+tradeType+"</div>\n" +
                        "        <div class=\"table-td\">"+value.PRICE_NUM+"</div>\n" +
                        "        <div class=\"table-td\">"+value.USER_FOLLOW+"</div>\n" +
                        "        <div class=\"table-td\">"+time+"</div>\n" +
                        "        <div class=\"table-td warn\">"+value.USER_ISVALID+"人报告|<a href=\"javascript:void(0)\" class='protDisable'>提交失效</a></div>\n" +
                        "        <div class=\"table-td\"><i class=\"icon-save\"></i></div>\n" +
                        "      </div>");
                }
            });
            //计算上架时间
            function sumTime(time) {
                var startTime =new DateUtil().nowDate2String("yyyy-MM-dd HH:mm:ss");
                time = time+" 00:00:00";
                var reStr = null;
                var diff = new DateUtil().diffDateTime(time,startTime)/1000;
                var day = parseInt(diff / (24*60*60));//计算整数天数
                var hour = parseInt(diff/(60*60));//计算整数小时数
                var min = parseInt(diff/60);//计算整数分
                if(day>1){
                    reStr = day+"天前";
                }else{
                    var hour = parseInt(diff/(60*60));//计算整数小时数
                    if(hour<1){
                        hour = 1;
                    }
                    reStr = hour+"小时前";
                }
                return reStr;
            }

            //弹出详情框
            $('.modalBtn').click(function () {
                $(this).parents('#maincontent').siblings('.modal').addClass('madalHide');
            });
            var colose = $('.close');
            var cancel = $('.btn-default');
            $(colose,cancel).click(function () {
                $(this).parents('.modal').removeClass('madalHide');
            });
            //收藏
            $('.icon-save').click(function () {
                var username = $('#userName').text();
                var mainId = $(this).parent().parent().find('.main_id').text();
                var replyTime = $(this).parent().parent().find('.replyTime').text();
                var isValided = null;
                if(username==""){
                    location.href = '/testDemo/login';
                }else {
                    if ($(this).attr('class').indexOf('cur') > -1) {
                        $(this).removeClass('cur');
                        isValided = 0;
                    } else {
                        $(this).addClass('cur');
                        isValided = 1;
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
        },
        complete:function () {
            layer.closeAll();
            var pageList = dataTemp.pageList==null?"":dataTemp.pageList;
            if(pageList!=""){
                initPage(pageList,keyNum);
            }else{
                $('.pagination').empty();
                layer.msg("分页组件加载失败!")
            }
        },
        error:function () {
            layer.closeAll();
            layer.msg("数据请求失败!")
        }

    });
}

//填充区域选择框
function Dsy()
{
    this.Items = {};
}
Dsy.prototype.add = function(id,iArray)
{
    this.Items[id] = iArray;
};
Dsy.prototype.Exists = function(id)
{
    if(typeof(this.Items[id]) == "undefined") return false;
    return true;
};
function change(v){
    var str="0";
    for(i=0;i <v;i++){ str+=("_"+(document.getElementById(s[i]).selectedIndex-1));};
    var ss=document.getElementById(s[v]);
    with(ss){
        length = 0;
        options[0]=new Option(opt0[v],opt0[v]);
        if(v && document.getElementById(s[v-1]).selectedIndex>0 || !v)
        {
            if(dsy.Exists(str)){
                ar = dsy.Items[str];
                for(i=0;i <ar.length;i++)options[length]=new Option(ar[i],ar[i]);
                if(v)options[1].selected = true;
            }
        }
        if(++v <s.length){change(v);}
    }
}
var dsy = new Dsy();
var s=["s1","s2","s3"];
var opt0 = ["请选择","请选择","请选择"];
function setup()
{
    for(i=0;i <s.length-1;i++)
        document.getElementById(s[i]).onchange=new Function("change("+(i+1)+")");
    change(0);
}
var pres = null;
var cities = null;
var area = null;
function chg(obj) {
    if (obj.value == -1) {
        cityEle.options.length = 0;
        areaEle.options.length = 0;
    }
    //获取值
    var val = obj.value;
    pIndex = obj.value;
    //获取ctiry
    var cs = cities[val];
    //获取默认区
    var as = areas[val][0];
    //先清空市
    if(cityEle==null){
        cityEle = document.getElementById("city");
    }
    cityEle.options.length = 0;
    if(areaEle==null){
        areaEle = document.getElementById("area");
    }
    areaEle.options.length = 0;
    for (var i = 0; i < cs.length; i++) {
        var op = new Option(cs[i], i);
        cityEle.options.add(op);
    }
    for (var i = 0; i < as.length; i++) {
        var op = new Option(as[i], i);
        areaEle.options.add(op);
    }
}
function chg2(obj) {
    var val = obj.selectedIndex;
    var as = areas[pIndex][val];
    areaEle.options.length = 0;
    for (var i = 0; i < as.length; i++) {
        var op = new Option(as[i], i);
        areaEle.options.add(op);
    }
}

//加载搜索框
function initSeach() {
    var url = api+'accountListSelection';
    $.getJSON(url,function (data) {
        var selecttions = data.selecttions==null?"":data.selecttions;
        //填充区域选择框
        if(selecttions!="") {
            initSelections(selecttions);
        }
        var tixin = data.tixin==null?"":data.tixin;
        //填充体型选择框
        if(tixin!="") {
            initTixin(tixin);
        }
    }).error(function () {
    }).complete(function () {
        $('.query-l').unbind("click");
        $('.query-l').click(function () {
            var tradeType =$('.dropdown.all-camera-dropdown').find("a").eq(0).text().trim();
            if(tradeType=="求购"){
                tradeType=1;
            }else{
                tradeType=2;
            }
            var areaSelection = "";
            $('.areaSelect').find('select').each(function () {
                var text = $(this).find('option:selected').text();
                if(text.indexOf("请选择")==-1) {
                    areaSelection += text + ',';
                }
            });
            if(areaSelection.length>2) {
                areaSelection.substring(0, areaSelection.length - 1);
            }else{
                areaSelection="";
            }
            var shape = $('.tixin').text()
            var info = $('.info').text()
            if(shape==""&&info==""&&areaSelection==""){
                initTable();
            }else {
                url = api + 'accountList?tradeType=' + encodeURI(tradeType)
                    + '&areaSelection=' + encodeURI(areaSelection)
                    + '&shape=' + encodeURI(shape);
                +'&info=' + encodeURI(info);
                +'&startNum=0&endNum=20';
                initTable(url);
            }
        });
    });
    function initSelections(selecttions) {
        var typeArr = [];
        var quArr = [];
        var fuArr = [];
        $.each(selecttions, function (i, value) {
            if (typeArr.indexOf(value.qufu_type) == -1) {
                typeArr.push(value.qufu_type);
            }
        });
        $.each(typeArr, function (i, value) {
            var arrTemp = [];
            $.each(selecttions, function (j, value1) {
                if (value1.qufu_type == value) {
                    if (arrTemp.indexOf(value1.qufu_qu) == -1) {
                        arrTemp.push(value1.qufu_qu);
                    }
                }
            });
            quArr.push(arrTemp);
        });
        var quArrTemp = [];
        $.each(quArr, function (i, value) {
            $.each(value, function (j, value1) {
                var arrTemp = [];
                $.each(selecttions, function (k, value2) {
                    if (value2.qufu_qu == value1) {
                        if (arrTemp.indexOf(value2.qufu_fu) == -1) {
                            arrTemp.push(value2.qufu_fu);
                        }
                    }
                });
                if (quArrTemp.indexOf(arrTemp) == -1) {
                    quArrTemp.push(arrTemp);
                }
            });
            fuArr.push(quArrTemp);
        });
        //声明省
        pres = typeArr;
        //声明市
        cities = quArr;
        areas = fuArr;

        dsy.add("0", pres);
        $.each(cities,function (i,value) {
            dsy.add("0_"+i,value);
        });
        var areaNum = 0;
        $.each(areas,function (i,value) {
            $.each(cities,function (j,value1) {
                dsy.add("0_"+i+"_"+j,value[areaNum]);
                areaNum++;
            });
        });

        //先设置省的值
        for (var i = 0; i < pres.length; i++) {
            //声明option.<option value="pres[i]">Pres[i]</option>
            var op = new Option(pres[i], i);
            //添加
            if(preEle==null){
                preEle = document.getElementById("pre");
            }
            preEle.options.add(op);
        }
    }

    function initTixin() {
        //todo
    }
}

//加载分页组件
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