$('head').append('<link rel="stylesheet" href="https://kit-pro.fontawesome.com/releases/v5.13.0/css/pro.min.css" type="text/css" />');
$('<div/>', {
    id: 'accessibility',
    "class": '',
    title: 'Menu Accesibilidad'
}).appendTo('body');
let html = ' <nav class="menu-container">' +
    '<a href="#"  class="menu-btn"><i class="icon fas fa-universal-access fa-2x" aria-hidden="true"></i> </a>' +
    '<div class="menu-slide">' +
    '<ul class="menu-list">' +
    '<li class="menu-item "> ' +
    '<label>' +
    '<input type="checkbox" id="escala" name="escala">' +
    '<div class="escala icon-box BlackAndWhite">' +
    '<i class="fas fa-adjust fa-2x"></i>' +
    '</div>' +
    '</label><br>Cambiar escala de grises' +
    '</li>' +
    '<li class="menu-item "> ' +
    '<label>' +
    '<input type="checkbox" id="lector" name="lector">' +
    '<div class="lector icon-box ">' +
    '<i class="fas fa-assistive-listening-systems fa-2x"></i>' +
    '</div>' +
    '</label><br>Usar un lector de pantalla' +
    '</li>' +
    '<li class="menu-item "> ' +
    '<label>' +
    '<input type="checkbox" id="cursor" name="cursor">' +
    '<div class="cursor icon-box cCursor">' +
    '<i class="fas fa-mouse-pointer fa-2x"></i>' +
    '</div>' +
    '</label><br>Cambiar tamaño de cursor' +
    '</li>' +
    '<li class="menu-item "> ' +
    '<label>' +
    '<input type="checkbox" id="contraste" name="contraste">' +
    '<div class="contraste icon-box ">' +
    ' <i class="fas fa-palette InvertContrast fa-2x"></i>' +
    '</div>' +
    '</label><br>' +
    'Cambiar el contraste de color' +
    '</li>' +
    '<li class="menu-item "> ' +
    '<label>' +
    '<input type="checkbox" id="mask" name="mask">' +
    '<div class="icon-box mask activeMask">' +
    ' <i class="fas fa-grip-lines fa-2x"></i>' +
    '</div>' +
    '</label><br>' +
    'Mascara de lectura ' +
    '</li>' +
    '<li class="menu-item "> ' +
    '<label>' +
    '<input type="checkbox" id="guia" name="guia">' +
    '<div class="icon-box guia activeLineRead">' +
    ' <i class="fas fa-low-vision  fa-2x"></i>' +
    '</div>' +
    '</label><br>' +
    'Guia de Lectura' +
    '</li>' +
    '<li class="menu-item size0Font"> ' +
    '<div class="col-sm-12">' +
    '<div class="col-md-6 icon-box-simple pull-left dec-font"><i class="fas fa-text-size "></i><i class="fas fa-minus "></i></div> &nbsp; &nbsp;' +
    '<div  class="col-md-6 icon-box-simple pull-right inc-font"><i class="fas fa-text-size "></i><i class="fas fa-plus"></i></div>' +
    '</div>' +
    '</label><br>Cambiar tamaño' +
    '</li>' +
    '</ul>' +
    '</div>' +
    '</nav>'
$("#accessibility").append(html);
//$("#prueba").append(html);
// *** TO BE CUSTOMISED ***


var imagenes = new Array();

