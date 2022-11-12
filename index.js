const express = require("express");
const nodemailer = require("nodemailer");
const multiparty = require("multiparty");
require("dotenv").config();
const PORT = process.env.PORT || 4000;
const app = express();
const transporter = nodemailer.createTransport({
  //service: 'Gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAILPASSWORD
  }
});


app.route("/").get(function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.use(express.static(__dirname + '/public'));


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});



app.post('/send', (req, res) => {
  
  let form = new multiparty.Form();
  let data = {};
  form.parse(req, function (err, fields) {
    Object.keys(fields).forEach(function (property) {
      data[property] = fields[property].toString();
    });
    const mail = {
      from: 'RN-BURENIE <okoroafordavid61@gmail.com>',
      to: 'contact@rnburenie.com',
      subject: 'BURENIE CONTACT',
      html: `<body style="margin: 0; padding: 0;"> 
            <table border="0" cellpadding="0" cellspacing="0" width="100%"> 
                <tr>
                    <td style="padding: 10px 0 30px 0;">
                      
                        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border: 1px solid #cccccc; border-collapse: collapse;">
                            <tr>
                                <td align="center" bgcolor="#70bbd9" style="padding: 40px 0 30px 0; color: #153643; font-size: 28px; font-weight: bold; font-family: Arial, sans-serif;">
                                    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/210284/h1.gif" alt="Creating Email Magic" width="300" height="230" style="display: block;" />
                                </td>
                            </tr>
                            <tr>
                                <td bgcolor="#ffffff" style="padding: 40px 30px 40px 30px;">
                                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                        <tr>
                                            <td style="color: #153643; font-family: Arial, sans-serif; font-size: 24px;">
                                                
                                                <b>${fields['Name']}</b>
                                            </td>
                                        </tr>
                                       
                                        </tr>
                                    </table>
                                </td>
                               
                               
                               
                        
                            </tr> 
                            <tr>
                            <th>Email</th>
                            <p>${fields['Email']} </p>
                          </tr>
                          <tr>
                            <td>Telephone</td>
                            <p> ${fields['Number']}</p>
                          </tr>
                          <tr>
                            <td>Message</td>
                            <td>${fields['Message']}</td>
                          </tr>  
                                      
                        </table>
                    </td>
                </tr>
            </table>
        </body>
            `,
  
    };
    transporter.sendMail(mail, (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).send("Something went wrong.");
      } else {
        res.status(200).send("Email successfully sent to recipient!");
      }
    });
  })
})