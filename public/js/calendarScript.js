//import moment from 'moment';
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
        $("#month_year").empty();
        $("#calendar").empty();
        var now = '11-12-2021';
        var currentDate = now.split('-');
        $("#month_year").append(`<h3>${currentDate[1]}/${currentDate[2]}`);
        var calendarMems = [];
        for (var n = 0; n < memories.length; n++) {
            var date = memories[n].date.split('-');
            if (date[2] === currentDate[2] && date[1] === currentDate[1]) {
                calendarMems.push(memories[n]);
            } 
        }
        var counter = 0;
        for (var n = 0; n < months[currentDate[1]] + 1; n++) {
            if (counter === 0) $("#calendar").append("<tr>");
            var memsCount = 0;
            for (var i = 0; i < calendarMems.length; i++) {
                var date = calendarMems[i].date.split('-');
                if (parseInt(date[0]) === n) {
                    memsCount = memsCount + 1;
                }
            }
            $("#calendar").append(`<td>${n}<br> Memories: ${memsCount}</td>`);
            counter = counter + 1;
            if (counter === 7 || n === months[currentDate[1]]) {
                $("#calendar").append("</tr>");
                counter = 0;
            }
        }
    });

    $("#set_date").submit(function(event) {
        event.preventDefault();

        var month = $("#month").val();
        var year = $("#year").val();

        

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
            $("#month_year").empty();
            $("#calendar").empty();
            $("#month_year").append(`<h3>${month}/${year}`);
            var calendarMems = [];
            for (var n = 0; n < memories.length; n++) {
                var date = memories[n].date.split('-');
                if (date[2] === year && date[1] === month) {
                    calendarMems.push(memories[n]);
                } 
            }
            var counter = 0;
            for (var n = 0; n < months[month] + 1; n++) {
                if (counter === 0) $("#calendar").append("<tr>");
                var memsCount = 0;
                for (var i = 0; i < calendarMems.length; i++) {
                    var date = calendarMems[i].date.split('-');
                    if (parseInt(date[0]) === n) {
                        memsCount = memsCount + 1;
                    }
                }
                $("#calendar").append(`<td>${n}<br> Memories: ${memsCount}</td>`);
                counter = counter + 1;
                if (counter === 7 || n === months[month]) {
                    $("#calendar").append("</tr>");
                    counter = 0;
                }
            }
        });
    });
})(window.jQuery);