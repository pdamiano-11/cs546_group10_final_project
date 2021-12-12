import moment from 'moment';
(function($) {
    var months = {
        "01" : 31,
        "02" : 28,
        "03" : 31,
        "04" : 30,
        "05" : 31,
        "06" : 30,
        "07" : 31,
        "08" : 31,
        "09" : 30,
        "10" : 31,
        "11" : 30,
        "12" : 31
    };
    var requestConfig = {
        method: "GET",
        url: "/getmemories/"
    };
    $.ajax(requestConfig).then(function(memories) {
        $("#calendar").empty();
        var now = moment().format('DD-MM-YYYY');
        var currentDate = now.split('-');
        var calendarMems = [];
        for (var n = 0; n < memories.length; n++) {
            var date = memories[n].date.split('-');
            if (date[2] === currentDate[2] && date[1] === currentDate[1]) {
                calendarMems.push(memories[n]);
            } 
        }


    });

    $("set_date").submit(function(event) {
        event.preventDefault();
        $("#calendar").empty();

        var day = $("#day").val();
        var month = $("#month").val();
        var year = $("#year").val();


    });


})(window.jQuery);