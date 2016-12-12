(function () {
    'use strict';

    angular.module('app', [])

        .controller('mainCtrl', function ($scope) {

            $scope.person1 = {
                name: "Luke",
                selected: false
            }

            $scope.messages = [];

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
        })

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
                templateUrl: '/decorator/userTitle.html',
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
})()