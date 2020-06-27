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
        document.querySelector('caption').textContent = 'Cookies Needed By Location Each Day';
        var hoursTableRow = createHoursRow();
        createDailyLocationTotalHeader(hoursTableRow);
        
        var allStoresTotal = 0;
        for(var i = 0; i < cookieStoreLocations.length; i++){
            var storeTableRow = createStoreRow(cookieStoreLocations[i]);
            allStoresTotal += createStoreTotals(cookieStoreLocations[i], storeTableRow);
        }
        var totalsRow = createTotalsRow();
        totalOfAllStoresDaily(totalsRow, allStoresTotal);
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
        return tableRow;
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
        return tableStoreRow;
    }

    function createTotalsRow(){
        var totalsRow = document.createElement('tr');
        var totalsHead = document.createElement('th');
        totalsHead.textContent = 'Totals';
        document.querySelector('tbody').appendChild(totalsRow);
        totalsRow.appendChild(totalsHead);

        for(var i = 0; i < cookieStoreLocations[0].simulatedCookiesPerHour.length; i++){
            var total = 0;
            for(var j = 0; j < cookieStoreLocations.length; j++){
                total += cookieStoreLocations[j].simulatedCookiesPerHour[i];
            }
            var tableTotalData = document.createElement('td');
            tableTotalData.textContent = total;
            totalsRow.appendChild(tableTotalData);
        }
        return totalsRow;
    }

    function createStoreTotals(location, tableRow){
        var total = 0;
        for(var i = 0; i < location.simulatedCookiesPerHour.length; i++){
            total += location.simulatedCookiesPerHour[i];
        }
        var tableStoreTotalData = document.createElement('td');
        tableStoreTotalData.textContent = total;
        tableRow.appendChild(tableStoreTotalData);
        return total;
    }

    function createDailyLocationTotalHeader(tableRow){
        var dailyLocationTotal = document.createElement('th');
        dailyLocationTotal.textContent = 'Daily Location Total';
        tableRow.appendChild(dailyLocationTotal);
    }

    function totalOfAllStoresDaily(tableRow, allStoresTotal){
        var totalOfAllStoresDailyTableData = document.createElement('td');
        totalOfAllStoresDailyTableData.textContent = allStoresTotal;
        tableRow.appendChild(totalOfAllStoresDailyTableData);
    }

    createStoreTableContents();

})();