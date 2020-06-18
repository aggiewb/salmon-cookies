var firstPike = {
    name: '1st and Pike',
    minHourlyCustomers: 23,
    maxHourlyCustomers: 65,
    averageCookiesPerCustomer: 6.3,
};

var seatacAirport = {
    name: 'SeaTac Airport',
    minHourlyCustomers: 3,
    maxHourlyCustomers: 24,
    averageCookiesPerCustomer: 1.2,
};

var seattleCenter = {
    name: 'Seattle Center',
    minHourlyCustomers: 11,
    maxHourlyCustomers: 38,
    averageCookiesPerCustomer: 3.7, 
};

var capitolHill = {
    name: 'Capitol Hill',
    minHourlyCustomers: 20,
    maxHourlyCustomers: 38,
    averageCookiesPerCustomer: 2.3, 
};

var alki = {
    name: 'Alki',
    minHourlyCustomers: 2,
    maxHourlyCustomers: 16,
    averageCookiesPerCustomer: 4.6, 
};

var cookieLocations = [firstPike, seatacAirport, seattleCenter, capitolHill, alki];

function randomCustomersPerHour() {
    return Math.ceil(Math.random() * (this.maxHourlyCustomers - this.minHourlyCustomers)) + this.minHourlyCustomers;
}

cookieLocations.forEach(function(location){
    location.randomCustomersPerHour = randomCustomersPerHour;
})

function calculateSimulatedCookiesPerHour(location){
    var openHours = 14;
    var simulatedCookiesPerHour = [];
    for(var i = 0; i < openHours; i++){
        simulatedCookiesPerHour[i] = Math.floor(location.randomCustomersPerHour() * location.averageCookiesPerCustomer);
    }
    return simulatedCookiesPerHour;
}

function createStoreLocationHTMLSections(locations){
    for(var i = 0; i < locations.length; i++){
        var location = locations[i];
        location.simulatedCookiesPerHour = calculateSimulatedCookiesPerHour(location);
        var header = createStoreHeader(location);
        var hoursList = createHoursList(location, header);
        createHourItems(location, hoursList);
    }
}

function createStoreHeader(location){
    var newHeader = document.createElement('h2');
    newHeader.textContent = location.name;
    document.body.appendChild(newHeader);
    return newHeader;
}

function createHoursList(location, header){
    var newHoursList = document.createElement('ul');
    document.body.appendChild(newHoursList);
    return newHoursList;
}

function createHourItems(location, list){
    //use military time
    var openingHour = 6;
    var standardTimeOffSet = 12;
    for(var i = 0; i < location.simulatedCookiesPerHour.length; i++){
        var militaryHour =  openingHour + i;
        var newHourItem = document.createElement('li');
        var hourSoldCookies = location.simulatedCookiesPerHour[i];
        if(militaryHour < 12){
            //1am-11am
            newHourItem.textContent = militaryHour + "am: " + hourSoldCookies + " cookies";
        } else if(militaryHour === 12){
            newHourItem.textContent = "12pm: " + hourSoldCookies + " cookies";
        } else if(militaryHour === 24){
            newHourItem.textContent = "12am: " + hourSoldCookies + " cookies";
        } else {
            //1pm-11pm
            newHourItem.textContent = (militaryHour - standardTimeOffSet) + "pm: " + hourSoldCookies + " cookies";
        }
        list.append(newHourItem);
    }
}

createStoreLocationHTMLSections(cookieLocations);