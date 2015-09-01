(function () {

    'use strict';

    angular
        .module('app.spotify')
        .directive('search', search);

    search.$inject = ['SpotifySrv'];

    function search(SpotifySrv) {
        return {
            restrict: 'E',
            templateUrl: 'modules/spotify/components/search/searchView.html',
            replace: true,
            link: link,
            require: '^albumPicker',
            controller: searchController,
            controllerAs: 'searchCtrl',
            bindToController:true
        }

        function searchController(){

        }

        function link(scope, element, attrs, albumPickerCtrl) {

            scope.searchArtists = function(query){
                albumPickerCtrl.albumSearchResults = null;
                SpotifySrv.searchArtists(query)
                    .then(setArtistResults)
                    .catch(problemWithSearch);
            }

            function setArtistResults(artists){
                albumPickerCtrl.artistSearchResults = artists;
                albumPickerCtrl.pageResultsUrl = SpotifySrv.getMoreResultsUrl();
            }

            function problemWithSearch(error){
                console.log(error);
            }

        }

    }
})();