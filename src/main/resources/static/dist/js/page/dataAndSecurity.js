var userId = null;
api = api+"dataAndSecurity/";
$(function () {
    var username = $('#userName').text();
    $('.last').text(username);
    initUserInfo(username);
});

function initUserInfo(username) {
    initDatas();

    function initDatas() {
        var url = api+'getUserInfo?userName='+encodeURI(username);
        $.getJSON(url,function (data) {
            data=data.datas[0]==null?'':data.datas[0];
            if(data!=''){
                userId = data.USER_ID;
                $('#loginName').text(data.LOGIN_NAME);
                $('#user_Name').text(data.USER_NAME);
                $('#userName').text(data.USER_NAME);
                if(data.USER_SEX=='男'){
                    $('#userSex').find('input').eq(0).click();
                }else{
                    $('#userSex').find('input').eq(1).click();
                }
                $('#userTel').text(change(data.USER_TEL));
                $('#userQQ').text(change(data.USER_QQ));
                $('#userBar').text(change2(data.USER_BAR));
                $('#userMail').text(change2(data.USER_MAIL));
                $('#userZFB').text(change(data.USER_ZFB));
                $('#userWeixin').text(change(data.USER_WEIXIN));
                $('#userSFZ').text(change(data.USER_SFZ));
            }else{
                layer.msg("加载用户信息错误!")
            }
        }).error(function () {
            layer.msg("加载用户信息错误!")
        }).complete(function () {
            initEdit();
        });
    }
    function change(str) {
        if(str==""){
            return "--";
        }else {
            if (str.indexOf('@') > -1) {
                var str1 = str.substring(0, 2);
                var str2 = str.substring(5, str.length);
                return str1 + "***" + str2;
            } else {
                var str1 = str.substring(0, 3);
                var str2 = str.substring(6, str.length);
                return str1 + "***" + str2;
            }
        }
    }

    function change2(str) {
        if(str==""){
            return "--";
        }else{
            var str1 = str.substring(0,2);
            var str2 = str.substring(5,str.length);
            return str1+"***"+str2;
            return
        }
    }
    
    function initEdit() {
        /**
         * type:
         *      1:昵称修改
         *      2：性别修改
         *      3：密码修改
         *      4：手机号码修改
         *      5：qq号修改
         *      6：百度贴吧号修改
         *      7：邮箱修改
         *      8：支付宝修改
         *      9：微信号修改
         *      10：身份证修改
         */
        $('#sureBtn').unbind('click');
        $('#sureBtn').click(function () {
            var title = $(this).parent().parent().find('.inputtitle').text();
            var url = null;
            if(title.indexOf("修改昵称")>-1){
                var newValue = $(this).parent().parent().find(".pop01").find('input').val();
                url = api+"editInfo?type=1&newValue="+encodeURI(newValue)+"&userId="+encodeURI(userId);
            }else if(title.indexOf("手机号码")>-1){
                var newValue = $(this).parent().parent().find(".pop02").find('tr').eq(2).find('td').eq(1).find('input').val();
                url = api+"editInfo?type=4&newValue="+encodeURI(newValue)+"&userId="+encodeURI(userId);
            }else if(title.indexOf("QQ号码")>-1){
                var newValue = $(this).parent().parent().find(".pop01").find('input').val();
                url = api+"editInfo?type=5&newValue="+encodeURI(newValue)+"&userId="+encodeURI(userId);
            }else if(title.indexOf("贴吧账号")>-1){
                var newValue = $(this).parent().parent().find(".pop01").find('input').val();
                url = api+"editInfo?type=6&newValue="+encodeURI(newValue)+"&userId="+encodeURI(userId);
            }else if(title.indexOf("邮箱")>-1){
                var newValue = $(this).parent().parent().find(".pop01").find('input').val();
                url = api+"editInfo?type=7&newValue="+encodeURI(newValue)+"&userId="+encodeURI(userId);
            }else if(title.indexOf("支付宝")>-1){
                var newValue = $(this).parent().parent().find(".pop01").find('input').val();
                url = api+"editInfo?type=8&newValue="+encodeURI(newValue)+"&userId="+encodeURI(userId);
            }else if(title.indexOf("微信")>-1){
                var newValue = $(this).parent().parent().find(".pop01").find('input').val();
                url = api+"editInfo?type=9&newValue="+encodeURI(newValue)+"&userId="+encodeURI(userId);
            }else if(title.indexOf("身份证")>-1){
                var newValue = $(this).parent().parent().find(".pop01").find('input').val();
                url = api+"editInfo?type=10&newValue="+encodeURI(newValue)+"&userId="+encodeURI(userId);
            }
            $('#myModal').modal('hide');
            editRequest(url);
        });

        $('#userSex').unbind('click');
        $('#userSex').change(function () {
            var newValue = $(this).find('input:radio:checked').val();
            url = api+"editInfo?type=2&newValue="+encodeURI(newValue)+"&userId="+encodeURI(userId);
            editRequest(url);
        });

        $('.sureSubmit').unbind('click');
        $('.sureSubmit').click(function () {
            var newValue = $('#newPassword').val();
            url = api+"editInfo?type=3&newValue="+encodeURI(newValue)+"&userId="+encodeURI(userId);
            editRequest(url);
        });
        function editRequest(url) {
            var info = null;
            $.getJSON(url,function (data) {
                info = data.info;
                initDatas();
            }).error(function () {
                layer.msg("修改失败")
            }).complete(function () {
                layer.msg(info);
            });
        }
    }
}