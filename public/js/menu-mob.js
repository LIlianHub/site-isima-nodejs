var showMenu = false;

$("#nav-mobile").click(DepliMenu);
$("#menu-mobil").click(Abstract);
$(".menu-mobil-content").click(FermeMenu);
$(window).click(FermeMenu);

function DepliMenu(e){
        $('#menu-mobil').fadeIn("slow");
        showMenu = true;
        $('#menu-mobil').css('display', 'flex');
        $('html').css('overflow-y', 'hidden');
        e.stopPropagation();
}

function Abstract(e){
        e.stopPropagation();
}

function FermeMenu(e){
        if(showMenu){
                $('#menu-mobil').fadeOut("slow");
                $('html').css('overflow-y', 'visible');
                showMenu = false;
        }
        e.stopPropagation();
}