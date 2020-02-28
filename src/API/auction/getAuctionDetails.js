const dbConnection = require("../../services/connection");
const { error } = require("../messages/apiReplies");
exports.getDetails = async (req,db=dbConnection) => {
  try {
    const auction = await db.one(
      "SELECT * from auction where auction_id = $1",
      [req.body.auctionId]
    );

    const current = await db.one(
      "SELECT max(bid_amount) from bidding where auction_id = $1",
      [req.body.auctionId]
    );

    return { auction, current };
  } catch (e) {
    console.log(e);
    return error("Server error");
  }
};
