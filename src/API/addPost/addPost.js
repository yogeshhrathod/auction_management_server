const dbConnection = require("../../services/connection");
const { success, error } = require("../messages/apiReplies");
const uploadPic = require("../uploadImages/uploadAuctionImages");
exports.postInsert = async (req, db = dbConnection) => {
  try {
    const itemPic = req.files.file;
    const resultOfUpload = await uploadPic.fileUpload(itemPic);
    console.log('Redd', resultOfUpload)
    if (resultOfUpload.code === 400) return resultOfUpload;

    return await db.tx(async td => {
      const userId = await td.one(
        "SELECT user_id from users where email = $1",
        [req.body.email]
      );

      await td.none(
        `INSERT INTO auction (
          seller_id,
          title,
          description,
          initial_bid,
          exp_date,
          image_url,
          auction_type,
          bid_multiple,
           vector) VALUES ($1, $2, $3, $4, $5, $6, $7 ,$8 ,(to_tsvector($2) || to_tsvector($3)))`,
        [
          userId.user_id,
          req.body.title,
          req.body.description,
          req.body.initial_bid,
          req.body.exp_date,
          itemPic.name,
          req.body.type,
          req.body.multiple
        ]
      );
      td.none("COMMIT");
      return success("Auction created successfully");
    });
  } catch (e) {
    console.log(e);
    db.none("ROLLBACK");
    return error("Server error, cant register");
  }
};
