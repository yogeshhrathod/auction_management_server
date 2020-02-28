const express = require("express");
const router = express.Router();
const loginAndRegister = require("./authentication/loginAndRegister");
const profile = require("./profile/profile");
const imageUpload = require("./uploadImages/uploadProfilePic");
const addPost = require("./addPost/addPost");
const home = require("./auction/getAuction");
const auctionDetails = require("./auction/getAuctionDetails");
const bidding = require("./bidding/insertBidding");
const viewBidders = require("./bidding/viewBidders");
const myBiddings = require("./bidding/myBiddings");
const getWinner = require("./winner/getWinner");
const setWinner = require("./winner/setWinner");
const emailServices = require("../services/emailService");
const searchResult = require("./search/searchResult");


router.post("/register-user", async (req, res) => {
  const result = await loginAndRegister.register(req);
  res.status(result.code).send(result);
});
router.post("/login-user", async (req, res) => {
  const result = await loginAndRegister.login(req);
  res.status(result.code).send(result);
});
router.post("/user-profile", async (req, res) => {
  const result = await profile.getProfile(req);
  res.status(result.code).send(result);
});
router.post("/update-profile", async (req, res) => {
  const result = await profile.updateProfile(req);
  res.status(result.code).send(result);
});
router.post("/upload-image", async (req, res) => {
  const result = await imageUpload.fileUpload(req);
  res.status(result.code).send(result);
});
router.post("/add-post", async (req, res) => {
  const result = await addPost.postInsert(req);
  res.status(result.code).send(result);
});
router.post("/get-auctions", async (req, res) => {
  const result = await home.getAll(req);
  res.send(result);
});
router.post("/my-bidding", async (req, res) => {
  const result = await myBiddings.getMyBiddings(req);
  res.send(result);
});
router.post("/get-auction-details", async (req, res) => {
  const result = await auctionDetails.getDetails(req);
  res.send(result);
});
router.post("/bidding", async (req, res) => {
  const result = await bidding.insert(req);
  res.send(result);
});
router.post("/get-bidders", async (req, res) => {
  const result = await viewBidders.getBidders(req);
  res.send(result);
});
router.post("/get-winner", async (req, res) => {
  const result = await getWinner.getWinner(req);
  res.send(result);
});
router.post("/set-winner", async (req, res) => {
  const result = await setWinner.setWinner(req);
  res.send(result);
});
router.post("/get-searched-auctions", async (req, res) => {
  const result = await searchResult.getSearchResult(req);
  res.send(result);
});

router.post("/*", (req, res) => {
  res.send("wrong path");
});
router.post("/*", (req, res) => {
  res.send("wrong path");
});

module.exports = router;
