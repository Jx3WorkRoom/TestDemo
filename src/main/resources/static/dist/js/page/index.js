var api = "http://127.0.0.1:8881/testDemoRest/";

$(function () {
    initTable();
});

function initTable() {
    var url = api+'index/index';
    layer.load();
    $.getJSON(url,function (data) {
        var table1Datas = data.datas2==null?"":data.datas2;
        var table2Datas = data.datas1==null?"":data.datas1;
        $("#table1").empty();
        $("#table1").append("<div class=\"table-tr tablered\">\n" +
            "        <div class=\"table-th table-th1\" style=\"width: 11% !important;padding-left: 30px;\">区服</div>\n" +
            "        <div class=\"table-th\" style=\"width: 8%\">门派体型</div>\n" +
            "        <div class=\"table-th\" style=\"width: 59%;padding-left: 34px;\">资料简介</div>\n" +
            "        <div class=\"table-th\" style=\"width: 10%\">价格(元)</div>\n" +
            "        <div class=\"table-th\" style=\"width: 12%\">关注度</div>\n" +
            "      </div>");
        $.each(table1Datas,function (i,value) {
            $("#table1").append("<div class=\"table-tr\">\n" +
                "        <div class=\"table-td\" style=\"width: 11% !important;\">"+value.BELONG_QF+"</div>\n" +
                "        <div class=\"table-td\" style=\"width: 8%\">"+value.TIXIN+"</div>\n" +
                "        <div class=\"table-td table_lw\" style=\"width: 59%;padding-left: 34px;\">"+value.REPLY_CONTENT+"</div>\n" +
                "        <div class=\"table-td\" style=\"width: 10%\">"+value.PRICE_NUM+"</div>\n" +
                "        <div class=\"table-td\" style=\"width:12%;\">"+value.USER_FOLLOW+"</div>\n" +
                "      </div>")
        });
        $("#table2").empty();
        $("#table2").append("<div class=\"table-tr tableyellow\">\n" +
            "        <div class=\"table-th table-th5\" style=\"width: 11% !important;padding-left: 30px;\">区服</div>\n" +
            "        <div class=\"table-th\" style=\"width: 8%\">门派体型</div>\n" +
            "        <div class=\"table-th\" style=\"width: 59%;padding-left: 34px;\">资料简介</div>\n" +
            "        <div class=\"table-th\" style=\"width: 10%\">价格(元)</div>\n" +
            "        <div class=\"table-th\" style=\"width: 12%\">关注度</div>\n" +
            "      </div>");
        $.each(table2Datas,function (i,value) {
            $('#table2').append("<div class=\"table-tr\">\n" +
                "        <div class=\"table-td\" style=\"width: 11% !important;\">"+value.BELONG_QF+"</div>\n" +
                "        <div class=\"table-td\" style=\"width: 8%\">"+value.TIXIN+"</div>\n" +
                "        <div class=\"table-td table_lw\" style=\"width: 59%;padding-left: 34px;\">"+value.REPLY_CONTENT+"</div>\n" +
                "        <div class=\"table-td\" style=\"width: 10%\">"+value.PRICE_NUM+"</div>\n" +
                "        <div class=\"table-td\" style=\"width:12%;\">"+value.USER_FOLLOW+"</div>\n" +
                "      </div>");
        });
    }).error(function (e) {
        layer.msg("数据请求失败!")
    }).complete(function (e) {
        layer.closeAll();
    });
}

