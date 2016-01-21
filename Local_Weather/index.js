// Set OpenWeather API key
var openWeatherApiKey = "";

function getLocation() {
    var ipInfoURL = "http://ipinfo.io/";

    $.getJSON(ipInfoURL, function(data) {
        // console.log(data);
        var flagURL = "http://www.geonames.org/flags/x/" + data.country.toLowerCase() + ".gif";
        var unit = getUnit(data.country);
        getWeather(data.loc, unit);
        // console.log(loc);
        $("#location").append(data.city + ", " + data.region);
        $("#locationFlag").prop("src", flagURL);
    });

}

function getWeather(loc, unit) {
    var location = loc.split(",");
    var latitude = location[0];
    var longtitude = location[1];
    var openWeatherURL = "http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longtitude + "&units=" + unit + "&appid=" + openWeatherApiKey;
    // console.log(openWeatherURL);

    $.getJSON(openWeatherURL, function(data) {
        // console.log(data);
        var weatherIconURL = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
        var tempUnit = unit == "metric" ? "C" : "F";
        var tempNum = parseFloat((data.main.temp).toFixed(1));
        var windDerection = getWindDirection(data.wind.deg);

        $("#temp").append(tempNum + " " + tempUnit);
        $("#icon").prop("src", weatherIconURL);
        $("#description").append(data.weather[0].description);
        $("#wind").append(windDerection + " " + data.wind.speed +
                          " " + "knots");
    });
}

function getWindDirection(deg) {
    var rose = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    return rose[Math.floor(deg / 45)];
}

function getUnit(country) {
    var imperialCountries = ['US', 'BS', 'BZ', 'KY', 'PW'];

    if (imperialCountries.indexOf(country) === -1) {
        return "metric";
    } else {
        return "imperial";
    }
}

$(document).ready(function() {
    getLocation();

    $("#convert").click(function() {
        var tempData = $("#temp").text().split(' ');
        var newTemp = 0;
        var newUnit = "";

        if (tempData[1] === "C") {
            newTemp = (9/5 * parseFloat(tempData[0]) + 32).toFixed(1);
            newUnit = "F";
        } else {
            newTemp = (5/9 * (parseFloat(tempData[0]) - 32)).toFixed(1);
            newUnit = "C";
        }

        $("#temp").text(newTemp + " " + newUnit);

    });
});
