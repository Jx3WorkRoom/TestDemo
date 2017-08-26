api = api+"iwantRelease/";

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
            //layer.closeAll();
            //layer.msg("数据请求失败!")
        }

    });
}

//加载搜索框
function initSeach() {
    var url = api+'saveWyjbInfo';
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
        $('.query-l').unbind("click");
        $('.query-l').click(function () {
                var cheatType = '1';//欺诈类别
                var belongQf = '1'; //涉事区服
                var viewName = '1';//
                var priceNum = '1';//
                var favorInfo = '1';//
                url = api + 'saveWgjyInfo?cheatType=' + encodeURI(cheatType)
                    + '&belongQf=' + encodeURI(belongQf)
                    + '&viewName=' + encodeURI(viewName)
                    +'&priceNum=' + encodeURI(priceNum)
                    +'&favorInfo=' + encodeURI(favorInfo);
                saveTable(url);
        });
    });
}

function timer() {

}