$(document).ready(function () {
    // Verificado de Activo de las opciones
    if (localStorage.getItem('activeGrayScale') == 'true') {
        $("#escala").prop("checked", true);
        $(".escala").addClass("icon-box-active");
        switchGrayScale();
    } else {
        $(".escala").removeClass("icon-box-active");
    }
    if (localStorage.getItem('activeContrast') == 'true') {
        $("#Contraste").prop("checked", true);
        $(".contraste").addClass("icon-box-active");
        switchContrast();
    } else {
        $(".contraste ").removeClass("icon-box-active");
    }
    if (localStorage.getItem('activeAudio') == 'true') {
        $("#lector").prop("checked", true);
        $(".lector").addClass("icon-box-active");
    } else {
        $(".lector").remove("icon-box-active");
    }
    if (localStorage.getItem('activeCursor') == 'true') {
        $("#cursor").prop("checked", true);
        $(".cursor").addClass("icon-box-active");
        activateCursor();
    } else {
        $(".cursor").remove("icon-box-active");
    }
    if (localStorage.getItem('activeMask') == 'true') {
        $("#mask").prop("checked", true);
        $(".mask").addClass("icon-box-active");
        activateMask();
    } else {
        $(".mask").remove("icon-box-active");
    }
    if (localStorage.getItem('activeLineRead') == 'true') {
        $("#guia").prop("checked", true);
        $(".guia").addClass("icon-box-active");
        activateGuide();
    } else {
        $(".guia").remove("icon-box-active");
    }
    var container = $('main');

    var fontChanger = $('.font-changer');
    // var paragraphSize = container.find('p').css('font-size');
    var curSize;
    var winWidth = $(window).width();
    var containerWidth = $('.container').width();
    $('.inc-font').on('click', function (e) {
        // var that =$(this);

        curSize = parseInt(container.find('p').css('font-size')) + 1;
        if (curSize <= 26) {
            container.find('p, li, dd, dt, a, h1, h2, h3, h4, .form-control, .btn, figcaption, blockquote').each(function (index) {
                $(this).css({'font-size': (parseInt($(this).css('font-size')) + 1)});
                if ($(this).is('p, h2, h3, h4')) {
                    $(this).css({'margin-bottom': (parseInt($(this).css('margin-bottom')) + 2)});
                }
            });
        }
        e.preventDefault();
    });
    // Speak
    $('div>a>img, img, p, li, dd, dt, a, h1, h2, h3, h4').mouseover(function (e) {
        if (ctrlPermisao == 0) {
            $("#lector").trigger("change")
        }
        ;
        let type = $(this).get(0).tagName;
        let value = '';
        if (type == 'IMG') {
            value = $(this).get(0).alt;
        } else {
            value = $(this).text();
        }
        if (localStorage.getItem('activeAudio') === 'true' && value != '') {
            const msg = new SpeechSynthesisUtterance(value);
            window.speechSynthesis.speak(msg);

        }
    }).mouseout(function () {
        speechSynthesis.cancel();
    });


    $('.dec-font').on('click', function (e) {
        // var that =$(this);

        curSize = parseInt(container.find('p').css('font-size')) - 1;
        if (curSize >= 11) {
            container.find('p, li, dd, dt, a, h1, h2, h3, h4, .form-control, .btn, figcaption, blockquote').each(function (index) {
                $(this).css({'font-size': (parseInt($(this).css('font-size')) - 1)});
                if ($(this).is('p, h2, h3, h4')) {
                    $(this).css({'margin-bottom': (parseInt($(this).css('margin-bottom')) - 2)});
                }
            });
        }
        e.preventDefault();
    });
    $("#barra-accesibilidad").hover(
        function () {
            check_altura_hover(true);
        },
        function () {
            check_altura_hover(false);
        });

    $('.BlackAndWhite').click(function () {
        validateCtrlGrayScale();

    });
    /*
    * Cambio de Tamaño de cursor en pantalla
    * */

    $(document).on("click mousemove", "body", function (e) {
        var x = e.clientX;
        var y = e.clientY;
        var newposy_top = y - 30;
        var newposy_bottom = y + 30;
        var newposY = y - 5;
        var newposX = x - 110;
        if (localStorage.getItem('activeMask')) {
            $('.uw-zoom-exclude_top').css("height", newposy_top);
            $('.uw-zoom-exclude_bottom').css("top", newposy_bottom);
        }
        if (localStorage.getItem('activeLineRead')) {
            $('.separator').css({
                left: 0,
                top: e.pageY
            });
            //   $(".separator").css("transform", "translate3d(" + newposX + "px," + newposY + "px,0px)");
        }
    });

    $('.cCursor').click(function () {
 activateCursor();

    });
    function activateCursor(){
        if (localStorage.getItem('activeCursor') == null) {
            localStorage.setItem('activeCursor', true);
            $("body").addClass("cursor-big");
            $("a").addClass("cursor_pointer");
            $(".cursor").addClass("icon-box-active");
        } else if (localStorage.getItem('activeCursor') == 'false') {
            localStorage.setItem('activeCursor', true);
            $("body").addClass("cursor-big");
            $("a").addClass("cursor_pointer");
            $(".cursor").addClass("icon-box-active");
        } else {

            localStorage.setItem('activeCursor', false);
            $("body").removeClass("cursor-big");
            $("a").removeClass("cursor_pointer");
            $(".cursor").removeClass("icon-box-active");
        }

    }
    var ctrlCreateMask = 0;
    $('.activeMask').click(function () {
        activateMask();
    });
    function activateMask(){
        if (ctrlCreateMask == 0) {
            ctrlCreateMask = 1;
            createMask();
        }
        if (localStorage.getItem('activeMask') == null) {
            localStorage.setItem('activeMask', true);
            $(".maskRead").fadeIn("slow");
            $(".mask").addClass("icon-box-active");
        } else if (localStorage.getItem('activeMask') == 'false') {
            localStorage.setItem('activeMask', true);
            $(".maskRead").fadeIn("slow");
            $(".mask").addClass("icon-box-active");
        } else {
            localStorage.setItem('activeMask', false);
            $(".maskRead").fadeOut("slow");
            $(".mask").removeClass("icon-box-active");
        }
    }
    var ctrlLineRead = 0;
    $('.activeLineRead').click(function () {
        activateGuide();

    });
    function activateGuide(){
        if (ctrlLineRead == 0) {
            ctrlLineRead = 1;
            createLineRead();
        }
        // chequear bandera
        cb = $('guia');
        cb.val(cb.prop('checked'));
        if (localStorage.getItem('activeLineRead') == null) {
            localStorage.setItem('activeLineRead', true);
            $(".separator").fadeIn("slow");
            $(".guia").addClass("icon-box-active");
        } else if (localStorage.getItem('activeLineRead') == 'false') {
            localStorage.setItem('activeLineRead', true);
            $(".separator").fadeIn("slow");
            $(".guia").addClass("icon-box-active");
        } else {
            localStorage.setItem('activeLineRead', false);
            $(".separator").fadeOut("slow");
            $(".guia").removeClass("icon-box-active");
        }
    }
    $('.InvertContrast').click(function () {
        validateCtrlContrast();
    });

    $.each($('img'), function (i, l) {
        imagenes[i] = 'imagen_' + i;
        $("h3").addClass("imgBW");
    });


    var ctrlPermisao = 0;
    $("#lector").change(function () {
        var $input = $(this);
        $input.prop("checked")
        ctrlPermisao = 1;
        let msg = '';
        if ($input.prop("checked")) {
            localStorage.setItem('activeAudio', $input.prop("checked"));
            $(".lector").addClass("icon-box-active");
            msg = new SpeechSynthesisUtterance("Audio Activado");
            window.speechSynthesis.speak(msg);
        } else {
            localStorage.setItem('activeAudio', $input.prop("checked"));
            $(".lector").removeClass("icon-box-active");

        }
    });
    var fontChanger = $('.font-changer');
    if ($('.font-changer').length) {
        $('.nm-font').on('click', function (e) {
            // var that =$(this);
            container.find('p, li, dd, dt, a, h1, h2, h3, h4, .form-control, .btn, figcaption').each(function (index) {
                $(this).css({'font-size': '1.2em'});
                if ($(this).is('p, h2, h3, h4')) {
                    $(this).css({'margin-bottom': '1.4em'});
                }
            });
        });

        $('.md-font').on('click', function (e) {
            // var that =$(this);

            container.find('p, li, dd, dt, a, h1, h2, h3, h4, .form-control, .btn, figcaption').each(function (index) {
                $(this).css({'font-size': '1.5em'});
                if ($(this).is('p, h2, h3, h4')) {
                    $(this).css({'margin-bottom': '2em'});
                }
            });
        });

        $('.lg-font').on('click', function (e) {
            // var that =$(this);

            container.find('p, li, dd, dt, a, h1, h2, h3, h4, .form-control, .btn').each(function (index) {
                $(this).css({'font-size': '2em'});

                if ($(this).is('p, h2, h3, h4')) {
                    $(this).css({'margin-bottom': '3em'});
                }
            });
        });


        fontChanger.stop().css({'left': ((winWidth / 2) - (containerWidth / 2)) - (fontChanger.width() + 20)});

        $(window).on('resize', function () {
            winWidth = $(window).width();
            containerWidth = $('.container').width();
            if ($(window).innerWidth() <= 1024) {
                fontChanger.stop().animate({'left': '-50px'});
            } else {
                fontChanger.stop().animate({'left': ((winWidth / 2) - (containerWidth / 2)) - (fontChanger.width() + 20)});
            }
        });
    }
});

