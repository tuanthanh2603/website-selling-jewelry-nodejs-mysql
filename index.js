var express = require('express');
// const mysql = require('mysql');
var app = express();
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
const bodyParser = require('body-parser');
const { resolve } = require('path');
const { request } = require('http');
app.use(bodyParser.urlencoded({ extended: true }));
// var mysql = require("./public/libs/sql");
// var mysql = require('./models/mysql');
var multer = require('multer')

const dbConfig = require('./models/dbConfig');
const connection = require('./models/connect');
const query = require('./models/query');

// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "project05"
// });


// connection.connect((err) => {
//   if(err) {
//     console.error('Error connecting to MySQL database: ', err);
//     return;
//   }
//   console.log('Connected to MySQL database!');
// })




app.get('/getCategory', async (req, res) => {
    const conn = await connection(dbConfig).catch(e => {}) 
    const results = await query(conn, 'SELECT * FROM catalog where catalog.status = 1').catch(console.log);
    res.send(results);
})
app.get('/getCategoryADM', async (req, res) => {
  const conn = await connection(dbConfig).catch(e => {}) 
  const results = await query(conn, 'SELECT * FROM catalog').catch(console.log);
  res.send(results);
})
// app.get('/getCategory', function(req,res){
//   connection.query('SELECT * FROM catalog', function(error, results, fields){
//     if(error) throw error;
//     res.send(results);
//   });
// });



// app.get('/getAllproduct', function(req,res){
//   connection.query('SELECT * FROM product', function(error, results, fields){
//     if(error) throw error;
//     res.send(results);
//   });
// });
app.get('/getAllproduct', async (req, res) => {
    const conn = await connection(dbConfig).catch(e => {}) 
    const results = await query(conn, 'SELECT * FROM product').catch(console.log);
    res.send(results);
})


// app.get('/Category/:idcate', function(req,res){
//   var id = req.params.idcate
//   connection.query(`select * from product where product.idCat = ` + id, function(error, results, fields){
//     if(error) throw error;
//     res.send(results);
//   });
// });
app.get('/Category/:idcate', async (req,res) => {
    var id = req.params.idcate
    const conn = await connection(dbConfig).catch(e => {}) 
    const results = await query(conn, `select * from product where product.idCat = ${id} and showhide = 1` ).catch(console.log);
    res.send(results);
});


// app.get('/product/:idProduct', function(req,res){
//   var id = req.params.idProduct
//   connection.query(`select * from product where product.idProduct = ` + id, function(err, results, fields){
//     if(err) throw err;
//     res.send(results);
//   });
// });
app.get('/product/:idProduct', async (req,res) => {
  var id = req.params.idProduct
  const conn = await connection(dbConfig).catch(e => {}) 
  const results = await query(conn, `select * from product where product.idProduct = ` +id ).catch(console.log);
  res.send(results);
});

// app.get('/infoKH/:idUser', function(req,res){
//   var id = req.params.idUser
//   connection.query(`SELECT * FROM user where user.idUser = ` + id, function(err, results){
//     if(err) throw err;
//     res.send(results);
//   })
// })
app.get('/infoKH/:idUser', async (req,res) => {
  var id = req.params.idUser
  const conn = await connection(dbConfig).catch(e => {}) 
  const results = await query(conn, `SELECT * FROM user where user.idUser = ` + id).catch(console.log);
  res.send(results );
})

// app.get('/infoKH/:idUser', function(req,res){
//   var id = req.params.idUser
//   connection.query(`select * from user where user.idUser = `+ id, function(err,results, fields){
//     if(err) throw err;
//     res.send(results);
//   })
// })

// app.post('/searchProduct', function(req,res){
//   console.log(req.body)
//   connection.query("select * from product where product.nameProduct like '%"+req.body.search+ "%' and product.idCat = " + req.body.idcate +" order by product."+req.body.sort, function(err, results){
    
//       if(err) throw err;
//       res.send(results);
    
