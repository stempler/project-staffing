(function() {
  'use strict';

  angular
  .module('project-staffing')
  .config(function($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: 'views/index.html',
    })
    .when('/dashboard', {
      templateUrl: 'views/dashboard.html',
    })
    .when('/list-employees', {
      templateUrl: 'views/list_employees.html',
      controller: 'EmployeeController',
      controllerAs: 'employeeCtrl',
    })
    .when('/add-employee', {
      templateUrl: 'views/add_employee.html',
      controller: 'EmployeeController',
      controllerAs: 'employeeCtrl',
    })
    .when('/list-customers', {
      templateUrl: 'views/list_customers.html',
    })
    .when('/staffing', {
      templateUrl: 'views/staff_project.html',
      controller: 'StaffingController',
      controllerAs: 'staffingCtrl',
    })
    .when('/add-customer', {
      templateUrl: 'views/add_customer.html',
    })
    .when('/help', {
      templateUrl: 'views/help.html',
    })
    .otherwise({
      redirectTo: '/',
    });
  });
})();
