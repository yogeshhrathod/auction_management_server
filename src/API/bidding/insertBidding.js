const dbConnection = require("../../services/connection");
const { success, error } = require("../messages/apiReplies");
exports.insert = async (req, db = dbConnection) => {
  try {
    return await db.tx(
     async td => {
        const current = await td.any(
          "SELECT max(bid_amount) from bidding where auction_id = $1",
          [req.body.auctionId]
        );
        if (current[0].max) {
          if (current[0].max < parseInt(req.body.newBidding)) {
            const isExist = await td.one(
              "SELECT count(user_id) from bidding where user_id=$1 and auction_id=$2",
              [req.body.userId, req.body.auctionId]
            );
    
            if (Number(isExist.count)) {
              await td.none(
                "update bidding set bid_amount = $1 where auction_id = $2 and user_id=$3",
                [req.body.newBidding, req.body.auctionId, req.body.userId]
              );
            } else {
              await td.none(
                "insert into bidding (auction_id,user_id,bid_amount) values ($1,$2,$3)",
                [req.body.auctionId, req.body.userId, req.body.newBidding]
              );
            }
          } else
            return error(
              "The current bid has been updated by some other user.Please refresh the page to know the current bid"
            );
        } else
          await td.none(
            "insert into bidding (auction_id,user_id,bid_amount) values ($1,$2,$3)",
            [req.body.auctionId, req.body.userId, req.body.newBidding]
          );
          td.none("COMMIT");
        return success(
          "Bid placed successfully.You will be notified over an email in case your bid gets selected."
        );
        
    });
   
  } catch (e) {
    db.none("ROLLBACK");
    console.log(e);
    return error("Server error");
  }
};
