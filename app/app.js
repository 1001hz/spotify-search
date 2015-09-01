(function () {

    'use strict';

    angular.module('app', ['app.spotify']);

    angular.module('app.spotify', []);

    angular
        .module('app.spotify')
        .controller('parentController', parentController);

    parentController.$inject = ['Album'];

    function parentController(Album) {

        //this.album = new Album();
        //this.album.albumName = 'Hello from parent';

        this.save = function(){
            console.log("Send data to data service for saving to DB:"+this.album);
        }
    }

})();