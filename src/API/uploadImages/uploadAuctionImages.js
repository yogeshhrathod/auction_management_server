const { success, error } = require("../messages/apiReplies");
exports.fileUpload = async (file) => {
  try {
    await file.mv("./images/auctions/" + file.name);
  } catch (e) {
    console.log(e);
    return error("Something went wrong");
  }
  return success("uploading successful");
};
