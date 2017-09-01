api = api+"register/";
$(function () {
    initBunding();
});

function initBunding() {
    $('input').blur(function () {
        if($(this).is('#loginName')){
            if( this.value=="" || this.value.length < 6){
                layer.msg("账号格式不对!");
            }
        }
        if($(this).is('#userName')){
            if( this.value=="" || this.value.length < 4||this.value.length>16){
                layer.msg("昵称格式不对!");
            }
        }
        if($(this).is('#loginWord')){
            if( this.value=="" || this.value.length < 4||this.value.length>16){
                layer.msg("密码格式不对!");
            }
        }
        if($(this).is('#loginWordSure')){
            if( this.value=="" || this.value.length < 4||this.value.length>16){
                layer.msg("确认密码格式不对!");
            }else{
                if(this.value!=$('#loginWord').val()){
                    layer.msg("两次输入的密码不匹配,请从新输入!")
                }
            }
        }
        if($(this).is('#tel')){
            if(this.value.length !=11){
                layer.msg("手机号应为11位数字!");
            }
        }
    });
    $('#addUser').click(function () {
        var loginName = $('#loginName').val();
        var userName = $('#userName').val();
        var loginWord = $('#loginWord').val();
        var tel = $('#tel').val();
        var url = api+'addUser?loginName='+encodeURI(loginName)+
                      '&userName='+encodeURI(userName)+
                      '&loginWord='+encodeURI(loginWord)+
                      '&tel='+encodeURI(tel);
        var  flag = 0;
        $.getJSON(url,function (data) {
            layer.msg(data.info);
            if(data.info.indexOf("用户")==-1){
                flag++;
            }
        }).complete(function () {
            if(flag>0) {
                history.go(-2);
            }
        });
    });
}