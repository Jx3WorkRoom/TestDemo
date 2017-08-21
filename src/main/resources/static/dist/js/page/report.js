api = api+"report/";

$(function () {
    console.log('11111111111111111111');
    saveTable();
    initSeach();
    timer()
});

//url 查询时传入新的url
//keyNum page组件点击的第几页
function saveTable(url,keyNum) {
    $.ajax({
        url:url,
        async:false,
        success:function (data) {

        },
        complete:function () {

        },
        error:function () {
            layer.closeAll();
            layer.msg("数据请求失败!")
        }

    });
}

//加载搜索框
function initSeach() {
    var url = api+'reportAddSelection';
    $.getJSON(url,function (data) {
        var selecttions = data.selecttions==null?"":data.selecttions;
        //填充区域选择框
        /*if(selecttions!="") {
            initSelections(selecttions);
        }
        var tixin = data.tixin==null?"":data.tixin;
        //填充体型选择框
        if(tixin!="") {
            initTixin(tixin);
        }
        var info = data.info==null?"":data.info;
        if(info!=""){
            initInfo(info);
        }*/
    }).error(function () {
    }).complete(function () {
        console.log('2222222222222222222222');
        $('.codebtn').unbind("click");
        $('.codebtn').click(function () {
                var cheatType = '1';//欺诈类别
                var belongQf = '1'; //涉事区服
                var tixin = '1';//门派体型
                var roleName = '1';//角色名
                var cheatIntro = '1';//被黑经历
                var cheatInfo = '1';//资料信息(网页链接地址)
                var pageUrl = '1';//网页链接地址
                url = api + 'reportSave?cheatType=' + encodeURI(cheatType)
                    + '&belongQf=' + encodeURI(belongQf)
                    + '&tixin=' + encodeURI(tixin)
                    +'&roleName=' + encodeURI(roleName)
                    +'&cheatIntro=' + encodeURI(cheatIntro)
                    +'&cheatInfo=' + encodeURI(cheatInfo)
                    +'&pageUrl=' + encodeURI(pageUrl);
                saveTable(url);
        });
    });
}

function timer() {

}