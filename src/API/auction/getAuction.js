
const { error } = require("../messages/apiReplies");
const dbConnection = require("../../services/connection");
exports.getAll = async (req,db=dbConnection) => {
  // if id passed the users posted auction else all auctions
  try {
    if (req.body.id) {
      return await db.tx(async td => {
        const data = await td.any(
          "SELECT * from auction where seller_id=$1 order by auction_id desc",
          [req.body.id]
        );
        const current = await td.any(
          "SELECT auction_id,max(bid_amount) from bidding where auction_id in (SELECT auction_id from auction where seller_id=$1) GROUP BY auction_id",
          [req.body.id]
        );

        data.map(data => {
          for (let i = 0; i < current.length; i++)
            if (data.auction_id === current[i].auction_id) {
              data.current = current[i].max;
            }
        });
        return data;
      });
    } else {
      return await db.tx(async td => {
        const data = await td.any(
          "SELECT * from auction where winner IS NULL order by auction_id desc;"
        );
        const current = await td.any(
          "SELECT auction_id,max(bid_amount) from bidding GROUP BY auction_id;"
        );

        data.map(data => {
          for (let i = 0; i < current.length; i++)
            if (data.auction_id === current[i].auction_id) {
              data.current = current[i].max;
            }
        });

        return data;
      });
    }
  } catch (e) {
    console.log(e);
    return error("Server error");
  }
};
