(function () {
    'use strict';

    angular.module('app', [])

        .controller('mainCtrl', function ($scope) {
            $scope.displayText = "Thi is a message for the Display Box";

            $scope.answers = {
                q1: "Answer 1 Default"
            }
        })

        .directive('displayBox', function() {
            return {
                restrict: 'E',
                templateUrl: '/transclusion/displayBox.html',
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
                templateUrl: "/transclusion/myQuestion.html",
                scope: {
                    questionText: '@q'
                }
            }
        })
})()