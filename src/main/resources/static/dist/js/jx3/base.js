// JavaScript Document
$(document).ready(function(e) {
    //当内容过少时，底部对齐
	function changeheight(){
		if(window.location.href.indexOf("/index.html")>-1){
		}else{
			var height=document.documentElement.clientHeight;
            var loginheight = null;
			if(document.getElementById('mcon')!=null) {
                loginheight = document.getElementById('mcon').clientHeight + 388;
                var loginID=document.getElementById('maincontent');
                // if(loginheight<height){
                //     loginID.style.height=(height-300)+"px";
                // }
            }
		}
	};
	//浏览器窗口重置
	$(window).resize(function(){
		changeheight();
	});
	changeheight();
	$('.icon-save').click(function(){
		$(this).toggleClass('cur')
		//if($(this).hasClass('cur')){
			//return;
		//}else{
			//$(this).addClass('cur')
		//}
	})
	//页面跳转
	$('.navCon .nav a').click(function(){
		var listindex=$('.navCon .nav a').index(this);
		switch (listindex){
			case 0:
				window.location.href="index.html";
				return;
			case 1:
				window.location.href="accountList.html";
				return;
			case 2:
				window.location.href="appearanceSale.html";
				return;
			case 3:
				window.location.href="propSale.html";
				return;
			case 4:
				window.location.href="goldExchangeList.html";
				return;
			case 5:
				window.location.href="levelingList.html";
				return;
			case 6:
				window.location.href="blackList.html";
				return;
			case 7:
				window.location.href="userCenter/dataAndSecurity.html";
				return;
		}
	})
	$('.table-td').click(function(){
		//window.open('accountDetail.html')
	})
	$(".tops .icon0").click(function(){
		if($(this).attr("class").indexOf('cur')>-1){
			$(".icon0").removeClass('cur')
		}else{
			$(".icon0").addClass('cur')
		}
	})
	$(".classifiedList3 .icon0").click(function(){
		if($(this).attr("class").indexOf('cur')>-1){
			$(this).removeClass('cur')
		}else{
			$(this).addClass('cur')
		}
	})
	$(".conlist .icon0").click(function(){
		if($(this).attr("class").indexOf('cur')>-1){
			$(this).removeClass('cur')
		}else{
			$(this).addClass('cur')
		}
	})
	
	
});