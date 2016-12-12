(function() {
    'use strict';

    angular.module('app', [])
    
    .controller('mainCtrl', function($scope) {
        
        $scope.user1 = {
            name: 'Luke Skywalker',
            address: {
                street: 'PO Box 123',
                city: 'Secret Rebel Base',
                planet: 'Yavin 4'
            },
            friends: ['Han', 'Leia', 'Chewbacca']
        }

        $scope.user2 = {
            name: 'Han Solo',
            address: {
                street: 'PO Box 123',
                city: 'Mos Eisley',
                planet: 'Tattoine'
            },
            friends: ['Luke', 'Leia', 'Chewbacca']
        }

    })

    .directive('userInfoCard', function() {
        return {
            templateUrl: 'userInfoCard.html',
            restrinc: 'E',
            scope: {
                user: '=',
                initialCollapsed: '@?collapsed'
            },
            controller: function($scope) {
                $scope.collapsed = ($scope.initialCollapsed === 'true');

                $scope.knightUser = function(user) {
                    user.rank = 'Knight';
                }

                $scope.collapse = function() {
                    $scope.collapsed = !$scope.collapsed;
                }

                $scope.removeFriend = function(friend) {
                    var idx = $scope.user.friends.indexOf(friend);
                    if(idx > -1) {
                        $scope.user.friends.splice(idx, 1);
                    }
                }
            }
        }
    })

    .directive('removeFriend', function() {
        return {
            restrinc: 'E',
            templateUrl: 'removeFriend.html',
            scope: {
                notifyParent: '&method'
            },
            controller: function($scope) {
                $scope.removing = false;

                $scope.startRemove = function() {
                    $scope.removing = true;
                }

                $scope.cancelRemove = function() {
                    $scope.removing = false;
                }

                $scope.confirmRemove = function() {
                    $scope.notifyParent();
                }
            }
        }
    })

    .directive('address', function() {
        return {
            templateUrl: 'address.html',
            restrinc: 'E',
            scope: true,
            controller: function($scope) {
                $scope.collapsed = false;

                $scope.collapse = function() {
                    $scope.collapsed = !$scope.collapsed;
                }
            }
        }
    })

})();