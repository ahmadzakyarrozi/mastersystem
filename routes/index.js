var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bcrypt = require('bcrypt');
var koneksi = require('../database/koneksi')



/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.flag == 1){
    req.session.destroy();
    res.render('index', { title: 'Coding Test Mastersystem Infotama', message : 'Email telah terdaftar', flag : 1 });
  }
  else if (req.session.flag == 2){
    req.session.destroy();
    res.render('index', { title: 'Coding Test Mastersystem Infotama', message : 'Regsiterasi Berhasil, Silahkan Login', flag : 0 });
  }
  else if (req.session.flag == 3){
    req.session.destroy();
    res.render('index', { title: 'Coding Test Mastersystem Infotama', message : 'konfirmasi password tidak sama', flag : 1 });
  }
  else if (req.session.flag == 4) {
    req.session.destroy();
    res.render('index', { title: 'Coding Test Mastersystem Infotama', message : 'Email atau Password anda salah, Silahkan Coba lagi', flag : 1 });
  }
  else if (req.session.flag == 5) {
    req.session.destroy();
    res.render('index', { title: 'Coding Test Mastersystem Infotama', message : 'Nama anda harus diisi', flag : 1 });
  }
  else if (req.session.flag == 6) {
    req.session.destroy();
    res.render('index', { title: 'Coding Test Mastersystem Infotama', message : 'email anda harus diisi', flag : 1 });
  }
  else if (req.session.flag == 7) {
    req.session.destroy();
    res.render('index', { title: 'Coding Test Mastersystem Infotama', message : 'Tanggal lahir anda harus diisi', flag : 1 });
  }
  else if (req.session.flag == 8) {
    req.session.destroy();
    res.render('index', { title: 'Coding Test Mastersystem Infotama', message : 'Nomor handphone anda harus diisi', flag : 1 });
  }
  else if (req.session.flag == 9) {
    req.session.destroy();
    res.render('index', { title: 'Coding Test Mastersystem Infotama', message : 'Jenis Kelamin anda harus diisi', flag : 1 });
  }
  else if (req.session.flag == 10) {
    req.session.destroy();
    res.render('index', { title: 'Coding Test Mastersystem Infotama', message : 'Password anda harus diisi', flag : 1 });
  }
  else if (req.session.flag == 11) {
    req.session.destroy();
    res.render('index', { title: 'Coding Test Mastersystem Infotama', message : 'Konfirmasi Password anda harus diisi', flag : 1 });
  }
  else {
    res.render('index', { title: 'Coding Test Mastersystem Infotama' });
  }
  
 
});

//Post request dari User Registrasi

router.post('/auth_reg',  async function(req,res,next){
  var fullname = req.body.fullname;
  var tgllahir = req.body.tgllahir;
  var nohp = req.body.nohp;
  var jenis_kelamin = req.body.jenis_kelamin;
  var email = req.body.email;
  var password = req.body.password;
  var cpassword = req.body.cpassword;

  if (!fullname){
    req.session.flag = 5;
    res.redirect('/')
  }
  else if (!email){
    req.session.flag = 6;
    res.redirect('/')
  }
  else if (!tgllahir){
    req.session.flag = 7;
    res.redirect('/')

  }
  else if(!nohp){
    req.session.flag = 8;
    res.redirect('/')
  }
  else if(!jenis_kelamin){
    req.session.flag = 9;
    res.redirect('/')
  }
  else if(!password){
    req.session.flag = 10;
    res.redirect('/')
  }
  else if(!cpassword){
    req.session.flag = 11;
    res.redirect('/')
  }
  
 else if(cpassword == password){
    var sql = 'select * from users where email = ?;';


  await koneksi.query(sql, [email], async function(err,result,fields){
         
      if(err) throw err;
        if(result.length >0){
          
          req.session.flag = 1;
          res.redirect('/')
        }else{
          
          var hashpassword = bcrypt.hashSync(password, 10);
          var sql = 'insert into users(fullname,email,nohp,tgllahir,password,jenis_kelamin) values(?,?,?,?,?,?);';
  
          koneksi.query(sql,[fullname,email,nohp,tgllahir,hashpassword,jenis_kelamin], function(err, result, fields){
            if(err) throw err;
           
            req.session.flag = 2;
            res.redirect('/');
          });

        };
    });

  }
  else{
    req.session.flag = 3;
    res.redirect('/');
  }
  
})

//Handel POST Request untuk user Login
router.post('/auth_login', (req,res,next)=>{
    // const result = validationResult(req);
     
  var email = req.body.email;
  var password = req.body.password;
  var sql = 'select * from users where email = ?;';

  koneksi.query(sql,[email], (err,result,fields)=>{
    if (!email){
      res.render('/', {message : errors })
    }
    console.log(email);
    if(err) throw err;
      if(result.length && bcrypt.compareSync(password, result[0].password)){
  
        req.session.email = email;
        res.redirect('/home');
      } else {
        req.session.flag = 4;
        res.redirect('/');
      } 
  });

})

//router untuk home page
router.get('/home', (req,res)=>{

  res.render('home', {message: 'Welcome   ' + req.session.email})
})

router.get('/logout', function(req, res, next){
  if(req.session.email){
    req.session.destroy();
    res.redirect('/');
  }
})

module.exports = router;
