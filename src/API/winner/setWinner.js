const dbConnection = require("../../services/connection");
const { success, error } = require("../messages/apiReplies");
const emailServices = require("../../services/emailService");

exports.setWinner = async (req,db=dbConnection)  => {
  try {
    return await db.tx(async(dt)=>{
      await dt.none("UPDATE auction SET winner = $1 where auction_id=$2;", [
        req.body.userId,
        req.body.auctionId
      ]);

      const user = await dt.one("select * from users where user_id = $1", [
        req.body.userId
      ]);

      const auction = await dt.one(
        "select * from auction where auction_id = $1",
        [req.body.auctionId]
      );

      const seller = await dt.one(
        "select * from users where user_id = (select seller_id from auction where auction_id = $1);",
        [req.body.auctionId]
      );

      emailServices.sendMail(
        user.email,
        "Antique Auction : Bid Selected",
        `Hi ${user.name},\nCongratulations! Your bid for ${auction.title} has been selected by ${seller.name}\nPlease contact on ${seller.email} for further details.\nThanks \nAntique Auctions support`
      );
      return success("Winner has been set");
    })
    
  } catch (e) {
    console.log(e);

    return error("server error");
  }
};
