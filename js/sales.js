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
    document.querySelector('body').append(newHeader);
    return newHeader;
}

function createHoursList(location, header){
    var newHoursList = document.createElement('ul');
    header.insertAdjacentElement('afterend', newHoursList);
    return newHoursList;
}

function createHourItems(location, list){
    var openingHour = 6;
    for(var i = 0; i < location.simulatedCookiesPerHour.length; i++){
        var newHourItem = document.createElement('li');
        var hourSoldCookies = location.simulatedCookiesPerHour[i];
        if(openingHour + i < 12){
            //1am-11am
            newHourItem.textContent = (openingHour + i) + "am: " + hourSoldCookies + " cookies";
        } else if(openingHour + i === 12){
            //12pm
            newHourItem.textContent = (openingHour + i) + "pm: " + hourSoldCookies + " cookies";
        } else if(openingHour + i === 24){
            //12am
            newHourItem.textContent = (openingHour + i - 6) + "am: " + hourSoldCookies + " cookies";
        } else {
            //1pm-11pm
            newHourItem.textContent = (openingHour + i - 12) + "pm: " + hourSoldCookies + " cookies";
        }
        list.append(newHourItem);
    }
}

createStoreLocationHTMLSections(cookieLocations);