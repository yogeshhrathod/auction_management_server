const getAuctionDetails = require("../../src/API/auction/getAuctionDetails");
const testCon = require("../testConnection/connection");
const data = {
  body: {
    user_id: 1,
    title: "title",
    description: "description",
    initial_bid: "400",
    exp_date: "2019-09-13",
    name: "post.jpg",
    type: 1,
    multiple: "340"
  }
};

describe("get all auction in db", () => {
  beforeAll(async () => {
    try {
      await testCon.none("TRUNCATE TABLE auction CASCADE");
      await testCon.none(
        "INSERT INTO users(user_id,name,email,password) VALUES($1, $2, $3, $4)",
        ["1", "john wick", "john@gmail.com", "pass"]
      );
      await testCon.none(
        `INSERT INTO auction (
          auction_id,
          seller_id,
          title,
          description,
          initial_bid,
          exp_date,
          image_url,
          auction_type,
          bid_multiple,
           vector) VALUES ($1, $2, $3, $4, $5, $6, $7 ,$8 ,$9,(to_tsvector($3) || to_tsvector($4)))`,
        [
          1,
          1,
          data.body.title,
          data.body.description,
          data.body.initial_bid,
          data.body.exp_date,
          data.body.name,
          data.body.type,
          data.body.multiple
        ]
      );
      await testCon.none(
        "insert into bidding (auction_id,user_id,bid_amount) values ($1,$2,$3)",
        [1, 1, 200]
      );
      await testCon.none(
        "insert into bidding (auction_id,user_id,bid_amount) values ($1,$2,$3)",
        [1, 1, 300]
      );
    } catch (e) {
      console.log(e);
    }
  });
  let req = {
    body: {}
  };

  req.body.auctionId = 1;

  it("should return auction", async () => {
    const s = await getAuctionDetails.getDetails(req, testCon);
    expect(s.auction).toEqual({
      auction_id: 1,
      seller_id: 1,
      title: "title",
      description: "description",
      initial_bid: 400,
      exp_date: new Date(s.auction.exp_date),
      image_url: "post.jpg",
      vector: "'descript':2 'titl':1",
      auction_type: 1,
      bid_multiple: 340,
      winner: null
    });
  });

  it("should return maximum current value for auction 1", async () => {
    const s = await getAuctionDetails.getDetails(
      {
        body: {
          auctionId: 1
        }
      },
      testCon
    );
    expect(s.current.max).toEqual(300);
  });
  afterAll(async () => {
    await testCon.none("TRUNCATE TABLE users CASCADE");
    await testCon.none("TRUNCATE TABLE auction CASCADE");
    await testCon.none("TRUNCATE TABLE bidding CASCADE");
  });
});