var style_cookie_name = "css-estilo-de-color";
var style_cookie_cursor = "tamanio-cursor"
var style_cookie_duration = 30;

function createMask() {
    $('<div/>', {
        id: 'maskAccesibility',
        "class": '',
        title: 'Mascara Accesibilidad'
    }).appendTo('body');

    let html_mask = '<div class="maskRead  uw-zoom-exclude_top"\n' +
        '     style="position: fixed !important; z-index: 2147483647 !important;\n' +
        '      width: 100% !important;\n' +
        '      background: rgba(0, 0, 0, 0.5);\n' +
        '       !important;\n' +
        '       top: 0px; height: 438px;"\n' +
        '     uw-cer-popup-wrapper="">\n' +
        '    <div style="width: 100% !important; height: 8px !important; position: absolute !important;\n' +
        '     background: #B38D5D;\n' +
        '     bottom: 0px;"\n' +
        '    ></div>\n' +
        '</div>\n' +
        '\n' +
        '<div class="maskRead  uw-zoom-exclude_bottom" uw-cer-popup-wrapper=""\n' +
        '     style="position: fixed !important; z-index: 2147483647 !important;\n' +
        '     width: 100% !important; background: rgba(0, 0, 0, 0.5)\n' +
        '     !important;  height: 100%;">\n' +
        '    <div style="width: 100% !important; height: 8px !important; position: absolute !important; background: #7A1B33; top: 0px;"></div>\n' +
        '</div>';

    $("#maskAccesibility").append(html_mask);
}

