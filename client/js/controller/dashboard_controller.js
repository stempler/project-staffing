﻿(function() {
  'use strict';

  angular.module('project-staffing').controller('DashboardController', function($http, $scope, $filter) {

    console.log('Dashboard Controller');
    
    var location = this;
    location.employees = [];
    location.latestprojects = [];
    
    // draw table
    var dataArray = [
        ['Lat', 'Long', 'Office', 'Revenue', 'No. Employees', 'Utilization'],
        [51.1672852,7.0626139, 'Solingen', {v: 12, f: '12.0%'}, 0, 85],
        [51.2111382,6.7822516, 'Düsseldorf', {v: 7.3, f: '7.3%'}, 0, 65],
        [48.1368364,11.5234671, 'München', {v: 3.6, f: '3.6%'}, 0, 75],
        [52.5083545,13.3771307, 'Berlin', {v: 2.1, f: '2.1%'}, 0, 86],
        [49.00367,8.36476, 'Karlsruhe', {v: 5.4, f: '5.4%'}, 0, 40],
        [50.0779865,8.6246555, 'Frankfurt', {v: 3.1, f: '3.1%'}, 0, 55],
        [53.55539,9.98492, 'Hamburg', {v: 2.5, f: '2.5%'}, 0, 30],
        [51.4969802, 11.9688029, 'Halle (Saale)', {v: -5.1, f: '5.1%'}, 0, 20]
    ];
    
    $http.get('http://localhost:9000/api/mongo/search/location/employees').success(function(data) {
        console.log('Get employees grouped by location');
        location.employees = data;
        for ( var id in dataArray ) {
            var locationKey = dataArray[id][2];
            for ( var idLocation in location.employees ) {
                if ( location.employees[idLocation]._id == locationKey ) {
                    var totalEmployees = location.employees[idLocation].total;
                    dataArray[id][4] = totalEmployees;
                };
            };            
        };
        
        var geoData = google.visualization.arrayToDataTable(dataArray);
        var geoView = new google.visualization.DataView(geoData);
        geoView.setColumns([0, 1]);

        var tableView = new google.visualization.DataView(geoData);
        tableView.setColumns([2, 3, 4, 5]);

        var table = new google.visualization.Table(document.getElementById('table_div'));

        var formatter = new google.visualization.ArrowFormat();
        formatter.format(geoData, 3); // Apply formatter to 4th column

        var barformatter = new google.visualization.BarFormat({width: 150, min: 0, max: 100});
        barformatter.format(geoData, 5); // Apply formatter to second column

        table.draw(tableView, {showRowNumber: false, allowHtml: true});

        // draw map
        var mapOptions = { mapType:'normal', showTip: false, enableScrollWheel: true};
        var map = new google.visualization.Map(document.getElementById('map_div'));
        map.draw(geoView, mapOptions);

        // Set a 'select' event listener for the table.
        // When the table is selected, we set the selection on the map.
        google.visualization.events.addListener(table, 'select',
        function() {
            map.setSelection(table.getSelection());
        });

        // Set a 'select' event listener for the map.
        // When the map is selected, we set the selection on the table.
        google.visualization.events.addListener(map, 'select',
        function() {
            table.setSelection(map.getSelection());
        });
 
    });

    $http.get('http://localhost:9000/api/mongo/search/employees/latestproject').success(function(data) {
        console.log('Get latest project for all employees');
        console.log(data);
        location.latestprojects = data;
        
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Name');
        data.addColumn('string', 'Office');
        data.addColumn('string', 'Project Name');
        data.addColumn('date', 'Start');
        data.addColumn('date', 'End');
        
        for ( var id in location.latestprojects) {
            var item = location.latestprojects[id];
            console.log(item);
            data.addRow([item.name, item.office, item.projects.name, new Date(item.projects.start), new Date(item.projects.end)]);
        };
        
        var table = new google.visualization.Table(document.getElementById('latestprojects_div'));
        table.draw(data, {showRowNumber: false, sortColumn: 4});
    });   
    
 });

})();
