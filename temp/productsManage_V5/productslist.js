var express = require('express');
var router = express.Router();
var connectdb=require('../routes/connectdb');  //connect to db module
var fs = require('fs');
var url=require('url');

router.get('/', function(req, res,next) {
  function getallproducts(sqlcmd) {     //顯示全部資料function
    // var cndb = connectdb.con();   //connect to db(db open)
    var getquery=url.parse(req.url,true).query;
    var back=parseInt(getquery.page)-1;
    var next=parseInt(getquery.page)+1;
    if(back===undefined||back===0) back=1;
    if(next>=3) next=3;
    if(getquery.page===undefined) { next=2; back=1; }

//----------------------------------------------------------
  connectdb.query('SELECT * FROM products', function(err, rows){
    var dballproduct =rows.length;
    connectdb.query(sqlcmd, function(err, rows) {
      if (err) {
        console.log("mysql getQuery error");
        return;
      }
      res.render('productslist',{rows:rows,back:back,next:next,allitem:dballproduct});
    });
  });
}
//---------------------------------------------------------------------------
var getpage=url.parse(req.url,true).query;
var rangestr='';
    var current=parseInt(getpage.page);
    var x,y; //x為該頁第一筆,y為該頁最末筆
    if(getpage.page===undefined)
    {x=0;y=20;}
    else{
      if(getpage.page==='NaN'){   //如果沒有page uri querystring
        x=0;  //則顯示第一頁
        y=20;
      }
      else{
        x=(current-1)*20;   //page: 1  2   3
        y=(current*20);   //   x: 0  20  40
      }                     //   y: 19 39  59
    }
    rangestr=x+","+y;
  getallproducts("SELECT * FROM products limit "+rangestr);
});
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
router.post('/', function(req, res,next){
  function getallproducts(sqlcmd) {     //顯示全部資料function
    // var cndb = connectdb.con();   //connect to db(db open)
    var getquery=url.parse(req.url,true).query;
    var back=parseInt(getquery.page)-1;
    var next=parseInt(getquery.page)+1;
    if(back===undefined||back===0) back=1;
    if(next>=3) next=3;
    //------------------------以上判斷目前頁面
    connectdb.query('SELECT * FROM products', function(err, rows){
      var dballproduct =rows.length;
      connectdb.query(sqlcmd, function(err, rows) {
       if (err) {
         console.log("mysql getQuery error");
         return;
       }
       res.render('productslist',{rows:rows,back:back,next:next,allitem:dballproduct});
      });
  });
}
//---------------------------------------------------------------------------
    var temp=req.body;
    var begin=parseInt(temp.begin)-1;
    var end=parseInt(temp.end);
    getallproducts("SELECT * FROM products limit "+begin+','+end);
});


module.exports = router;