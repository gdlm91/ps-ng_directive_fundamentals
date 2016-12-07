(function() {
    'use strict';

    angular.module('app', [])
    
    .controller('mainCtrl', function($scope) {
        $scope.user = {
            name: 'Luke Skywalker',
            address: {
                street: 'PO Box 123',
                city: 'Secret Rebel Base',
                planet: 'Yavin 4'
            },
            friends: ['Han', 'Leia', 'Chewbacca']
        }

    })

    .directive('userInfoCard', function() {
        return {
            templateUrl: "userInfoCard.html",
            restrinc: 'E'
        }
    })

})();