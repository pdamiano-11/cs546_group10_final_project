(function($) {
    $.fn.normalmode = function() {
        alert('Strip all applied classes off and return to default color scheme');
        $('#main_body').removeClass('body_dark').removeClass('body_t').removeClass('body_d').removeClass('body_p');
        $('#main_footer').removeClass('footer_dark').removeClass('footer_t').removeClass('footer_d').removeClass('footer_p');
        
        return this;
    }; 


    $.fn.add_darkmode = function() {
        alert('hello world');
        $('#main_body').addClass('body_dark');
        $('#main_footer').addClass('footer_dark');
        return this;
    }; 


    $.fn.add_tritanopia = function() {
        alert('hello world');
        $('#main_body').addClass('body_t');
        $('#main_footer').addClass('footer_t');
        return this;
     }; 


    $.fn.add_deutanopia = function() {
        alert('hello world');
        $('#main_body').addClass('body_d');
        $('#main_footer').addClass('footer_d');
        return this;
    };


    $.fn.add_protanopia = function() {
        alert('hello world');
        $('#main_body').addClass('body_p');
        $('#main_footer').addClass('footer_p');
        return this;
    };

    $('#settings-form').on(function (event) {
        event.preventDefault();
        //add the jquery to set settings here
    });


})(window.jQuery);
