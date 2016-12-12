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

            $scope.messages = [];

            $scope.handlePause = function (e) {
                console.log(e);
                $scope.messages.push({ text: 'Video was paused!' });
                console.log("Video was paused!");
            }

            $scope.data = { message: 'I have not been clicked :(' };

            $scope.handleClick = function (p) {
                p.message = "You clicked me! :D";
            }

            $scope.size = 100;

            $scope.displayText = "Thi is a message for the Display Box";

            $scope.answers = {
                q1: "Answer 1 Default"
            }

        })

        .directive('personInfoCard', function () {
            return {
                templateUrl: 'personInfoCard.html',
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
                templateUrl: 'droidInfoCard.html',
                restrinc: 'E',
                scope: {
                    droid: '=',
                    initialCollapsed: '@?collapsed'
                },
                controller: function ($scope) {
                    
                }
            }
        })

        .directive('userPanel', function() {
            return {
                restrict: 'E',
                transclude: true,
                templateUrl: 'userPanel.html',
                scope: {
                    name: '@',
                    state: '=',
                    initialCollapsed: '@collapsed'
                },
                controller: function($scope) {
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
                    scope.$watch(state, function(newVal) {
                        elm.removeClass(classes.join(' ')).addClass(params[newVal + 1]);
                    })
                }
            }
        })

        .directive('removeFriend', function () {
            return {
                restrinc: 'E',
                templateUrl: 'removeFriend.html',
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
                templateUrl: 'address.html',
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

        /** Decorative */
        ////////////////

        .directive('spacebarSupport', function () {
            return {
                restrinc: 'A',
                link: function (scope, elm, attrs) {
                    $('body').on('keypress', function (evt) {
                        var vidEl = elm[0];
                        if (evt.keyCode === 32) {
                            if (vidEl.paused) {
                                vidEl.play();
                            } else {
                                vidEl.pause();
                            }
                        }
                    });
                }
            }
        })

        .directive('eventPause', function ($parse) {
            return {
                restrinc: 'A',
                link: function (scope, elm, attrs) {
                    var fn = $parse(attrs['eventPause']);
                    elm.on('pause', function (event) {
                        scope.$apply(function () {
                            fn(scope, { evt: event });
                        })
                    })
                }
            }
        })

        .directive('myClick', function ($parse) {
            return {
                restrinc: 'A',
                link: function (scope, elm, attrs) {
                    var fn = $parse(attrs['myClick']);
                    elm.on('click', function (event) {
                        scope.$apply(function () {
                            fn(scope);
                        })
                    });
                }
            }
        })

        .directive('userTitle', function () {
            return {
                restrinc: 'E',
                templateUrl: 'userTitle.html',
                scope: {
                    user: '='
                },
                controller: function ($scope) {
                }
            }
        })

        .directive('userClickSelect', function () {
            return {
                link: function (scope, elm, attrs) {
                    elm.on('click', function () {
                        scope.user.selected = !scope.user.selected;
                        scope.$apply();
                    })
                }
            }
        })

        .directive('fontScale', function () {
            return {
                link: function (scope, elm, attrs) {
                    scope.$watch(attrs['fontScale'], function (newVal) {
                        elm.css('font-size', newVal + '%');
                    })
                }
            }
        })

        /** Transclusion */
        //////////////////

        .directive('displayBox', function() {
            return {
                restrict: 'E',
                templateUrl: 'displayBox.html',
                controller: function($scope) {
                    $scope.hidden = false;
                    $scope.close = function() {
                        $scope.hidden = true;
                    }
                    $scope.displayText = "Hijacking the Message !!!";
                },
                transclude: true,
                scope: true
            }
        })

        .directive('myQuestion', function() {
            return {
                restrict: 'E',
                transclude: true,
                templateUrl: "myQuestion.html",
                scope: {
                    questionText: '@q'
                }
            }
        })

})();