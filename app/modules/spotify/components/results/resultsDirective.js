(function () {

    'use strict';

    angular
        .module('app.spotify')
        .directive('results', results);

    results.$inject = ['SpotifySrv'];

    function results(SpotifySrv) {
        return {
            restrict: 'E',
            templateUrl: 'modules/spotify/components/results/resultsView.html',
            replace: true,
            link: link,
            require: '^albumPicker'
        }

        function link(scope, element, attrs, albumPickerCtrl) {


            scope.getAlbums = function(artist){
                albumPickerCtrl.selectedArtist = artist;
                SpotifySrv.getAlbums(artist)
                    .then(showAlbumResults)
                    .catch(problemGettingAlbumsForArtist);
            }

            scope.setSelectedAlbum = function(album){
                albumPickerCtrl.album = album;
                SpotifySrv.getAlbumTracks(album.spotifyId)
                    .then(setTrackList)
                    .catch(problemGettingTrackList);
            }

            scope.backToArtists = function(){
                albumPickerCtrl.albumSearchResults = null;
            }

            function setTrackList(tracks){
                console.log(tracks);
                albumPickerCtrl.selectedAlbumTrackList = tracks;
            }

            function showAlbumResults(albums){
                albumPickerCtrl.albumSearchResults = albums;
                albumPickerCtrl.pageResultsUrl = SpotifySrv.getMoreResultsUrl();
            }

            function problemGettingAlbumsForArtist(error){

            }

            function problemGettingTrackList(error){

            }

        }

    }
})();