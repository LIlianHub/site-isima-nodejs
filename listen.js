const express = require('express');
const listen = express();
const mail = require('./mail');
const projet = require('./projet');

/*Pour les views*/
listen.set('views', './views');
listen.set('view engine', 'ejs');

/*Fichier public*/
listen.use(express.static(__dirname + '/public'));

/*Lire contenu json des requetes recu*/
listen.use(express.urlencoded({ extended: true }))
listen.use(express.json()); 

/*https */
listen.enable('trust proxy')

listen.use(function(req, res, next) {
  if (process.env.NODE_ENV != 'development' && !req.secure) {
     return res.redirect("https://" + req.headers.host + req.url);
  }
  next();
})


/* Page main */
listen.get('/', function(req, res) {
  let info_projet = projet.recup_all_projet_info();
  res.render('main/index', {nb_projet: info_projet.length, info_projet: info_projet});
});

/*Mention*/
listen.get('/mention', function(req, res) {
  res.render('main/mention');
});

/*Index*/
listen.get('/index', function(req, res) {
  let info_projet = projet.recup_all_projet_info();
  res.render('main/index', {nb_projet: info_projet.length, info_projet: info_projet});
});

/*projets*/
listen.get('/projet-:projet_nom', function(req, res) {
  let all_projet = projet.recup_all_projet();
  if(all_projet.indexOf(req.params.projet_nom) != -1){ //l'article existe
    let data_page = projet.rempli_projet(req.params.projet_nom);
    res.render('projet/projet_temp', {
      titre: data_page['titre'],
      banniere: data_page['banniere'],
      description: data_page['description']});
  }
  else{
    res.status(404);
    res.render('code_html/code', {num_erreur: 404, message: "Page introuvable, peut être que le projet n'existe plus."});
  }
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