const search = require("../../src/API/search/searchResult");
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

describe("get search result", () => {
  beforeAll(async () => {
    await testCon.none("TRUNCATE TABLE auction CASCADE");
    await testCon.none(
      "INSERT INTO users(user_id,name,email,password) VALUES($1, $2, $3, $4)",
      ["1", "john wick", "john@gmail.com", "pass"]
    );
    await testCon.none(
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
  });

  it("should return 1 auction which search will be found", async () => {
    const s = await search.getSearchResult({
        body:{
            query:"title"
        }
    }, testCon);
    expect(s.length).toEqual(1);
  });
  it("should return 1 auctions because keyword will with description", async () => {
    const s = await search.getSearchResult({
        body:{
            query:"description"
        }
    }, testCon);
    expect(s.length).toEqual(1);
  });

  it("should return 0 auctions because keyword will not match", async () => {
    const s = await search.getSearchResult({
        body:{
            query:"turtle"
        }
    }, testCon);
    expect(s.length).toEqual(0);
  });

  afterAll(async () => {
    await testCon.none("TRUNCATE TABLE users CASCADE");
    await testCon.none("TRUNCATE TABLE auction CASCADE");
  });
});
