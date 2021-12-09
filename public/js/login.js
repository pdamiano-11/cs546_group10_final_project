$(function () {
    const username = $('#username').val().trim();
    const password = $('#password').val().trim();

    $('#login-form').on(function (event) {
        event.preventDefault();
        
        if (username && password) {
            $('#error').hide();
            $('#login-form').trigger('reset');
        } else {
            $('#error').show();
            $('#username').on();
        }
    });
});



//Accessibility stuff
/*
$.fn.normalmode = function() {
    alert('Strip all applied classes off and return to default color scheme');
    return this;
}; 


$.fn.add_darkmode = function() {
    alert('hello world');
    return this;
}; 


$.fn.add_tritanopia = function() {
    alert('hello world');
    return this;
 }; 


$.fn.add_deutanopia = function() {
    alert('hello world');
    return this;
};


$.fn.add_protanopia = function() {
    alert('hello world');
    return this;
};
*/
