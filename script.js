
function loadWeatherinfo(location) {
    fetch("https://api.weatherapi.com/v1/current.json?key=826898a2aef743548dc92142261311&q=Panadura")
        .then(res => res.json())
        .then(data => {
            console.log(data);
            let userlocation = document.getElementById("txtLocation").value;
            document.getElementById("lblWeather").innerHTML = `
                <h1>${userlocation}</h1>
                <img src="${data.current.condition.icon}" alt="" srcset="">
                <h3>${data.current.condition.text}</h3>
                <p></p>

            `
        })

}

function btnSearch() {
    let userlocation = document.getElementById("txtLocation").value;
    loadWeatherinfo(userlocation);
}