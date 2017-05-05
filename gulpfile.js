'use strict';

const extend = require('util')._extend
const path = require('path')

const addsrc = require('gulp-add-src')
const argv = require('yargs').argv
const babel = require('gulp-babel')
const browserify = require('browserify')
const buffer = require('vinyl-buffer')
const cleanCSS = require('gulp-clean-css')
const concat = require('gulp-concat')
const connect = require('connect')
const envify = require('envify/custom')

const ghPages = require('gulp-gh-pages')
const gulp = require('gulp-help')(require('gulp'), {})
const gutil = require('gulp-util')
const http = require('http')
const livereload = require('gulp-livereload')
const ifElse = require('gulp-if-else')
const jsdoc = require('gulp-jsdoc3')
const mount = require('connect-mount')

const notify = require('gulp-notify')
const sass = require('gulp-sass')
const serveStatic = require('serve-static')
const size = require('gulp-size')
const source = require('vinyl-source-stream')
const sourcemaps = require('gulp-sourcemaps')
const uglify = require('gulp-uglify')
const vue = require('gulp-vue')
const watchify = require('watchify')

const BUILD_DIR = process.env.BUILD_DIR || '/srv/http/data/frontend'
const NODE_ENV = process.env.NODE_ENV || 'development'
const NODE_PATH = process.env.NODE_PATH || path.join(__dirname, 'node_modules')

const deployMode = argv.production ? argv.production : (process.env.NODE_ENV === 'production')
const withDocs = argv['with-docs'] ? argv['with-docs'] : false

let watcher
let sizeOptions = {showTotal: true, showFiles: true}


if (deployMode) gutil.log('Running gulp optimized for deployment...')


gulp.task('assets', 'Move assets to the build directory.', () => {
    return gulp.src('./src/img/**', {base: './src'})
    .pipe(addsrc('./src/fonts/**', {base: './src/'}))
    .pipe(addsrc(path.join(NODE_PATH, 'font-awesome', 'fonts', '**'), {base: path.join(NODE_PATH, 'font-awesome')}))
    .pipe(addsrc(path.join(NODE_PATH, 'vg-icons', 'fonts', '**'), {base: path.join(NODE_PATH, 'vg-icons')}))
    .pipe(addsrc('./src/templates/index.html', {base: './src/templates'}))
    .pipe(gulp.dest(BUILD_DIR))
    .pipe(size(extend({title: 'assets'}, sizeOptions)))
    .pipe(ifElse(watcher, livereload))
})


gulp.task('build', 'Metatask that builds everything.', [
    'assets',
    'js-app',
    'js-vendor',
    'templates',
    'scss',
    'scss-vendor',
])


/**
 * Update the hosted github pages from the current docs build directory.
 */
gulp.task('deploy-docs', function() {
    return gulp.src('./docs/build/**/*').pipe(ghPages())
})


gulp.task('docs', 'Generate documentation.', (done) => {
    let completed = () => {
        if (watcher) {
            livereload.changed('headless.js')
        }
    }

    let config = require('./.jsdoc.json')
    return gulp.src([
        'README.md',
        '!./src/js/lib/thirdparty/**/*.js',
        './src/js/**/*.js',
    ], {read: false})
    .pipe(jsdoc(config, completed))
})


gulp.task('js-app', 'Process all application Javascript.', (done) => {
    let b = browserify({
        cache: {},
        debug: false,
        entries: path.join(__dirname, 'src', 'js', 'app.js'),
        packageCache: {},
    })

    if (watcher) b.plugin(watchify)
    b.bundle()
    .on('error', notify.onError('Error: <%= error.message %>'))
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(ifElse(!deployMode, () => {
        return sourcemaps.init({loadMaps: true})
    }))

    .on('end', () => {
        if (watcher) livereload.changed('app.js')
        done()
    })
    .pipe(gulp.dest(BUILD_DIR))
    .pipe(size(extend({title: 'js'}, sizeOptions)))
})


