const dbConnection = require("../../services/connection");
const {error } = require("../messages/apiReplies");

exports.getMyBiddings = async (req, db = dbConnection) => {
  try {
    
    const data = await db.any(
      "SELECT * from auction where auction_id in (SELECT DISTINCT(auction_id) from bidding where user_id = $1) order by auction_id desc",
      [req.body.id]
    );

    const current = await db.any(
      "SELECT auction_id,max(bid_amount) from bidding where auction_id in (SELECT DISTINCT(auction_id) from bidding where user_id = $1) GROUP BY auction_id",
      [req.body.id]
    );

    data.map(data => {
      for (let i = 0; i < current.length; i++)
        if (data.auction_id === current[i].auction_id) {
          data.current = current[i].max;
        }
    });

    return data;

  } catch (e) {
    console.log(e);
    return error("Server error");
  }
};