//   }) 
// })
app.post('/searchProduct', async(req,res) => {
  const conn = await connection(dbConfig).catch(e => {}) 
  const results = await query(conn, "select * from product where product.nameProduct like '%"+req.body.search+ "%' and product.idCat = " + req.body.idcate +" order by product."+req.body.sort).catch(console.log);
  res.send(results );
})

// app.post('/userLogin', function(req,res){
  
//   connection.query("select * from user where phone = '"+req.body.phone+"' and password='"+req.body.password+"'", function(err, results){
//     if(err) throw err;
//     res.send(results);
//   })
// })
app.post('/userLogin', async (req,res) => {
  const conn = await connection(dbConfig).catch(e => {}) 
  const results = await query(conn, "select * from user where email = '"+req.body.email+"' and password='"+req.body.password+"'").catch(console.log);
  res.send(results );
  
})

// app.post('/inputUser', function(req,res){
//   connection.query(`INSERT INTO user(ho, ten, email, password, phone, address) VALUES('${req.body.ho}','${req.body.ten}','${req.body.email}','${req.body.pass}','${req.body.sdt}','${req.body.diachi}')`, function(err, results){
//     if(err) throw err;
//     res.send(results);
//   })
// })
app.post('/inputUser', async (req,res) => {
  const conn = await connection(dbConfig).catch(e => {}) 
  const results = await query(conn, `INSERT INTO user(ho, ten, email, password, phone, address, tinh, huyen) VALUES('${req.body.ho}','${req.body.ten}','${req.body.email}','${req.body.pass}','${req.body.sdt}','${req.body.diachi}','${req.body.tinh}','${req.body.huyen}')`).catch(console.log);
  res.send(results );
})

// app.post('/searchsdt', function(req,res){
//   connection.query(`SELECT * FROM user WHERE user.phone = '${req.body.sdt}'`, function(err, results){
//     if(err) throw err;
//     res.send(results);
//   })
// })
app.post('/searchsdt', async (req,res) => {
  const conn = await connection(dbConfig).catch(e => {}) 
  const results = await query(conn, `SELECT * FROM user WHERE user.phone = '${req.body.sdt}'`).catch(console.log);
  res.send(results );
})

// app.get('/getShoppingCard/:lstSP', function (req, res) {
//   // config for your database
//   connection.query("select * from product where idProduct in ("+req.params.lstSP+")",  function(err, results) {
//     if(err) throw err;
//     res.send(results);
//   })
// });
app.get('/getShoppingCard/:lstSP', async (req, res) => {
  // config for your database
  const conn = await connection(dbConfig).catch(e => {}) 
  const results = await query(conn, "select * from product where idProduct in ("+req.params.lstSP+")").catch(console.log);
  res.send(results );
});

// app.post('/updateKH/:idUser', function(req,res){
//   var id = req.params.idUser
//   connection.query(`UPDATE user SET ho = '${req.body.ho}', ten = '${req.body.ten}', email = '${req.body.email}', password = '${req.body.pass}' WHERE idUser = ` + id, function(err, results, fields){
//     if(err) throw err;
//     res.send(results);
//   })
// });
app.post('/updateKH/:idUser', async (req,res) => {
  var id = req.params.idUser
  const conn = await connection(dbConfig).catch(e => {}) 
  const results = await query(conn, `UPDATE user SET ho = '${req.body.ho}', ten = '${req.body.ten}', email = '${req.body.email}', password = '${req.body.pass}' WHERE idUser = ` + id).catch(console.log);
  res.send(results );
});
app.post('/updateKH3/:idUser', async (req,res) => {
  var id = req.params.idUser
  const conn = await connection(dbConfig).catch(e => {}) 
  const results = await query(conn, `UPDATE user SET tinh = '${req.body.tinh}', huyen = '${req.body.huyen}', address = '${req.body.diachi}' WHERE idUser = ` + id).catch(console.log);
  res.send(results );
});

