



$(document).ready(function(){



var intro=$("#intro")[0];
var hover1=$("#hover")[0];
var video =$('.video');
video.muted=false;
$('video').prop('muted',false);
$("#home").click();
$('#home').trigger("click");


var pagini=$("#nav a");

var path = window.location.pathname;
var pagina = path.split("/").pop();
for (i=0;i<pagini.length;i++)
{
  var nume_men=pagini[i].href;
  nume_men=nume_men.split("/").pop();
  if(nume_men==pagina)
    $(pagini[i]).addClass("curent");


}



var session;
$.get("/username",function(username){
	var $logged=$("<div/>")
                          .addClass("logged bio-logged");
	
	var $mute=$("<div/>")
						.addClass("log-button mute")
						.html("Mute")

	var $log_button=$("<a/>")
                            .attr("href","logout")
                            .addClass("log-button")
                            .html("Logout");
	var $div=$("<div/>").html("Logged in<br> as "+username);
	var $useri=$("<a/>")
                      .attr("href","useri")
                      .addClass("log-button")
                      .html("Users");

	$("#nav").after($logged);
	$($log_button).appendTo(".logged");
	$($div).appendTo(".logged");
	if(username!="Guest")
		$($useri).appendTo(".logged");
	
	$($mute).appendTo(".logged");
	
	
	$('.logged').delegate(".mute","click",function(){
		
			if($(this).html()=="Mute"){
				$(this).html("Unmute");
				$('audio').prop("muted", true);
			}
			else{
				$(this).html("Mute");
				$('audio').prop("muted", false);
			}
			var mute=$(this).html();
			$.get("/mute-change",function(){return 0;})
			
		});

$("#nav a").mouseenter(function(){

	hover1.pause();
	hover1.currentTime=0;
	hover1.play();
});
$.get("/mute",function(res){
		$(".mute").html(res);
		if(res=="Mute")
			$('audio').prop("muted", false);
		else
			$('audio').prop("muted", true);
			
	});

});

/*
$.get("/check",function(s){

		window.location.href="login.html";
});
*/
});
