describe('directive: album-picker', function() {

    var element, scope, ctrl;

    beforeEach(module('app.spotify'));

    // preprocess routes into JS files
    beforeEach(module('partials'));

    beforeEach(inject(function($rootScope, $compile, _$controller_) {
        scope = $rootScope.$new();

        element = '<album-picker album="album"></album-picker>';
        element = $compile(element)(scope);
        scope.$digest();

        ctrl = _$controller_('albumPickerController', {$scope: scope});
    }));

    it("should have no undefined vars", function() {
        expect(ctrl.album).not.toBe(undefined);
        expect(ctrl.artistSearchResults).not.toBe(undefined);
        expect(ctrl.albumSearchResults).not.toBe(undefined);
        expect(ctrl.pageResultsUrl).not.toBe(undefined);
        expect(ctrl.selectedArtist).not.toBe(undefined);
    });

});