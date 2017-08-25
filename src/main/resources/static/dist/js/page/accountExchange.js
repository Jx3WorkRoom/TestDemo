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
    var url = api+'saveDlddInfo';
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
                var tradeType = '1';//
                var belongQf = '1'; //涉事区服
                var favorInfo = '1';//
                url = api + 'saveDlddInfo?tradeType=' + encodeURI(tradeType)
                    + '&belongQf=' + encodeURI(belongQf)
                    + '&favorInfo=' + encodeURI(favorInfo);
                saveTable(url);
        });
    });
}

function timer() {

}