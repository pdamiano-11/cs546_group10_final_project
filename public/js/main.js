let current_mode = " ";

(function($) {


    const colorMode = $('#colors');
    const realName = $('#real_name');
    const locationTrack = $('#location_trank');



    $('#settings-form').on('submit', function (event) {
        event.preventDefault();

        console.log("Settings Form Submitted");
        
        if (colorMode.val() == 'normal'){
            alert('Normal Mode Activated');
            $('#main_body').removeClass('body_dark').removeClass('body_t').removeClass('body_d').removeClass('body_p');
            $('#main_footer').removeClass('footer_dark').removeClass('footer_t').removeClass('footer_d').removeClass('footer_p');
            current_mode = 'normal';
        }
        if (colorMode.val() == 'dark'){
            alert('Dark Mode Activated');
            $('#main_body').removeClass('body_dark').removeClass('body_t').removeClass('body_d').removeClass('body_p');
            $('#main_footer').removeClass('footer_dark').removeClass('footer_t').removeClass('footer_d').removeClass('footer_p');
            $('#main_body').addClass('body_dark');
            $('#main_footer').addClass('footer_dark');
            current_mode = 'dark';
        }
        if (colorMode.val() == 'tritanopia'){
            alert('Tritanopia Mode Activated');
            $('#main_body').removeClass('body_dark').removeClass('body_t').removeClass('body_d').removeClass('body_p');
            $('#main_footer').removeClass('footer_dark').removeClass('footer_t').removeClass('footer_d').removeClass('footer_p');
            $('#main_body').addClass('body_t');
            $('#main_footer').addClass('footer_t');
            current_mode = 'tritanopia';
        }
        if (colorMode.val() == 'deutanopia'){
            alert('Deutanopia Mode Activated');
            $('#main_body').removeClass('body_dark').removeClass('body_t').removeClass('body_d').removeClass('body_p');
            $('#main_footer').removeClass('footer_dark').removeClass('footer_t').removeClass('footer_d').removeClass('footer_p');
            $('#main_body').addClass('body_d');
            $('#main_footer').addClass('footer_d');
            current_mode = 'deutanopia';
        }
        if (colorMode.val() == 'protanopia'){
            alert('Protanopia Mode Activated');
            $('#main_body').removeClass('body_dark').removeClass('body_t').removeClass('body_d').removeClass('body_p');
            $('#main_footer').removeClass('footer_dark').removeClass('footer_t').removeClass('footer_d').removeClass('footer_p');
            $('#main_body').addClass('body_p');
            $('#main_footer').addClass('footer_p');
            current_mode = 'protanopia';
        }
        if (realName.val() == 'yes_name'){
            // create something to show/hide name
            $('#profile_name').show();
        }
        if (realName.val() == 'no_name'){
            // create something to show/hide name
            $('#profile_name').hide();
        }
        if (locationTrack.val() == 'yes_track'){
            //figure out how to track location
        }
        if (locationTrack.val() == 'no_track'){
            //figure out how to track location
        }

    });


    /*
    $( document ).ready(function() {
        console.log( "Checking for color mode." );
        if (current_mode == 'normal'){
            console.log("Normal Mode Activated");
            $('#main_body').removeClass('body_dark').removeClass('body_t').removeClass('body_d').removeClass('body_p');
            $('#main_footer').removeClass('footer_dark').removeClass('footer_t').removeClass('footer_d').removeClass('footer_p');
            current_mode = 'normal';
        }

        else if(current_mode == 'dark'){
            console.log('Dark Mode Activated');
            $('#main_body').removeClass('body_dark').removeClass('body_t').removeClass('body_d').removeClass('body_p');
            $('#main_footer').removeClass('footer_dark').removeClass('footer_t').removeClass('footer_d').removeClass('footer_p');
            $('#main_body').addClass('body_dark');
            $('#main_footer').addClass('footer_dark');
            current_mode = 'dark';
        }

        else if(current_mode == 'tritanopia'){
            console.log('Tritanopia Mode Activated');
            $('#main_body').removeClass('body_dark').removeClass('body_t').removeClass('body_d').removeClass('body_p');
            $('#main_footer').removeClass('footer_dark').removeClass('footer_t').removeClass('footer_d').removeClass('footer_p');
            $('#main_body').addClass('body_t');
            $('#main_footer').addClass('footer_t');
            current_mode = 'tritanopia';
        }

        else if(current_mode == 'deutanopia'){
            console.log('Deutanopia Mode Activated');
            $('#main_body').removeClass('body_dark').removeClass('body_t').removeClass('body_d').removeClass('body_p');
            $('#main_footer').removeClass('footer_dark').removeClass('footer_t').removeClass('footer_d').removeClass('footer_p');
            $('#main_body').addClass('body_d');
            $('#main_footer').addClass('footer_d');
            current_mode = 'deutanopia';
        }

        else if(current_mode == 'protanopia'){
            console.log('Protanopia Mode Activated');
            $('#main_body').removeClass('body_dark').removeClass('body_t').removeClass('body_d').removeClass('body_p');
            $('#main_footer').removeClass('footer_dark').removeClass('footer_t').removeClass('footer_d').removeClass('footer_p');
            $('#main_body').addClass('body_p');
            $('#main_footer').addClass('footer_p');
            current_mode = 'protanopia';
        }
    });
    */


})(window.jQuery);
