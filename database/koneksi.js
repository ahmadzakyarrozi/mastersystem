var mysql = require('mysql')

var koneksi = mysql.createConnection({
    host        : 'localhost',
    user        : 'root',
    password    : 'root',
    database    : 'mastersystem'
});

koneksi.connect ((err)=>{
    if(err) throw err;

    console.log('Database terkoneksi');
});

module.exports = koneksi;