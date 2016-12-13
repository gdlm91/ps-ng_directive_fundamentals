(function () {
    'use strict';

    angular.module('app', [])

        .controller('mainCtrl', function ($scope) {

        })

        .directive('master', function () {
            return {
                scope: true,
                link: {
                    pre: function (scope, elm, attrs) {
                        scope.master_name = 'Master Han';
                        console.log('Master: my name is ' + scope.master_name);
                    }
                }
            }
        })

        .directive('apprentice', function () {
            return {
                scope: true,
                link: {
                    post: function (scope, elm, attrs) {
                        scope.name = 'Lil Mike'
                        console.log('Apprentice: My name is ' + scope.name + '. My Master is: ' + scope.master_name);
                    }
                }
            }
        })

        .directive('masterTwo', function () {
            return {
                transclude: true,
                scope: true,
                controllerAs: 'vm',
                bindToController: true,
                template: '<b>Master</b>: My name is {{vm.name}} <div ng-transclude style="padding: 0px 15px"></div>',
                controller: function () {
                    this.name = 'Master Luu';
                },
                link: function (scope, elm, attrs, ctrl) {
                }
            }
        })

        .directive('apprenticeTwo', function () {
            return {
                scope: true,
                require: ['apprenticeTwo', '^masterTwo'],
                controllerAs: 'vm',
                bindToController: true,
                template: '<b>Apprentice:</b> My name is {{vm.name}}. My Master\'s name is {{vm.master_name}}',
                controller: function() {
                    this.name = 'Pep Oh';
                },
                link: function (scope, elm, attrs, ctrls) {
                    var ctrl = ctrls[0];
                    var masterCtrl = ctrls[1];

                    ctrl.master_name = masterCtrl.name;
                }
            }
        })

        .directive('superTab', function() {
            return {
                restrict: 'E',
                transclude: true,
                scope: {},
                templateUrl: 'controller_nested/superTab.html',
                bindToController: true,
                controllerAs: 'vm',
                controller: function() {
                    var vm = this;

                    vm.panes = [];

                    vm.select = function(pane) {
                        vm.panes.forEach(function(cPane) {
                            cPane.selected = false;
                        });
                        pane.selected = true;
                    }

                    vm.addPane = function(pane) {
                        vm.panes.push(pane);
                        if(vm.panes.length === 1) { //Select first Tab
                            pane.selected = true;
                        }
                    }
                },
                link: function(scope, elm, attrs, ctrl) {

                }
            }
        })

        .directive('superPane', function() {
            return {
                restrict: 'E',
                transclude: true,
                scope: {
                    title: '@'
                },
                require: ['superPane', '^superTab'],
                templateUrl: 'controller_nested/superPane.html',
                bindToController: true,
                controllerAs: 'vm',
                controller: function() {
                    var vm = this;
                    
                    vm.selected = false;
                },
                link: function(scope, elm, attrs, ctrls) {
                    var superPaneCtrl = ctrls[0];
                    var superTabCtrl = ctrls[1];

                    superTabCtrl.addPane(superPaneCtrl);
                }
            }
        })
})()