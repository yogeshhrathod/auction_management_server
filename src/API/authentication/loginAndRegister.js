const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dbConnection = require("../../services/connection");
const { success, error } = require("../messages/apiReplies");

exports.register = async (req,db=dbConnection) => {
  try {
    
    return await db.tx(async(td) => {
      const user = await td.any("SELECT email FROM users where email=$1", [
        req.body.email
      ]);
  
      if (user.length > 0) {
        return error("User already registered, Please login");
      } else {
        const password = await bcrypt.hash(req.body.password, 10);
        await td.none(
          "INSERT INTO users(name,email,password) VALUES($1, $2, $3)",
          [req.body.fname + " " + req.body.lname, req.body.email, password]
        );
        td.none("COMMIT");
        return success("User registered successfully");
      }
    });
  } catch (e) {
    db.none("ROLLBACK");
    return error("Server error, can't register");
  }
};

exports.login = async (req,db=dbConnection) => {
  const user = await db.any("SELECT * FROM users where email=$1", [
    String(req.body.email).toLowerCase()
  ]);

  if (user.length) {
    const res = await bcrypt.compare(req.body.password, user[0].password);
    if (res) {
      const token = await jwt.sign({ email: req.body.email }, "thisIsKey");
      await db.none("UPDATE users SET jwt_token = $1 where email = $2", [
        token,
        req.body.email
      ]);

      return {
        code: 200,
        success: "Login successfully",
        email: req.body.email,
        userId: user[0].user_id,
        token: token
      };
    } else {
      return error("Please enter correct username password");
    }
  } else {
    return error("We cannot find an account with that email");
  }
};
