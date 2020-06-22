(function(){
    'use strict';
    function CookieStore(name, minHourlyCustomers, maxHourlyCustomers, averageCookiesPerCustomer){
        this.name = name;
        this.minHourlyCustomers = minHourlyCustomers;
        this.maxHourlyCustomers = maxHourlyCustomers;
        this.averageCookiesPerCustomer = averageCookiesPerCustomer;
        this.simulatedCookiesPerHour = null;
    }

    CookieStore.prototype.randomCustomersPerHour = function() {
        return Math.ceil(Math.random() * (this.maxHourlyCustomers - this.minHourlyCustomers)) + this.minHourlyCustomers;
    }

    var firstPike = new CookieStore('1st and Pike', 23, 65, 6.3);
    var seatacAirport = new CookieStore('SeaTac Airport', 3, 24, 1.2);
    var seattleCenter = new CookieStore('Seattle Center', 11, 38, 3.7);
    var capitolHill = new CookieStore('Capitol Hill', 20, 38, 2.3);
    var alki = new CookieStore('Alki', 2, 16, 4.6);

    var cookieStoreLocations = [firstPike, seatacAirport, seattleCenter, capitolHill, alki];

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
            createStoreHeader(location);
            createHourItems(location, createHoursList());
        }
    }

    function createStoreHeader(location){
        var newHeader = document.createElement('h2');
        newHeader.textContent = location.name;
        document.body.appendChild(newHeader);
        return newHeader;
    }

    function createHoursList(){
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
                newHourItem.textContent = militaryHour + 'am: ' + hourSoldCookies + " cookies";
            } else if(militaryHour === 12){
                newHourItem.textContent = '12pm: ' + hourSoldCookies + ' cookies';
            } else if(militaryHour === 24){
                newHourItem.textContent = '12am: ' + hourSoldCookies + ' cookies';
            } else {
                //1pm-11pm
                newHourItem.textContent = (militaryHour - standardTimeOffSet) + 'pm: ' + hourSoldCookies + ' cookies';
            }
            list.append(newHourItem);
        }
    }

    createStoreLocationHTMLSections(cookieStoreLocations);
 
})();