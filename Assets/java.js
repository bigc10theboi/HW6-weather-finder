$(document).ready(function() {
    $('.search').click(function() {
        var key = '4396c33210ea436c01b4d4cc2a212e09';
        var city = $('#cityName').val().trim();
        console.log(city);
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/weather",
            method: "GET",
            dataType: "json",
            data: {q:city, APPID: key, units: 'imperial'},
            success: function(data) {
                console.log(data)
                var infoHTML = show(data)
                $("#weather").html(infoHTML); 
            }
        
        });
        var submit = $(".submit");
        console.log(submit);
        submit.on("click", function() {
            console.log("click");
            var task = $(this)
            .siblings("#city-name")
            .val();
            var searchCity = $(this).attr("id");
            localStorage.setItem(searchCity, task);
        });

        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&APPID=" + key + "&units=imperial",
            method: "GET",
            success: function(data) {
                var list = data.list;
                console.log(data)
                for(var i =0; i < list.length; i += 8 ){
                    var infoHTML = show(list[i]);
                    $("#five-day").append(infoHTML); 
                }
            }
        
        });
    });
});

        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=4396c33210ea436c01b4d4cc2a212e09";

