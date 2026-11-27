document.getElementById("map").style.display = "none";
function loadWeatherinfo(userlocation) {
    fetch("https://api.weatherapi.com/v1/current.json?key=826898a2aef743548dc92142261311&q=" + userlocation)
        .then(res => res.json())
        .then(data => {
            document.getElementById("lblFullWeather").innerHTML = `
            <table>
            <tr>
            <td>
            <img class="wIcone" src="${data.current.condition.icon}" alt="weather icon" width="90px">
            </td>
            <td>
            <h5 class="Wlocation">${data.location.name}</h5>
            <h5 class="wType">${data.current.condition.text}</h5>
            <h2 class="wTemp">${data.current.temp_c} °C</h2>
                            <h6>${data.location.localtime}</h6>
                            </td>
                    </tr>
                    </table>
                    `
            document.getElementById("lblData").innerHTML = `
                    <h4>${data.location.country}</h4>
                    
                    `
        })
    document.getElementById("txtLocation").value = ""

}

function btnSearch() {
    let userlocation = document.getElementById("txtLocation").value;
    loadWeatherinfo(userlocation);
}

// data.current.condition.icon

navigator.geolocation.getCurrentPosition((location) => {
    // console.log(location.coords.latitude);
    // console.log(location.coords.longitude);

    loadWeatherinfo(location.coords.latitude + "," + location.coords.longitude)


})

const map = L.map('map').setView([7.2083, 79.8358], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);


function btnMap() {
    let map = document.getElementById("map");

    if (getComputedStyle(map).display === "none") {
        map.style.display = "block";
    } else {
        map.style.display = "none";
    }
}

let marker;

map.on("click", async function (e) {

    if (marker) {
        map.removeLayer(marker);
    }

    marker = L.marker(e.latlng).addTo(map);

    let lat = e.latlng.lat;
    let lng = e.latlng.lng;

    let response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
    );

    let data = await response.json();

    let locationName = data.address.city;

    loadWeatherinfo(lat + "," + lng);

    document.getElementById("txtLocation").value = locationName;

});

