(function () {

    'use strict';

    angular
        .module('app.spotify')
        .directive('pagination', pagination);

    pagination.$inject = ['SpotifySrv'];

    function pagination(SpotifySrv) {
        return {
            restrict: 'E',
            templateUrl: 'modules/spotify/components/pagination/paginationView.html',
            replace: true,
            link: link,
            require: '^albumPicker'
        }

        function link(scope, element, attrs, albumPickerCtrl) {

            scope.getMoreResults = function(){
                if(albumPickerCtrl.selectedArtist == null){
                    getMoreArtists();
                }
                else{
                    getMoreAlbums();
                }
            }

            function getMoreArtists(){
                SpotifySrv.getMoreArtists()
                    .then(setArtistResults)
                    .catch(problemWithPagination);
            }

            function getMoreAlbums(){
                SpotifySrv.getMoreAlbums(albumPickerCtrl.selectedArtist)
                    .then(setAlbumResults)
                    .catch(problemWithPagination);
            }

            function setArtistResults(artists){
                var allArtistResults = albumPickerCtrl.artistSearchResults.concat(artists);
                albumPickerCtrl.artistSearchResults = allArtistResults;
                albumPickerCtrl.pageResultsUrl = SpotifySrv.getMoreResultsUrl();
            }

            function setAlbumResults(albums){
                var allAlbumResults = albumPickerCtrl.albumSearchResults.concat(albums);
                albumPickerCtrl.albumSearchResults = allAlbumResults;
                albumPickerCtrl.pageResultsUrl = SpotifySrv.getMoreResultsUrl();
            }


            function problemWithPagination(error){

            }
        }

    }
})();