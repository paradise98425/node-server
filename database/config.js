const { createPool } = require("mysql");

const pool = createPool({
    host: process.env.HOST || 'localhost',
    port: process.env.MYSQL_PORT || 3306,
    user: process.env.USER || 'root',
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    connectionLimit: 10
});

module.exports = pool;