fetch("https://api.covidactnow.org/v2/state/KS.json?apiKey=90ace365e1424df3a7016ec06e2255bd")
.then(response => response.json())
.then(data => console.log(data))

fetch("https://app.ticketmaster.com/discovery/v2/events.json?stateCode=KS&apikey=vBiaZlx6A1wNGV2OtgkmcK7U3BMhGp4Q")
.then(response => response.json())
.then(data => console.log(data))