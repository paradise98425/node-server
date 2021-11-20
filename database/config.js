const { createPool } = require("mysql");

const pool = createPool({
    host: process.env.HOST,
    port: process.env.APP_PORT,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    connectionLimit: 10
});

module.exports = pool;