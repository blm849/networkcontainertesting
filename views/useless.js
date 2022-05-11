$(document).ready(function() {
    $.ajax({
        url: "https://uselessfacts.jsph.pl/random.json"
    }).then(function(data) {
       $('.my-answer').append(data.text);
    });
});
