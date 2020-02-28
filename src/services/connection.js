const pgp = require("pg-promise")();
const cn = {
    host: 'localhost',
    port: 5432,
    database: 'auction',
    user: 'yogesh',
    password: 'root'
};
console.log('connection est.');
module.exports = pgp(cn);