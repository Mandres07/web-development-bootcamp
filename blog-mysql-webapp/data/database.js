const mysql = require('mysql2/promise');

const pool = mysql.createPool({
   host: 'localhost',
   // port: 3306
   database: 'blog',
   user: 'root',
   password: '07.Mandres.ms'
});

module.exports = pool;