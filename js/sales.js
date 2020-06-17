var firstPike = {
    minHourlyCustomers: 23,
    maxHourlyCustomers: 65,
    averageCookiesPerCustomer: 6.3,
    randomCustomersPerHour: function() {
        return Math.ceil(Math.random() * (this.maxHourlyCustomers - this.minHourlyCustomers)) + this.minHourlyCustomers;
    }
};

var seatacAirport = {
    minHourlyCustomers: 3,
    maxHourlyCustomers: 24,
    averageCookiesPerCustomer: 1.2,
    randomCustomersPerHour: function() {
        return Math.ceil(Math.random() * (this.maxHourlyCustomers - this.minHourlyCustomers)) + this.minHourlyCustomers;
    }
};

var seattleCenter = {
    minHourlyCustomers: 11,
    maxHourlyCustomers: 38,
    averageCookiesPerCustomer: 3.7, 
    randomCustomersPerHour: function() {
        return Math.ceil(Math.random() * (this.maxHourlyCustomers - this.minHourlyCustomers)) + this.minHourlyCustomers;
    }
};

var capitolHill = {
    minHourlyCustomers: 20,
    maxHourlyCustomers: 38,
    averageCookiesPerCustomer: 2.3, 
    randomCustomersPerHour: function() {
        return Math.ceil(Math.random() * (this.maxHourlyCustomers - this.minHourlyCustomers)) + this.minHourlyCustomers;
    }
};

var alki = {
    minHourlyCustomers: 2,
    maxHourlyCustomers: 16,
    averageCookiesPerCustomer: 4.6, 
    randomCustomersPerHour: function() {
        return Math.ceil(Math.random() * (this.maxHourlyCustomers - this.minHourlyCustomers)) + this.minHourlyCustomers;
    }
};

function calculateSimulatedCookiesPerHour(shopLocation){
    //using military time
    var openHours = 20 - 6;
    var simulatedCookiesPerHour = [];
    for(var i = 0; i < openHours; i++){
        simulatedCookiesPerHour[i] = Math.floor(shopLocation.randomCustomersPerHour() * shopLocation.averageCookiesPerCustomer);
    }
    return simulatedCookiesPerHour;
}

var cookieLocations = [firstPike, seatacAirport, seattleCenter, capitolHill, alki];

for(var i = 0; i < cookieLocations.length; i++){
    cookieLocations[i].simulatedCookiesPerHour = calculateSimulatedCookiesPerHour(cookieLocations[i]);
}