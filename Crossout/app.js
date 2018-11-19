angular.module('Crossout', ['ui.bootstrap'])
.controller('Market', function($scope, $http) {
	$scope.Math = window.Math;
	$scope.scrapPerToken = 500/300
	$scope.copperPerToken = 200/300
	$scope.wiresPerToken = 500/500
	$scope.plasticPerToken = 250/500
	$scope.electronicsPerToken = 200/800
	$scope.batteriesPerToken = 200/800
	$scope.wandererPerToken = 1/600
	$scope.pathfinderPerToken = 1/3000
	
	$scope.currentTime = Math.floor(Date.now()/1000)
	
	beginTime = $scope.currentTime - 7200
	
	$scope.afterTax = function(price, amount) {
		return Math.floor(price*0.9)/amount
	}
	$scope.perToken = function(price, amount, multiplier) {
		price = Math.floor($scope.afterTax(price, amount) * multiplier * 10000) / 10000
		if (isNaN(price)) {
			return "Fetching..."
		}
		return price;
	}
	$scope.timeSince = function(date) {
		var seconds = Math.floor(Date.now()/1000) - (date + 3600);
		if (isNaN(seconds)) {
			return ""
		}
		var interval = Math.floor(seconds / 31536000);

		if (interval > 1) {
		return interval + " years";
		}
		interval = Math.floor(seconds / 2592000);
		if (interval > 1) {
		return interval + " months";
		}
		interval = Math.floor(seconds / 86400);
		if (interval > 1) {
		return interval + " days";
		}
		interval = Math.floor(seconds / 3600);
		if (interval > 1) {
		return interval + " hours";
		}
		interval = Math.floor(seconds / 60);
		if (interval > 1) {
		return interval + " minutes";
		}
		return Math.floor(seconds) + " seconds";
	}
	
    $http.get('https://crossoutdb.com/api/v1/market-all/53?startTimestamp=' + beginTime).
        then(function(response) {
            $scope.scrap = response.data[response.data.length-1];
        });
	$http.get('https://crossoutdb.com/api/v1/market-all/57?startTimestamp=' + beginTime).
		then(function(response) {
			$scope.scrap10 = response.data[response.data.length-1];
		});
		
    $http.get('https://crossoutdb.com/api/v1/market-all/43?startTimestamp=' + beginTime).
        then(function(response) {
            $scope.copper = response.data[response.data.length-1];
        });
	$http.get('https://crossoutdb.com/api/v1/market-all/118?startTimestamp=' + beginTime).
		then(function(response) {
			$scope.copper10 = response.data[response.data.length-1];
		});
		
    $http.get('https://crossoutdb.com/api/v1/market-all/85?startTimestamp=' + beginTime).
        then(function(response) {
            $scope.wires = response.data[response.data.length-1];
        });
	$http.get('https://crossoutdb.com/api/v1/market-all/221?startTimestamp=' + beginTime).
		then(function(response) {
			$scope.wires10 = response.data[response.data.length-1];
		});
		
    $http.get('https://crossoutdb.com/api/v1/market-all/785?startTimestamp=' + beginTime).
        then(function(response) {
            $scope.plastic = response.data[response.data.length-1];
        });
	$http.get('https://crossoutdb.com/api/v1/market-all/786?startTimestamp=' + beginTime).
		then(function(response) {
			$scope.plastic10 = response.data[response.data.length-1];
		});
		
    $http.get('https://crossoutdb.com/api/v1/market-all/201?startTimestamp=' + beginTime).
        then(function(response) {
            $scope.electronics = response.data[response.data.length-1];
        });
	$http.get('https://crossoutdb.com/api/v1/market-all/168?startTimestamp=' + beginTime).
		then(function(response) {
			$scope.electronics10 = response.data[response.data.length-1];
		});
		
    $http.get('https://crossoutdb.com/api/v1/market-all/783?startTimestamp=' + beginTime).
        then(function(response) {
            $scope.batteries = response.data[response.data.length-1];
        });
	$http.get('https://crossoutdb.com/api/v1/market-all/784?startTimestamp=' + beginTime).
		then(function(response) {
			$scope.batteries10 = response.data[response.data.length-1];
		});
		
    $http.get('https://crossoutdb.com/api/v1/market-all/368?startTimestamp=' + beginTime).
        then(function(response) {
            $scope.wanderer = response.data[response.data.length-1];
        });
		
	$http.get('https://crossoutdb.com/api/v1/market-all/369?startTimestamp=' + beginTime).
		then(function(response) {
			$scope.pathfinder = response.data[response.data.length-1];
		});
})
;