(function () {

    'use strict';

    angular
        .module('app.spotify')
        .controller('albumPickerController', albumPickerController);

    albumPickerController.$inject = [];

    function albumPickerController() {

        this.artistSearchResults = null;
        this.albumSearchResults = null;
        this.pageResultsUrl = null;
        this.selectedArtist = null;
        this.selectedAlbumTrackList = null;

        // this.album may be populated from attribute on directive
        if(this.album == undefined){
            // no album has been passed as an attribute to the directive
            this.album = null;
        }
    }
})();