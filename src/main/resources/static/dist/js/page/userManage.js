var api = api+'userManage/';

$(function () {
    initBunding();
    initTable()
});

function initTable() {
    var url = api+'userManageInfo';
    layer.load();
    $('.table1').empty();
    $('.table1').append("<div class=\"table-tr tablech1\">\n" +
        "    <div class=\"table-th\ table-th3\">页面模块</div>\n" +
        "    <div class=\"table-th\">功能ID</div>\n" +
        "    <div class=\"table-th\">功能名称</div>\n" +
        "    <div class=\"table-th\">权限类别</div>\n" +
        "    <div class=\"table-th\">游客是否可用</div>\n" +
        "    <div class=\"table-th\">注册是否可用</div>\n" +
        "    <div class=\"table-th\">付费金额</div>\n" +
        "    <div class=\"table-th\">可用条数</div>\n" +
        "    <div class=\"table-th\">启用日期</div>\n" +
        "    <div class=\"table-th\">操作</div>\n" +
        " </div>");
    $.getJSON(url,function (data) {
        data = data.datas==null?'':data.datas;
        if(data!=""){
            $.each(data,function (i,value) {
                var modType = value.MOD_TYPE==1?'1-普通':'2-特许';
                var visitRole = value.VISIT_ROLE==1?'可用':'不可用';
                var registRole = value.modType==1?'可用':'不可用';
                var serverCost =value.SERVER_COST==null?'':value.SERVER_COST+'元';
                var serverNum = value.SERVER_NUM==null?'':value.SERVER_NUM+'条';
                var startDate = value.START_DATE==null?'':value.START_DATE;
                if(value.SERVER_COST==null) {
                    $('.table1').append("<div class=\"table-tr\">\n" +
                        "     <div class=\"table-td\">"+value.BELONG_WEB+"</div>\n" +
                        "     <div class=\"table-td modId\">"+value.MOD_ID+"</div>\n" +
                        "     <div class=\"table-td\">"+value.MOD_NAME+"</div>\n" +
                        "     <div class=\"table-td\">"+modType+"</div>\n" +
                        "     <div class=\"table-td\">"+visitRole+"</div>\n" +
                        "     <div class=\"table-td\">"+registRole+"</div>\n" +
                        "     <div class=\"table-td\">"+serverCost+"</div>\n" +
                        "     <div class=\"table-td\">"+serverNum+"</div>\n" +
                        "     <div class=\"table-td\">"+startDate+"</div>\n" +
                        "     <div class=\"table-td\"><a class='editList'>修改</a>|<a class='delList'>删除</a></div>\n" +
                        "   </div>"
                    );
                }else{
                    $('.table1').append("<div class=\"table-tr\">\n" +
                        "    <div class=\"table-td\">"+value.BELONG_WEB+"</div>\n" +
                        "    <div class=\"table-td warn modId\">"+value.MOD_ID+"</div>\n" +
                        "    <div class=\"table-td warn\">"+value.MOD_NAME+"</div>\n" +
                        "    <div class=\"table-td\">"+modType+"</div>\n" +
                        "    <div class=\"table-td warn\">"+visitRole+"</div>\n" +
                        "    <div class=\"table-td warn\">"+registRole+"</div>\n" +
                        "    <div class=\"table-td warn\">"+serverCost+"</div>\n" +
                        "    <div class=\"table-td warn\">"+serverNum+"</div>\n" +
                        "    <div class=\"table-td warn\">"+startDate+"</div>\n" +
                        "     <div class=\"table-td\"><a class='editList'>修改</a>|<a class='delList'>删除</a></div>\n" +
                        " </div>"
                    );
                }
            });
        }else{
            layer.msg("没有加载到有用数据!")
        }
    }).error(function () {
        layer.closeAll();
        layer.msg("加载数据错误!")
    }).complete(function () {
        layer.closeAll();
        $('.editList').click(function () {
            $('#myModal').modal('show');

        });
        $('.codebtn').click(function () {
            $('#myModal').modal('show');
        });
        $('.delList').click(function () {
            var modId = $(this).parent().parent().find('.modId').text();
            var url =api+'delModel?modId='+encodeURI(modId);
            $.getJSON(url,function (data) {
                layer.msg(data.info);
            });
            $(this).parent().parent().remove();
        });
    });
}

