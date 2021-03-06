(function($) {

    /**
     * 按比例缩放图片
     * @param ImgD 
     * @param FitWidth
     * @param FitHeight
     */
    $.scaleImage = function(ImgD,FitWidth,FitHeight){

    	
	   var image=new Image();	   
	   image.src= $(ImgD).attr('src');
	   if(image.width>0 && image.height>0){
	       if(image.width/image.height>= FitWidth/FitHeight){
	           if(image.width>FitWidth){
	               $(ImgD).width(FitWidth);
	               $(ImgD).height((image.height*FitWidth)/image.width);
	           }else{
	               $(ImgD).width(image.width);
	               $(ImgD).height(image.height);
	           }
	       } else {
	           if(image.height>FitHeight) {
	               $(ImgD).height(FitHeight);
	               $(ImgD).width((image.width*FitHeight)/image.height);
	           } else {
	               $(ImgD).width(image.width);
	               $(ImgD).height(image.height);
	           }
	       }
	   }
	   image=null;
	}
})(jQuery);