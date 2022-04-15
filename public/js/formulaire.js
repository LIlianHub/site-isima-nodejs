var NomOk = 0;
var EmailOk = 0;
var SujetOk = 0;
var MessageOk = 0;

$("#EnvoieEmail").submit(EnvoieEmail);
$("#nom").change(VerifNom);
$("#message").change(VerifMessage);
$("#sujet").change(VerifSujet);
$("#email").change(VerifEmail);

function VerifNom() {
    const saisie = $("#nom").val();
    if (!saisie.match(/(?=.{1,})/)) {
        NomOk = 0;
        RenvoieErreur("Le nom ne doit pas être vide !")
    }

    else {
        $('.text-alerte').empty();
        NomOk = 1;
    }
}

function VerifSujet() {
    const saisie = $("#sujet").val();
    if (!saisie.match(/(?=.{6,})/)) {
        SujetOk = 0;
        RenvoieErreur("Le sujet doit contenir au moins 6 caractères !")
    }

    else {
        $('.text-alerte').empty();
        SujetOk = 1;
    }
}

function VerifEmail() {
    const saisie = $("#email").val();
    if (!saisie.match(/^[\w-_\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
        EmailOk = 0;
        RenvoieErreur("L'email doit être valide  !")
    }

    else {
        $('.text-alerte').empty();
        EmailOk = 1;
    }
}

function VerifMessage() {
    const saisie = $("#message").val();
    if (!(saisie.length >= 10)) {
        MessageOk = 0;
        RenvoieErreur("Le message doit contenir au moins 10 caractères ")
    }

    else {
        $('.text-alerte').empty();
        MessageOk = 1;
    }
}


function EnvoieEmail(e) {
    e.preventDefault();
    $('html,body').animate({scrollTop: $(".formulaire").offset().top}, 'fast');
    const EnvoieOk = NomOk + EmailOk + SujetOk + MessageOk
    if (EnvoieOk == 4) {
        var envoie = new Object();
        envoie["nom"] = $("#nom").val();
        envoie["email"] = $("#email").val();
        envoie["message"] = $("#message").val();
        envoie["sujet"] = $("#sujet").val();
        
        var envoiejson = JSON.stringify(envoie);

        ResetForm();
        $.ajax({
            type: "POST",
            encoding: "UTF-8",
            url: "/ajax/envoiemail",
            data: envoiejson,
            contentType: 'application/json; charset=UTF-8',
            success: function (text) {
                if (text == "success") {
                    reussite();
                }
                else {
                    probleme(text);
                }
            }
        });
    }

    else {
        envoiePas();
    }
}

function ResetForm() {
    $("#EnvoieEmail").trigger("reset");
    NomOk = 0;
    EmailOk = 0;
    SujetOk = 0;
    MessageOk = 0;
}

function RenvoieErreur(message) {
    $('.text-alerte').empty();
    $('.text-alerte').css('background-color', 'red');
    $('.text-alerte').append(message);
}

function reussite() {
    $('.text-alerte').empty();
    $('.text-alerte').css('background-color', 'green');
    $('.text-alerte').append("Message bien envoyé !");
}

function probleme(text) {
    $('.text-alerte').empty();
    $('.text-alerte').css('background-color', 'red');
    $('.text-alerte').append("La fonctionnalité n'est plus disponible pour le moment !");
    //$('.text-alerte').append(text);
}

function envoiePas() {
    $('.text-alerte').empty();
    $('.text-alerte').css('background-color', 'red');
    $('.text-alerte').append("Un des champs n'est pas bien rempli !");
}
