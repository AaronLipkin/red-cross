var app = angular.module('RedCross', []);

app.controller('FormController', ['$scope', '$http', function($scope, $http){
	$scope.data = {};


	this.locate = () => {
	const onPositionUpdate = (position) => {
		$scope.$apply(() => {
			$scope.data.lat = position.coords.latitude;
			$scope.data.lng = position.coords.longitude;
		})
	}

	if (navigator.geolocation) navigator.geolocation.getCurrentPosition(onPositionUpdate);
			console.log($scope.data.lat,$scope.data.lng)

 }

	this.formData = {}
	this.formData.hasCar= false
	this.submitForm = () => {

		if (this.formData.hasCar) {
		this.formData.lat = $scope.data.lat
		this.formData.lng = $scope.data.lng
	}
		console.log(this.formData)
		$http({
			method:'POST',
			url:'/',
			data: this.formData
		}).then(
		(response) => {
			console.log(response)
			window.location = "/thanks"
		},
		function(){
			console.log(this.lat,this.lng)
		})
	}

}])



app.controller('CarsController', ['$scope', '$http', function($scope, $http){
	this.getCars = () => {
		$http({
			method:'get',
			url:'/cars'
		}).then(
		(response) => {
			console.log(response)
			this.cars = response.data
		},
		function(){
			
		})
	}


	this.getCars()

}])