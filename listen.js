const express = require('express');
const listen = express();
const mail = require('./mail');

/*Pour les views*/
listen.set('views', './views');
listen.set('view engine', 'ejs');

/*Fichier public*/
listen.use(express.static(__dirname + '/public'));

/*Lire contenu json des requetes recu*/
listen.use(express.urlencoded({ extended: true }))
listen.use(express.json()); 

/* Page main */
listen.get('/', function(req, res) {
  res.render('main/index', {nb_projet: 3});
});

/*Mention*/
listen.get('/mention', function(req, res) {
  res.render('main/mention');
});

/*Index*/
listen.get('/index', function(req, res) {
  res.render('main/index', {nb_projet: 3});
});

/*projets*/
listen.get('/projet:projet_num', function(req, res) {
  res.render('projet/projet', {projet_num: req.params.projet_num});
});


/*Requete Ajax mail*/
listen.post('/ajax/envoiemail', function(req, res){
  let retour = "error";
  if(req.body.nom && req.body.email && req.body.message && req.body.sujet){
       retour = mail.EnvoieMail(req.body.nom, req.body.email, req.body.message, req.body.sujet);
  }
  res.send(200, retour);
});

/*Introuvable*/
listen.use(function(req, res, next){
  res.status(404);
  res.render('code_html/code', {num_erreur: 404, message: "Page introuvable"});
});

module.exports = listen;