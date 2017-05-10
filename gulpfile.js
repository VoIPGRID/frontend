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
const del = require('del')
const envify = require('gulp-envify')
const ghPages = require('gulp-gh-pages')
const gulp = require('gulp-help')(require('gulp'), {})
const gutil = require('gulp-util')
const gzip = require('gulp-gzip')
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
const PRODUCTION = argv.production ? argv.production : (process.env.NODE_ENV === 'production')
const WITHDOCS = argv['with-docs'] ? argv['with-docs'] : false

let bundlers = {app: null, vendor: null}
let isWatching
let gzipConfig = {append: true, gzipOptions: {level: 9}}
let sizeConfig = {showTotal: true, showFiles: true}

if (PRODUCTION) gutil.log('(!) Gulp optimized for production')


gulp.task('assets', 'Move assets to the build directory.', () => {
    return gulp.src('./src/img/**', {base: './src'})
    .pipe(addsrc('./src/fonts/**', {base: './src/'}))
    .pipe(addsrc(path.join(NODE_PATH, 'font-awesome', 'fonts', '**'), {base: path.join(NODE_PATH, 'font-awesome')}))
    .pipe(addsrc(path.join(NODE_PATH, 'vg-icons', 'fonts', '**'), {base: path.join(NODE_PATH, 'vg-icons')}))
    .pipe(addsrc('./src/templates/index.html', {base: './src/templates'}))
    .pipe(gulp.dest(BUILD_DIR))
    .pipe(size(extend({title: 'assets'}, sizeConfig)))
    .pipe(ifElse(isWatching, livereload))
})


gulp.task('build', 'Metatask that builds everything.', [
    'assets',
    'js-app',
    'js-vendor',
    'templates',
    'scss',
    'scss-vendor',
])


gulp.task('clean-builddir', `Warning! This deletes all files in '${BUILD_DIR}'`, function() {
    return del([
        path.join(BUILD_DIR, '**'),
    ], {
        force: true,
    })
})


/**
 * Update the hosted github pages from the current docs build directory.
 */
gulp.task('deploy-docs', 'Build docs and push to the github pages branch.', function() {
    return gulp.src('./docs/build/**/*').pipe(ghPages())
})


