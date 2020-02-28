const insertBidding = require("../../src/API/bidding/insertBidding");
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

describe("inserting bidding", () => {
  beforeAll(async () => {
    try {
      await testCon.none("TRUNCATE TABLE auction CASCADE");
      await testCon.none("TRUNCATE TABLE bidding CASCADE");
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

  it("should insert new bidding in db", async () => {
    const s = await insertBidding.insert(
      {
        body: {
          auctionId: 1,
          userId:1,
          newBidding:400
        }
      },
      testCon
    );    
    expect(s.code).toEqual(200);
  });
  it("should return error for inserting lower bid than current higher", async () => {
    const s = await insertBidding.insert(
      {
        body: {
          auctionId: 1,
          userId:1,
          newBidding:200
        }
      },
      testCon
    );    
    expect(s.code).toEqual(400);
  });

  afterAll(async () => {
    await testCon.none("TRUNCATE TABLE users CASCADE");
    await testCon.none("TRUNCATE TABLE auction CASCADE");
  });
});
