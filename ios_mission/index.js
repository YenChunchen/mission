var express=require('express');
var router=express.Router();
var url=require('url');
router.get('/m1',function(req,res){
  var getquery = url.parse(req.url, true).query;
  var name=getquery.name;
  if (name===undefined) res.json({fail:'請輸入name'});
  var message='welcome '+name;
  var today=new Date();
  var time={
    year:today.getFullYear().toString(),
    month:today.getMonth().toString(),
    day:today.getDay().toString(),
    hour:parseInt(today.getHours()),
    min:parseFloat(today.getMinutes())
  };
  res.json({welcome:message,time:time});
});
//-----------------------------------------------------------------------
router.get('/m2',function(req,res){
  // var getquery = url.parse(req.url, true).query;
  var weatherinput=req.headers.weatherinput;  //顯示header中父項目內容
  var name=req.headers.name;
  if (name===undefined) res.json({fail:'請輸入name'});
  var message='welcome '+name;
  chooseweather(weatherinput,req,res);
  var today=new Date();
  var weather;
  var time={
    year:today.getFullYear().toString(),
    month:today.getMonth().toString(),
    day:today.getDay().toString(),
    hour:parseInt(today.getHours()),
    min:parseFloat(today.getMinutes())
  };
  switch (weatherinput){
    case 'sunny':{
      weather='https://'+req.hostname+'/uploads/sunny.jpg';
      break;
    }
    case 'rainy':{
      weather='https://'+req.hostname+'/uploads/rainy.jpg';
      break;
    }
    case 'snow':{
      weather='https://'+req.hostname+'/uploads/snow.jpg';
      break;
    }
    case 'fog':{
      weather='https://'+req.hostname+'/uploads/fog.jpg';
      break;
    }
    default:{
      weather='https://'+req.hostname+'/uploads/nothing.jpg';
      break;
    }
  }
  res.json({welcome:message,time:time,weather:weather});
});
//-----------------------------------------------------------------------
router.post('/m3',function(req,res){
  var temp=req.body;
  var name=temp.name;
  var weatherinput=temp.weatherinput;
  console.log(typeof name);
  if (name===undefined) res.json({fail:'請輸入name'});
  var message='welcome '+name;
  chooseweather(weatherinput,req,res);
  var today=new Date();
  var time={
    year:today.getFullYear().toString(),
    month:today.getMonth().toString(),
    day:today.getDay().toString(),
    hour:parseInt(today.getHours()),
    min:parseFloat(today.getMinutes())
  };
  switch (weatherinput){
    case 'sunny':{
      weather='https://'+req.hostname+'/uploads/'+temp.weatherinput+'.jpg';
      break;
    }
    case 'rainy':{
      weather='https://'+req.hostname+'/uploads/rainy.jpg';
      break;
    }
    case 'snow':{
      weather='https://'+req.hostname+'/uploads/snow.jpg';
      break;
    }
    case 'fog':{
      weather='https://'+req.hostname+'/uploads/fog.jpg';
      break;
    }
    default:{
      weather='https://'+req.hostname+'/uploads/nothing.jpg';
      break;
    }
  }
  res.json({welcome:message,time:time,weather:weather});
});
//-----------------------------------------------------------------------------
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });
router.post('/m4',upload.single(),function(req,res){
  var temp=req.body;
  console.log(temp);
  var name=temp.name;
  var weatherinput=temp.weatherinput;
  if (name===undefined) res.json({fail:'請輸入name'});
  var message='welcome '+name;
  var today=new Date();
  var time={
    year:today.getFullYear().toString(),
    month:today.getMonth().toString(),
    day:today.getDay().toString(),
    hour:parseInt(today.getHours()),
    min:parseFloat(today.getMinutes())
  };
  switch (weatherinput){
    case 'sunny':{
      weather='https://'+req.hostname+'/uploads/sunny.jpg';
      weather='https://'+req.hostname+'/uploads/'+temp.weatherinput+'.jpg';
      break;
    }
    case 'rainy':{
      weather='https://'+req.hostname+'/uploads/rainy.jpg';
      break;
    }
    case 'snow':{
      weather='https://'+req.hostname+'/uploads/snow.jpg';
      break;
    }
    case 'fog':{
      weather='https://'+req.hostname+'/uploads/fog.jpg';
      break;
    }
    default:{
      res.json({fail:'請輸入正確天氣'});
      weather='https://'+req.hostname+'/uploads/nothing.jpg';
      break;
    }
  }
  res.json({welcome:message,time:time,weather:weather});
});
module.exports=router;
