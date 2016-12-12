(function () {
    'use strict';

    angular.module('app', [])

        .controller('mainCtrl', function ($scope) {
            $scope.items = [1, 2, 3, 4, 5];

            $scope.shoit = false;

            $scope.collection = [
                { name: "Item 1", description: "Description 1" },
                { name: "Item 2", description: "Description 2" },
                { name: "Item 3", description: "Description 3" },
                { name: "Item 4", description: "Description 4" }
            ]

            $scope.collectionAdd = function () {
                var idx = $scope.collection.length + 1;
                $scope.collection.push({
                    name: "Item " + idx,
                    description: "Description " + idx
                });
            }

            $scope.collectionRemove = function () {
                $scope.collection.splice($scope.collection.length - 1, 1);
            }
        })

        .directive('myTransclusion', function () {
            return {
                restrict: 'A',
                transclude: 'element',
                link: function (scope, elm, attrs, ctrl, transclude) {
                    transclude(scope, function (clone) {
                        elm.after(clone);
                    })
                }
            }
        })

        .directive('lazyLoading', function () {
            return {
                restrict: 'A',
                transclude: 'element',
                priority: 1200, //Sets the priority of running this. Ex: ng-repeat runs at 1000, so it won't run before this directive
                link: function (scope, elm, attrs, ctrl, transclude) {
                    var hasBeenShown = false;
                    var unwatchFn = scope.$watch(attrs.lazyLoading, function (newVal) {
                        if (newVal && !hasBeenShown) {
                            hasBeenShown = true;
                            transclude(scope, function (clone) {
                                elm.after(clone);
                            });
                            unwatchFn();
                        }
                    });
                }
            }
        })

        .directive('myRepeat', function () {
            return {
                restrict: 'A',
                transclude: 'element',
                link: function (scope, elm, attrs, ctrl, transclude) {
                    var pieces = attrs['myRepeat'].split(' ');
                    var itemName = pieces[0];
                    var collectionName = pieces[2];
                    var elements = [];

                    scope.$watchCollection(collectionName, function (newCollection) {
                        if (elements.length > 0) {
                            for (var i = 0; i < elements.length; i++) {
                                elements[i].elm.remove();
                                elements[i].scope.$destroy();
                            }
                            elements = [];
                        }

                        for (var i = 0; i < newCollection.length; i++) {
                            var childScope = scope.$new();
                            childScope[itemName] = newCollection[i];
                            transclude(childScope, function (clone) {
                                elm.before(clone);

                                elements.push({
                                    elm: clone,
                                    scope: childScope
                                });
                            })
                        }
                    })
                }
            }
        })

        .directive('itemRepeat', function ($compile) {
            return {
                restrict: 'A',
                transclude: 'element',
                link: function (scope, elm, attrs, ctrl, transclude) {
                    var pieces = attrs['itemRepeat'].split(' ');
                    var itemName = pieces[0];
                    var collectionName = pieces[2];
                    var elements = [];

                    scope.$watchCollection(collectionName, function (newCollection) {
                        if (elements.length > 0) {
                            for (var i = 0; i < elements.length; i++) {
                                elements[i].elm.remove();
                                elements[i].scope.$destroy();
                            }
                            elements = [];
                        }

                        for (var i = 0; i < newCollection.length; i++) {
                            var childScope = scope.$new();
                            childScope[itemName] = newCollection[i];

                            transclude(childScope, function (clone) {

                                var template = $compile('' +
                                    '<div class="panel panel-warning">' +
                                        '<div class="panel-heading">' +
                                            '{{' + itemName + '.name}}' +
                                        '</div>' +
                                        '<div class="panel-body"></div>' +
                                    '</div>'
                                );
                                var wrapper = template(childScope);
                                wrapper.find('.panel-body').append(clone);

                                elm.before(wrapper);

                                elements.push({
                                    elm: wrapper,
                                    scope: childScope
                                });
                            })
                        }
                    })
                }
            }
        })
})()