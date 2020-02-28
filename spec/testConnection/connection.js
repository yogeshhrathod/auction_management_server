const pgp = require("pg-promise")();
const cn = {
  host: "localhost",
  port: 5432,
  database: "test-auction",
  user: "yogesh",
  password: "root"
};
console.log("Test connection est.");
module.exports = pgp(cn);
