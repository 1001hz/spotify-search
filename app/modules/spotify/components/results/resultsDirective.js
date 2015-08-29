(function () {

    'use strict';

    angular
        .module('app.spotify')
        .directive('results', results);

    results.$inject = ['SpotifyDataSrv'];

    function results(SpotifyDataSrv) {
        return {
            restrict: 'E',
            templateUrl: 'modules/spotify/components/albumPicker/resultsView.html',
            replace: true,
            link: link,
            require: '^albumPicker'
        }

        function link(scope, element, attrs, albumPickerCtrl) {
            scope.artistResults = albumPickerCtrl.artistResults;

            scope.getAlbums = function(artist){
                albumPickerCtrl.setArtist(artist);
                SpotifyDataSrv.getAlbums(artist)
                    .then(showAlbumResults)
                    .catch(problemGettingAlbumsForArtist);
            }

            scope.setSelectedAlbum = function(album){
                albumPickerCtrl.setAlbum(album);
            }

            scope.backToArtists = function(){
                albumPickerCtrl.setAlbumResults(null);
            }

            function showAlbumResults(albums){
                albumPickerCtrl.setAlbumResults(albums);
                scope.albumResults = albums;
                albumPickerCtrl.setMoreResultsUrl(SpotifyDataSrv.getMoreResultsUrl());
            }

            function problemGettingAlbumsForArtist(error){

            }
        }

    }
})();