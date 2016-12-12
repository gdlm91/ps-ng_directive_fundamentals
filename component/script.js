(function () {
    'use strict';

    angular.module('app', [])

        .controller('mainCtrl', function ($scope) {

            $scope.person1 = {
                name: 'Luke Skywalker',
                address: {
                    street: 'PO Box 123',
                    city: 'Secret Rebel Base',
                    planet: 'Yavin 4'
                },
                friends: ['Han', 'Leia', 'Chewbacca'],
                state: 0,
                selected: false
            }

            $scope.person2 = {
                name: 'Han Solo',
                address: {
                    street: 'PO Box 123',
                    city: 'Mos Eisley',
                    planet: 'Tattoine'
                },
                friends: ['Luke', 'Leia', 'Chewbacca'],
                state: 1
            }

            $scope.droid1 = {
                name: 'R2-D2',
                specifications: {
                    manufacturer: 'Industrial Automation',
                    type: 'Astromech',
                    productLine: 'R2 series'
                },
                state: 2
            }

        })

        .directive('personInfoCard', function () {
            return {
                templateUrl: '/component/personInfoCard.html',
                restrinc: 'E',
                scope: {
                    person: '=',
                    initialCollapsed: '@?collapsed'
                },
                controller: function ($scope) {
                    $scope.knightperson = function (person) {
                        person.rank = 'Knight';
                    }

                    $scope.removeFriend = function (friend) {
                        var idx = $scope.person.friends.indexOf(friend);
                        if (idx > -1) {
                            $scope.person.friends.splice(idx, 1);
                        }
                    }
                }
            }
        })

        .directive('droidInfoCard', function () {
            return {
                templateUrl: '/component/droidInfoCard.html',
                restrinc: 'E',
                scope: {
                    droid: '=',
                    initialCollapsed: '@?collapsed'
                },
                controller: function ($scope) {

                }
            }
        })

        .directive('userPanel', function () {
            return {
                restrict: 'E',
                transclude: true,
                templateUrl: '/component/userPanel.html',
                scope: {
                    name: '@',
                    state: '=',
                    initialCollapsed: '@collapsed'
                },
                controller: function ($scope) {
                    $scope.collapsed = ($scope.initialCollapsed === 'true');

                    $scope.collapse = function () {
                        $scope.collapsed = !$scope.collapsed;
                    }

                    $scope.nextState = function (evt) {
                        evt.stopPropagation();
                        evt.preventDefault();
                        $scope.state++;
                        $scope.state = $scope.state % 3;
                    }
                }
            }
        })

        .directive('stateDisplay', function () {
            return {
                link: function (scope, elm, attrs) {
                    var params = attrs['stateDisplay'].split(' ');
                    var state = params[0];
                    var classes = params.slice(1);
                    scope.$watch(state, function (newVal) {
                        elm.removeClass(classes.join(' ')).addClass(params[newVal + 1]);
                    })
                }
            }
        })

        .directive('removeFriend', function () {
            return {
                restrinc: 'E',
                templateUrl: '/component/removeFriend.html',
                scope: {
                    notifyParent: '&method'
                },
                controller: function ($scope) {
                    $scope.removing = false;

                    $scope.startRemove = function () {
                        $scope.removing = true;
                    }

                    $scope.cancelRemove = function () {
                        $scope.removing = false;
                    }

                    $scope.confirmRemove = function () {
                        $scope.notifyParent();
                    }
                }
            }
        })

        .directive('address', function () {
            return {
                templateUrl: '/component/address.html',
                restrinc: 'E',
                scope: true,
                controller: function ($scope) {
                    $scope.collapsed = false;

                    $scope.collapse = function () {
                        $scope.collapsed = !$scope.collapsed;
                    }
                }
            }
        })

})()