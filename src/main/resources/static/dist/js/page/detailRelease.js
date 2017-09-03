//------------------------------------常量定义 Start------------------------------------
    reportApi = api+"iwantRelease/";
    api = api+"accountList/";

    //设置一个省的公共下标
    var pIndex = 0;
    var preEle = document.getElementById("pre");
    var cityEle = document.getElementById("city");
    var areaEle = document.getElementById("area");
    var clickSeachNum = 0;

    $(function () {
        initTable();
        saveTable();
        initForm();    //初始化Form
    });
//------------------------------------常量定义 Start------------------------------------

//------------------------------------填充区域选择框 Start------------------------------------
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
    //一级连动
    function setup()
    {
        for(i=0;i <s.length-1;i++)
            document.getElementById(s[i]).onchange=new Function("change("+(i+1)+")");
        change(0);
    }
    var pres = null;
    var cities = null;
    var area = null;
    //二级连动
    function chg(obj) {
        if (obj.value == -1) {
            cityEle.options.length = 0;
            areaEle.options.length = 0;
        }
        //获取值
        var val = obj.value;
        pIndex = parseInt(obj.value)+1;
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
    //三级连动
    function chg2(obj) {
        var val = obj.selectedIndex;
        // var as = areas[pIndex][val];
        var aIndex = obj.value;
        if(parseInt(pIndex-1)>0) {
            for(var i=0;i<parseInt(pIndex-1);i++) {
                aIndex =  parseInt(aIndex)+cities[i].length;
            }
        }
        var as = areas[aIndex];
        areaEle.options.length = 0;
        if(val!=0) {
            for (var i = 0; i < as.length; i++) {
                var op = new Option(as[i], i);
                areaEle.options.add(op);
            }
        }
    }
//------------------------------------填充区域选择框 End------------------------------------

//------------------------------------Function定义 Start------------------------------------
    //保存
    function saveTable(url,keyNum) {
        $.ajax({
            url:url,
            async:false,
            success:function (data) {

            },
            complete:function () {

            },
            error:function () {
                //layer.closeAll();
                //layer.msg("数据请求失败!")
            }

        });
    }

    function initTable(url,keyNum) {
        //称号
        //console.log($("#jsqj").html());


        //清空称号
        $("#chenghao").empty();
        //<span><i class="icon0"></i>济世菩萨</span><span><i class="icon0"></i>红尘</span><span><i class="icon0"></i>济世菩萨</span><span><i class="icon0"></i>红尘</span><span><i class="icon0"></i>济世菩萨</span><span><i class="icon0"></i>红尘</span><span><i class="icon0"></i>济世菩萨</span><span><i class="icon0"></i>红尘</span><span><i class="icon0"></i>济世菩萨</span><span><i class="icon0"></i>红尘</span><span><i class="icon0"></i>济世菩萨</span><span><i class="icon0"></i>红尘</span>
        $("#chenghao").html('<span><input type="checkbox" name="ch" value="1" />济世菩萨<input type="checkbox" name="ch" value="2" />红尘<input type="checkbox" name="ch" value="3" />济世菩萨');
        //发型
        $("#fx").empty();
        $("#fx").html('<span><i class="icon0"></i>济世菩萨</span><span><i class="icon0"></i>红尘</span><span><i class="icon0"></i>济世菩萨</span><span><i class="icon0"></i>红尘</span><span><i class="icon0"></i>济世菩萨</span><span><i class="icon0"></i>红尘</span><span><i class="icon0"></i>济世菩萨</span><span><i class="icon0"></i>红尘</span><span><i class="icon0"></i>济世菩萨</span><span><i class="icon0"></i>红尘</span><span><i class="icon0"></i>济世菩萨</span><span><i class="icon0"></i>红尘</span>');
        //披风
        $("#pf").empty();
        $("#pf").html('<span><i class="icon0"></i>济世菩萨</span><span><i class="icon0"></i>红尘</span><span><i class="icon0"></i>济世菩萨</span><span><i class="icon0"></i>红尘</span><span><i class="icon0"></i>济世菩萨</span><span><i class="icon0"></i>红尘</span><span><i class="icon0"></i>济世菩萨</span><span><i class="icon0"></i>红尘</span><span><i class="icon0"></i>济世菩萨</span><span><i class="icon0"></i>红尘</span><span><i class="icon0"></i>济世菩萨</span><span><i class="icon0"></i>红尘</span>');
        //成衣-限量
        $("#cyxl").empty();
        $("#cyxl").html('<span><i class="icon0"></i>济世菩萨</span><span><i class="icon0"></i>红尘</span><span><i class="icon0"></i>济世菩萨</span><span><i class="icon0"></i>红尘</span><span><i class="icon0"></i>济世菩萨</span><span><i class="icon0"></i>红尘</span><span><i class="icon0"></i>济世菩萨</span><span><i class="icon0"></i>红尘</span><span><i class="icon0"></i>济世菩萨</span><span><i class="icon0"></i>红尘</span><span><i class="icon0"></i>济世菩萨</span><span><i class="icon0"></i>红尘</span>');
        //成衣-限时
        $("#cyxs").empty();
        $("#cyxs").html('<span><i class="icon0"></i>济世菩萨</span><span><i class="icon0"></i>红尘</span><span><i class="icon0"></i>济世菩萨</span><span><i class="icon0"></i>红尘</span><span><i class="icon0"></i>济世菩萨</span><span><i class="icon0"></i>红尘</span><span><i class="icon0"></i>济世菩萨</span><span><i class="icon0"></i>红尘</span><span><i class="icon0"></i>济世菩萨</span><span><i class="icon0"></i>红尘</span><span><i class="icon0"></i>济世菩萨</span><span><i class="icon0"></i>红尘</span>');
        //套装盒子
        $("#tzhz").empty();
        $("#tzhz").html('<span><i class="icon0"></i>济世菩萨</span><span><i class="icon0"></i>红尘</span><span><i class="icon0"></i>济世菩萨</span><span><i class="icon0"></i>红尘</span><span><i class="icon0"></i>济世菩萨</span><span><i class="icon0"></i>红尘</span><span><i class="icon0"></i>济世菩萨</span><span><i class="icon0"></i>红尘</span><span><i class="icon0"></i>济世菩萨</span><span><i class="icon0"></i>红尘</span><span><i class="icon0"></i>济世菩萨</span><span><i class="icon0"></i>红尘</span>');

        //坐骑
        $("#tzhz").empty();
        $("#tzhz").html('<span><i class="icon0"></i>赤兔</span><span><i class="icon0"></i>踏炎</span><span><i class="icon0"></i>里飞沙</span><span><i class="icon0"></i>绝尘</span><span><i class="icon0"></i>霸红尘</span><span><i class="icon0"></i>雷兽飞电</span><span><i class="icon0"></i>赤珠飞电</span><span><i class="icon0"></i>赤兔</span><span><i class="icon0"></i>踏炎</span><span><i class="icon0"></i>里飞沙</span><span><i class="icon0"></i>绝尘</span><span><i class="icon0"></i>霸红尘</span><span><i class="icon0"></i>雷兽飞电</span><span><i class="icon0"></i>赤珠飞电</span>');
        //马具
        $("#mj").empty();
        $("#mj").html('<span><i class="icon0"></i>赤兔</span><span><i class="icon0"></i>踏炎</span><span><i class="icon0"></i>里飞沙</span><span><i class="icon0"></i>绝尘</span><span><i class="icon0"></i>霸红尘</span><span><i class="icon0"></i>雷兽飞电</span><span><i class="icon0"></i>赤珠飞电</span><span><i class="icon0"></i>赤兔</span><span><i class="icon0"></i>踏炎</span><span><i class="icon0"></i>里飞沙</span><span><i class="icon0"></i>绝尘</span><span><i class="icon0"></i>霸红尘</span><span><i class="icon0"></i>雷兽飞电</span><span><i class="icon0"></i>赤珠飞电</span>');
        //马饰
        $("#ms").empty();
        $("#ms").html('<span><i class="icon0"></i>赤兔</span><span><i class="icon0"></i>踏炎</span><span><i class="icon0"></i>里飞沙</span><span><i class="icon0"></i>绝尘</span><span><i class="icon0"></i>霸红尘</span><span><i class="icon0"></i>雷兽飞电</span><span><i class="icon0"></i>赤珠飞电</span><span><i class="icon0"></i>赤兔</span><span><i class="icon0"></i>踏炎</span><span><i class="icon0"></i>里飞沙</span><span><i class="icon0"></i>绝尘</span><span><i class="icon0"></i>霸红尘</span><span><i class="icon0"></i>雷兽飞电</span><span><i class="icon0"></i>赤珠飞电</span>');
        //骑趣
        $("#qq").empty();
        $("#qq").html('<span><i class="icon0"></i>赤兔</span><span><i class="icon0"></i>踏炎</span><span><i class="icon0"></i>里飞沙</span><span><i class="icon0"></i>绝尘</span><span><i class="icon0"></i>霸红尘</span><span><i class="icon0"></i>雷兽飞电</span><span><i class="icon0"></i>赤珠飞电</span><span><i class="icon0"></i>赤兔</span><span><i class="icon0"></i>踏炎</span><span><i class="icon0"></i>里飞沙</span><span><i class="icon0"></i>绝尘</span><span><i class="icon0"></i>霸红尘</span><span><i class="icon0"></i>雷兽飞电</span><span><i class="icon0"></i>赤珠飞电</span>');

        //十大珍稀挂件
        $("#sdzxgj").empty();
        $("#sdzxgj").html('<span><i class="icon0"></i>寻珍味·虎仔</span><span><i class="icon0"></i>铁血枫红旗</span><span><i class="icon0"></i>三尺青锋</span><span><i class="icon0"></i>塞外宝驹</span><span><i class="icon0"></i>清风捕王</span><span><i class="icon0"></i>黑白路</span><span><i class="icon0"></i>少年行</span><span><i class="icon0"></i>茶馆奇缘</span><span><i class="icon0"></i>生死判</span><span><i class="icon0"></i>炼狱厨神</span>');
        //重要运营挂件
        $("#zyyygj").empty();
        $("#zyyygj").html('<span><i class="icon0"></i>寻珍味·虎仔</span><span><i class="icon0"></i>铁血枫红旗</span><span><i class="icon0"></i>三尺青锋</span><span><i class="icon0"></i>塞外宝驹</span><span><i class="icon0"></i>清风捕王</span><span><i class="icon0"></i>黑白路</span><span><i class="icon0"></i>少年行</span><span><i class="icon0"></i>茶馆奇缘</span><span><i class="icon0"></i>生死判</span><span><i class="icon0"></i>炼狱厨神</span>');
        //重要副本挂件
        $("#zyfjgj").empty();
        $("#zyfjgj").html('<span><i class="icon0"></i>寻珍味·虎仔</span><span><i class="icon0"></i>铁血枫红旗</span><span><i class="icon0"></i>三尺青锋</span><span><i class="icon0"></i>塞外宝驹</span><span><i class="icon0"></i>清风捕王</span><span><i class="icon0"></i>黑白路</span><span><i class="icon0"></i>少年行</span><span><i class="icon0"></i>茶馆奇缘</span><span><i class="icon0"></i>生死判</span><span><i class="icon0"></i>炼狱厨神</span>');
        //奇遇挂件
        $("#qygj").empty();
        $("#qygj").html('<span><i class="icon0"></i>寻珍味·虎仔</span><span><i class="icon0"></i>铁血枫红旗</span><span><i class="icon0"></i>三尺青锋</span><span><i class="icon0"></i>塞外宝驹</span><span><i class="icon0"></i>清风捕王</span><span><i class="icon0"></i>黑白路</span><span><i class="icon0"></i>少年行</span><span><i class="icon0"></i>茶馆奇缘</span><span><i class="icon0"></i>生死判</span><span><i class="icon0"></i>炼狱厨神</span>');
        //JJC奖励挂件
        $("#jlgj").empty();
        $("#jlgj").html('<span><i class="icon0"></i>寻珍味·虎仔</span><span><i class="icon0"></i>铁血枫红旗</span><span><i class="icon0"></i>三尺青锋</span><span><i class="icon0"></i>塞外宝驹</span><span><i class="icon0"></i>清风捕王</span><span><i class="icon0"></i>黑白路</span><span><i class="icon0"></i>少年行</span><span><i class="icon0"></i>茶馆奇缘</span><span><i class="icon0"></i>生死判</span><span><i class="icon0"></i>炼狱厨神</span>');
        //重要成就挂件
        $("#jlgj").empty();
        $("#jlgj").html('<span><i class="icon0"></i>寻珍味·虎仔</span><span><i class="icon0"></i>铁血枫红旗</span><span><i class="icon0"></i>三尺青锋</span><span><i class="icon0"></i>塞外宝驹</span><span><i class="icon0"></i>清风捕王</span><span><i class="icon0"></i>黑白路</span><span><i class="icon0"></i>少年行</span><span><i class="icon0"></i>茶馆奇缘</span><span><i class="icon0"></i>生死判</span><span><i class="icon0"></i>炼狱厨神</span>');
        //重要充消挂件
        $("#zycxgj").empty();
        $("#zycxgj").html('<span><i class="icon0"></i>寻珍味·虎仔</span><span><i class="icon0"></i>铁血枫红旗</span><span><i class="icon0"></i>三尺青锋</span><span><i class="icon0"></i>塞外宝驹</span><span><i class="icon0"></i>清风捕王</span><span><i class="icon0"></i>黑白路</span><span><i class="icon0"></i>少年行</span><span><i class="icon0"></i>茶馆奇缘</span><span><i class="icon0"></i>生死判</span><span><i class="icon0"></i>炼狱厨神</span>');


        //绝世奇遇
        $("#jsqj").empty();
        $("#jsqj").html('<span><i class="icon0"></i>三山四海</span><span><i class="icon0"></i>阴阳两界</span><span><i class="icon0"></i>三尺青锋</span><span><i class="icon0"></i>塞外宝驹</span><span><i class="icon0"></i>清风捕王</span><span><i class="icon0"></i>黑白路</span><span><i class="icon0"></i>少年行</span><span><i class="icon0"></i>茶馆奇缘</span><span><i class="icon0"></i>生死判</span><span><i class="icon0"></i>炼狱厨神</span>');
        //普通奇遇
        $("#ptqy").empty();
        $("#ptqy").html('<span><i class="icon0"></i>三山四海</span><span><i class="icon0"></i>阴阳两界</span><span><i class="icon0"></i>三尺青锋</span><span><i class="icon0"></i>塞外宝驹</span><span><i class="icon0"></i>清风捕王</span><span><i class="icon0"></i>黑白路</span><span><i class="icon0"></i>少年行</span><span><i class="icon0"></i>茶馆奇缘</span><span><i class="icon0"></i>生死判</span><span><i class="icon0"></i>炼狱厨神</span>');
        //江湖奇遇
        $("#jhqy").empty();
        $("#jhqy").html('<span><i class="icon0"></i>三山四海</span><span><i class="icon0"></i>阴阳两界</span><span><i class="icon0"></i>三尺青锋</span><span><i class="icon0"></i>塞外宝驹</span><span><i class="icon0"></i>清风捕王</span><span><i class="icon0"></i>黑白路</span><span><i class="icon0"></i>少年行</span><span><i class="icon0"></i>茶馆奇缘</span><span><i class="icon0"></i>生死判</span><span><i class="icon0"></i>炼狱厨神</span>');
        //宠物奇珍
        $("#cwzq").empty();
        $("#cwzq").html('<span><i class="icon0"></i>三山四海</span><span><i class="icon0"></i>阴阳两界</span><span><i class="icon0"></i>三尺青锋</span><span><i class="icon0"></i>塞外宝驹</span><span><i class="icon0"></i>清风捕王</span><span><i class="icon0"></i>黑白路</span><span><i class="icon0"></i>少年行</span><span><i class="icon0"></i>茶馆奇缘</span><span><i class="icon0"></i>生死判</span><span><i class="icon0"></i>炼狱厨神</span>');
 }

    //初始欺诈类型
    function initCheatType(){
        console.log('3333333333333333');
    }
    //初始区服下拉数据
    function initSelections(selecttions) {
        var typeArr = [];
        var quArr = [];
        var areaArr = [];
        $.each(selecttions, function (i, value) {
             if (typeArr.indexOf(value.qufu_type) == -1) {
             typeArr.push(value.qufu_type);
             }
         });
         $.each(typeArr, function (i, value) {
             var arrTemp = [""];
             $.each(selecttions, function (j, value1) {
             if (value1.qufu_type == value) {
             if (arrTemp.indexOf(value1.qufu_qu) == -1) {
             arrTemp.push(value1.qufu_qu);
             }
             }
             });
             quArr.push(arrTemp);
         });
         $.each(quArr, function (i, value) {
             $.each(value, function (j, value1) {
                 var arrTemp = [""];
                 $.each(selecttions, function (k, value2) {
                     if (value2.qufu_qu == value1) {
                         if (arrTemp.indexOf(value2.qufu_fu) == -1) {
                            arrTemp.push(value2.qufu_fu);
                         }
                     }
                 });
                 if (areaArr.indexOf(arrTemp) == -1) {
                    areaArr.push(arrTemp);
                 }
             });
         });
         //声明省
         pres = typeArr;
         //声明市
         cities = quArr;
         areas = areaArr;

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
    //加载Form
    function initForm() {
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
//                initTixin(tixin);
            }
            var info = data.info==null?"":data.info;
            if(info!=""){
//                initInfo(info);
            }
        }).error(function () {
        }).complete(function () {
            //绑定页签
            $('.ht').unbind("click");
            $('.ht').click(function () {
                //alert($(".ht").index());
                //$(this).addClass('cur').siblings('span').removeClass('cur');
                //alert($('.ht').find('span').html());

                /*$('.ht').find('span').click(function(){
                    alert('选择了：'+this.innerHTML)
                })*/
                //$(this).addClass('cur').siblings('span').removeClass('cur');

                //alert(   $(">span",this).eq(2).html()   );

                //$(">span",this).eq(2).addClass('cur').siblings('span').removeClass('cur');
                //$('.ht').find('span').eq(2).addClass('cur').siblings('span').removeClass('cur');
            });
            //绑定保存
            $('#save').unbind("click");
            $('#save').click(function () {
                var belongQf = '1'; //涉事区服
                var tixin = $('#tixin').val();//门派体型
                var priceNum = $('#priceNum').val();//价格
                var mbgjsl = $('#mbgjsl').val();//面部挂件数量
                var bbgjsl = $('#bbgjsl').val();//背部挂件数量
                var ybgjsl = $('#ybgjsl').val();//腰部挂件数量
                var zjssl = $('#zjssl').val();//左肩饰数量
                var yjssl = $('#yjssl').val();//右肩饰数量
                var qtxych = $('#qtxych').val();//其它稀有称号???
                
                var zl = $('#zl').val();//资历
                var fbwj = $('#fbwj').val();//副本五甲
                var xfcz = $('#xfcz').val();//消费充值
                var xfjf = $('#xfjf').val();//消费积分
                var yxjb = $('#yxjb').val();//游戏金币
                var cwfz = $('#cwfz').val();//宠物分值
                var jhsj = $('#jhsj').val();//建号时间
                var kdsj = $('#kdsj').val();//点卡时间
                var tbsl = $('#tbsl').val();//通宝数量
                //var yxjb2 = $('#yxjb2').val();//游戏金币2
                var en = $('#en').val();//二内
                var sn = $('#sn').val();//三内

                var _95cw = $('#95cw').val();//95橙武
                var _90cw = $('#90cw').val();//90橙武
                var _80cw = $('#80cw').val();//80橙武
                var _70cw = $('#70cw').val();//70橙武
                var mptx = $('#mptx').val();//门派特效
                var _95xj = $('#95xj').val();//95玄晶
                var _95xt = $('#95xt').val();//95小铁
                var _90xj = $('#90xj').val();//90玄晶
                var _90xt = $('#90xt').val();//90小铁
                var _80xj = $('#80xj').val();//80玄晶
                var _80xt = $('#80xt').val();//80小铁
                var _70xj = $('#70xj').val();//70玄晶
                var _70xt = $('#70xt').val();//70小铁
                var pvpnz = $('#pvpnz').val();//PVP-奶装
                var pvenz = $('#pvenz').val();//PVE-奶装
                //var pvpnz2 = $('#pvpnz2').val();//PVP-奶装2
                var pvetz = $('#pvetz').val();//PVE-T装
                var pvpdpsngz = $('#pvpdpsngz').val();//PVP-DPS-内功装
                var pvedpsngz = $('#pvedpsngz').val();//PVE-DPS-内功装
                var pvpdpswgz = $('#pvpdpswgz').val();//PVP-DPS-外功装
                var pvedpswgz = $('#pvedpswgz').val();//PVE-DPS-外功装

                var bcsm = $('#bcsm').val();//补充说明

                //称号复选框
                var ch='';
                $("input[name='ch']:checked").each(function () {
                    //alert(this.value);
                    //$('#show').append(this.value + "  ");
                    ch+=this.value + ","
                });
                ch = trimEnd(ch);
                //所在区服
                $('.areaSelect').find('select').each(function () {
                    var text = $(this).find('option:selected').text();
                    if(text.indexOf("请选择")==-1) {
                        belongQf += text + ',';
                    }
                });
                belongQf=trimEnd(belongQf);

                console.log('输出----------->'+fbwj);

                url = reportApi + 'saveZhssxxfbInfo?belongQf=' + encodeURI(belongQf)
                    + '&tixin=' + encodeURI(tixin)
                    +'&priceNum=' + encodeURI(priceNum)
                    +'&mbgjsl=' + encodeURI(mbgjsl)
                    +'&bbgjsl=' + encodeURI(bbgjsl)
                    +'&ybgjsl=' + encodeURI(ybgjsl)
                    +'&zjssl=' + encodeURI(zjssl)
                    +'&yjssl=' + encodeURI(yjssl)
                    +'&qtxych=' + encodeURI(qtxych)
                    +'&zl=' + encodeURI(zl)
                    +'&fbwj=' + encodeURI(fbwj)
                    +'&xfcz=' + encodeURI(xfcz)
                    +'&xfjf=' + encodeURI(xfjf)
                    +'&yxjb=' + encodeURI(yxjb)
                    +'&cwfz=' + encodeURI(cwfz)
                    +'&jhsj=' + encodeURI(jhsj)
                    +'&kdsj=' + encodeURI(kdsj)
                    +'&tbsl=' + encodeURI(tbsl)
                    +'&en=' + encodeURI(en)
                    +'&sn=' + encodeURI(sn)
                    +'&_95cw=' + encodeURI(_95cw)
                    +'&_90cw=' + encodeURI(_90cw)
                    +'&_80cw=' + encodeURI(_80cw)
                    +'&_70cw=' + encodeURI(_70cw)
                    +'&mptx=' + encodeURI(mptx)
                    +'&_95xj=' + encodeURI(_95xj)
                    +'&_95xt=' + encodeURI(_95xt)
                    +'&_90xj=' + encodeURI(_90xj)
                    +'&_90xt=' + encodeURI(_90xt)
                    +'&_80xj=' + encodeURI(_80xj)
                    +'&_80xt=' + encodeURI(_80xt)
                    +'&_70xj=' + encodeURI(_70xj)
                    +'&_70xt=' + encodeURI(_70xt)
                    +'&pvpnz=' + encodeURI(pvpnz)
                    +'&pvenz=' + encodeURI(pvenz)
                    +'&pvetz=' + encodeURI(pvetz)
                    +'&pvpdpsngz=' + encodeURI(pvpdpsngz)
                    +'&pvedpsngz=' + encodeURI(pvedpsngz)
                    +'&pvpdpswgz=' + encodeURI(pvpdpswgz)
                    +'&pvedpswgz=' + encodeURI(pvedpswgz)
                    +'&bcsm=' + encodeURI(bcsm);
                saveTable(url);
            });
            $('#cancel').unbind("click");
            $('#cancel').click(function () {
                alert('取消');
            });
            initTable();
        });
    }

    function nextPage(spanindex) {
        $('.ht').find('span').eq(spanindex).addClass('cur').siblings('span').removeClass('cur');
        var detailGroup=$('.detailGroup .group');
        $(detailGroup[spanindex]).show().siblings('.group').hide();
    }
    //去字符串尾部，
    function trimEnd(str) {
        if(str.length>2) {
            str = str.substring(0, str.length - 1);
        }else{
            str="";
        }

        return str;
    }
//------------------------------------Function定义 End------------------------------------
