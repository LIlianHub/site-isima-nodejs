const nodemailer = require('nodemailer');
 
function EnvoieMail(nom_env, email_env, message_env, sujet_env){
    let a_envoyer = "De " + nom_env + " (" + email_env + "):\n\n" + message_env;
    var retour_mail = "success";

    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: 'assistancemaillilian@gmail.com',
          pass: 'mdp12345MAILlilian'
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

    return retour_mail;
}


module.exports = { EnvoieMail };



