(function () {

    'use strict';

    angular
        .module('app.spotify')
        .directive('selectedAlbum', selectedAlbum);

    selectedAlbum.$inject = [];

    function selectedAlbum() {
        return {
            restrict: 'E',
            templateUrl: 'modules/spotify/components/albumPicker/selectedAlbumView.html',
            replace: true,
            link: link,
            require: '^pickSelection'
        }

        function link(scope, element, attrs, pickSelectionCtrl) {
            scope.selectedAlbum = pickSelectionCtrl.selectedAlbum;
        }

    }
})();