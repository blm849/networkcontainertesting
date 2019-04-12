$(document).ready(function() {
    $.ajax({
        url: "https://yesno.wtf/api"
    }).then(function(data) {
       $('.my-answer').append(data.answer);
       $('.my-image').append("<img src="+data.image+">");
    });
});