app.post('/buyProduct', async (req, res) => {
  var MaKh = req.body.MaKH
  var lstSP = req.body.lstSP
  console.log(MaKh);
  console.log(req.body.MaKH);
  const conn = await connection(dbConfig).catch(e => {})
  const data1 = await query(conn, "INSERT INTO hoadon(idKH) VALUES ('"+MaKh+"')").catch(console.log);

  const data2 = await query(conn, "SELECT idHD FROM hoadon ORDER BY idHD DESC LIMIT 1").catch(console.log);

  var MaHD = data2[0].idHD
  console.log(data2[0].idHD)

  for (var i = 0; i < lstSP.length; i++){
    var item = lstSP[i];
    await query(conn, "insert into chitiethoadon(idHD,idSP,soluong,giaban) values('"+MaHD+"','"+item.maSP+"','"+item.soluong+"','"+item.gia+"') ").catch(console.log);
  }

  

})

// // app.post('/buyProduct', async function(req,res){
// //   var maKH = req.body.maKH;
// //   var lstSP = req.body.lstSP;

// //   var data1 = await connection.query("insert into hoadon(idKH) values('"+maKH+"')");
// //   var data2 = await connection.query("SELECT idHD FROM hoadon ORDER BY idHD DESC LIMIT 1");
// //   // var data2 = await connection.query("select TOP(1) idHD from hoadon order by idHD DESC")


// //   var maHD = data2
  

// //   // for(var i = 0; i < lstSP.length; i++){
// //   //   var item = lstSP[i];
// //   //   await connection.query("insert into chitiethoadon(idHD,idSP,soluong,giaban) values('"+maHD+"','"+item.maSP+"','"+item.soluong+"','"+item.giaban+"') ")
      
// //   // }

  
 
// // });
// app.post('/buyProduct', async function(req, res) {
//   var maKH = req.body.maKH;
//   var lstSP = req.body.lstSP;

//   var data1 = await connection.query("INSERT INTO hoadon(idKH) VALUES (?)", [maKH]);
//   var data2 = await connection.query("SELECT idHD FROM hoadon ORDER BY idHD DESC LIMIT 1");

  
//   var maHD = data2[0].idHD;

//   // insert the products into the chitiethoadon table
//   for (var i = 0; i < lstSP.length; i++) {
//     var item = lstSP[i];
//     // await connection.query("INSERT INTO chitiethoadon(idHD,idSP,soluong,giaban) VALUES (?,?,?,?)", [maHD, item.maSP, item.soluong, item.giaban]);
//     await connection.query("insert into chitiethoadon(idHD,idSP,soluong,giaban) values('"+maHD+"','"+item.maSP+"','"+item.soluong+"','"+item.giaban+"') ")
//   }

//   res.send('Order placed successfully');
// });

// // initialize the connection object


// app.post('/buyProduct', async function(req, res) {
//   var maKH = req.body.maKH;
//   var lstSP = req.body.lstSP;

//   var data1 = await connection.query("INSERT INTO hoadon(idKH) VALUES (?)", [maKH]);
//   var data2 = await connection.query("SELECT idHD FROM hoadon ORDER BY idHD DESC LIMIT 1");

//   console.log(data2[0]);

//   // insert the products into the chitiethoadon table
//   for (var i = 0; i < lstSP.length; i++) {
//     var item = lstSP[i];
//     await connection.query("INSERT INTO chitiethoadon(idHD,idSP,soluong,giaban) VALUES (?,?,?,?)", [data2[0].idHD, item.maSP, item.soluong, item.giaban]);
//   }

//   res.send('Order placed successfully');
// });


// app.post('/searchMGG', async (req,res) => {
//   const code = req.body.code; // lấy mã giảm giá từ request body

//   const conn = await connection(dbConfig).catch(e => {}) 
  
//   const results = await query(conn, `SELECT * FROM giamgia where code = '${code}'`).catch(console.log);
  
//   if (results.length > 0) {
//     const discountCode = results[0].code;
//     const discountPercent = results[0].percent;
    
