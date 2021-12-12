(function($) {


    const colorMode = $('#colors');
    const realName = $('#real_name');
    const locationTrack = $('#location_trank');

    $('#settings-form').on('submit', function (event) {
        event.preventDefault();

        console.log("Settings Form Submitted");
        
        if (colorMode.val() == 'normal'){
            $('#main_body').removeClass('body_dark').removeClass('body_t').removeClass('body_d').removeClass('body_p');
            $('#main_footer').removeClass('footer_dark').removeClass('footer_t').removeClass('footer_d').removeClass('footer_p');
        }
        if (colorMode.val() == 'dark'){
            alert('Dark Mode Activated');
            $('#main_body').removeClass('body_dark').removeClass('body_t').removeClass('body_d').removeClass('body_p');
            $('#main_footer').removeClass('footer_dark').removeClass('footer_t').removeClass('footer_d').removeClass('footer_p');
            $('#main_body').addClass('body_dark');
            $('#main_footer').addClass('footer_dark');
        }
        if (colorMode.val() == 'tritanopia'){
            alert('Tritanopia Mode Activated');
            $('#main_body').removeClass('body_dark').removeClass('body_t').removeClass('body_d').removeClass('body_p');
            $('#main_footer').removeClass('footer_dark').removeClass('footer_t').removeClass('footer_d').removeClass('footer_p');
            $('#main_body').addClass('body_t');
            $('#main_footer').addClass('footer_t');
        }
        if (colorMode.val() == 'deutanopia'){
            alert('Deutanopia Mode Activated');
            $('#main_body').removeClass('body_dark').removeClass('body_t').removeClass('body_d').removeClass('body_p');
            $('#main_footer').removeClass('footer_dark').removeClass('footer_t').removeClass('footer_d').removeClass('footer_p');
            $('#main_body').addClass('body_d');
            $('#main_footer').addClass('footer_d');
        }
        if (colorMode.val() == 'protanopia'){
            alert('Protanopia Mode Activated');
            $('#main_body').removeClass('body_dark').removeClass('body_t').removeClass('body_d').removeClass('body_p');
            $('#main_footer').removeClass('footer_dark').removeClass('footer_t').removeClass('footer_d').removeClass('footer_p');
            $('#main_body').addClass('body_p');
            $('#main_footer').addClass('footer_p');
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


})(window.jQuery);