gulp.task('docs', 'Generate documentation.', (done) => {
    let completed = () => {
        if (isWatching) {
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
    if (!bundlers.app) {
        bundlers.app = browserify({
            cache: {},
            debug: !PRODUCTION,
            entries: path.join(__dirname, 'src', 'js', 'app.js'),
            packageCache: {},
        })
        if (isWatching) bundlers.app.plugin(watchify)
    }
    bundlers.app.bundle()
    .on('error', notify.onError('Error: <%= error.message %>'))
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(ifElse(!PRODUCTION, () => sourcemaps.init({loadMaps: true})))
    .pipe(ifElse(PRODUCTION, () => {
        // Convert to es5 as long there is no es6 version of uglifyjs.
        return babel({compact: true, presets: ['es2015', 'es2016', 'es2017']})
    }))
    .pipe(envify({NODE_ENV: NODE_ENV}))
    .pipe(ifElse(PRODUCTION, () => uglify()))
    .on('error', notify.onError('Error: <%= error.toString() %>'))
    .on('end', () => {
        if (!PRODUCTION) del(path.join(BUILD_DIR, 'app.js.gz'), {force: true})
        if (isWatching) livereload.changed('app.js')
        done()
    })
    .pipe(ifElse(!PRODUCTION, () => sourcemaps.write('./')))
    .pipe(gulp.dest(BUILD_DIR))
    .pipe(ifElse(PRODUCTION, () => gzip(gzipConfig)))
    .pipe(ifElse(PRODUCTION, () => gulp.dest(BUILD_DIR)))
    .pipe(size(extend({title: 'js-app'}, sizeConfig)))
    .pipe(size(extend({title: 'js-app[gzip]'}, sizeConfig)))
    .pipe(ifElse(PRODUCTION, () => size(extend({title: 'js-app[gzip]'}, sizeConfig))))
})


gulp.task('js-vendor', 'Process all vendor Javascript.', (done) => {
    if (!bundlers.vendor) {
        bundlers.vendor = browserify({
            cache: {},
            debug: !PRODUCTION,
            entries: path.join(__dirname, 'src', 'js', 'vendor.js'),
            packageCache: {},
        })
        if (isWatching) bundlers.vendor.plugin(watchify)
    }
    bundlers.vendor.bundle()
    .on('error', notify.onError('Error: <%= error.message %>'))
    .pipe(source('vendor.js'))
    .pipe(buffer())
    .pipe(ifElse(!PRODUCTION, () => sourcemaps.init({loadMaps: true})))
    .pipe(envify({NODE_ENV: NODE_ENV}))
    .pipe(ifElse(PRODUCTION, () => uglify()))
    .on('end', () => {
        if (!PRODUCTION) del(path.join(BUILD_DIR, 'vendor.js.gz'), {force: true})
        if (isWatching) livereload.changed('index.js')
        done()
    })
    .pipe(ifElse(!PRODUCTION, () => sourcemaps.write('./')))
    .pipe(gulp.dest(BUILD_DIR))
    .pipe(size(extend({title: 'js-vendor'}, sizeConfig)))
    .pipe(ifElse(PRODUCTION, () => gzip(gzipConfig)))
    .pipe(ifElse(PRODUCTION, () => gulp.dest(BUILD_DIR)))
    .pipe(ifElse(PRODUCTION, () => size(extend({title: 'js-vendor[gzip]'}, sizeConfig))))
})


/**
 * Generate application CSS.
 */
gulp.task('scss', 'Find all scss files from the apps directory, concat them and save as one css file.', (done) => {
    gulp.src('./src/scss/main.scss')
    .pipe(sass({
        includePaths: NODE_PATH,
        sourceMap: !PRODUCTION,
        sourceMapEmbed: !PRODUCTION,
    }))
    .on('error', notify.onError('Error: <%= error.message %>'))
    .pipe(concat('main.css'))
    .pipe(ifElse(PRODUCTION, () => cleanCSS({advanced: true, level: 2})))
    .on('end', () => {
        if (!PRODUCTION) del(path.join(BUILD_DIR, 'main.css.gz'), {force: true})
        if (isWatching) livereload.changed('main.css')
        done()
    })
    .pipe(gulp.dest(BUILD_DIR))
    .pipe(size(extend({title: 'scss'}, sizeConfig)))
    .pipe(ifElse(PRODUCTION, () => gzip(gzipConfig)))
    .pipe(ifElse(PRODUCTION, () => gulp.dest(BUILD_DIR)))
    .pipe(ifElse(PRODUCTION, () => size(extend({title: 'scss[gzip]'}, sizeConfig))))
})


/**
 * Generate vendor-specific CSS.
 */
gulp.task('scss-vendor', 'Find all scss files from the apps directory, concat them and save as one css file.', (done) => {
    gulp.src('./src/scss/vendor.scss')
    .pipe(sass({
        includePaths: NODE_PATH,
        sourceMap: !PRODUCTION,
        sourceMapEmbed: !PRODUCTION,
    }))
    .on('error', notify.onError('Error: <%= error.message %>'))
    .pipe(concat('vendor.css'))
    .pipe(ifElse(PRODUCTION, () => cleanCSS({advanced: true, level: 2})))
    .on('end', () => {
        if (!PRODUCTION) del(path.join(BUILD_DIR, 'vendor.css.gz'), {force: true})
        if (isWatching) livereload.changed('vendor.css')
        done()
    })
    .pipe(gulp.dest(BUILD_DIR))
    .pipe(ifElse(PRODUCTION, () => gzip(gzipConfig)))
    .pipe(ifElse(PRODUCTION, () => gulp.dest(BUILD_DIR)))
    .pipe(ifElse(PRODUCTION, () => size(extend({title: 'scss-vendor[gzip]'}, sizeConfig))))
    .pipe(ifElse(isWatching, livereload))
})


gulp.task('templates', 'Builds all Vue templates.', () => {
    gulp.src('./src/templates/**/*.vue')
    .pipe(vue('templates.js', {
        namespace: 'window.templates',
        prefixStart: 'templates',
    }))
    .on('error', notify.onError('Error: <%= error.message %>'))
    .pipe(ifElse(PRODUCTION, () => uglify()))
    .on('end', () => {
        if (!PRODUCTION) del(path.join(BUILD_DIR, 'templates.js.gz'), {force: true})
    })
    .pipe(gulp.dest(BUILD_DIR))
    .pipe(size(extend({title: 'templates'}, sizeConfig)))
    .pipe(ifElse(PRODUCTION, () => gzip(gzipConfig)))
    .pipe(ifElse(PRODUCTION, () => gulp.dest(BUILD_DIR)))
    .pipe(size(extend({title: 'templates [gzip]'}, sizeConfig)))
    .pipe(ifElse(isWatching, livereload))
})


gulp.task('watch', 'Start a development server and watch for changes.', () => {
    isWatching = true
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
        if (WITHDOCS) gulp.start('docs')
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
