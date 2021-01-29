//function for retrieving current weather
$(document).ready(function() {
    $('.current').click(function() {
        $(".populate").empty();
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
                var lat = data.coord.lat
                var lon = data.coord.lon
    
                addUVindex(lat, lon)
            }
        
        });
        var search = $(".current");
        console.log(search);
        search.on("click", function() {
            console.log("click");
            var task = $(this)
            .siblings("#cityName")
            .val();
            var searchCity = $(this).attr("id");
            localStorage.setItem(searchCity, task);
        });
    });
});

//function calling next five days forecast
$(document).ready(function() {
    $('.future').click(function() {
        $(".populate").empty();
        var key = '4396c33210ea436c01b4d4cc2a212e09';
        var city = $('#cityName').val().trim();
        console.log(city);
        var search = $(".future");
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
                    var infoHTML = show2(list[i]);
                    $("#fiveDay").append(infoHTML); 
                }
            }
        
        });
    });
});

//current weather
function show(data){
    return "<h2>Current weather " + data.name + ", " + data.sys.country +"</h2>" +
           "<h4>Weather: " + data.weather[0].main +"</h4>" +
           "<h4>Temperature: " + data.main.temp + " ˚F</h4>" +
           "<h4>Humidity: " + data.main.humidity + "%</h4>" +
           "<h4>Wind Speed: " + data.wind.speed + " mph</h4>" +
           "<img src=http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png>"
};
//five day forecast
function show2(data){
    return "<h2>Five day forecast</h2>" +
     "<h4>Weather: " + data.weather[0].main +"</h4>" +
           "<h4>Temperature: " + data.main.temp + " ˚F</h4>" +
           "<h4>Humidity: " + data.main.humidity + "%</h4>" +
           "<h4>Wind Speed: " + data.wind.speed + " mph</h4>" +
           "<img src=http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png>"

};
//UV function
function addUVindex(lat, lon){
    var key = '4396c33210ea436c01b4d4cc2a212e09';
    var UVindex = "http://api.openweathermap.org/data/2.5/uvi?appid=" + key + "&lat="+ lat + "&lon=" + lon 
    var weatherEl = $(weather)

    $.ajax({
        url: UVindex,
        method: "GET"
      })

      .then(function(response) {
        console.log(response);

        var uv = $("<p>").text("UV Index: ");
        var btn = $("<span>").addClass("btn btn-sm").text(response.value);
        //change color depending on uv index
        if (response.value <= 3) {
          btn.addClass("btn-success");
        }
        else if (response.value <= 7) {
          btn.addClass("btn-warning");
        }
        else {
          btn.addClass("btn-danger");
        }
        $("#today .card-body").append(uv.append(btn));
        weatherEl.append(uv)
          
})
}

//code for moment date
var now = moment();
var dateFormat = "MM/DDDD/YYYY";
var convertedDate = moment(now, dateFormat);
var newDate = moment();
// const dayAfterEpoch = moment(86400000);
//function to display date//
function displayCurrentDate() {
  var currentDate = moment().format("DDD, MMMM, YYYY");
  $("#currentDay").text(currentDate);
}
displayCurrentDate();

// function displayNextDate() {
//     $("#nextDay").text(dayAfterEpoch);
//   }
//   displayNextDate();