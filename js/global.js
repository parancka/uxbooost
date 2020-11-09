$(function() {

/*    var do_translate = function() {
        $('#title').text($.i18n('title'));
        $('#subtitle').text($.i18n('subtitle'));
    };

    $.i18n().load({
        'en': 'http://localhost/landing/languages/en.json',
        'de': 'http://localhost/landing/languages/de.json'

    }).done(function() {
        $('select').on('change', function() {
            console.log(this.value);
            $.i18n().locale = this.value;
            do_translate();
        });
        do_translate();
    });*/


    jQuery('#fourth-featured .mainmenu li.close').on( "click", function(e) {
        e.preventDefault();
       /* $( this ).removeClass( "close" ).addClass( "open" );*/
        $( this ).toggleClass( "open" );
    });

});