//     res.send({
//       code: discountCode,
//       percent: discountPercent
//     }); // trả về thông tin của mã giảm giá
//   } else {
//     res.send({ error: "Mã giảm giá không hợp lệ" }); // trả về thông báo lỗi nếu không tìm thấy mã giảm giá
//   }
// })
app.post('/searchMGG', async (req, res) => {
  const code = req.body.code;

  try {
    const conn = await connection(dbConfig).catch(e => {});

   const [rows] = await query(conn, 'SELECT * FROM giamgia WHERE code = ?', [req.body.code]).catch(console.log);
    console.log(req.body.code)
    console.log(rows)
    

    if (rows && rows.length > 0) {
      const discountCode = rows[0].code;
      const discountPercent = rows[0].percent;
      
      res.send({
        code: discountCode,
        percent: discountPercent
      }); 
    } else {
      res.send({ error: "Mã giảm giá không hợp lệ" });
    }
  } catch (err) {
    console.error(err);
    res.send({ error: "Đã xảy ra lỗi khi tìm kiếm mã giảm giá" });
  }
});

app.get("/hoadon/:idUser", async(req,res) => {
  const conn = await connection(dbConfig).catch(e => {}) 
  const results = await query(conn, `SELECT * FROM hoadon WHERE hoadon.idKH = '${req.params.idUser}'`).catch(console.log);
  res.send(results );
})




//// ADMIN
app.post('/searchDanhmuc', async (req,res) => {
  const conn = await connection(dbConfig).catch(e => {}) 
  const results = await query(conn, `SELECT * FROM catalog WHERE catalog.nameCat = '${req.body.namecat}'`).catch(console.log);
  res.send(results );
})

app.post('/inputDanhmuc', async (req,res) => {
  const conn = await connection(dbConfig).catch(e => {}) 
  const results = await query(conn, `INSERT INTO catalog(nameCat) VALUES('${req.body.namecat}')`).catch(console.log);
  res.send(results );
})


app.post('/deleteDM/:idCat', async (req,res) => {
  var id = req.params.idCat
  const conn = await connection(dbConfig).catch(e => {}) 
  const results = await query(conn, `DELETE FROM catalog WHERE idCat = ` + id).catch(console.log);
  res.send(results );

})


app.post('/updateDanhmuc/:idCat', async (req, res) => {
  var id = req.params.idCat
  const conn = await connection(dbConfig).catch(e => {}) 
  const results = await query(conn, `UPDATE catalog SET nameCat = '${req.body.namecat}', status = '${req.body.selectTT}' WHERE idCat = ` + id).catch(console.log);
  res.send(results );
})

app.get('/infoDM/:idCat', async (req,res) => {
  var ids = req.params.idCat
  const conn = await connection(dbConfig).catch(e => {}) 
  const results = await query(conn, `SELECT * FROM catalog where catalog.idCat = ` + ids).catch(console.log);
  res.send(results );
})

app.get('/CategoryADM/:idCat', async (req,res) => {
  var idp = req.params.idCat
  const conn = await connection(dbConfig).catch(e => {}) 
  const results = await query(conn, `select * from product where product.idCat = ` + idp ).catch(console.log);
  res.send(results);
});
// Upload image
// multer

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() +"-"+ file.originalname)
  }
});
var upload = multer({storage : storage}).single('fileImage');

