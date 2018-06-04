/**
 *
 *  CraftCMS 2 Starter
 *  Copyright 2017 Johannes Ahrndt
 *
 *
 */

'use strict';

// This gulpfile makes use of new JavaScript features.
// Babel handles this without us having to do anything. It just works.
// You can read more about the new JavaScript features here:
// https://babeljs.io/docs/learn-es2015/


var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var notifier = require("node-notifier");
var del = require('del');
var pump = require('pump');
var pkg = require('./package.json');
var $ = require('gulp-load-plugins')();

var config = require('./gulp.config.json');

/**
 *
 * Helper functions
 *
 */

const getTimestamp = function() {
  return (+new Date());
};

const onError = (err) => {
  console.log(err);
};

/*
 * STYLES TASK
 */
gulp.task('clean:styles', () => {
  return del([
    config.dist.styles + '/app.css',
    config.dist.styles + '/app.css.map'
  ]);
});
gulp.task('styles', ['clean:styles'], () => {
  return gulp.src([config.src.styles + '/app.scss'])
    .pipe($.plumber({ errorHandler: onError }))
    .pipe($.sassLint())
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      includePaths: config.styles.includePaths
    }))
    .on('error', $.sass.logError)
    .pipe($.cached("sass_compile"))
    .pipe($.autoprefixer({
      browsers: config.styles.compatibility
    }))
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest(config.dist.styles))
    .pipe(reload({
      stream: true
    }))
    .pipe($.notify({
      title: "Ahoi",
      message: '[styles] Finished',
      onLast: true
    }));
});
gulp.task('build:styles', ['clean:styles'], () => {
  return gulp.src([config.src.styles + '/app.scss'])
    .pipe($.plumber({ errorHandler: onError }))
    .pipe($.sassLint())
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      includePaths: config.styles.includePaths
    }))
    .pipe($.autoprefixer({
      browsers: config.styles.compatibility
    }))
    .pipe($.sourcemaps.write('./'))
    .pipe($.cleanCss({
      compatibility: 'ie9',
      keepSpecialComments: 0
    }))
    .pipe($.size({ gzip: true, showFiles: true }))
    .pipe(gulp.dest(config.dist.styles));
});

/*
 * SCRIPTS TASK
 */
gulp.task('lint', () => {
    // ESLint ignores files with "node_modules" paths.
    // So, it's best to have gulp ignore the directory as well.
    // Also, Be sure to return the stream from the task;
    // Otherwise, the task may end before the stream has finished.
    return gulp.src([config.src.scripts + '/**/*.js', '!node_modules/**'])
        // eslint() attaches the lint output to the "eslint" property
        // of the file object so it can be used by other modules.
        .pipe($.eslint())
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe($.eslint.format());
    // To have the process exit with an error code (1) on
    // lint error, return the stream and pipe to failAfterError last.
    // .pipe($.eslint.failAfterError());
});
gulp.task('clean:scripts', () => {
    return del([
        config.dist.scripts + '/app.js',
        config.dist.scripts + '/app.js.map'
    ]);
})
gulp.task('scripts', ['clean:scripts', 'lint'], () => {
    return browserify(config.src.scripts + '/app.js', {
            debug: true
        })
        .bundle()
        .on('error', $.notify.onError("Error: <%= error.message %>"))
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe($.sourcemaps.init())
        .pipe($.sourcemaps.write('./'))
        .pipe(gulp.dest(config.dist.scripts))
        .pipe(reload({
            stream: true
        }))
        .pipe($.notify('[dev] Scripts task finished'));
});
gulp.task('clean:build:scripts', () => {
    return del([
        config.dist.scripts + '/app.min.js',
        config.dist.scripts + '/app.js.min.map'
    ]);
})
gulp.task('build:scripts', ['clean:build:scripts', 'clean:scripts'], () => {
    return browserify(config.src.scripts + '/app.js', {
            debug: false
        })
        .bundle()
        .on('error', $.notify.onError("Error: <%= error.message %>"))
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe($.minify({
        	ext: {
        		src: '',
        		min: '.min.js'
        	}
        }))
        .pipe($.sourcemaps.init())
        .pipe($.sourcemaps.write('./'))
        .pipe(gulp.dest(config.dist.scripts));
});

/*
 * TEMPLATE TASK
 */
gulp.task('clean:templates', () => {
    return del([
        config.dist.templates + '/*',
        "!" + config.dist.templates + '/.htaccess',
        "!" + config.dist.templates + '/web.config'
    ]);
});
gulp.task('templates', ['clean:templates'], () => {
    return gulp.src(config.src.templates + '/**/*.twig')
        .on('error', $.notify.onError("Error: <%= error.message %>"))
        .pipe(gulp.dest(config.dist.templates))
        .pipe(reload({
            stream: true
        }));
});

