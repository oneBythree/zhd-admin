//解码规则
app.controller('ruleCtrl', ['$scope','$http', function($scope,$http){
        $http.get('api/basicGoods.json').success(function(data) {
        $scope.goodsList = data;
    })
}])
