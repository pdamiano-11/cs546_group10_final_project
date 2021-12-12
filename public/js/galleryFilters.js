//const Moment = require('moment');
(function($) {
    var requestConfig = {
        method: "GET",
        url: "/getmemories/"
    };
    $.ajax(requestConfig).then(function(memories) {
        $("#memoryList").empty();
        for (var n = 0; n < memories.length; n++) {
            //POSSIBLE XSS vulnerability IDK tho
            $("#memoryList").append(`<dt><a href=/memory/${memories[n]._id}>${memories[n].title}</a></dt><dd>${memories[n].description}</dd>`);
        }
        $("#memoryList").show();
    });

    $("#sort_filter").submit(function(event) {
        event.preventDefault();

        $("#memoryList").empty();

        var sortby = $("#sorts").val();
        var filterby = $("#filters").val();

        var requestConfig = {
            method: "GET",
            url: "/getmemories/"
        };
        $.ajax(requestConfig).then(function(memories) {
            var showMems = [];
            if (filterby === "imgmems") {
                for (var n = 0; n < memories.length; n++) {
                    if (memories[n].images.length > 0) {
                        showMems.push(memories[n]);
                    }
                }
            }
            else if (filterby === "noimgmems") {
                for (var n = 0; n < memories.length; n++) {
                    if (memories[n].images.length === 0) {
                        showMems.push(memories[n]);
                    }
                }
            }
            else if (filterby === "all") {
                for (var n = 0; n < memories.length; n++) {
                    showMems.push(memories[n]);
                }
            }

            if (sortby === "titleaz") {
                showMems = showMems.sort((a, b) => (a.title > b.title) ? 1 : -1);
                for (var n = 0; n < showMems.length; n++) {
                    $("#memoryList").append(`<dt><a href=/memory/${showMems[n]._id.toString()}>${showMems[n].title}</a></dt>
                    <dd>${showMems[n].description}</dd>`);
                }
                $("#memoryList").show();
            }
            else if (sortby === "date") {
                showMems = showMems.sort((a, b) => (new moment(a.date).format('DD-MM-YYYY') > new moment(b.date).format('DD-MM-YYYY')) ? 1 : -1);
                for (var n = 0; n < showMems.length; n++) {
                    $("#memoryList").append(`<dt><a href=/memory/${showMems[n]._id.toString()}>${showMems[n].title}</a></dt>
                    <dd>${showMems[n].description}</dd>`);
                }
                $("#memoryList").show();
            }
            else if (sortby === "location") {
                showMems = showMems.sort((a, b) => (a.title > b.title) ? 1 : -1);
                for (var n = 0; n < showMems.length; n++) {
                    $("#memoryList").append(`<dt><a href=/memory/${showMems[n]._id.toString()}>${showMems[n].title}</a></dt>
                    <dd>${showMems[n].description}</dd>`);
                }
            }
            else if (sortby === "regular") {
                for (var n = 0; n < showMems.length; n++) {
                    $("#memoryList").append(`<dt><a href=/memory/${showMems[n]._id.toString()}>${showMems[n].title}</a></dt>
                    <dd>${showMems[n].description}</dd>`);
                }
            }
        });

    });
})(window.jQuery);