/*
 * IMAGES TASK
 */
gulp.task('clean:images', () => {
    return del([
        config.dist.images + '/**/*'
    ]);
});

gulp.task('optimize:images', () => {
    return gulp.src(config.src.images.path + '/**/*')
        .pipe($.imagemin([
            $.imagemin.gifsicle({ interlaced: true }),
            $.imagemin.jpegtran({ progressive: true }),
            $.imagemin.optipng({ optimizationLevel: 6 }),
            $.imagemin.svgo()
        ]))
        .pipe(gulp.dest(config.dist.images));
});

gulp.task('images', ['clean:images', 'optimize:images'], () => {
    return gulp.src(config.src.images.excludeOpti)
        .on('error', $.notify.onError("Error: <%= error.message %>"))
        .pipe(gulp.dest(config.dist.images))
        .pipe(reload({
            stream: true
        }));
});

/*
 * FONTS TASK
 */
gulp.task('clean:fonts', () => {
    return del([
        config.dist.fonts + '/**/*'
    ]);
});
gulp.task('fonts', ['clean:fonts'], () => {
    return gulp.src(config.src.fonts + '/**/*')
        .on('error', $.notify.onError("Error: <%= error.message %>"))
        .pipe(gulp.dest(config.dist.fonts))
        .pipe(reload({
            stream: true
        }));
});

/*
 * CACHE BUSTING TASK
 * replaces eg. "app.min.css?v=(0-9)" in master layout with "app.min.css?v=timestamp"
 */
gulp.task('cachebust:scripts', () => {
    return gulp.src(config.src.templates + '/_layouts/_master.twig')
        .pipe($.replace(/app.min.js(\?v=)*([0-9]*)/g, 'app.min.js?v=' + getTimestamp()))
        .pipe($.replace(/app.js(\?v=)*([0-9]*)/g, 'app.js?v=' + getTimestamp()))
        .pipe(gulp.dest(config.dist.templates + '/_layouts/'));
});

gulp.task('cachebust:styles', () => {
    return gulp.src(config.src.templates + '/_layouts/_master.twig')
        .pipe($.replace(/app.min.css(\?v=)*([0-9]*)/g, 'app.min.css?v=' + getTimestamp()))
        .pipe($.replace(/app.css(\?v=)*([0-9]*)/g, 'app.css?v=' + getTimestamp()))
        .pipe(gulp.dest(config.dist.templates + '/_layouts/'));
});

/*
 * FAVICON TASKS
 */
gulp.task('clean:favicon', () => {
    return del([
        config.dist.favicon + "/**/*"
    ]);
});

gulp.task('generate-favicon', ['clean:favicon'], () => {
    return gulp.src(config.src.favicon).pipe($.favicons({
            appName: pkg.name,
            appDescription: pkg.description,
            developerName: pkg.author,
            url: pkg.homepage,
            version: pkg.version,
            html: config.favicon.templateFile,
            background: config.favicon.background,
            theme_color: config.favicon.theme_color,
            path: config.favicon.path,
            display: config.favicon.display,
            orientation: config.favicon.orientation,
            start_url: config.favicon.start_url,
            pipeHTML: config.favicon.pipeHTML,
            replace: config.favicon.replace
        }))
        .pipe(gulp.dest(config.dist.favicon));
});

gulp.task('favicon', ['generate-favicon'], () => {
    return gulp.src(config.dist.favicon + '/' + config.favicon.templateFile)
        .pipe($.rename({
            extname: '.twig'
        }))
        .pipe(gulp.dest(config.src.templates))
        .on('error', $.notify.onError("Error: <%= error.message %>"));
});

/*
 * WATCH TASK
 */
gulp.task('watch', () => {
    browserSync.init({
        proxy: config.url
    });
    gulp.watch(config.src.scripts + "/**/*.js", ['scripts', 'cachebust:scripts']);
    gulp.watch(config.src.styles + "/**/*.scss", ['styles', 'cachebust:styles']);
    gulp.watch(config.src.templates + "/**/*", ['templates']);
    gulp.watch(config.src.images.path + "/**/*", ['images']);
    gulp.watch(config.src.fonts + "/**/*", ['fonts']);

    notifier.notify({
        title: 'Watch',
        message: 'Gulp is watching for changes in scripts, styles, templates, images, fonts'
    });
});

/*
 * DEFAULT TASK
 */
gulp.task('default', ['watch']);

/*
 * BUILD TASK
 */
gulp.task('build', ['build:styles', 'build:scripts', 'templates', 'images', 'favicon', 'cachebust:scripts', 'cachebust:styles']);
