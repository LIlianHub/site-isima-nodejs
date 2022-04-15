$("#fleche-top").click(scrolltop);

/*Fleche pour remonter*/

function scrolltop(e){
    $('html,body').animate({scrollTop: $("#top-page").offset().top}, 'fast');
    e.preventDefault();
}

$(window).scroll(function(){
	posScroll = $(document).scrollTop();
	if(posScroll >=550){
        $('#fleche-top').css('display', 'block');}
	else{
        $('#fleche-top').css('display', 'none');}

});

/*Ancrage Menu ordi et mobile*/

$(".menu-mobil-content").click(ancrage);
$(".element-nav-content").click(ancrage);

function ancrage(e){
        let cible = $(e["currentTarget"]).attr('href');
        if(cible && cible.charAt(0) == '#'){
                $('html,body').animate({scrollTop: $(cible).offset().top}, 'fast');
                e.preventDefault();
        }
}

