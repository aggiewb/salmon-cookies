(function(){
    'use strict';
    function CookieStore(name, minHourlyCustomers, maxHourlyCustomers, averageCookiesPerCustomer){
        this.name = name;
        this.minHourlyCustomers = minHourlyCustomers;
        this.maxHourlyCustomers = maxHourlyCustomers;
        this.averageCookiesPerCustomer = averageCookiesPerCustomer;
        this.simulatedCookiesPerHour = [];
    }

    var firstPike = new CookieStore('1st and Pike', 23, 65, 6.3);
    var seatacAirport = new CookieStore('SeaTac Airport', 3, 24, 1.2);
    var seattleCenter = new CookieStore('Seattle Center', 11, 38, 3.7);
    var capitolHill = new CookieStore('Capitol Hill', 20, 38, 2.3);
    var alki = new CookieStore('Alki', 2, 16, 4.6);

    var cookieStoreLocations = [firstPike, seatacAirport, seattleCenter, capitolHill, alki];
    var OPEN_HOURS = 14;

    CookieStore.prototype.randomCustomersPerHour = function(){
        return Math.ceil(Math.random() * (this.maxHourlyCustomers - this.minHourlyCustomers)) + this.minHourlyCustomers;
    }

    CookieStore.prototype.calculateSimulatedCookiesPerHour = function(){
        for(var i = 0; i < OPEN_HOURS; i++){
            this.simulatedCookiesPerHour.push(Math.floor(this.randomCustomersPerHour() * this.averageCookiesPerCustomer));
        }
    }

    CookieStore.prototype.render = function(){
        var tableStoreRow = document.createElement('tr');
        var tableStoreHead = document.createElement('th');
        tableStoreHead.setAttribute('scope', 'row');
        tableStoreHead.textContent = this.name;
        document.querySelector('tbody').appendChild(tableStoreRow);
        tableStoreRow.appendChild(tableStoreHead);

        this.calculateSimulatedCookiesPerHour();
        
        for(var i = 0; i < this.simulatedCookiesPerHour.length; i++){
            var tableStoreData = document.createElement('td');
            tableStoreData.textContent = this.simulatedCookiesPerHour[i];
            tableStoreRow.appendChild(tableStoreData);
        }
        return tableStoreRow;
    }

    function createStoreTableContents(){
        var hoursTableRow = createHoursHeadRow();
        createDailyLocationTotalHeader(hoursTableRow);
        
        var allStoresTotal = 0;
        for(var i = 0; i < cookieStoreLocations.length; i++){
            var storeTableRow = cookieStoreLocations[i].render();
            allStoresTotal += createStoreTotals(cookieStoreLocations[i], storeTableRow);
        }
        var totalsRow = createTotalsFooterRow();
        totalOfAllStoresDaily(totalsRow, allStoresTotal);
    }

    function createHoursHeadRow(){
        //use military time
        var openingHour = 6;
        var standardTimeOffSet = 12;
        
        var tableRow = document.createElement('tr');    
        var locationHeader = document.createElement('th');
        locationHeader.setAttribute('scope', 'col');
        locationHeader.textContent = 'Store Locations';
        tableRow.appendChild(locationHeader);

        for(var i = 0; i < OPEN_HOURS; i++){
            var newHourHead = document.createElement('th');
            var am = ':00am';
            var pm = ':00pm';

            newHourHead.setAttribute('scope', 'col');
            var militaryHour = openingHour + i;
            if(militaryHour === 12){
                newHourHead.textContent = '12' + pm;
            } else if(militaryHour === 24 || militaryHour === 0){
                newHourHead.textContent = '12' + am;
            } else if(militaryHour < 12){
                //1am-11am
                newHourHead.textContent = militaryHour + am;
            } else {
                //1pm-11pm
                newHourHead.textContent = (militaryHour - standardTimeOffSet) + pm;
            }
            tableRow.appendChild(newHourHead);
        }
        document.querySelector('thead').appendChild(tableRow);
        return tableRow;
    }

    function createTotalsFooterRow(){
        var totalsRow = document.createElement('tr');
        var totalsHead = document.createElement('th');
        totalsHead.setAttribute('scope', 'row');
        totalsHead.textContent = 'Totals';
        document.querySelector('tfoot').appendChild(totalsRow);
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
        dailyLocationTotal.setAttribute('scope', 'col');
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