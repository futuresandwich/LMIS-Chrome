'use strict';

var chromeApp = angular.module('lmisChromeApp');

chromeApp.controller('MainCtrl', function ($scope, storageService, $location ) {
        var url_arr = $location.path().replace(/\/$/,'').replace(/^\//,'').split('/');
        var bc = [];
        if(url_arr.indexOf('products') != -1){
            bc = [{name:"Products", "link":''}];
        }
        else if(url_arr.indexOf('product_items') != -1){
            bc = [
                    {name:"Product", "link":'#/main/products'},
                    {name:"Product Item", "link":''}
                 ];
        }
        else if(url_arr.indexOf('product_form') != -1){
            bc =
            [
                {name:"Products", "link":'#/main/products'},
                {name:"Add Product", "link":''}
            ];
        }
        else{
            bc = [];
        }
        $scope.addbreadcrumbs(bc);

        storageService.get('products').then(function(d){
           $scope.products = d;
        });
        //console.log($scope.products);
        /*$scope.$watch('online', function(newStatus) {})*/
});

/**
    ProductListCtrl controller handles display of products pulled from storage.
*/
chromeApp.controller('ProductListCtrl', function ($scope, storageService, utility) {

    storageService.get(storageService.PRODUCT).then(function(productList){
           $scope.products = productList;
    });

    utility.loadTableObject(storageService.PRODUCT_CATEGORY).then(function(data){
        $scope.product_categories = data;
    });

    utility.loadTableObject(storageService.UOM).then(function(data){
        $scope.uomList = data;
    });

});


/**
    AddProductCtrl - handles the addition of product to storage.
    it uses storage service to load product category and unit of measurement list used to populate product form
    respective drop downs.
*/
chromeApp.controller('AddProductCtrl', function($scope, storageService, $location){

    storageService.get(storageService.PRODUCT_CATEGORY).then(function(product_categories){
           $scope.categories = product_categories;
    });

    storageService.get(storageService.UOM).then(function(uomList){
        $scope.uomList = uomList;
    });

    //create a blank object tha will be used to hold product form info
    $scope.product = {};

    $scope.saveProduct = function(){
        //TODO: implement save of product here
        if(Object.keys($scope.product).length>0){
            storageService.insert(storageService.PRODUCT, $scope.product).then(function(bool){
                if(bool){
                    $scope.setMessage({message:"Data saved ", type:"success"});
                    $location.path('/main/products');
                }
                else{

                }
            });
        }
        else{
            $scope.setMessage({message:"can't save empty form", type:"danger"});
        }

    }
});


/**
    ProductItemListCtrl - This handles the display of Product-Items pulled from storage.
*/
chromeApp.controller('ProductItemListCtrl', function($scope, storageService){
     storageService.get(storageService.PRODUCT_ITEM).then(function(productItems){
           $scope.productItemList = productItems;
    });


});


