//function for retrieving weather data from API
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
        var search = $(".search");
        console.log(search);
        search.on("click", function() {
            console.log("click");
            var task = $(this)
            .siblings("#cityName")
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
                    $("#fiveDay").append(infoHTML); 
                }
            }
        
        });
    });
});

//function to display data
function show(data){
    return "<header>Current Weather " + data.name + ", " + data.sys.country +"</header>" +
           "<h3>Weather: " + data.weather[0].main +"</h3>" +
           "<h3>Description: " + data.weather[0].description +"</h3>" +
           "<h3>Temperature: " + data.main.temp + " ˚F</h3>" +
           "<h3>Humidity: " + data.main.humidity + "%</h3>" +
           "<h3>Wind Speed:" + data.wind.speed + " mph</h3>" +
           "<img src=http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png>"

};

