const mysql = require('mysql');
const { promisify } = require('util');
const { database } = require('./util');

const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
    console.log('Establishing connection to database ...');
    if (err) { console.error(err); return; }
    if (connection) { connection.release(); }
    console.log('Connection to database succesfull!');
    return;
})

pool.query = promisify(pool.query);

module.exports = pool;
