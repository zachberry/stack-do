function ProjectCtrl($scope) {
	$scope.projects = [
		{name:'1', done:false},
		{name:'2', done:false},
		{name:'3', done:false}
	];

	$scope.addProject = function() {
		$scope.projects.push({name:$scope.projectName, done:false});
		$scope.projectName = '';
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
}