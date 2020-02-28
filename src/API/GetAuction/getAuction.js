const db = require("./../../Database/connection");
const { success, error } = require("./../messages/ApiReply");

exports.getAll = async req => {
  try {
    if (req.body.id) {

      // SELECT * from auction where seller_id=(select user_id from users where email='po') order by auction_id desc
      const data = await db.any(
        "SELECT * from auction where seller_id=$1 order by auction_id desc",
        [req.body.id]
      );
      const current = await db.any(
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
    }
     
    
    else {
      const data = await db.any(
        "SELECT * from auction order by auction_id desc"
      );
      const current = await db.any(
        "SELECT auction_id,max(bid_amount) from bidding GROUP BY auction_id;"
      );
      // let completeData = [];
      data.map((data, index) => {
        for (let i = 0; i < current.length; i++)
          if (data.auction_id === current[i].auction_id) {
            data.current = current[i].max;
            // completeData[index] = data;
          }
      });
      console.log(data);

      return data;
    }
  } catch (e) {
    console.log(e);
    return error("Server error");
  }
};
