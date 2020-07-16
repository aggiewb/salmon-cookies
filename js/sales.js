(function(){
    'use strict';
    function CookieStore(name, minHourlyCustomers, maxHourlyCustomers, averageCookiesPerCustomer){
        this.name = name;
        this.minHourlyCustomers = minHourlyCustomers;
        this.maxHourlyCustomers = maxHourlyCustomers;
        this.averageCookiesPerCustomer = averageCookiesPerCustomer;
        this.simulatedCookiesPerHour = [];
    }

    const firstPike = new CookieStore('1st and Pike', 23, 65, 6.3);
    const seatacAirport = new CookieStore('SeaTac Airport', 3, 24, 1.2);
    const seattleCenter = new CookieStore('Seattle Center', 11, 38, 3.7);
    const capitolHill = new CookieStore('Capitol Hill', 20, 38, 2.3);
    const alki = new CookieStore('Alki', 2, 16, 4.6);

    const cookieStoreLocations = [firstPike, seatacAirport, seattleCenter, capitolHill, alki];
    const OPEN_HOURS = 14;
    let allStoresTotal = 0;

    CookieStore.prototype.randomCustomersPerHour = function(){
        return Math.ceil(Math.random() * (this.maxHourlyCustomers - this.minHourlyCustomers)) + this.minHourlyCustomers;
    };

    CookieStore.prototype.calculateSimulatedCookiesPerHour = function(){
        for(let i = 0; i < OPEN_HOURS; i++){
            this.simulatedCookiesPerHour.push(Math.floor(this.randomCustomersPerHour() * this.averageCookiesPerCustomer));
        }
    };

    CookieStore.prototype.render = function(){
        const tableStoreRow = document.createElement('tr');
        tableStoreRow.appendChild(createDataCell(this.name, 'th', 'row'));

        this.calculateSimulatedCookiesPerHour();

        for(let i = 0; i < this.simulatedCookiesPerHour.length; i++){
            tableStoreRow.appendChild(createDataCell(this.simulatedCookiesPerHour[i], 'td'));
        }
        document.querySelector('tbody').appendChild(tableStoreRow);
        return tableStoreRow;
    };

    CookieStore.prototype.calculateStoreTotal = function(){
        let total = 0;
        for(let i = 0; i < this.simulatedCookiesPerHour.length; i++){
            total += this.simulatedCookiesPerHour[i];
        }
        return total;
    };

    function createStoreTableContents(){
        const hoursTableRow = createHoursHeadRow();
        hoursTableRow.appendChild(createDataCell('Daily Location Total', 'th', 'col'));

        for(let i = 0; i < cookieStoreLocations.length; i++){
            const store = cookieStoreLocations[i];
            const storeTableRow = store.render();
            const total = store.calculateStoreTotal();
            allStoresTotal += total;
            storeTableRow.appendChild(createDataCell(total, 'td'));
        }
        const totalsRow = createTotalsFooterRow();
        totalsRow.appendChild(createDataCell(allStoresTotal, 'td')).setAttribute('id', 'all-stores-total');
    }

    function createHoursHeadRow(){
        //use military time
        const openingHour = 6;
        const standardTimeOffSet = 12;

        const tableRow = document.createElement('tr');
        tableRow.appendChild(createDataCell('Store Locations', 'th', 'col')).setAttribute('id', 'store-locations');

        for(let i = 0; i < OPEN_HOURS; i++){
            const am = ':00am';
            const pm = ':00pm';
            const militaryHour = openingHour + i;
            let textContent;

            if(militaryHour === 12){
                textContent = `12${pm}`;
            } else if(militaryHour === 24 || militaryHour === 0){
                textContent = `12${am}`;
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
        const totalsRow = document.createElement('tr');
        totalsRow.appendChild(createDataCell('Totals', 'th', 'row'));

        for(let i = 0; i < OPEN_HOURS; i++){
            let total = 0;
            for(let j = 0; j < cookieStoreLocations.length; j++){
                total += cookieStoreLocations[j].simulatedCookiesPerHour[i];
            }
            totalsRow.appendChild(createDataCell(total, 'td'));
        }
        const tfoot = document.querySelector('tfoot');
        tfoot.appendChild(totalsRow);
        if(cookieStoreLocations.length % 2 !== 0){
            tfoot.setAttribute('class', 'highlight');
        }
        return totalsRow;
    }

    function createDataCell(textContent, cellType, scopeType){
        const dataCell = document.createElement(cellType);
        dataCell.textContent = textContent;
        if(scopeType !== undefined){
            dataCell.setAttribute('scope', scopeType);
        }
        return dataCell;
    }

    function getNewStore(event){
        event.preventDefault();
        const form = event.target;
        const storeName = form.querySelector('#store-name').value;
        const minHourlyCustomers = parseInt(form.querySelector('#min-hourly-customer').value);
        const maxHourlyCustomers = parseInt(form.querySelector('#max-hourly-customer').value);
        const avgCookiesPerCustomer = parseInt(form.querySelector('#avg-cookies-per-customer').value);
        const newStore = new CookieStore(storeName, minHourlyCustomers, maxHourlyCustomers, avgCookiesPerCustomer);
        cookieStoreLocations.push(newStore);
        addNewStore(newStore);
        form.querySelector('input[type=\'submit\']').disabled = true;
        Array.from(form.querySelectorAll('input')).forEach(input => {
            if(input.value !== 'Enter store'){
                input.value = '';
            }
        });
    }

    function toggleTotalRowHighlight(){
        if(cookieStoreLocations.length % 2 === 0){
            document.querySelector('tfoot').removeAttribute('class', 'highlight');
        } else {
            document.querySelector('tfoot').setAttribute('class', 'highlight');
        }
    }

    function newStoreNameInputValidation(event){
        const storeNameInput = event.target;
        if(!isNaN(storeNameInput.value)){
            storeNameInput.value = '';
            storeNameInput.setAttribute('class', 'name-warning-input');
            document.querySelector('#hide-name-warning-message').setAttribute('id', 'name-warning-message');
        } else {
            storeNameInput.removeAttribute('class', 'name-warning-input');
            document.querySelector('p').setAttribute('id', 'hide-name-warning-message');
        }
    }

    function allInputsCompleted(event){
        const form = event.target.parentNode;
        const formInputs = Array.from(form.querySelectorAll('input'));
        console.log(formInputs, formInputs.value);
        if(formInputs.find(input => input.value === '') === undefined){
            document.querySelector('input[type=\'submit\']').disabled = false;
        }
    }

    function addNewStore(newStore){
        newStore.render();
        let storeTotal = newStore.calculateStoreTotal();
        document.querySelector('tbody').lastChild.appendChild(createDataCell(storeTotal, 'td'));
        allStoresTotal += storeTotal;
        document.querySelector('#all-stores-total').textContent = allStoresTotal;
        toggleTotalRowHighlight();
    }

    const form = document.querySelector('form');
    form.addEventListener('submit', getNewStore);
    form.addEventListener('keyup', allInputsCompleted);
    document.querySelector('input[id=\'store-name\']').addEventListener('change', newStoreNameInputValidation);
    createStoreTableContents();

})();