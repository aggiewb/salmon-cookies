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
        tableStoreRow.appendChild(createDataCell(this.name, 'th', 'row'));

        this.calculateSimulatedCookiesPerHour();
        
        for(var i = 0; i < this.simulatedCookiesPerHour.length; i++){
            tableStoreRow.appendChild(createDataCell(this.simulatedCookiesPerHour[i], 'td'));
        }
        document.querySelector('tbody').appendChild(tableStoreRow);
        return tableStoreRow;
    }

    CookieStore.prototype.calculateStoreTotal = function(){
        var total = 0;
        for(var i = 0; i < this.simulatedCookiesPerHour.length; i++){
            total += this.simulatedCookiesPerHour[i];
        }
        return total;
    }

    function createStoreTableContents(){
        var hoursTableRow = createHoursHeadRow();
        hoursTableRow.appendChild(createDataCell('Daily Location Total', 'th', 'col'));

        var allStoresTotal = 0;
        for(var i = 0; i < cookieStoreLocations.length; i++){
            var store = cookieStoreLocations[i];
            var storeTableRow = store.render();
            var total = store.calculateStoreTotal();
            allStoresTotal += total;
            storeTableRow.appendChild(createDataCell(total, 'td'));
        }
        var totalsRow = createTotalsFooterRow();
        totalsRow.appendChild(createDataCell(allStoresTotal, 'td'));
    }

    function createHoursHeadRow(){
        //use military time
        var openingHour = 6;
        var standardTimeOffSet = 12;
        
        var tableRow = document.createElement('tr'); 
        tableRow.appendChild(createDataCell('', 'th', 'col')).setAttribute('id', 'store-locations');

        for(var i = 0; i < OPEN_HOURS; i++){
            var am = ':00am';
            var pm = ':00pm';
            var textContent;
            var militaryHour = openingHour + i;
            
            if(militaryHour === 12){
                textContent = '12' + pm;
            } else if(militaryHour === 24 || militaryHour === 0){
                textContent = '12' + am;
            } else if(militaryHour < 12){
                //1am-11am
                textContent = militaryHour + am;
            } else {
                //1pm-11pm
                textContent = (militaryHour - standardTimeOffSet) + pm;
            }
            tableRow.appendChild(createDataCell(textContent, 'th', 'col'));
        }
        document.querySelector('thead').appendChild(tableRow);
        return tableRow;
    }

    function createTotalsFooterRow(){
        var totalsRow = document.createElement('tr');
        totalsRow.appendChild(createDataCell('Totals', 'th', 'row'));

        for(var i = 0; i < OPEN_HOURS; i++){
            var total = 0;
            for(var j = 0; j < cookieStoreLocations.length; j++){
                total += cookieStoreLocations[j].simulatedCookiesPerHour[i];
            }
            totalsRow.appendChild(createDataCell(total, 'td'));
        }
        var tfoot = document.querySelector('tfoot');
        tfoot.appendChild(totalsRow);
        if(cookieStoreLocations.length % 2 !== 0){
            tfoot.setAttribute('class', 'highlight');
        }
        return totalsRow;
    }

    function createDataCell(textContent, cellType, scopeType){
        var dataCell = document.createElement(cellType);
        dataCell.textContent = textContent;
        if(scopeType !== undefined){
            dataCell.setAttribute('scope', scopeType);
        }
        return dataCell;
    }

    createStoreTableContents();

})();