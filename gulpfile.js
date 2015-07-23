/**
 * The idiomatic ReactJS application compiles JSX as a build step, and doesn't use the in-browser JSX transformer.
 * This repo uses a very basic gulp + webpack + babel build to write React with ES6, and build it for the browser
 * @type {Gulp|exports}
 */
const gulp        = require('gulp')
    , gwebpack    = require('webpack-stream')
    , browserSync = require('browser-sync')
    , reload      = browserSync.reload
    , del         = require('del')
    , fs          = require('fs')
    , url         = require("url")
    , $           = require('gulp-load-plugins')({pattern: ['gulp-*']});

/**
 * A simple task to clean any build products
 */
gulp.task('clean', function( cb ) {
    del(['build'], cb);
});

/**
 * A simple task to copy our HTML file and images to the dist directory
 */
gulp.task('copy', function() {
    var html     = gulp.src("./app/index.html").pipe(gulp.dest("dist/"))
        , vendor = gulp.src("./app/vendor/**.*").pipe(gulp.dest("dist/vendor"))
        , images = gulp.src("./app/images/**/*.*").pipe(gulp.dest("dist/images"));
});

/**
 * The main step is 'pack' this step takes our 'client.js' file, and builds it using Webpack, the babel-loader plugin to
 * transpile ES6 and outputs it to the dist directory
 */
gulp.task('pack', function() {
    return gulp.src('./app/client.js')
        .pipe(gwebpack({
            resolve: {
                extensions: ['', '.js', '.jsx']
            },
            output: {
                path: __dirname + '/dist/js',
                filename: 'client.js'
            },
            module: {
                loaders: [
                    {test: /\.jsx$/, loader: 'babel?stage=1'},
                    {test: /\.js$/, exclude: /node_modules/, loader: 'babel?stage=1'}
                ]
            }
        }))
        .pipe(gulp.dest('dist/'));
});

/**
 * Simple watcher that watches for certain changes, and launches the appropriate tasks
 */
gulp.task('watch', ['build'], function() {

    browserSync({
        notify: true,
        port: 8000,
        server: {
            baseDir: 'dist',
            middleware: function( req, res, next ) {
                var fileName = url.parse(req.url);
                fileName = fileName.href.split(fileName.search).join("");
                var fileExists = fs.existsSync('dist' + fileName);
                if ( !fileExists && fileName.indexOf("browser-sync-client") < 0 ) {
                    req.url = "/" + "index.html";
                }
                return next();
            }
        }
    });

    //watch for JS changes
    gulp.watch(['app/**/*.jsx', 'app/**/*.js'], ['pack', 'copy']);

    //watch for static asset changes
    gulp.watch(['app/index.html', 'app/assets/images/**/*'], ['copy']);

    var reloading;

    gulp.watch(['./dist/**'], function( file ) {

        clearTimeout(reloading);

        reloading = setTimeout(function() {

            reload();

        }, 100);
    });

});

/**
 * The default task is build
 */
gulp.task("default", ["watch"]);

/**
 * Define our build task
 */
gulp.task("build", ["copy", "pack"]);