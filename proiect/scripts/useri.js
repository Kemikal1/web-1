$(document).ready(function(){

  var sem;
  $.get("/username",function(res){

  if(res=="admin")
    sem=1;
  else
  {
    sem=0;
	$(".useri-text2").html("Users");
  }

  });

  $.get("/useri-si-pass",function(res){

    for (i =0;i<res.user.length;i++)
      {
        if (sem==1)
        {
          var $user=$("<div/>")
                                .addClass("useri-text useri-text1")
                                .html(res.user[i]+" "+res.pass[i]);
        }
        else
        {
          var $user=$("<div/>")
                                .addClass("useri-text useri-text1 useri-text3")
                                .html(res.user[i]);

        }
        var $x_but=$("<div/>").attr({
                                      id:res.user[i]

                                      })
                                      .addClass("x-but")
                                      .html(" X");


        var $cont=$("<div/>").addClass("container");
        $cont.append($user);


        if(sem==1)
        {
			
			
			$cont.append($x_but);
			$('.container').delegate(".x-but","click",function(){
				var but_id=$(this).attr("id");
			
			
			$.post("/sterge-user",{username:but_id},function(){return 0;});
            location.reload(true);
			});
			$("form").css("visibility","visible");

        }
        $(".useri").append($cont);




      }
	  $('.container').delegate(".x-but","click",function(){
			var but_id=$(this).attr("id");
			$.post("/sterge-user",{username:but_id},function(){return 0;});
            location.reload(true);
		});

  });





/*

  $.get("/check-user",function(sem){
    semm=sem;
		if (sem=="da")
		{

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

*/


















});
