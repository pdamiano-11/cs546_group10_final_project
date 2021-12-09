$(function () {
    const title = $('#title').val().trim();
    const description = $('#description').val().trim();
    const date = $('#date').val().trim();
    const location = $('#location').val().trim();
    const userId = $('#userId').val().trim();
    const visibility = $('#visibility').val().trim();

    $('#create-mem').on(function (event) {
        event.preventDefault();
        
        if (title&&description&&date&&location&&userId&&visibility) {
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
};*/