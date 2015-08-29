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
            controller: function(){

            }
        }

    }
})();