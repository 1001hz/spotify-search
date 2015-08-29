(function () {

    'use strict';

    angular
        .module('app.spotify')
        .directive('searchBox', searchBox);

    searchBox.$inject = ['MsgSrv', 'SpotifyDataSrv'];

    function searchBox(MsgSrv, SpotifyDataSrv) {
        return {
            restrict: 'E',
            templateUrl: 'modules/spotify/components/albumPicker/searchView.html',
            replace: true,
            link: link,
            require: '^albumPicker'
        }

        function link(scope, element, attrs, albumPickerCtrl) {

            scope.search = function(){
                albumPickerCtrl.setAlbumResults(null);
                SpotifyDataSrv.searchArtists(scope.query)
                    .then(setArtistResults)
                    .catch(problemWithSearch);
            }

            function setArtistResults(artists){
                albumPickerCtrl.setArtistResults(artists);
                albumPickerCtrl.setMoreResultsUrl(SpotifyDataSrv.getMoreResultsUrl());
            }

            function problemWithSearch(error){
                MsgSrv.addError("There was a problem with your search", error);
            }
        }

    }
})();