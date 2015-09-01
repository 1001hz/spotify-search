(function () {

    'use strict';

    angular
        .module('app.spotify')
        .directive('selectedAlbum', selectedAlbum);

    selectedAlbum.$inject = [];

    function selectedAlbum() {
        return {
            restrict: 'E',
            templateUrl: 'modules/spotify/components/selectedAlbum/selectedAlbumView.html',
            replace: true,
            link: link,
            require: '^albumPicker'
        }

        function link(scope, element, attrs, albumPickerCtrl) {

            scope.removeAlbum = function(){
                albumPickerCtrl.album = null;
            }

        }

    }
})();