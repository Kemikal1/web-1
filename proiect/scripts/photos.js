$(document).ready(function(){
    var photo_numbers=0;
    $('.column img').click(function(){
      var sr=$(this).attr("src");
      var im=new Image();

      var iheight;
        var iwidth;

      im.onload=function(){

      iheight=im.height+50;
      iwidth=im.width+50;
        window.open(sr,"_blank","width="+iwidth+",height="+iheight);
      }
      im.src=sr;
      return 0;
    });
  var but_sem=0;
  $('.button-img').click(function(){
    if(but_sem==0)
    {

      $('img').css("visibility","hidden");
      but_sem=1;
      $('.button-img').html("Arata imagini");
    }
    else
    {
      $('img').css("visibility","visible");
      but_sem=0;
      $('.button-img').html("Ascunde imagini");
    }

  });
   var semm;










  $.get("/check-user",function(sem){
    semm=sem;
		if (sem=="da")
		{
      $(".button-img").css("margin-top","10px");

      var $form=$("<form/>")
            .attr({
              method:"POST",
              encType:"multipart/form-data"
            });

			var $but=$("<div/>")
			      .addClass("buton")
						.html("Selecteaza imagini");

			var $fisiere=$("<input/>")
						.attr({
							type:"file",
							name:"photos",
							multiple:"true"
						})
						.addClass("fisiere");
			var $submit=$("<input/>")
						.attr({
							type:"submit",
							value:"Adauga",
							formaction:"/new-pic"
						})
						.addClass("submit");

			$(".logged").after($form);
      $("form").append($but);
			$(".buton").after($submit);
			$(".buton").after($fisiere);
      console.log(123);
		}
    else{
     $(".colaj").addClass("colaj1");
    }


	});
	$('body').delegate(".buton","click",function(){
		$(".fisiere").click();
		return 0
  console.log(2);
	});

  $.get("/photos-number",function(photos_nr){

   photo_numbers=photos_nr;
  columns=$(".row");
  len=columns.children().length;
  console.log(photos_nr);

  while(photo_numbers>0){
  index_min=0;
  min=99999;

  for (i=0;i<4;i++)
  {
    len=$(columns.children()[i]).children().length;
    if(len<min)
    {
      min=len;
      index_min=i;
    }
  }
  var photo_url="uploads/"+photo_numbers+".jpg";
  var $image=$("<img/>").attr({
              src:photo_url,
              width:"100%"
              })
              .addClass("imag");
  var $wrap=$("<div/>").attr({
              width:"100%",
              display:"inline-block",
              position:"relative"
              })
              .addClass("img-wrap");

  var $x_but=$("<div/>").attr({
              id:photo_numbers

              })
              .addClass("x-but")
              .html(" X");
  $(columns.children()[index_min]).append($wrap);
  $($wrap).append($image);

  if(semm=="da"){
  $($wrap).append($x_but);
  $($wrap).delegate(".x-but","click",function(){
    var but_id=$(this).attr("id");
    console.log($(this).attr("id"));
    $.post("/delete-pic",{id:but_id},function(){return 0;});
    location.reload(true);
  });
  }


  photo_numbers-=1;

  }

   if(photos_nr>0){
   $('.column').delegate(".img-wrap",'mouseenter mouseleave',function(event){

    if(event.type=='mouseenter'){
     $($(this).children(".x-but"))
              .css("visibility","visible");
    }
    if(event.type=='mouseleave')
    {
 $($(this).children(".x-but"))
              .css("visibility","hidden ");

    }
  });
   }



  });



});
