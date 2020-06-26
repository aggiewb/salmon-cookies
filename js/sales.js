(function(){
    'use strict';
    function CookieStore(name, minHourlyCustomers, maxHourlyCustomers, averageCookiesPerCustomer){
        this.name = name;
        this.minHourlyCustomers = minHourlyCustomers;
        this.maxHourlyCustomers = maxHourlyCustomers;
        this.averageCookiesPerCustomer = averageCookiesPerCustomer;
        this.simulatedCookiesPerHour = [];
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
            location.simulatedCookiesPerHour[i] = Math.floor(location.randomCustomersPerHour() * location.averageCookiesPerCustomer);
        }
        return simulatedCookiesPerHour;
    }

    function createStoreTableContents(){
        createHoursRow();
        for(var i = 0; i < cookieStoreLocations.length; i++){
            createStoreRow(cookieStoreLocations[i]);
        }
    }

    function createHoursRow(){
        //use military time
        var openingHour = 6;
        var standardTimeOffSet = 12;
        var hoursOpen = 14;
        
        var tableRow = document.createElement('tr');    
        document.querySelector('thead').appendChild(tableRow);
        tableRow.appendChild(document.createElement('th'));

        for(var i = 0; i < hoursOpen; i++){
            var newHourHead = document.createElement('th');
            var militaryHour = openingHour + i;
            if(militaryHour === 12){
                newHourHead.textContent = '12:00pm';
            } else if(militaryHour === 24 || militaryHour === 0){
                newHourHead.textContent = '12:00am';
            } else if(militaryHour < 12){
                //1am-11am
                newHourHead.textContent = militaryHour + ':00am';
            } else {
                //1pm-11pm
                newHourHead.textContent = (militaryHour - standardTimeOffSet) + ':00pm';
            }
            tableRow.appendChild(newHourHead);
        }
    }

    function createStoreRow(location){
        var tableStoreRow = document.createElement('tr');
        var tableStoreHead = document.createElement('th');
        tableStoreHead.textContent = location.name;
        document.querySelector('tbody').appendChild(tableStoreRow);
        tableStoreRow.appendChild(tableStoreHead);

        calculateSimulatedCookiesPerHour(location);
        
        for(var i = 0; i < location.simulatedCookiesPerHour.length; i++){
            var tableStoreData = document.createElement('td');
            tableStoreData.textContent = location.simulatedCookiesPerHour[i];
            tableStoreRow.appendChild(tableStoreData);
        }
    }

    createStoreTableContents();
    
})();