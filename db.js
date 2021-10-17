// configure how we are going to connect to our postgres database(called perntodo).
// We will do this using pg.

const Pool = require('pg').Pool;

const pool = new Pool({
    user:"postgres",
    password: "bondjames122",
    host: "localhost",
    port: 5432,
    database: "perntodo"
});


module.exports = pool;