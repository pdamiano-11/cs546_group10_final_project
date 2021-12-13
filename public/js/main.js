let current_mode = " ";

(function($) {


    const colorMode = $('#colors');
    const realName = $('#real_name');
    const locationTrack = $('#location_track');



    window.addEventListener('load', function () {
        console.log("Did the main load of the page.")

        const body_class = localStorage['mainBodyClass'];
        const footer_class = localStorage['mainFooterClass']

        $('#main_body').addClass(body_class);
        $('#main_footer').addClass(footer_class);
    })




    $('#settings-form').on('submit', function (event) {
        event.preventDefault();

        console.log("Settings Form Submitted");
        
        if (colorMode.val() == 'normal'){

            
            $('#main_body').removeClass('body_dark').removeClass('body_t').removeClass('body_d').removeClass('body_p');
            $('#main_footer').removeClass('footer_dark').removeClass('footer_t').removeClass('footer_d').removeClass('footer_p');
            
            localStorage['mainBodyClass'] = 'none';
            localStorage['mainFooterClass'] = 'none';

            alert('Normal Mode Activated');
        }
        if (colorMode.val() == 'dark'){
            
            $('#main_body').removeClass('body_dark').removeClass('body_t').removeClass('body_d').removeClass('body_p');
            $('#main_footer').removeClass('footer_dark').removeClass('footer_t').removeClass('footer_d').removeClass('footer_p');
            $('#main_body').addClass('body_dark');
            $('#main_footer').addClass('footer_dark');


            localStorage['mainBodyClass'] = 'body_dark';
            localStorage['mainFooterClass'] = 'footer_dark';

            alert('Dark Mode Activated');
            
        }
        if (colorMode.val() == 'tritanopia'){
            
            $('#main_body').removeClass('body_dark').removeClass('body_t').removeClass('body_d').removeClass('body_p');
            $('#main_footer').removeClass('footer_dark').removeClass('footer_t').removeClass('footer_d').removeClass('footer_p');
            $('#main_body').addClass('body_t');
            $('#main_footer').addClass('footer_t');


            localStorage['mainBodyClass'] = 'body_t';
            localStorage['mainFooterClass'] = 'footer_t';

            alert('Tritanopia Mode Activated');
            

        }
        if (colorMode.val() == 'deutanopia'){
            
            $('#main_body').removeClass('body_dark').removeClass('body_t').removeClass('body_d').removeClass('body_p');
            $('#main_footer').removeClass('footer_dark').removeClass('footer_t').removeClass('footer_d').removeClass('footer_p');
            $('#main_body').addClass('body_d');
            $('#main_footer').addClass('footer_d');

            
            localStorage['mainBodyClass'] = 'body_d';
            localStorage['mainFooterClass'] = 'footer_d';

            alert('Deutanopia Mode Activated');
            

        }
        if (colorMode.val() == 'protanopia'){
            
            $('#main_body').removeClass('body_dark').removeClass('body_t').removeClass('body_d').removeClass('body_p');
            $('#main_footer').removeClass('footer_dark').removeClass('footer_t').removeClass('footer_d').removeClass('footer_p');
            $('#main_body').addClass('body_p');
            $('#main_footer').addClass('footer_p');


            localStorage['mainBodyClass'] = 'body_d';
            localStorage['mainFooterClass'] = 'footer_d';

            alert('Protanopia Mode Activated');
            

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
