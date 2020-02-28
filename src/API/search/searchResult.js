const dbConnection = require("../../services/connection");
const { error } = require("../messages/apiReplies");

exports.getSearchResult = async (req, db = dbConnection)  => {
  try {
      
    const data = await db.any(
      "select * from auction where vector @@ to_tsquery($1);",
      [req.body.query]
    );
    
    const current = await db.any(
      "SELECT auction_id,max(bid_amount) from bidding where auction_id in (select auction_id from auction where vector @@ to_tsquery($1)) GROUP BY auction_id",
      [req.body.query]
    );
    
    data.map(data => {
      for (let i = 0; i < current.length; i++)
        if (data.auction_id === current[i].auction_id) {
          data.current = current[i].max;
        }
    });
    console.log(data);
    
    return data;
  } catch (e) {
    console.log(e);
    return error("Server error");
  }
};