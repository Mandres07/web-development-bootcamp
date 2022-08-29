const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  database: 'security',
  user: 'root',
  password: '07.Mandres.ms',
  multipleStatements: true // Por defecto deberia ser false para tener mejor seguridad
});

module.exports = pool;