app.post('/upload', (req, res, next) => {
  upload(req, res, async function(err) {
    if(err) {
      res.send(err);
    } else {
      console.log("Success, image uploaded!")

      const conn = await connection(dbConfig).catch(e => {}) 
      const results = await query(conn, `insert into product(nameProduct, slug, description, imgProduct, showhide, idCat, viewss, priceProduct) values('${req.body.nameSP}','${req.body.maSP}','${req.body.motaSP}','${req.file.filename}','${req.body.shSP}','${req.body.idcatSP}','${req.body.viewSP}','${req.body.giaSP}')`).catch(console.log);
      return res.redirect("/a2")
     
    }
  })
});
app.post('/update/:idProduct', (req, res, next) => {
  upload(req, res, async function(err) {
    if(err) {
      res.send(err);
    } else {
      var idu = req.params.idProduct
      const conn = await connection(dbConfig).catch(e => {});
      
      
      if(!req.file){
        const results = await query(conn, `UPDATE product SET nameProduct = '${req.body.nameSP}', slug = '${req.body.maSP}', description = '${req.body.motaSP}', showhide = '${req.body.shSP}', idCat = '${req.body.idcatSP}', viewss = '${req.body.viewSP}', priceProduct = '${req.body.giaSP}' WHERE idProduct = ` + idu).catch(console.log);
        console.log("Update 1 success!")
        
        res.redirect("/a2")
        
      }else {
        const results1 = await query(conn, `UPDATE product SET nameProduct = '${req.body.nameSP}', slug = '${req.body.maSP}', description = '${req.body.motaSP}', imgProduct = '${req.file.filename}', showhide = '${req.body.shSP}', idCat = '${req.body.idcatSP}', viewss = '${req.body.viewSP}', priceProduct = '${req.body.giaSP}' WHERE idProduct = ` + idu).catch(console.log);
        console.log("Update 2 success!")
        
        res.redirect("/a2")
       
      }
      
    }
  })
})



app.post('/deleteSP/:idProduct', async (req,res) => {
  var id = req.params.idProduct
  const conn = await connection(dbConfig).catch(e => {}) 
  const results = await query(conn, `DELETE FROM product WHERE idProduct = ` + id).catch(console.log);
  res.send(results );

});

app.get('/getProduct/:idProduct', async (req,res) => {
  var id = req.params.idProduct
  const conn = await connection(dbConfig).catch(e => {}) 
  const results = await query(conn, `SELECT * FROM product where product.idProduct = ` + id).catch(console.log);
  res.send(results );
});

app.get('/showHoadon', async (req,res) => {
  const conn = await connection(dbConfig).catch(e => {}) 
  const results = await query(conn, "select * from hoadon").catch(console.log);
  res.send(results );

})

app.post('/deleteHD/:idHD', async (req,res) => {
  var idh = req.params.idHD
  const conn = await connection(dbConfig).catch(e => {}) 
  const results = await query(conn, `DELETE FROM hoadon WHERE idHD = ` + idh).catch(console.log);
  res.send(results );

});
app.get('/showCTHD/:idHD', async (req, res) => {
  var id = req.params.idHD
  const conn = await connection(dbConfig).catch(e => {}) 
  const results = await query(conn, "SELECT * FROM chitiethoadon WHERE idHD = ?", [id]).catch(console.log);
  res.send(results );
  
});
app.get('/showCTHDa/:idHD', async (req, res) => {
  var id = req.params.idHD
  const conn = await connection(dbConfig).catch(e => {}) 
  const results = await query(conn, "SELECT * from chitiethoadon as cthd join hoadon as hd ON cthd.idHD = hd.idHD join product as pr ON cthd.idSP = pr.idProduct join user as us ON hd.idKH = us.idUser where hd.idHD =" + id).catch(console.log);
  res.send(results );
  
});
// app.post('/updateHD/:idHD', async (req,res) => {
//   var id = req.params.idHD
//   const conn = await connection(dbConfig).catch(e => {}) 
//   const results = await query(conn, `UPDATE hoadon SET tinhtrang  = '${req.body.ttHD}' WHERE idHD = ` + id).catch(console.log);
// })
app.post('/uptt/:idHD', async (req, res) => {
 
  id = req.params['idHD']

  const conn = await connection(dbConfig).catch(e => {}) 
  const results = await query(conn, `UPDATE hoadon SET tinhtrang = '${req.body.tt}' where idHD =` + id).catch(console.log);
  res.send(results );
  
  
});

app.get('/getAllUser', async (req, res) => {
  const conn = await connection(dbConfig).catch(e => {}) 
  const results = await query(conn, "select * from user where isAdmin = 0").catch(console.log);
  res.send(results );
})

