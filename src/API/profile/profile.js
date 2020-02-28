const dbConnection = require("../../services/connection");
const { success, error } = require("../messages/apiReplies");

exports.getProfile = async (req, db = dbConnection)  => {
  
  const user = await db.any("SELECT * FROM users where user_id=$1", [
    req.body.id
  ]);  
  return {
    code: 200,
    name: user[0].name,
    bio: user[0].bio,
    email: user[0].email,
    profilePic: user[0].profile_pic
  };
};

exports.updateProfile = async (req, db = dbConnection)  => {
  try {
    return await db.tx(async(td)=>{
      await td.none("UPDATE users SET name = $1,bio = $2 where email = $3", [
        req.body.name,
        req.body.bio,
        req.body.email
      ]);
      td.none("COMMIT");
      return success("Profile updated successfully");

    })
    
  } catch (e) {
    db.none("ROLLBACK");
    return error("server error");
  }
};
