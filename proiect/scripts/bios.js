$(document).ready(function(){

var hoverbio=$("#hover1")[0];
$(".membri .membru").mouseenter(function(){
	//alert(2323);
	
	hoverbio.pause();
	hoverbio.currentTime=0;
    
	hoverbio.play();
	hoverbio.addEventListener('ended',function(){
	this.currentTime=0;
	this.play();
	
});
});

$(".membri .membru").mouseleave(function(){
	hoverbio.pause();
	hoverbio.currentTime=0;

});


var i;
for (i=0;i<4;i++)
{
	
	$(".membri .membru").eq(i).mouseenter(function(){
		var s=$(".cercuri  .holder");
		var i=$(".membri .membru").index(this);
		var t=$(".membri .membru");
		var holder=$('.holder').get();
		
		s.eq(i).addClass("hold-anim");
		//h=holder[i].children("div");
		$("> div",holder[i]).addClass('cercanim');
	});
	$(".membri .membru").eq(i).mouseleave(function(){
	  var s=$(".cercuri  .holder");
	  var i=$(".membri .membru").index(this);
	  var holder=$('.holder').get();
	  $("> div",holder[i]).removeClass('cercanim');
	  
	   s.eq(i).removeClass("hold-anim");
	});
	
	if(i==0)
	{
		$(".membri .membru").eq(i).click(function(){
			window.location.href="Bill.html";
		});
	}
	if(i==1)
	{
		$(".membri .membru").eq(i).click(function(){
			window.location.href="Jeremy.html";
		});
	}
	if(i==2)
	{
		$(".membri .membru").eq(i).click(function(){
			window.location.href="Jared.html";
		});
	}
	if(i==3)
	{
		$(".membri .membru").eq(i).click(function(){
			window.location.href="Jason.html";
		});
	}
	
}





/*
$(".membri .membru:nth-child(1)").mouseenter(function(){
	$('#c1 .cerc').addClass('cercanim');
	$("#c1").addClass("h-anim");
s});
$('.membri .membru:nth-child(1)').mouseleave(function(){
	$('#c1 .cerc').removeClass('cercanim');
	
});



$(".membri .membru:nth-child(2)").mouseenter(function(){
	$('#c2 .cerc').addClass('cercanim');
s});
$('.membri .membru:nth-child(2):nth-child(2)').mouseleave(function(){
	$('#c2 .cerc').removeClass('cercanim');
	
});

$(".membri .membru:nth-child(3)").mouseenter(function(){
	$('#c3 .cerc').addClass('cercanim');
s});
$('.membri .membru:nth-child(3)').mouseleave(function(){
	$('#c3 .cerc').removeClass('cercanim');
	
});




$(".membri .membru:nth-child(4)").mouseenter(function(){
	$('#c4 .cerc').addClass('cercanim');
s});
$('.membri .membru:nth-child(4)').mouseleave(function(){
	$('#c4 .cerc').removeClass('cercanim');
	
});
*/


});