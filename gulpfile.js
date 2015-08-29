// Include Gulp
var gulp = require('gulp');
// Include plugins
var plugins = require("gulp-load-plugins")({
    pattern: ['gulp-*', 'gulp.*', 'main-bower-files'],
    replaceString: /\bgulp[\-.]/
});
var concat = require('gulp-concat');
var ngAnnotate = require('gulp-ng-annotate');
var templateCache = require('gulp-angular-templatecache');
var del = require('del');
var Q = require('q');
var inject = require('gulp-inject');
var es = require('event-stream');
var series = require('stream-series');
var angularFilesort = require('gulp-angular-filesort');
var print = require('gulp-print');

// Define default destination folder
var paths = {
    scripts: 'app/**/*.js',
    css: "app/css",
    views: "app/views",
    images: "app/img",
    srcIndex: "app/index.html",
    devDist: "web",
    devDistJs: "web/js",
    devDistCss: "web/css",
    devDistFonts: "web/fonts",
    devDistViews: "web/views",
    devDistImages: "web/img",
    prodDist: "web",
    prodDistJs: "web/js",
    prodDistCss: "web/css",
    prodDistFonts: "web/fonts",
    prodDistViews: "web/views",
    prodDistImages: "web/img"
}

// pipes are functions that run files flow through
var pipes = {};

// empty out web directory
gulp.task('dev-clean', function () {
    var deferred = Q.defer();
    del([paths.devDist + '/*'], function () {
        deferred.resolve();
    });
    return deferred.promise;
});

// empty out web directory
gulp.task('prod-clean', function () {
    var deferred = Q.defer();
    del([paths.prodDist + '/*'], function () {
        deferred.resolve();
    });
    return deferred.promise;
});


pipes.orderedVendorScripts = function () {
    return plugins.order(['jquery.js', 'angular.js']);
}


pipes.validatedIndex = function () {
    return gulp.src(paths.srcIndex);
}


pipes.builtVendorScriptsDev = function () {
    return gulp.src(plugins.mainBowerFiles())
        .pipe(plugins.filter('*.js'))
        .pipe(gulp.dest(paths.devDistJs + '/vendor'));
}

pipes.builtVendorScriptsProd = function () {
    return gulp.src(plugins.mainBowerFiles())
        .pipe(plugins.filter('*.js'))
        .pipe(pipes.orderedVendorScripts())
        .pipe(plugins.concat('vendor.min.js'))
        .pipe(plugins.uglify())
        .pipe(gulp.dest(paths.prodDistJs));
};

pipes.orderedAppScripts = function () {
    return angularFilesort();
};

pipes.validatedAppScripts = function () {
    return gulp.src(['app/**/*.js','!app/js/tests/*.js'])
        .pipe(print())
        .pipe(plugins.jshint());
};

pipes.spotifyPartials = function () {
    return gulp.src(['app/**/*.html', '!app/index.html'])
        .pipe(plugins.htmlhint({ 'doctype-first': false }));
};

pipes.scriptedSpotifyPartials = function () {
    return pipes.spotifyPartials()
        .pipe(plugins.htmlhint.failReporter())
        .pipe(plugins.htmlmin({ collapseWhitespace: true, removeComments: true }))
        .pipe(plugins.ngHtml2js({
            moduleName: "app.spotify"
        }));
};

pipes.builtAppScriptsDev = function () {
    var scriptedSpotifyPartials = pipes.scriptedSpotifyPartials();
    var validatedAppScripts = pipes.validatedAppScripts();
    return es.merge(series(scriptedSpotifyPartials, validatedAppScripts))
        .pipe(gulp.dest(paths.devDist));
};

pipes.builtAppScriptsProd = function () {
    var scriptedSpotifyPartials = pipes.scriptedSpotifyPartials();
    var validatedAppScripts = pipes.validatedAppScripts();

    return es.merge(series(scriptedSpotifyPartials, validatedAppScripts))
        .pipe(pipes.orderedAppScripts())
        .pipe(plugins.concat('app.min.js'))
        .pipe(plugins.uglify())
        .pipe(gulp.dest(paths.prodDistJs));
};


pipes.vendorStyles = function () {
    return gulp.src(plugins.mainBowerFiles())
        .pipe(plugins.filter('*.css'))
        .pipe(gulp.dest(paths.devDistCss));
}


pipes.builtStylesDev = function () {
    var cssFiles = [paths.css + '/*'];
    return gulp.src(cssFiles)
        .pipe(gulp.dest(paths.devDistCss));
};

pipes.builtStylesProd = function () {
    var cssFiles = [paths.css + '/*'];
    return gulp.src(cssFiles)
        .pipe(gulp.dest(paths.prodDistCss));
};

pipes.builtIndexDev = function () {

    var orderedVendorScripts = pipes.builtVendorScriptsDev()
        .pipe(pipes.orderedVendorScripts());

    var orderedAppScripts = pipes.builtAppScriptsDev()
        .pipe(pipes.orderedAppScripts());

    var appStyles = pipes.builtStylesDev();
    var vendorStyles = pipes.vendorStyles();

    return pipes.validatedIndex()
        .pipe(gulp.dest(paths.devDist)) // write first to get relative path for inject
        .pipe(inject(series(orderedVendorScripts, orderedAppScripts), { relative: true }))
        .pipe(inject(series(vendorStyles, appStyles), { relative: true }))
        .pipe(gulp.dest(paths.devDist));
}

pipes.builtIndexProd = function () {

    var vendorScripts = pipes.builtVendorScriptsProd();
    var appScripts = pipes.builtAppScriptsProd();
    var appStyles = pipes.builtStylesProd();

    return pipes.validatedIndex()
        .pipe(gulp.dest(paths.prodDist)) // write first to get relative path for inject
        .pipe(inject(series(vendorScripts, appScripts), { relative: true }))
        .pipe(inject(appStyles, { relative: true }))
        //.pipe(plugins.htmlmin({collapseWhitespace: true, removeComments: true}))
        .pipe(gulp.dest(paths.prodDist));
};



pipes.builtAppDev = function () {
    return es.merge(pipes.builtIndexDev());
};

pipes.builtAppProd = function () {
    return es.merge(pipes.builtIndexProd());
};


// cleans and builds a complete prod environment
gulp.task('default', ['dev-clean'], pipes.builtAppProd);
// cleans and builds a complete dev environment
gulp.task('dev', ['prod-clean'], pipes.builtAppDev);