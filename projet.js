/*Lecture fichier*/
const fs = require('fs');

/*globale*/
var dir_projet = './projet_content/';

/*POur les 2*/

function recup_all_projet(){
  const fichiers = fs.readdirSync(dir_projet);
  return fichiers
}


/*Pour l'index*/
function recup_all_projet_info(){
  const fichiers = recup_all_projet();
  let info_index = new Array();
  for(let fichier of fichiers){
    let contenu = fs.readFileSync(dir_projet + fichier, 'utf8')
    let data = contenu.split('\n', 2); /*on veut juste les 2 premiers lignes*/
    info_index.push({
      titre: data[0],
      img: data[1]
    });
  }
  return info_index;
}

/*POur page projet*/
function rempli_projet(nom){
  let contenu = fs.readFileSync(dir_projet + nom, 'utf8')
  let data = contenu.split('\n');
  let info = {
    titre: data[0],
    banniere: data[2],
  }
  data.shift(); /*je supprime tout le contenu du tableau sauf la partie description*/
  data.shift();
  data.shift();
  info['description'] = data.join('\n'); //on recupere toute la description
  return info
}

module.exports = { recup_all_projet_info, rempli_projet, recup_all_projet };