const nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: 'smtp.example.com',
    port: 465,
    secure: true, // secure:true for port 465, secure:false for port 587
    auth: {
        user: 'username@example.com',
        pass: 'userpass'
    }
});


function email(userEmail){
  // setup email data with unicode symbols
  let mailOptions = {
      from: '"Fred Foo 👻" <foo@blurdybloop.com>', // sender address
      to: userEmail, // list of receivers
      subject: 'Table Ready', // Subject line
      text: 'Hello Customer', // plain text body
      html: '<b>Your table is ready!</b>' // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message %s sent: %s', info.messageId, info.response);
  });
}

module.exports = email;