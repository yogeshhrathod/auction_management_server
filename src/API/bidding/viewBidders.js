const dbConnection = require("../../services/connection");
const { success, error } = require("../messages/apiReplies");

exports.getBidders = async (req, db = dbConnection) => {
  try {
    return await db.any(
      'SELECT users."name",bidding.bid_amount, bidding.user_id from bidding INNER Join users on bidding.user_id= users.user_id WHERE bidding.auction_id=$1 order by bidding.bid_amount desc;',
      [req.body.auctionId]
    );
  } catch (e) {
    console.log(e);
    return error("Server error");
  }
};
