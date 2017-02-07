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
    // console.log(currentpage);
    //------------------------以上判斷目前頁面
    connectdb.query(sqlcmd, function(err, rows) {
      if (err) {
        console.log("mysql getQuery error");
        return;
      }
      // console.log(rows);
      // cndb.end();    // db close
      res.render('productslist',{rows:rows,back:back,next:next,current:getquery.page});
    });
  }
//---------------------------------------------------------------------------
var getpage=url.parse(req.url,true).query;
var rangestr='';
    var current=parseInt(getpage.page);
    var x,y; //x為該頁第一筆,y為該頁最末筆
    if(getpage.page===undefined){   //如果沒有page uri querystring
      x=0;  //則顯示第一頁
      y=19;
    }
    else{
      x=(current-1)*20;   //page: 1  2   3
      y=(current*20)-1;   //   x: 0  20  40
    }                     //   y: 19 39  59
    console.log(current,':',x,y);
    rangestr=x+","+y;
  getallproducts("SELECT * FROM products limit "+rangestr);
});


//-----------------------------------------------------------------------------
// router.post('/', function(req,res) {
//   var temp=req.body;   //取得送出的表單
//   var delarr=temp.delitem;    //取得勾選的checkbox集合
//   console.log(delarr);
//   function delproducts(delstr){  //刪除商品資料
//     connectdb.query(delstr, function(err) {
//       if (err) {
//         console.log("mysql getQuery error");
//         return;
//       }
//     });
//   }
//   var delstr="DELETE  FROM products WHERE id=";  //暫存每次呼叫刪除sql cmd
// //-------------------------------------------------------
//   var selstr="SELECT * FROM products WHERE id=";   //暫存每次呼叫選取sql cmd
// function delfiles(delfiles){   //刪除資料夾商品圖
//   connectdb.query(delfiles,function(err,rows){
//       fs.unlink('productsManage/itemspic/'+rows[0].newpicname);
//   });
// }
// //---------------------------------------------------------
// for(var i in delarr)
// {
//  console.log(delstr+delarr[i]);
//  console.log(selstr+delarr[i]);
//  delfiles(selstr+delarr[i]);
//  delproducts(delstr+delarr[i]);
// }
//
//
//   res.redirect('http://127.0.0.1:3000/productslist');
// });


//-----------------------------------------------------------------------------





module.exports = router;