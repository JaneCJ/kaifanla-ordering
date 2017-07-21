var app = angular.module("kaifanla",["ng","ngRoute"]);
app.controller("parentCtrl",["$scope","$location",function($scope,$location){
    $scope.jump = function(url){
        $location.path(url);
    }
}])
app.controller("startCtrl",["$scope",function($scope){

}])
app.controller("mainCtrl",["$scope","$http",function($scope,$http){
    $http.get('data/dish_getbypage.php?start=0')
        .success(function(data){
            $scope.dishList = data;
        })
    $scope.hasMore = true;
    $scope.loadMore = function(){
        $http.get('data/dish_getbypage.php?start='+$scope.dishList.length)
            .success(function(data){
                $scope.dishList = $scope.dishList.concat(data);
                if(data.length<5){
                    $scope.hasMore = false;
                }
            })
    }
    $scope.$watch('kw',function(){
        if($scope.kw){
            $http.get('data/dish_getbykw.php?kw='+$scope.kw)
                .success(function(data){
                    $scope.dishList = data;
                })
        }
    })
}])
app.controller("detailCtrl",["$scope","$routeParams","$http",function($scope,$routeParams,$http){
    var did = $routeParams.id;
    $http.get('data/dish_getbyid.php?id='+did)
        .success(function(data){
            $scope.dish = data;
            console.log(data);
        })
}])
app.controller("orderCtrl",["$scope","$routeParams","$http",function($scope,$routeParams,$http){
    var did = $routeParams.id;
    $scope.order = {'did':did};
    $scope.submitOrder = function(){
        var args = jQuery.param($scope.order);
        // console.log(args);
        $http.get('data/order_add.php?'+args)
            .success(function(data){
                // console.log(data);
                if(data[0].msg == 'succ')
                {
                    sessionStorage.setItem('phone',$scope.order.phone);
                    $scope.succMsg = "下单成功，订单编号为"+data[0].oid;
                }
                else
                {
                    $scope.errMsg = '下单失败!';
                }
            })
    }
}])
app.controller("myorderCtrl",["$scope","$http",function($scope,$http){
    $http.get('data/order_getbyphone.php?phone='+sessionStorage.getItem('phone'))
        .success(function(data){
            console.log(data);
            $scope.orderList = data;
        })
}])
app.config(function($routeProvider){
    $routeProvider
        .when("/start",{
        templateUrl:"tpl/start.html",
        controller:"startCtrl"
        })
        .when("/main",{
            templateUrl:"tpl/main.html",
            controller:"mainCtrl"
        })
        .when("/detail",{
            templateUrl:"tpl/detail.html",
            controller:"detailCtrl"
        })
        .when("/detail/:id",{
            templateUrl:"tpl/detail.html",
            controller:"detailCtrl"
        })
        .when("/order",{
            templateUrl:"tpl/order.html",
            controller:"orderCtrl"
        })
        .when("/order/:id",{
            templateUrl:"tpl/order.html",
            controller:"orderCtrl"
        })
        .when("/myorder",{
            templateUrl:"tpl/myorder.html",
            controller:"myorderCtrl"
        })
        .otherwise({
            redirectTo:"/start"
        })
})