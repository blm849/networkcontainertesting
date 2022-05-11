$(document).ready(function() {
    $.ajax({
        url: "https://randomfox.ca/floof/"
    }).then(function(data) {
       $('.test').append("body {background-image: url('" + data.image + "');}");
    });
});
