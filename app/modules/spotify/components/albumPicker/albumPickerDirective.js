(function () {

    'use strict';

    angular
        .module('app.spotify')
        .directive('albumPicker', albumPicker);

    albumPicker.$inject = [];

    function albumPicker() {
        return {
            restrict: 'E',
            templateUrl: 'modules/spotify/components/albumPicker/albumPickerView.html',
            replace: true,
            scope: {
              album: '='
            },
            link: albumPickerLink,
            controller: 'albumPickerController',
            controllerAs: 'albumPickerCtrl',
            bindToController:true
        }

        function albumPickerLink(scope, elem, attr, albumPickerCtrl){

        }

    }
})();