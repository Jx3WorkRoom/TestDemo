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
        var username = $('#userName').text();
        $('.last').text(username);
        initTable();
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
                layer.closeAll();
                //跳转
                window.location.href="/testDemo/myRelease.html";
            },
            complete:function () {
                layer.closeAll();
                //layer.msg("保存出错!")
            },
            error:function () {
                layer.closeAll();
                layer.msg("数据请求失败!")
            }

        });
    }

    function initTable(url,keyNum) {
        var cheatType = $('.dropdown.all-camera-dropdown').find("a").eq(0).text().trim();
        if(cheatType=="账号诈骗"){
            cheatType=1;
        }else if(cheatType=="外观诈骗"){
            cheatType=2;
        }else if(cheatType=="道具诈骗"){
            cheatType=3;
        }else if(cheatType=="金币诈骗"){
            cheatType=4;
        }
        //var str = getUrlParam('cheatType');
        console.log('initTable()----------->'+cheatType);
        // function getUrlParam(name) {
        //     var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        //     var r = window.location.search.substr(1).match(reg); //匹配目标参数
        //     if (r != null) return unescape(r[2]); return null; //返回参数值
        // }
        /*if(parseInt(str)==1){
            tradeType=1;
            var sefont=$(".nav-pills ul li").eq(0).find('a').text();
            $(".nav-pills ul li").eq(0).parents('.nav-pills').find('.dropdown-toggle').html(sefont+'<b class="caret"></b>')
        }else if(parseInt(str)==2){
            tradeType=2;
            var sefont=$(".nav-pills ul li").eq(1).find('a').text();
            $(".nav-pills ul li").eq(0).parents('.nav-pills').find('.dropdown-toggle').html(sefont+'<b class="caret"></b>')
        }*/
    }

    //初始欺诈类型
    function initCheatType(){

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
            $('#save').unbind("click");
            $('#save').click(function () {
                    var tradeType = '1';//账号交易类别
                    var belongQf = '1'; //涉事区服
                    var tixin = $('#tixin').val();//门派体型
                    var priceNum = $('#priceNum').val();//价格
                    var accoInfo = $('#accoInfo').val();//账号资料

                //$('.dropdown.all-camera-dropdown').find("p").eq(0).html();


                    $('.areaSelect').find('select').each(function () {
                        var text = $(this).find('option:selected').text();
                        if(text.indexOf("请选择")==-1) {
                            belongQf += text + ',';
                        }
                    });
                    if(belongQf.length>2) {
                        belongQf = belongQf.substring(0, belongQf.length - 1);
                    }else{
                        belongQf="";
                    }

                    console.log('输出----------->'+belongQf);
                    console.log('输出----------->'+tixin);
                    console.log('输出----------->'+priceNum);
                    console.log('输出----------->'+accoInfo);
                    /*if(tradeType=="求购"){
                        tradeType=1;
                    }else{
                        tradeType=2;
                    }*/

                    url = reportApi + 'saveZhssInfo?belongQf=' + encodeURI(belongQf)
                        + '&tixin=' + encodeURI(tixin)
                        +'&priceNum=' + encodeURI(priceNum)
                        +'&accoInfo=' + encodeURI(accoInfo);
                    saveTable(url);
            });
            $('#preview').click(function () {
                layer.msg('努力开发中……');
            });
            $('#cancel').click(function () {
                layer.msg('努力开发中……');
            });
            initTable();
        });
    }
//------------------------------------Function定义 End------------------------------------
