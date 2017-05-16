const extend = require('util')._extend
const path = require('path')

const addsrc = require('gulp-add-src')
const argv = require('yargs').argv
const babel = require('gulp-babel')
const browserify = require('browserify')
const buffer = require('vinyl-buffer')
const childExec = require('child_process').exec
const cleanCSS = require('gulp-clean-css')
const concat = require('gulp-concat')
const del = require('del')
const envify = require('gulp-envify')
const ghPages = require('gulp-gh-pages')
const gulp = require('gulp-help')(require('gulp'), {})
const gutil = require('gulp-util')
const gzip = require('gulp-gzip')
const livereload = require('gulp-livereload')
const ifElse = require('gulp-if-else')
const notify = require('gulp-notify')
const sass = require('gulp-sass')
const size = require('gulp-size')
const source = require('vinyl-source-stream')
const sourcemaps = require('gulp-sourcemaps')
const uglify = require('gulp-uglify')
const vue = require('gulp-vuejs')
const watchify = require('watchify')

const BUILD_DIR = process.env.BUILD_DIR || '/srv/http/data/frontend'
const NODE_ENV = process.env.NODE_ENV || 'development'
const NODE_PATH = process.env.NODE_PATH || path.join(__dirname, 'node_modules')
const PRODUCTION = argv.production ? argv.production : (process.env.NODE_ENV === 'production')
const WITHDOCS = argv['with-docs'] ? argv['with-docs'] : false
const WATCHLINKED = argv['watch-linked'] ? argv['watch-linked'] : false

let bundlers = {app: null, vendor: null}
let isWatching
let gzipConfig = {append: true, gzipOptions: {level: 9}}
let sizeConfig = {showTotal: true, showFiles: true}

if (PRODUCTION) gutil.log('(!) Gulp optimized for production')


gulp.task('assets', `Copy required assets to '${BUILD_DIR}'`, () => {
    return gulp.src('./src/img/**', {base: './src'})
    .pipe(addsrc('./src/fonts/**', {base: './src'}))
    .pipe(addsrc(path.join(NODE_PATH, 'font-awesome', 'fonts', '**'), {base: path.join(NODE_PATH, 'font-awesome')}))
    .pipe(addsrc(path.join(NODE_PATH, 'vg-icons', 'fonts', '**'), {base: path.join(NODE_PATH, 'vg-icons')}))
    .pipe(addsrc('./src/templates/index.html', {base: './src/templates'}))
    .pipe(gulp.dest(BUILD_DIR))
    .pipe(size(extend({title: 'assets'}, sizeConfig)))
    .pipe(ifElse(isWatching, livereload))
})


gulp.task('build', 'Build application', [
    'assets',
    'js-app',
    'js-vendor',
    'templates',
    'scss',
    'scss-vendor',
])


gulp.task('clean-builddir', `Delete build directory '${BUILD_DIR}'`, function() {
    return del([
        path.join(BUILD_DIR, '**'),
    ], {
        force: true,
    })
})


gulp.task('deploy-docs', 'Push docs to github pages', function() {
    return gulp.src('./docs/build/**/*').pipe(ghPages())
})


gulp.task('docs', 'Generate documentation', (done) => {
    let execCommand = `node ${NODE_PATH}/jsdoc/jsdoc.js ./src/js -R ./README.md -c ./.jsdoc.json -d ${BUILD_DIR}/docs`
    childExec(execCommand, undefined, (err, stdout, stderr) => {
        if (stdout) gutil.log(stdout)
        if (isWatching) livereload.changed('rtd.js')
        done()
    })
})


gulp.task('js-app', 'Generate app.js', (done) => {
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
    .pipe(ifElse(PRODUCTION, () => babel({compact: true, presets: ['es2015', 'es2016', 'es2017']})))
    .pipe(envify({NODE_ENV: NODE_ENV}))
    .pipe(ifElse(PRODUCTION, () => uglify()))
    .on('error', notify.onError('Error: <%= error.toString() %>'))
    .on('end', () => {
        if (!PRODUCTION) del(path.join(BUILD_DIR, '*.js.gz'), {force: true})
        // Let the docs task handle livereload when they are part of the build.
        if (isWatching && !WITHDOCS) livereload.changed('app.js')
        done()
    })
    .pipe(ifElse(!PRODUCTION, () => sourcemaps.write('./')))
    .pipe(gulp.dest(BUILD_DIR))
    .pipe(ifElse(PRODUCTION, () => gzip(gzipConfig)))
    .pipe(ifElse(PRODUCTION, () => gulp.dest(BUILD_DIR)))
    .pipe(size(extend({title: 'js-app'}, sizeConfig)))
    .pipe(ifElse(PRODUCTION, () => size(extend({title: 'js-app[gzip]'}, sizeConfig))))
})


gulp.task('js-translations', 'Generate translations', (done) => {
    return gulp.src('./src/js/i18n/*.js', {base: './src/js/'})
    .pipe(ifElse(PRODUCTION, () => uglify()))
    .pipe(gulp.dest(BUILD_DIR))
    .pipe(size(extend({title: 'js-translations'}, sizeConfig)))
    .pipe(ifElse(isWatching, livereload))
})


