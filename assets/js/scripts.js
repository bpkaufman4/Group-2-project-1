/*fetch("https://api.covidactnow.org/v2/state/KS.json?apiKey=90ace365e1424df3a7016ec06e2255bd")
.then(response => response.json())
.then(data => console.log(data))*/

/*fetch("https://app.ticketmaster.com/discovery/v2/events?stateCode=KS&apikey=vBiaZlx6A1wNGV2OtgkmcK7U3BMhGp4Q")
.then(response => response.json())
.then(data => console.log(data))*/

var buttonEl = document.getElementById("button")
var locationEl = document.getElementById("searchbar")
var eventListEl = document.getElementById("event-list")
var locationSearchTerm = document.getElementById("search-results")
var covidTable = document.getElementById("covid-table")
var covidState = document.getElementById("covid-state")
var casesData = document.getElementById("cases-table")
var deathData = document.getElementById("deaths-table")
var newCasesData = document.getElementById('table-newcases')
var newDeathData = document.getElementById('table-newdeaths')

var getLocation = function(location) {
    var apiUrl = "https://app.ticketmaster.com/discovery/v2/events.json?stateCode=" + location + "&sort=date,asc&apikey=vBiaZlx6A1wNGV2OtgkmcK7U3BMhGp4Q"

    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
            displayEvents(data, location);
        })
    })   
}

var getCovidData = function(location) {
    fetch("https://api.covidactnow.org/v2/state/" + location + ".json?apiKey=90ace365e1424df3a7016ec06e2255bd")
    .then(function(response) {
        response.json().then(function(data) {
            displayCovidInfo(data, location);
        })
    })
}

var displayCovidInfo = function(state, searchTerm) {
    covidState.textContent = searchTerm
    covidTable.classList.remove("hidden")

    var covidCases = state.actuals.cases
    var covidDeaths = state.actuals.deaths
    var covidNewCases = state.actuals.newCases
    var covidNewDeaths = state.actuals.newDeaths
    
    casesData.textContent = covidCases
    deathData.textContent = covidDeaths
    newCasesData.textContent = covidNewCases
    newDeathData.textContent = covidNewDeaths
   
}

var displayEvents = function(events, searchTerm) {
    eventListEl.textContent = "";
    locationSearchTerm.textContent = searchTerm;

    var evs = events["_embedded"].events

    for (var i=0; i < evs.length; i++) { 
        var eventName = evs[i].name + ' / ' + evs[i].dates.start.localDate
        var eventEl = document.createElement("div")
        eventEl.classList = "column is-two-fifths events"

        var titleEl =document.createElement("span");
        titleEl.classList = "events"
        titleEl.textContent = eventName

        eventEl.appendChild(titleEl);
        eventListEl.appendChild(eventEl)
    }
}

var searchSubmitHandler = function(event) {
    event.preventDefault()
    var searchLocation = locationEl.value.trim().toUpperCase()
    if (searchLocation) {
        getLocation(searchLocation);
        getCovidData(searchLocation);
        locationEl.value= "";
    } else {
        return
    }
}
buttonEl.addEventListener("click", searchSubmitHandler)