function initTable1() {
    var url = api+'userManageInfo2';
    layer.load();
    $('.table1').empty();
    $('.table1').append("<div class=\"table-tr tablech1\">\n" +
        "    <div class=\"table-th table-th3\">页面模块</div>\n" +
        "    <div class=\"table-th\">功能ID</div>\n" +
        "    <div class=\"table-th\">功能名称</div>\n" +
        "    <div class=\"table-th\">权限类别</div>\n" +
        "    <div class=\"table-th\">游客是否可用</div>\n" +
        "    <div class=\"table-th\">注册是否可用</div>\n" +
        "    <div class=\"table-th\">付费金额</div>\n" +
        "    <div class=\"table-th\">可用条数</div>\n" +
        "    <div class=\"table-th\">启用日期</div>\n" +
        " </div>");
    $.getJSON(url,function (data) {
        data = data.datas==null?'':data.datas;
        if(data!=""){
            $.each(data,function (i,value) {
                var modType = value.MOD_TYPE==1?'1-普通':'2-特许';
                var visitRole = value.VISIT_ROLE==1?'可用':'不可用';
                var registRole = value.modType==1?'可用':'不可用';
                var serverCost =value.SERVER_COST==null?'':value.SERVER_COST+'元';
                var serverNum = value.SERVER_NUM==null?'':value.SERVER_NUM+'条';
                var startDate = value.START_DATE==null?'':value.START_DATE;
                if(value.SERVER_COST==null) {
                    $('.table1').append("<div class=\"table-tr\">\n" +
                        "     <div class=\"table-td\">"+value.BELONG_WEB+"</div>\n" +
                        "     <div class=\"table-td\">"+value.MOD_ID+"</div>\n" +
                        "     <div class=\"table-td\">"+value.MOD_NAME+"</div>\n" +
                        "     <div class=\"table-td\">"+modType+"</div>\n" +
                        "     <div class=\"table-td\">"+visitRole+"</div>\n" +
                        "     <div class=\"table-td\">"+registRole+"</div>\n" +
                        "     <div class=\"table-td\">"+serverCost+"</div>\n" +
                        "     <div class=\"table-td\">"+serverNum+"</div>\n" +
                        "     <div class=\"table-td\">"+startDate+"</div>\n" +
                        "   </div>"
                    );
                }else{
                    $('.table1').append("<div class=\"table-tr\">\n" +
                        "    <div class=\"table-td\">"+value.BELONG_WEB+"</div>\n" +
                        "    <div class=\"table-td warn\">"+value.MOD_ID+"</div>\n" +
                        "    <div class=\"table-td warn\">"+value.MOD_NAME+"</div>\n" +
                        "    <div class=\"table-td\">"+modType+"</div>\n" +
                        "    <div class=\"table-td warn\">"+visitRole+"</div>\n" +
                        "    <div class=\"table-td warn\">"+registRole+"</div>\n" +
                        "    <div class=\"table-td warn\">"+serverCost+"</div>\n" +
                        "    <div class=\"table-td warn\">"+serverNum+"</div>\n" +
                        "    <div class=\"table-td warn\">"+startDate+"</div>\n" +
                        " </div>"
                    );
                }
            });
        }else{
            layer.msg("没有加载到有用数据!")
        }
    }).error(function () {
        layer.closeAll();
        layer.msg("加载数据错误!")
    }).complete(function () {
        layer.closeAll();
    });
}
function initBunding() {
    $('.userManage .tab-nav li').click(function () {
        $(this).addClass('cur').siblings('li').removeClass('cur');
        var liindex=$(this).index();
        if(liindex==0){
            initTable()
        }else{
            initTable1()
        }
        var tabcontent=$('.tab-content .group');
        $(tabcontent[liindex]).show().siblings('.group').hide();
    });
}