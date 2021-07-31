fetch("https://api.covidactnow.org/v2/state/KS.json?apiKey=90ace365e1424df3a7016ec06e2255bd")
.then(response => response.json())
.then(data => console.log(data))

fetch("https://app.ticketmaster.com/discovery/v2/events.json?stateCode=KS&apikey=vBiaZlx6A1wNGV2OtgkmcK7U3BMhGp4Q")
.then(response => response.json())
.then(data => console.log(data))

var buttonEl = document.getElementById("button")
var locationEl = document.getElementById("searchbar")

var getLocation = function(location) {
    var apiUrl = "https://app.ticketmaster.com/discovery/v2/events.json?stateCode=" + location + "&apikey=vBiaZlx6A1wNGV2OtgkmcK7U3BMhGp4Q"

    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
            console.log(data);
        })
    })
}
var searchSubmitHandler = function(event) {
    event.preventDefault()
    var searchLocation = locationEl.value.trim().toUpperCase()
    if (searchLocation) {
        getLocation(searchLocation);
        locationEl.value= "";
    } else {
        return "Please enter 2 letter state code"
    }
}
buttonEl.addEventListener("click", searchSubmitHandler)