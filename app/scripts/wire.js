angular.module(
    'de.cismet.crisma.widgets.worldstateTreeWidgetWirecloud',
    [
        'de.cismet.crisma.widgets.worldstateTreeWidget',
        'de.cismet.crisma.ICMM.Worldstates',
        'de.cismet.commons.angular.angularTools'
    ]
).controller(
    'de.cismet.crisma.widgets.worldstateTreeWidgetWirecloud.wire',
    [
        '$scope',
        '$q',
        'de.cismet.crisma.ICMM.Worldstates',
        'de.cismet.commons.angular.angularTools.AngularTools',
        'IMAGE_PATH',
        'LEAF_ICON',
        'FOLDER_ICON_CLOSED',
        'FOLDER_ICON_OPEN',
        'MULTI_SELECT',
        'OPEN_FOLDER_ON_CLICK',
        'DEBUG',
        function (
            $scope,
            $q,
            Worldstates,
            AngularTools,
            IMAGE_PATH,
            LEAF_ICON,
            FOLDER_ICON_CLOSED,
            FOLDER_ICON_OPEN,
            MULTI_SELECT,
            OPEN_FOLDER_ON_CLICK,
            DEBUG
        ) {
            'use strict';

            var mashupPlatform, setActiveWSWirecloud, setSelectedWSWirecloud;

            if (typeof MashupPlatform === 'undefined') {
                if (DEBUG) {
                    console.log('mashup platform not available');
                }
            } else {
                // enable minification
                mashupPlatform = MashupPlatform;

                $scope.activeItem = {};
                $scope.treeSelection = [];
                $scope.treeOptions = {
                    checkboxClass: 'glyphicon glyphicon-unchecked',
                    folderIconClosed: FOLDER_ICON_CLOSED,
                    folderIconOpen: FOLDER_ICON_OPEN,
                    leafIcon: LEAF_ICON,
                    imagePath: IMAGE_PATH,
                    multiSelection: (MULTI_SELECT.toLowerCase() === 'true'),
                    clickFolderMode: (OPEN_FOLDER_ON_CLICK.toLowerCase() === 'true' ? 3 : 1)
                };

                $scope.$watch('treeSelection', function (n) {
                    var i, selWsStringArray, stringifiedArray;

                    if (DEBUG) {
                        console.log('BEGIN: pushing selected worldstates event: ' + n);
                    }

                    selWsStringArray = [];

                    if (n) {
                        for (i = 0; i < n.length; ++i) {
                            if (n[i].id) {
                                selWsStringArray.push(n[i].id);
                            }
                        }
                    }

                    stringifiedArray = JSON.stringify(selWsStringArray);

                    if (DEBUG) {
                        console.log('DO: pushing selected worldstates event: ' + stringifiedArray);
                    }

                    mashupPlatform.wiring.pushEvent('getSelectedWorldstates', stringifiedArray);

                    if (DEBUG) {
                        console.log('DONE: pushing selected worldstates event: ' + stringifiedArray);
                    }
                }, true);

                $scope.$watch('activeItem', function (n, o) {
                    if (n && o && n.id && o.id && n.id === o.id) {
                        // not rethrowing in case of same object set twice
                        return;
                    }

                    if (DEBUG) {
                        console.log('BEGIN: pushing active worldstate event: ' + n);
                    }

                    if (n && n.id) {
                        if (DEBUG) {
                            console.log('DO: pushing active worldstate event: ' + n.id);
                        }

                        mashupPlatform.wiring.pushEvent('getActiveWorldstate', n.id.toString());

                        if (DEBUG) {
                            console.log('DONE: pushing active worldstate event: ' + n.id);
                        }
                    }
                });

                setSelectedWSWirecloud = function (newSelWsStringArray) {
                    var i, resolve, setArray, selWsStringArray;

                    if (DEBUG) {
                        console.log('BEGIN: receiving selected worldstates event: ' + newSelWsStringArray);
                    }

                    setArray = function (arr) {
                        if (DEBUG) {
                            console.log('DO: receiving selected worldstates event: ' + arr);
                        }

                        AngularTools.safeApply($scope, function () {
                            $scope.treeSelection = arr;
                        });

                        if (DEBUG) {
                            console.log('DONE: receiving selected worldstates event: ' + arr);
                        }
                    };

                    if (newSelWsStringArray) {
                        try {
                            selWsStringArray = JSON.parse(newSelWsStringArray);

                            if ($.isArray(selWsStringArray)) {
                                resolve = [];

                                for (i = 0; i < selWsStringArray.length; ++i) {
                                    resolve[i] = Worldstates.get({wsId: selWsStringArray[i]}).$promise;
                                }

                                $q.all(resolve).then(function (selWsArray) {
                                    setArray(selWsArray);
                                });
                            } else {
                                if (DEBUG) {
                                    console.log('not an array: ' + selWsStringArray);
                                }
                                setArray([]);
                            }
                        } catch (e) {
                            if (DEBUG) {
                                console.log(e);
                            }
                            setArray([]);
                        }
                    } else {
                        setArray([]);
                    }
                };

                setActiveWSWirecloud = function (newActiveWs) {
                    var setWs;

                    if (DEBUG) {
                        console.log('BEGIN: receiving active worldstate event: ' + newActiveWs);
                    }

                    setWs = function (ws) {
                        if (DEBUG) {
                            console.log('DO: receiving active worldstate event: ' + ws);
                        }

                        $scope.activeItem = ws;

                        if (DEBUG) {
                            console.log('DONE: receiving active worldstate event: ' + ws);
                        }
                    };

                    if (newActiveWs) {
                        try {
                            Worldstates.get({wsId: newActiveWs}).$promise.then(function (ws) {
                                setWs(ws);
                            });
                        } catch (e) {
                            if (DEBUG) {
                                console.log(e);
                            }
                            setWs({});
                        }
                    } else {
                        setWs({});
                    }
                };

                mashupPlatform.wiring.registerCallback('setSelectedWorldstates', setSelectedWSWirecloud);
                mashupPlatform.wiring.registerCallback('setActiveWorldstate', setActiveWSWirecloud);
            }
        }
    ]
).config(
    [
        '$provide',
        function ($provide) {
            'use strict';

            var mashupPlatform;

            if (typeof MashupPlatform === 'undefined') {
                console.log('mashup platform not available');
            } else {
                // enable minification
                mashupPlatform = MashupPlatform;
                $provide.constant('DEBUG', mashupPlatform.prefs.get('DEBUG'));
                $provide.constant('CRISMA_DOMAIN', mashupPlatform.prefs.get('CRISMA_DOMAIN'));
                $provide.constant('CRISMA_ICMM_API', mashupPlatform.prefs.get('CRISMA_ICMM_API'));
                $provide.constant('IMAGE_PATH', mashupPlatform.prefs.get('IMAGE_PATH'));
                $provide.constant('LEAF_ICON', mashupPlatform.prefs.get('LEAF_ICON'));
                $provide.constant('FOLDER_ICON_CLOSED', mashupPlatform.prefs.get('FOLDER_ICON_CLOSED'));
                $provide.constant('FOLDER_ICON_OPEN', mashupPlatform.prefs.get('FOLDER_ICON_OPEN'));
                $provide.constant('MULTI_SELECT', mashupPlatform.prefs.get('MULTI_SELECT'));
                $provide.constant('OPEN_FOLDER_ON_CLICK', mashupPlatform.prefs.get('OPEN_FOLDER_ON_CLICK'));
            }
        }
    ]
);
