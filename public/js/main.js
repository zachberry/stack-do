var stackdoServices = angular.module('stackdoServices', ['ngResource']);

stackdoServices.factory('List', ['$resource', function($resource) {
	return $resource('stack/:stackId', {}, {
		query: {
			method: 'GET',
			params: { stackId:'52c8bf22b7e9f451272a7063' },
			isArray: true,
			transformResponse: function(data, header) {
				return angular.fromJson(angular.fromJson(data).projects);
			}
		},
		update: {
			method: 'PUT'
		}
	});
}]);



var stackdo = angular.module('stackdo', ['stackdoServices']);

stackdo.controller('ProjectCtrl', ['$scope', 'List', function($scope, List) {
	/*$scope.projects = [
		{name:'1', done:false},
		{name:'2', done:false},
		{name:'3', done:false}
	];*/

	$scope.projects = List.query();

	$scope.action = 'Update';

	$scope.save = function() {
		List.update({id: '52c8bf22b7e9f451272a7063'}, $scope.projects, function() {
			console.log('up dooted');
		});
	};

	$scope.addProject = function() {
		$scope.projects.push({name:$scope.projectName, done:false});
		$scope.projectName = '';

		$scope.save();
	};

	$scope.completeProject = function(project, $event) {
		if(!$event.shiftKey)
		{
			$scope.projects.push({name:project.name, done:true});
		}
		$scope.deleteProject(project);
	};

	$scope.uncompleteProject = function(project) {
		$scope.projects.push({name:project.name, done:false});
		$scope.deleteProject(project);
	};

	$scope.resumeProject = function(project) {
		console.log('resume project');
		$scope.projects.splice(0, 0, $scope.projects.splice($scope.projects.indexOf(project), 1)[0]);
	}

	$scope.deleteProject = function(project) {
		$scope.projects.splice($scope.projects.indexOf(project), 1);
	};
}]);