function createLineRead() {
    $('<div/>', {
        id: 'separator',
        "class": 'separator',
        title: 'Linea de lectura Accesibilidad'
    }).appendTo('body');

}

// *** Validacion de banderas ***
// 1 validar colores si es inver o escala de grises
// 2 Si inver = true poner  false a escala de grises
// 3
function ValidationFlagsFromPaginador() {
    if (localStorage.getItem('activeGrayScale') == 'true') {
        switchGrayScale();
    }
    if (localStorage.getItem('activeContrast') == 'true') {
        switchContrast();
    }
}

function speakLector(val, speak) {
    if (localStorage.getItem('activeAudio') == 'true' && speak != '') {
        speechSynthesis.speak(new SpeechSynthesisUtterance(speak));
    }
}


// Invierte el color a escala de grises
function switchGrayScale() {

    if (localStorage.getItem('activeGrayScale') == 'true') {

        $(".container").addClass("imgBW");
        $.each($('img'), function (i, l) {
            imagenes[i] = 'imagen_' + i;
            $("img").addClass("imgBW");
        });
    } else {
        $(".container").removeClass("imgBW");
        $.each($('img'), function (i, l) {
            imagenes[i] = 'imagen_' + i;
            $("img").removeClass("imgBW");
        });
    }

}

function validateCtrlGrayScale() {

    if (localStorage.getItem('activeGrayScale') == 'null') {
        localStorage.setItem('activeGrayScale', true);
        $(".escala").removeClass("icon-box-active");
        switchGrayScale();
    } else if (localStorage.getItem('activeGrayScale') == 'true') {
        localStorage.setItem('activeGrayScale', false);
        $(".escala").removeClass("icon-box-active");
        switchGrayScale();
    } else {
        localStorage.setItem('activeGrayScale', true);
        switchGrayScale();
        $(".escala").addClass("icon-box-active");
    }
}

function validateCtrlContrast() {
    if (localStorage.getItem('activeContrast') == null) {
        localStorage.setItem('activeContrast', true);

        $(".contraste").addClass("icon-box-active");
        switchContrast();
    } else if (localStorage.getItem('activeContrast') == 'false') {
        localStorage.setItem('activeContrast', true);
        $(".contraste").addClass("icon-box-active");
        switchContrast();
    } else {
        localStorage.setItem('activeContrast', false);
        $(".contraste").removeClass("icon-box-active");
        switchContrast();
    }
}

