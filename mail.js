const nodemailer = require('nodemailer');
const fs = require('fs');

function recup_login(){
  try {
    let data = fs.readFileSync('./login_mail', 'utf8');
    let logins = data.split('\n');
    return logins;
  } catch (error) {
    return null;
  }
}

function EnvoieMail(nom_env, email_env, message_env, sujet_env){
    let a_envoyer = "De " + nom_env + " (" + email_env + "):\n\n" + message_env;
    var retour_mail = "success";

    let logins = recup_login();
    if(logins){
        var transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
              user: logins[0],
              pass: logins[1]
            },
            tls: {
              rejectUnauthorized: false
          },
          });
      
        var mailOptions = {
          from: 'BotMail <assistancemail@gmail.com>', 
          to: 'lilian.ballejos@hotmail.fr', 
          subject: sujet_env, 
          text: a_envoyer
        };
      
        transporter.sendMail(mailOptions, function(error, info){
              if (error) {
                console.log(error);
                retour_mail = "error";
              } else {
                console.log('Email sent: ' + info.response);
              }
          });
    }
    else{
      retour_mail = "error";
    }
    return retour_mail;
}


module.exports = { EnvoieMail };



