var typeApp = angular.module('typeApp', []);
 
typeApp.controller('typeController', function ($scope) {

	$scope.something = "";
	$scope.target = "";
	$scope.isTyping = false;
  
	var things = [
		" a software engineer.",
		" living in Stavanger, Norway.",
		" working for a company called Peanuts.",
		" a gamer.",
		" learning Angular.js"
	];

	var typeSpeed = 120;

	var type = function(str, cb){
		$scope.target = str;

		// Type something.
		_(str).forEach(function(character, i) {
			var delay = Math.round((i * typeSpeed) + (typeSpeed/2)*Math.random() );

			_.delay(function(c) { 
				$scope.$apply(function () {
            $scope.something += c;
        });
			}, delay, character);
		})

		// Erase something.
		_.delay(function(c) { 

			$scope.$apply(function () {
          $scope.target = "";
      });

			_(str).forEachRight(function(character, i) {
				var delay = (str.length - i) * typeSpeed/2;

				_.delay(function(str) { 
					$scope.$apply(function () {
	            $scope.something = str.substr(0, i);

	            i == 0 && _.isFunction(cb) && _.delay(cb, 500);
	        });
				}, delay, str);
			})
		}, str.length * typeSpeed * 2);
	};

	var typeThings = function(i){
		i = (i || 0) % things.length;
		type(things[i], function(){
			typeThings(i+1);
		});
	}

	typeThings();

	$scope.$watch(
      "something",
      function( newValue, oldValue ) {
      	$scope.isTyping = newValue !== $scope.target;
      }
  );

});