function switchContrast() {
    var container = $('main');

    if (localStorage.getItem('activeContrast') == 'true') {
        container.find('.btn').each(function (index) {
            $(this).css({"filter": "invert(1)"});
        });
        $.each($('img'), function (i, l) {
            imagenes[i] = 'imagen_' + i;
            $("img").css({"filter": "invert(1)"});
        });
    } else {
        container.find('.btn').each(function (index) {
            $(this).css({"filter": "invert(0)"});
        });
        $.each($('img'), function (i, l) {
            imagenes[i] = 'imagen_' + i;
            $("img").css({"filter": "invert(0"});
        });
    }
}


function switch_style(css_title) {
    // You may use this script on your site free of charge provided
    // you do not remove this notice or the URL below. Script from
    // http://www.thesitewizard.com/javascripts/change-style-sheets.shtml
    var i, link_tag;
    for (i = 0, link_tag = document.getElementsByTagName("link");
         i < link_tag.length; i++) {
        if ((link_tag[i].rel.indexOf("stylesheet") != -1) &&
            link_tag[i].title) {
            link_tag[i].disabled = true;
            if (link_tag[i].title == css_title) {
                link_tag[i].disabled = false;
            }
        }

        set_cookie(style_cookie_name, css_title,
            style_cookie_duration);
    }
}

function set_style_from_cookie() {
    var css_title = get_cookie(style_cookie_name);
    if (css_title.length) {
        switch_style(css_title);
    }

    var css_cursor = get_cookie(style_cookie_cursor);
    if (css_cursor.length) {
        set_cursor_from_cookie(css_cursor);
    }
}


var r = document.getElementById('tipografia-slider');

var getValStr = function (el, p) {
    val = el.value;
    return val;
};

//IE no tiene addEventListener, por eso este if


function aumentarZoom($value) {
    //halfDiferencia contiene la mitad de la resta entre el ancho de la ventana (resolución de monitor más o menos) y
    //el ancho del contenedor. Esto es para que transform-origin no se despegue tanto desde la izquierda.
    var halfDiferencia = parseInt(($(window).width() - jsAncho) / 2, 10);

    document.getElementById('container-accesibilidad-zoom').style.cssText = 'transform: scale(' + $value + '); transform-origin: ' + halfDiferencia + 'px 0 0;';

}

function set_cursor_from_cookie(css_cursor) {
    if (css_cursor == "big") {
        grow_cursor();
    } else {
        reset_cursor();
    }

}


function grow_cursor() {

    set_cookie(style_cookie_cursor, "big",
        style_cookie_duration);

    return false;
}

function reset_cursor() {
    $("*").css("cursor", "auto");

    set_cookie(style_cookie_cursor, "small",
        style_cookie_duration);

    return false;
}

//fin tamaño del puntero/cursor del mouse grande

//-----------------------------------------------------------------------

// alterar alto de una div segun alto de la barra de accesibilidad

// Cuando la web se angosta, la barra toma dos o tres renglones de alto. En este caso, "empujamos" toda la web, aumentando el alto de una div
// que se ubica arriba de todo.
var altura_barra;
var quite_las_lineas = false;


function check_altura_hover(inner) {
    if ($(window).width() < 1534 && inner) {
        $("#ul-barra-accesibilidad li").css({"border-left-style": "none"});
        quite_las_lineas = true;
    } else if ($(window).width() < 1534 && !inner && !quite_las_lineas) {
        $("#ul-barra-accesibilidad li").css({"border-left-style": "solid"});
        quite_las_lineas = false;
    }
}

function ajustar_div_variable() {
    altura_barra = $("#ul-barra-accesibilidad").outerHeight(); //tomo la altura actual de la barra
    document.getElementById('div-altura-variable').style.cssText = 'height: ' + altura_barra + 'px;'; //escribo la altura actual de la barra en el div de altura variable

    //Quito las vertical lines de la barra si tiene más de un renglón.
    if (altura_barra > 54) {
        $("#ul-barra-accesibilidad li").css({"border-left-style": "none"});
        quite_las_lineas = true;
    } else {
        $("#ul-barra-accesibilidad li").css({"border-left-style": "solid"});
        quite_las_lineas = false;
    }


}

;