gulp.task('js-vendor', 'Generate vendor.js', (done) => {
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
        if (!PRODUCTION) del(path.join(BUILD_DIR, '*.js.gz'), {force: true})
        if (isWatching) livereload.changed('rtd.js')
        done()
    })
    .pipe(ifElse(!PRODUCTION, () => sourcemaps.write('./')))
    .pipe(gulp.dest(BUILD_DIR))
    .pipe(size(extend({title: 'js-vendor'}, sizeConfig)))
    .pipe(ifElse(PRODUCTION, () => gzip(gzipConfig)))
    .pipe(ifElse(PRODUCTION, () => gulp.dest(BUILD_DIR)))
    .pipe(ifElse(PRODUCTION, () => size(extend({title: 'js-vendor[gzip]'}, sizeConfig))))
})


gulp.task('scss', 'Generate main.css', (done) => {
    gulp.src('./src/scss/main.scss')
    .pipe(sass({
        includePaths: NODE_PATH,
        sourceMap: !PRODUCTION,
        sourceMapContents: !PRODUCTION,
        sourceMapEmbed: !PRODUCTION,
    }))
    .on('error', notify.onError('Error: <%= error.message %>'))
    .pipe(concat('main.css'))
    .pipe(ifElse(PRODUCTION, () => cleanCSS({advanced: true, level: 0})))
    .on('end', () => {
        if (!PRODUCTION) del(path.join(BUILD_DIR, '*.css.gz'), {force: true})
        if (isWatching) livereload.changed('main.css')
        done()
    })
    .pipe(gulp.dest(BUILD_DIR))
    .pipe(size(extend({title: 'scss'}, sizeConfig)))
    .pipe(ifElse(PRODUCTION, () => gzip(gzipConfig)))
    .pipe(ifElse(PRODUCTION, () => gulp.dest(BUILD_DIR)))
    .pipe(ifElse(PRODUCTION, () => size(extend({title: 'scss[gzip]'}, sizeConfig))))
})


gulp.task('scss-vendor', 'Generate vendor.css', (done) => {
    gulp.src('./src/scss/vendor.scss')
    .pipe(sass({
        includePaths: NODE_PATH,
        sourceMap: !PRODUCTION,
        sourceMapContents: !PRODUCTION,
        sourceMapEmbed: !PRODUCTION,
    }))
    .on('error', notify.onError('Error: <%= error.message %>'))
    .pipe(concat('vendor.css'))
    .pipe(ifElse(PRODUCTION, () => cleanCSS({advanced: true, level: 2})))
    .on('end', () => {
        if (!PRODUCTION) del(path.join(BUILD_DIR, '*.css.gz'), {force: true})
        if (isWatching) livereload.changed('vendor.css')
        done()
    })
    .pipe(gulp.dest(BUILD_DIR))
    .pipe(ifElse(PRODUCTION, () => gzip(gzipConfig)))
    .pipe(ifElse(PRODUCTION, () => gulp.dest(BUILD_DIR)))
    .pipe(ifElse(PRODUCTION, () => size(extend({title: 'scss-vendor[gzip]'}, sizeConfig))))
    .pipe(ifElse(isWatching, livereload))
})


gulp.task('templates', 'Build Vue templates', () => {
    gulp.src('./src/templates/**/*.vue')
    .pipe(vue('templates.js', {
        prefixStart: 'templates',
        commonjs: false,
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
    .pipe(ifElse(PRODUCTION, () => size(extend({title: 'templates[gzip]'}, sizeConfig))))
    .pipe(ifElse(isWatching, livereload))
})


gulp.task('watch', 'Watch for changes using livereload', () => {
    isWatching = true
    livereload.listen({silent: false})
    gulp.watch([
        path.join(__dirname, 'src', 'js', '**', '*.js'),
        `!${path.join(__dirname, 'src', 'js', 'vendor.js')}`,
        `!${path.join(__dirname, 'src', 'js', 'i18n', '*.js')}`,
    ], () => {
        gulp.start('js-app')
        if (WITHDOCS) gulp.start('docs')
    })

    if (WITHDOCS) {
        gutil.log('Watching documentation')
        gulp.watch([
            path.join(__dirname, '.jsdoc.json'),
            path.join(__dirname, 'README.md'),
            path.join(__dirname, 'docs', 'manuals', '**', '*.md'),
        ], () => {
            gulp.start('docs')
        })
    }

    // Also watches related linked modules to make development on them easier.
    if (WATCHLINKED) {
        gutil.log('Watching linked development packages')
        gulp.watch([
            path.join(NODE_PATH, 'jsdoc-rtd', 'static', 'styles', '*.css'),
            path.join(NODE_PATH, 'jsdoc-rtd', 'static', 'js', '*.js'),
            path.join(NODE_PATH, 'jsdoc-rtd', 'publish.js'),
            path.join(NODE_PATH, 'jsdoc-rtd', 'tmpl', '**', '*.tmpl'),
        ], ['docs'])
    }

    gulp.watch(path.join(__dirname, 'src', 'js', 'i18n', '*.js'), ['js-translations'])
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
