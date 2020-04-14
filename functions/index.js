const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require("nodemailer");
admin.initializeApp();

exports.sendMail = functions.https.onCall(async(array) => {
    async function main() {
      const name = array[0];
      const subject = array[1];
      const template = array[2];
      const body = array[3];
      const date = array[4];
      // Generate test SMTP service account from ethereal.email
      // Only needed if you don't have a real mail account for testing
      let testAccount = await nodemailer.createTestAccount();
  
      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: "mail.m-s-s.com",
        port: 1200,
        secure: false, // true for 465, false for other ports
        auth: {
          user: 'ethanclifton@m-s-s.com', // generated ethereal user
          pass: 'Burdsall&$97' // generated ethereal password
        }
      });
  
      // send mail with defined transport object
      let info = await transporter.sendMail({
        from:  "ethanclifton@m-s-s.com", // sender address
        to: "findusuc@gmail.com", // list of receivers
        subject: "Message from: " + name + " for " + date, // Subject line
        text: "message here", // plain text body
        html: "<b>Name: "+ name +"</b><br><b>Subject: "+ subject +"</b><br><b>Body: " + body + "</b><br><p>" + template + "</p>" // html body
      });
  
      console.log("Message sent: %s", await info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      if(await info.messageId){
        return "Success";
      }else{
        return "Failure";
      };
      
    }
    main().catch(console.error);
  });

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
