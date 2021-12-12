(function($) {
    var requestConfig = {
        method: "GET",
        url: "/getmemories/"
    };
    $.ajax(requestConfig).then(function(memories) {
        $("#memoryList").empty();
        for (var n = 0; n < memories.length; n++) {
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
            if (sortby === "titleaz") {
                memories = memories.sort((a, b) => (a.title > b.title) ? 1 : -1);
                $("#memoryList").empty();
                for (let n = 0; n < memories.length; n++) {
                    $("#memoryList").append(`<dt><a href=/memory/${memories[n]._id.toString()}>${memories[n].title}</a></dt>
                    <dd>${memories[n].description}</dd>`);
                }
            }
        });

    });
})(window.jQuery);