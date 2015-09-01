(function () {

    'use strict';

    angular
        .module('app.spotify')
        .factory("Artist", Artist);

    Artist.$inject = [];

    function Artist() {

        this.name = null;
        this.id = null;
        this.imageUrl = null;

        function Artist() {
        }

        Artist.prototype = {
            createFromSpotifyData: function (artist) {

                this.name = artist.name;
                this.id = artist.id;
                if(artist.images.length > 0){
                    this.imageUrl = artist.images[artist.images.length-1]
                }
            }
        };

        return (Artist);

    }
})();