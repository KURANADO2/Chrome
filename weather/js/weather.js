function httpRequest(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            callback(xhr.responseText);
        }
    };
    xhr.send();
}

function showWeather(result) {
    console.log(result);
    result = JSON.parse(result);
    var table = '<table><tr><th>日期</th><th>天气</th><th>最低温度</th><th>最高温度</th></tr>';
    var d = new Date(result.dt * 1000);
    table += '<tr>';
    table += '<td>' + d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + '</td>';
    table += '<td>' + result.weather[0].description + '</td>';
    table += '<td>' + Math.round(result.main.temp_min - 273.15) + ' °C</td>';
    table += '<td>' + Math.round(result.main.temp_max - 273.15) + ' °C</td>';
    table += '</tr>';
    table += '</table>';
    document.getElementById('weather').innerHTML = table;
}

var city = localStorage.city;
city = city ? city : "Shanghai";
var url = "http://api.openweathermap.org/data/2.5/weather?q=" + city
          + "&APPID=1ffc6aad9bc3d5976d7beb8e6e455af2&lang=zh_cn";
httpRequest(url, showWeather);