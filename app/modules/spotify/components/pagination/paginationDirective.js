(function () {

    'use strict';

    angular
        .module('app.spotify')
        .directive('spotifyPagination', spotifyPagination);

    spotifyPagination.$inject = ['SpotifyDataSrv'];

    function spotifyPagination(SpotifyDataSrv) {
        return {
            restrict: 'E',
            templateUrl: 'modules/spotify/components/albumPicker/paginationView.html',
            replace: true,
            link: link,
            require: '^albumPicker'
        }

        function link(scope, element, attrs, albumPickerCtrl) {
            scope.selectedArtist = albumPickerCtrl.selectedArtist;
            scope.albumResults = albumPickerCtrl.albumResults;
            scope.artistResults = albumPickerCtrl.artistResults;
            scope.moreResultsUrl = albumPickerCtrl.moreResultsUrl;


            scope.getMoreResults = function(){
                if(scope.selectedArtist == null){
                    getMoreArtists();
                }
                else{
                    getMoreAlbums();
                }
            }

            function getMoreArtists(){
                SpotifyDataSrv.getMoreArtists()
                    .then(setArtistResults)
                    .catch(problemWithPagination);
            }

            function getMoreAlbums(){
                SpotifyDataSrv.getMoreAlbums(scope.selectedArtist)
                    .then(setAlbumResults)
                    .catch(problemWithPagination);
            }

            function setArtistResults(artists){
                var allArtistResults = scope.artistResults.concat(artists);
                albumPickerCtrl.setArtistResults(allArtistResults);
                albumPickerCtrl.setMoreResultsUrl(SpotifyDataSrv.getMoreResultsUrl());
            }

            function setAlbumResults(albums){
                var allAlbumResults = scope.albumResults.concat(albums);
                albumPickerCtrl.setAlbumResults(allAlbumResults);
                albumPickerCtrl.setMoreResultsUrl(SpotifyDataSrv.getMoreResultsUrl());
            }


            function problemWithPagination(error){

            }
        }

    }
})();