(function () {

    'use strict';

    angular
        .module('app.spotify')
        .factory("Album", Album);

    Album.$inject = [];

    function Album() {

        this.spotifyId = null;
        this.albumName = null;
        this.artist = null;
        this.imageUrlSmall = null;
        this.imageUrl = null;
        this.openInSpotifyUri = null;

        function Album() {
        }

        Album.prototype = {
            createFromSpotifyData: function (album) {
                this.spotifyId = album.id;
                this.albumName = album.name;
                this.imageUrlSmall = album.images[2].url;
                this.imageUrl = album.images[1].url;
                this.openInSpotifyUri = album.external_urls.spotify;
            }
        };

        return (Album);

    }
})();