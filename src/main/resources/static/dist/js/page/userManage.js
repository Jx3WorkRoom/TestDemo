var api = api+'userManage/';
var modIdArr = [];
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
                modIdArr.push(value.MOD_ID);
                var modType = value.MOD_TYPE==1?'1-普通':'2-特许';
                var visitRole = value.VISIT_ROLE==1?'可用':'不可用';
                var registRole = value.REGIST_ROLE==1?'可用':'不可用';
                var serverCost =value.SERVER_COST==null?'':value.SERVER_COST+'元';
                var serverNum = value.SERVER_NUM==null?'':value.SERVER_NUM+'条';
                var startDate = value.START_DATE==null?'':value.START_DATE;
                startDate = timeStamp2String(startDate);
                function timeStamp2String (time){
                    if(time!="") {
                        var datetime = new Date();
                        datetime.setTime(time);
                        var year = datetime.getFullYear();
                        var month = datetime.getMonth() + 1;
                        var date = datetime.getDate();
                        var hour = datetime.getHours();
                        var min = datetime.getMinutes();
                        if (parseInt(month) < 10) {
                            month = '0' + month;
                        }
                        if (parseInt(date) < 10) {
                            date = '0' + date;
                        }
                        if (parseInt(hour) < 10) {
                            hour = '0' + hour;
                        }
                        if (parseInt(min) < 10) {
                            min = '0' + min;
                        }
                        return year + "-" + month + "-" + date + ' ' + hour + ":" + min;
                    }else{
                        return "";
                    }
                };
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
            $('.modal-title').text('修改权限');
            var BELONG_WEB = $(this).parent().parent().find('div').eq(0).text();
            var MOD_ID = $(this).parent().parent().find('div').eq(1).text();
            var MOD_NAME = $(this).parent().parent().find('div').eq(2).text();
            var modType = $(this).parent().parent().find('div').eq(3).text();
            var visitRole = $(this).parent().parent().find('div').eq(4).text();
            var registRole = $(this).parent().parent().find('div').eq(5).text();
            var serverCost = $(this).parent().parent().find('div').eq(6).text();
            var serverNum = $(this).parent().parent().find('div').eq(7).text();
            $('#BELONG_WEB').val(BELONG_WEB);
            $('#MOD_ID').val(MOD_ID);
            $('#MOD_NAME').val(MOD_NAME);
            if(modType=='1-普通') {
                $('input[name="modType"]:eq(0)').attr("checked",'checked');
            }else{
                $('input[name="modType"]:eq(1)').attr("checked",'checked');
            }
            if(visitRole=='可用') {
                $('input[name="visitRole"]:eq(0)').attr("checked",'checked');
            }else{
                $('input[name="visitRole"]:eq(1)').attr("checked",'checked');
            }
            if(registRole=='可用') {
                $('input[name="registRole"]:eq(0)').attr("checked",'checked');
            }else{
                $('input[name="registRole"]:eq(1)').attr("checked",'checked');
            }
            $('#serverCost').val(serverCost.replace("元",""));
            $('#serverNum').val(serverNum.replace("条",""));
        });
        $('.codebtn').click(function () {
            $('#BELONG_WEB').val("");
            $('#MOD_ID').val("");
            $('#MOD_NAME').val("");
            $('input[name="modType"]:radio:checked').val();
            $('input[name="visitRole"]:radio:checked').val();
            $('input[name="registRole"]:radio:checked').val();
            $('#serverCost').val("");
            $('#serverNum').val("");
            $('#myModal').modal('show');
            $('.modal-title').text('新增权限');
            $('#MOD_ID').unbind('blur');
            $('#MOD_ID').blur(function () {
                var MOD_ID = $('#MOD_ID').val();
                if(modIdArr.indexOf(parseInt(MOD_ID))>-1){
                    $('#MOD_ID').val("");
                    layer.msg("功能ID已存在,请从新输入!");
                }
            });
        });
        $('.delList').click(function () {
            var modId = $(this).parent().parent().find('.modId').text();
            var url =api+'delModel?modId='+encodeURI(modId);
            $.getJSON(url,function (data) {
                layer.msg(data.info);
            });
            $(this).parent().parent().remove();
        });
        $('#sureBtn').click(function () {
            var BELONG_WEB = $('#BELONG_WEB').val();
            var MOD_ID = $('#MOD_ID').val();
            var MOD_NAME = $('#MOD_NAME').val();
            var modType = $('input[name="modType"]:radio:checked').val();
            var visitRole = $('input[name="visitRole"]:radio:checked').val();
            var registRole = $('input[name="registRole"]:radio:checked').val();
            var serverCost = $('#serverCost').val();
            var serverNum = $('#serverNum').val();
            if(BELONG_WEB!=""&&MOD_ID!=""&&MOD_NAME!=""&&modType!=""&&visitRole!=""&&registRole!="") {
                if($('.modal-title').text().indexOf('新增')>-1) {
                    var url = api + 'addMod?BELONG_WEB=' + encodeURI(BELONG_WEB) +
                        '&modId=' + encodeURI(MOD_ID) +
                        '&MOD_NAME=' + encodeURI(MOD_NAME) +
                        '&modType=' + encodeURI(modType) +
                        '&visitRole=' + encodeURI(visitRole) +
                        '&registRole=' + encodeURI(registRole) +
                        '&serverCost=' + encodeURI(serverCost) +
                        '&serverNum=' + encodeURI(serverNum);
                    $.getJSON(url, function (data) {
                        $('#myModal').modal('hide');
                        layer.msg(data.info);
                    }).complete(function () {
                        initTable();
                    });
                }else{
                    var url = api + 'editMod?BELONG_WEB=' + encodeURI(BELONG_WEB) +
                        '&modId=' + encodeURI(MOD_ID) +
                        '&MOD_NAME=' + encodeURI(MOD_NAME) +
                        '&modType=' + encodeURI(modType) +
                        '&visitRole=' + encodeURI(visitRole) +
                        '&registRole=' + encodeURI(registRole) +
                        '&serverCost=' + encodeURI(serverCost) +
                        '&serverNum=' + encodeURI(serverNum);
                    $.getJSON(url, function (data) {
                        $('#myModal').modal('hide');
                        layer.msg(data.info);
                    }).complete(function () {
                        initTable();
                    });
                }
            }else{
                layer.msg("页面模块名或功能ID或功能名称或权限类别或游客是否可用或注册是否可以不能为空!")
            }
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