gulp.task('js-vendor', 'Process all vendor Javascript.', (done) => {
    let b = browserify({
        cache: {},
        debug: false,
        entries: path.join(__dirname, 'src', 'js', 'vendor.js'),
        packageCache: {},
    })
    b.transform('envify', {global: true, _: 'purge', NODE_ENV: NODE_ENV})
    b.bundle()
    .on('error', notify.onError('Error: <%= error.message %>'))
    .pipe(source('vendor.js'))
    .pipe(buffer())
    .pipe(ifElse(deployMode, () => {
        // Convert to es5 as long there is no es6 version of uglifyjs.
        return babel({compact: true, presets: ['es2015']})
    }))
    .pipe(ifElse(deployMode, uglify))
    .on('error', notify.onError('Error: <%= error.message %>'))
    .on('end', () => {
        if (watcher) livereload.changed('index.js')
        done()
    })
    .pipe(gulp.dest(BUILD_DIR))
    .pipe(size(extend({title: 'js'}, sizeOptions)))
})



/**
 * Generate application CSS.
 */
gulp.task('scss', 'Find all scss files from the apps directory, concat them and save as one css file.', () => {
    return gulp.src('./src/scss/main.scss')
    .pipe(sass({includePaths: NODE_PATH}))
    .on('error', notify.onError('Error: <%= error.message %>'))
    .pipe(concat('main.css'))
    .pipe(ifElse(deployMode, () => cleanCSS({
        advanced: true,
    })))
    .pipe(gulp.dest(BUILD_DIR))
    .pipe(size(extend({title: 'scss'}, sizeOptions)))
    .pipe(ifElse(watcher, livereload))
})


/**
 * Generate vendor-specific CSS.
 */
gulp.task('scss-vendor', 'Find all scss files from the apps directory, concat them and save as one css file.', () => {
    return gulp.src('./src/scss/vendor.scss')
    .pipe(sass({includePaths: NODE_PATH}))
    .on('error', notify.onError('Error: <%= error.message %>'))
    .pipe(concat('vendor.css'))
    .pipe(ifElse(deployMode, () => cleanCSS({
        advanced: true,
    })))
    .pipe(gulp.dest(BUILD_DIR))
    .pipe(size(extend({title: 'scss'}, sizeOptions)))
    .pipe(ifElse(watcher, livereload))
})


gulp.task('templates', 'Builds all Vue templates.', () => {
    gulp.src('./src/templates/**/*.vue')
    .pipe(vue('templates.js', {
        namespace: 'window.templates',
        prefixStart: 'templates',
    }))
    .on('error', notify.onError('Error: <%= error.message %>'))
    .pipe(size(extend({title: 'templates'}, sizeOptions)))
    .pipe(gulp.dest(BUILD_DIR))
    .pipe(ifElse(watcher, livereload))
})


gulp.task('watch', 'Start a development server and watch for changes.', () => {
    watcher = true
    livereload.listen({silent: false})
    const app = connect()
    app.use(serveStatic(path.join(__dirname, 'build')))
    app.use(mount('/docs', serveStatic(path.join(__dirname, 'docs', 'build'))))
    http.createServer(app).listen(8999)
    gulp.watch([
        path.join(__dirname, 'src', 'js', '**', '*.js'),
        `!${path.join(__dirname, 'src', 'js', 'vendor.js')}`,
    ], () => {
        gulp.start('js-app')
        if (withDocs) gulp.start('docs')
    })

    gulp.watch(path.join(__dirname, 'src', 'js', 'vendor.js'), ['js-vendor'])
    gulp.watch(path.join(__dirname, 'src', 'templates', '**', '*.vue'), ['templates'])
    gulp.watch(path.join(__dirname, 'src', 'templates', 'index.html'), ['assets'])
    gulp.watch([
        path.join(__dirname, 'src', 'scss', '**', '*.scss'),
        `!${path.join(__dirname, 'src', 'scss', 'vendor.scss')}`,
        `!${path.join(__dirname, 'src', 'scss', 'vendor', '*.scss')}`,
    ], ['scss'])
    gulp.watch([
        path.join(__dirname, 'src', 'scss', 'vendor.scss'),
        path.join(__dirname, 'src', 'scss', 'vendor', '*.scss'),
    ], ['scss-vendor'])
})
