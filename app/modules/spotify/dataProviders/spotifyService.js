(function () {

    'use strict';

    angular
        .module('app.spotify')
        .factory('SpotifySrv', SpotifySrv);

    SpotifySrv.$inject = ["$q", "$http", "Album", "Artist"];

    function SpotifySrv($q, $http, Album, Artist){
        var next = null;

        var service = {
            searchArtists: searchArtists,
            getMoreArtists: getMoreArtists,
            getMoreAlbums: getMoreAlbums,
            getAlbums: getAlbums,
            getAlbumTracks: getAlbumTracks,
            getMoreResultsUrl: getMoreResultsUrl
        }
        return service;

        function searchArtists(query){
            var deferred = $q.defer();
            var url = "https://api.spotify.com/v1/search?q="+query+"&type=artist";
            $http.get(url)
                .then(function(response){
                    var artists = createArtists(response);
                    next = response.data.artists.next;
                    deferred.resolve(artists);
                })
                .catch(function(error){
                    deferred.reject(error);
                });
            return deferred.promise;
        }

        function getMoreArtists(){
            var deferred = $q.defer();
            $http.get(next)
                .then(function(response){
                    next = response.data.next;
                    deferred.resolve(createArtists(response));
                })
                .catch(function(error){
                    deferred.reject(error);
                });
            return deferred.promise;
        }

        function getMoreAlbums(artist){
            var deferred = $q.defer();
            $http.get(next)
                .then(function(response){
                    next = response.data.next;
                    deferred.resolve(createAlbums(artist, response));
                })
                .catch(function(error){
                    deferred.reject(error);
                });
            return deferred.promise;
        }

        function getAlbums(artist){
            var deferred = $q.defer();
            var url = "https://api.spotify.com/v1/artists/"+artist.id+"/albums";
            $http.get(url)
                .then(function(response){
                    var albums = createAlbums(artist, response);
                    next = response.data.next;
                    deferred.resolve(albums);
                })
                .catch(function(error){
                    deferred.reject(error);
                });
            return deferred.promise;
        }

        function getAlbumTracks(albumId){
            var deferred = $q.defer();
            var url = "https://api.spotify.com/v1/albums/"+albumId+"/tracks";
            $http.get(url)
                .then(function(response){
                    var tracks = [];
                    angular.forEach(response.data.items, function(trackObj){
                        var track = {
                            name: trackObj.name,
                            trackNumber: trackObj.track_number,
                            length: trackObj.duration_ms
                        };
                        tracks.push(track);
                    });
                    deferred.resolve(tracks);
                })
                .catch(function(error){
                    deferred.reject(error);
                });
            return deferred.promise;
        }

        function getMoreResultsUrl(){
            return next;
        }


        function createArtists(response){
            var allArtists = [];
            angular.forEach(response.data.artists.items, function(artist){
                var artistObj = new Artist();
                artistObj.createFromSpotifyData(artist);
                allArtists.push(artistObj);
            });
            return allArtists;
        }

        function createAlbums(artist, response){
            var allAlbums = [];
            angular.forEach(response.data.items, function(album){
                var albumObj = new Album();
                albumObj.createFromSpotifyData(album);
                albumObj.artist = artist;
                allAlbums.push(albumObj);
            });
            return allAlbums;
        }
    }

})();
