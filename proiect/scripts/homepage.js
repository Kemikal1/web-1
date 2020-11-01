$(document).ready(function(){



var nume=prompt("Cum te numesti?","nume");

if (nume==null)
{

  alert("Ai inchis promtul");
}
else
{
  document.previousTitle=document.title;
  document.title = "Salut,"+nume+"!";
  setTimeout(function(){ document.title=document.previousTitle; }, 2000);
}



});
