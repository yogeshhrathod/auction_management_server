var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "admantiumboy@gmail.com",
    pass: "g0dof#ero"
  }
});


exports.sendMail = (receiver,subject,message) => {
  var mailOptions = {
    from: "Antique Auctions",
    to: receiver,
    subject: subject,
    text:message
  };
  
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
  return 
};