app.post('/deleteKH/:idUser', async (req,res) => {
  var id = req.params.idUser
  const conn = await connection(dbConfig).catch(e => {}) 
  const results = await query(conn, `DELETE FROM user WHERE idUser = ` + id).catch(console.log);
  res.send(results );

});

app.get('/SPnoibat', async (req,res) => {
  const conn = await connection(dbConfig).catch(e => {}) 
  const results = await query(conn, "SELECT * from product WHERE viewss = 1 ORDER BY viewss DESC LIMIT 4").catch(console.log);
  res.send(results );
})

app.get('/SPmoi', async (req, res) => {
  const conn = await connection(dbConfig).catch(e => {}) 
  const results = await query(conn, "SELECT * FROM product ORDER BY dateUpdate DESC LIMIT 4").catch(console.log);
  res.send(results );
})

app.get('/showKH/:idUser', async (req, res) => {
  var id = req.params.idUser
  const conn = await connection(dbConfig).catch(e => {}) 
  const results = await query(conn, "SELECT * FROM user WHERE idUser =" + id, ).catch(console.log);
  res.send(results );
  
});

app.post('/updateKH2/:idUser', async (req, res) => {
  var id = req.params.idUser
  const conn = await connection(dbConfig).catch(e => {}) 
  const results = await query(conn, `UPDATE user SET ho = '${req.body.ho}', ten = '${req.body.ten}', email = '${req.body.email}', phone = '${req.body.sdt}', tinh = '${req.body.tinh}', huyen = '${req.body.huyen}', address = '${req.body.diachi}', password = '${req.body.pass}' where idUser =` + id).catch(console.log);
  res.send(results );
})

app.post('/showttHD/:idHD', async (req, res) => {
  var id = req.params.idHD
  const conn = await connection(dbConfig).catch(e => {}) 
  const results = await query(conn, "SELECT * FROM hoadon WHERE idHD =" + id, ).catch(console.log);
  res.send(results );
})

app.post("/searchADM", async (req,res) => {
  const conn = await connection(dbConfig).catch(e => {}) 
  const results = await query(conn, "select * from product where product.nameProduct like '%"+req.body.search+ "%'").catch(console.log);
  res.send(results );
})

app.post('/inputUser2', async (req,res) => {
  const conn = await connection(dbConfig).catch(e => {}) 
  const results = await query(conn, `INSERT INTO user(ho, ten, phone, address, tinh, huyen) VALUES('${req.body.ho}','${req.body.ten}','${req.body.sdt}','${req.body.diachi}','${req.body.tinh}','${req.body.huyen}')`).catch(console.log);
  res.send(results );
})

app.post("/searchemail", async (req,res) => {
  const conn = await connection(dbConfig).catch(e => {}) 
  const results = await query(conn, "select * from user where user.email like '%"+req.body.email+ "%'").catch(console.log);
  res.send(results );
})

app.post("/searchADMsdt", async (req,res) => {
  const conn = await connection(dbConfig).catch(e => {}) 
  const results = await query(conn, "select * from user where user.phone like '%"+req.body.search+ "%' and isAdmin = 0").catch(console.log);
  res.send(results );
})

app.post("/comment/:idProduct", async (req,res) => {
  var id = req.params.idProduct
  const conn = await connection(dbConfig).catch(e => {}) 
  const results = await query(conn, `insert into comment(name, email, rating, content, idProduct) values('${req.body.ten}','${req.body.email}','${req.body.rating}', '${req.body.cmt}','${id}')`).catch(console.log);
  res.send(results );
})

app.get("/showcomment/:idProduct", async(req,res) => {
  var id = req.params.idProduct
  const conn = await connection(dbConfig).catch(e => {}) 
  const results = await query(conn, `select * from comment where idProduct =` + id).catch(console.log);
  res.send(results );
})

