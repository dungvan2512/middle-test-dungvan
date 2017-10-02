var app = angular.module('customersApp', ['ngRoute']);

//This configures the routes and associates each route with a view and a controller
app.config(function ($routeProvider) {
    $routeProvider
        .when('/customers',
            {
                controller: 'CustomersController',
                templateUrl: '/app/views/customers.html'
            })
        //Define a route that has a route parameter in it (:customerID)
        .when('/customerorders/:customerID',
            {
                controller: 'CustomerOrdersController',
                templateUrl: '/app/views/customerOrders.html'
            })
        //Define a route that has a route parameter in it (:customerID)
        .when('/orders',
            {
                controller: 'OrdersController',
                templateUrl: '/app/views/orders.html'
            })
        //Define a route that has a route parameter in it (:customerID)
        .when('/chat',
            {
                controller: 'ChatController',
                templateUrl: '/app/views/chat.html'
            })
        .otherwise({ redirectTo: '/customers' });
});




