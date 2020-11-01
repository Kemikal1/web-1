const express = require('express');
const app = express();
const port = 3000;
const bodyPar=require('body-parser');
const session = require('express-session');
const path=require('path');
const nocache=require('nocache');
const fileu=require('express-fileupload');
const cors=require('cors');
const _=require('lodash');
const fs =require('fs');


app.use(express.static('proiect'));
app.use(express.static('proiect/scripts'));
app.use(express.static('proiect/css'));
app.use(bodyPar.urlencoded({extended : true}));
app.use(bodyPar.json());
app.use(session({secret:'secret',saveUninitialized:true,resave:true}));
app.use(nocache());
app.use(fileu());
app.use(cors());
app.use(express.static('uploads'));

//var user=["Jared","Bill","Jason","Jeremy"];
var pass=[];
var sess;
var s=0;
var num_poze=0;
var useri=[];


fs.readdir('./uploads',function(err,files){
    num_poze=files.length;
    console.log("numar poze:"+num_poze);
});


app.get('/',function(req,res,next){

	res.redirect('/login');

});


app.get('/:page',function(req,res,next){

   if(req.params.page!="username"){
	if(s)
		next();
	if(s==0)
		res.redirect("login.html");
   }
   else
	   next();
});



app.get('/login',function(req,res){
	var i=0;
	sess=req.session;
	sess.sem=0;
	var username=req.body.username;
	var pass1=req.body.password;
	var but=req.body.value;
	s=0;
	sess.username=username;
  useri2();
  pass2();
  console.log(username+pass1);
	for(i=0;i<useri.length;i++)
	{
    console.log(useri[i]+pass[i]);

		if(username==useri[i])
		{
			  s=s+1;
        if(pass1==pass[i])
          s+=1;
        break;

	  }


	}



	if(s==2)
		res.redirect('/homepage');
	else
		res.redirect('login-error.html');

	res.end();
});


app.post('/new-pic',function(req,res){
  if(!req.files)
  {
    console.log(req.files);

  }
  else{
    if(Object.keys(req.files).length>1){
     _.forEach(_.keysIn(req.files.photos), (key) => {
      let photo = req.files.photos[key];

      //move photo to uploads directory

      console.log(req.files.photos[key]);
      num_poze+=Object.keys(req.files).length;
      photo.mv('./uploads/'+key+'.jpg');

    });
    }
    else
    {
      num_poze+=1;
      console.log("da");
      let photo =req.files.photos;
      photo.mv('./uploads/'+num_poze+'.jpg');
    }
  }
  res.redirect('/photos')
});
app.post('/delete-pic',function(req,res){
  var id=req.body.id;
  console.log(id);
  num_poze-=1;
  fs.unlinkSync("./uploads/"+id+'.jpg');
  res.redirect('/homepage');
});
app.post('/send-photo',function(req,res){
 // res.sendFile();
});
app.get('/photos-number',function(req,res){
  res.send(num_poze+'');
  res.end();
});
app.get('/check-user',function(req,res){

	if(sess.username=="Guest")
		res.send("nah");
	else
		res.send("da");

});
app.get('/history',function(req,res){

	res.sendFile(path.join(__dirname,'/proiect/history.html'));

});
app.get('/photos',function(req,res){

	res.sendFile(path.join(__dirname,'/proiect/photos.html'));

});
app.get('/tour_dates',function(req,res){



	   res.sendFile(path.join(__dirname,'/proiect/tour_dates.html'));

});
app.get('/homepage',function(req,res){
	   sess=req.session;
	    if(s!=2)
		{
			res.redirect('login.html');
            res.end();
		}
		sess.sem+=1;
		res.sendFile(path.join(__dirname,'/proiect/homepage.html'));


});
app.get('/bios',function(req,res){

		res.sendFile(path.join(__dirname,'/proiect/bios.html'));


});


app.post('/guest',function(req,res){
	sess=req.session;
	sess.username="Guest";
	s=2;
	res.redirect('/homepage');
});


app.get('/logout',function(req,res){
	req.session.destroy(function(){
	   res.redirect('login.html');
	   s=0;
	});

});





function useri2(){
   var useri1=[];
   var data = fs.readFileSync('useri.txt',
            {encoding:'utf8', flag:'r'});


    for (i=0;i<data.length;i++)
    {

     if( data[i]!="\n")
     {
       //console.log(data[i]);
       useri1.push(data[i]);

     }
     //console.log(useri[useri.length-1]);
    }
    var str="";

    for (i =0;i<useri1.length;i++)
    {

      if(useri1[i]=="\r")
      {
        //console.log(str);
        useri.push(str);
        str="";
      }
      else{
        str+=useri1[i];
      }

    }
    useri.push(str);

    //console.log(useri[0]);


}


function pass2(){

  var pass1=[];


  data = fs.readFileSync('parole.txt',
            {encoding:'utf8', flag:'r'});

    for (i=0;i<data.length;i++)
    {

     if( data[i]!="\n")
     {

       pass1.push(data[i]);

     }
    }
    var str="";

    for (i =0;i<pass1.length;i++)
    {

      if(pass1[i]=="\r")
      {

        pass.push(str);
        str="";
      }
      else{
        str+=pass1[i];
      }

    }
    pass.push(str);
    //console.log(pass[0]);



}

app.post('/sterge-user',function(req,res){

  var user_str=useri[0];
  var pass_str=pass[0];
  var s=0;
  for (i=1;i<useri.length;i++)
  {
    if(useri[i]==req.body.username)
    {
     s=1;
    }
    else{
    user_str+="\r"+useri[i]
    pass_str+="\r"+pass[i];
    }

  }
  fs.writeFileSync('useri.txt',user_str);
  fs.writeFileSync('parole.txt',pass_str);
  res.redirect('/useri');
});

app.post('/adauga-user',function(req,res){

  var s=1;
  console.log(2);
  var user_str="";
  var pass_str="";
  for (i=0;i<useri.length;i++)
  {

    if(useri[i]==req.body.username)
    {

      s=0;
      pass[i]=req.body.parola;
      break;
    }
    user_str+=useri[i]+"\r";
    pass_str+=pass[i]+"\r";
  }


  if (s==1)
  {
    user_str+=req.body.username;
    pass_str+=req.body.parola;
    fs.writeFileSync('useri.txt',user_str);
    fs.writeFileSync('parole.txt',pass_str);

  }

  res.redirect('/useri');
});

app.get('/useri-si-pass',function(req,res){

  useri=[];
  pass=[];
  useri2();
  pass2();

  var data1={
  user:useri,
  pass:pass
  };
  //console.log(data1.user);
  res.send(data1);

  res.end();
});









app.get('/useri',function(req,res){

  if(sess)
    //if(sess.username=="admin")
      res.sendFile(path.join(__dirname,'/proiect/useri.html'));
    //else
      //res.redirect('/homepage');

});
app.get('/username',function(req,res)
{
	if(sess)
	 res.send(sess.username);
	else
	 res.end();
});
app.listen(process.env.PORT || port, () => console.log(`listening on port ${port}!`));
