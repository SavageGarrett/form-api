var nodemailer = require('nodemailer');
const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.post('/contact_form', (req, res) => {
    // Send Email
    sendMail(req.body.email, req.body.name, req.body.email_from, req.body.message);
    res.redirect(req.body.redirect)
});

app.listen(process.env.PORT, () => console.log(`Example app listening at http://garrettcarder.com:${process.env.PORT}`));

// Send mail to email with 
sendMail = (email, name, email_from, message) => {
    console.log({auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS
      }})
    
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS
      }
    });
    
    var mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Someone is Trying to Contact You',
      html: `<h2>Someone is Trying to Contact You on your Website</h2><p>${name} is trying to contact you. <br>They left the message: ${message}<br>You can contact them at <a href="mailto:${email_from}">${email_from}</a></p>`
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
}