app.get("/showrating/:idProduct", async(req,res) => {
  var id = req.params.idProduct
  const conn = await connection(dbConfig).catch(e => {})
  const results = await query(conn, `select * from comment where idProduct =` + id).catch(console.log);
  res.send(results );
})

app.post('/checkUser', async function(req, res){

  const conn = await connection(dbConfig).catch(e => {})
  const results = await query(conn, `select * from user where idUser = ${req.body.id} and isAdmin = 1`).catch(console.log);
  res.send(results );
  
})
// exports.hotProduct = () => {
//   return new Promise((resolve, reject) => {
//       let query = "SELECT * FROM product WHERE viewss > 2 ORDER BY viewss DESC LIMIT 4";
//       connection.query(query, (err, d) => {
//           console.log('Truy van trang suc thanh cong');
//           dataList = d;
//           resolve(dataList);
//       })
//   })
// }


app.get('/d2', function(req,res){
  res.sendFile(__dirname + "/admin/d2.html")
})
app.get('/d1', function(req,res){
  res.sendFile(__dirname + "/admin/d1.html")
})
app.get('/blog', function(req,res){
  res.sendFile(__dirname + "/blog.html")
})
app.get('/p2-1/:id', function(req,res){
  res.sendFile(__dirname + "/client/p2-1.html")
})
app.get('/p3', function(req,res){
  res.sendFile(__dirname + "/client/p3.html")
})
app.get('/c2', function(req,res){
  res.sendFile(__dirname + "/admin/c2.html")
})
app.get('/c1-1/:id', function(req,res){
  res.sendFile(__dirname + "/admin/c1-1.html")
})
app.get('/c1', function(req,res){
  res.sendFile(__dirname + "/admin/c1.html")
})
app.get('/b1-1/:idHD', function(req,res){
  res.sendFile(__dirname + "/admin/b1-1.html")
})
app.get('/b1', function(req,res){
  res.sendFile(__dirname + "/admin/b1.html")
})
app.get('/a2-1/:idProduct', function(req,res){
  res.sendFile(__dirname + "/admin/a2-1.html")
})

app.get('/a3', function(req,res){
  res.sendFile(__dirname + "/admin/a3.html");
})
app.get('/a2', function(req,res){
  res.sendFile(__dirname + "/admin/a2.html");
})
app.get('/a1', function(req,res){
  res.sendFile(__dirname + "/admin/a1.html");
})
app.get('/p2', function(req,res){
  res.sendFile(__dirname + "/client/p2.html")
})
app.get('/p1', function(req,res){
  res.sendFile(__dirname + "/client/p1.html")
})
app.get('/infoKH/:idUser', function(req,res){
  res.sendFile(__dirname + "/client/p1.html")
})


app.get('/comment/:idProduct', function(req,res){
  res.sendFile(__dirname + "/comment.html")
})
app.get('/giohang', function(req,res){
  res.sendFile(__dirname + "/giohang.html")
})
app.get('/account', function(req,res){
  res.sendFile(__dirname + "/account.html")
})
app.get('/signup', function(req,res){
  res.sendFile(__dirname + "/dang-ky.html")
})
app.get('/admin', function(req,res){
  res.sendFile(__dirname + "/admin.html")
})
app.get('/signin', function(req,res){
  res.sendFile(__dirname + "/dang-nhap.html")
})
app.get('/products/:idProduct', function (req, res) {
  res.sendFile(__dirname + "/chi-tiet-trang-suc.html");
});
app.get('/collections/:idcate', function (req, res) { 
  res.sendFile(__dirname + "/trang-suc.html")
})
app.get('/', function (req, res) {
  res.sendFile(__dirname + "/home.html");
})
app.get('/trangsuc', function(req,res){
  res.sendFile(__dirname + "/trang-suc.html");
})
app.get('/chitiettrangsuc/:id', function(req,res){
  res.sendFile(__dirname + "/chi-tiet-trang-suc.html");
})



var server = app.listen(3000, function () {
  console.log('Server is running..');
});