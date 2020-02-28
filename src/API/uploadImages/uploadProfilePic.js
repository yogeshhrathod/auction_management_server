const db = require("../../services/connection");
const { success, error } = require("../messages/apiReplies");
exports.fileUpload = async req => {
  if (Object.keys(req.files).length == 0) {
    return res.status(400).send("No files were uploaded.");
  }
  const profilePic = req.files.file;

  const ext = profilePic.mimetype.split("/")[1];

  await db.none("UPDATE users SET profile_pic = $1 where email = $2", [
    req.body.email + "." + ext,
    req.body.email
  ]);

  try {
    const t = await profilePic.mv(
      "./images/profile/" + req.body.email + "." + ext
    );
  } catch (e) {
    console.log(e);
    return error("Something went wrong");
  }
  return success("uploading successful");
};
