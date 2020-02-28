const dbConnection = require("../../services/connection");
// const { success, error } = require("../messages/apiReplies");

exports.getWinner = async (req,db=dbConnection) => {

  const user = await db.any("SELECT winner FROM auction where auction_id=$1", [
    req.body.auctionId
  ]);
  if (user.length)
    return {
      code: 200,
      winner: user[0].winner
    };
  else {
    return {
      code: 400
    };
  }
};
