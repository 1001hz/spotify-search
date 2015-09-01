/*
describe('factory: spotifyService', function () {

    beforeEach(module('app.spotify'));

    it('should get loaded', function() {
        // Inject the service.
        inject(function(SpotifySrv) {
            expect(SpotifySrv.searchArtists()).not.toBe.undefined;
        });
    });
});
*/
describe('factory: spotifyService', function(){
    beforeEach(function(){
        module('app.spotify');
        inject(function($injector){
            this.SpotifySrv = $injector.get('SpotifySrv');
            this.$q = $injector.get('$q');
            this.$scope = $injector.get('$rootScope').$new();

            spyOn(this.SpotifySrv, 'searchArtists').andCallFake(function(){
                var defer = this.$q.defer();
                defer.resolve();
                return defer.promise;
            });
        });

        it('should do seomthing', function(){
            // given
            var result;

            // when
            this.SpotifySrv.searchArtists().then(function(artists){
                result = artists;
            });

            this.$scope.$digest();

            // then
            expect(result).toEqual('as promised');
            console.log(result);
        });
    });
});