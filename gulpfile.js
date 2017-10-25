const extend = require('util')._extend
const path = require('path')

const addsrc = require('gulp-add-src')
const argv = require('yargs').argv
const babel = require('gulp-babel')
const browserify = require('browserify')
const buffer = require('vinyl-buffer')
const childExec = require('child_process').exec
const cleanCSS = require('gulp-clean-css')
const composer = require('gulp-uglify/composer')
const concat = require('gulp-concat')
const del = require('del')
const envify = require('gulp-envify')
const fuet = require('gulp-fuet')
const ghPages = require('gulp-gh-pages')
const gulp = require('gulp-help')(require('gulp'), {})
const gutil = require('gulp-util')
const gzip = require('gulp-gzip')
const livereload = require('gulp-livereload')
const ifElse = require('gulp-if-else')
const insert = require('gulp-insert')
const minifier = composer(require('uglify-es'), console)
const nodemon = require('gulp-nodemon')
const notify = require('gulp-notify')
const rename = require('gulp-rename')
const sass = require('gulp-sass')
const size = require('gulp-size')
const source = require('vinyl-source-stream')
const sourcemaps = require('gulp-sourcemaps')
const tape = require('gulp-tape')
const tapColorize = require('tap-colorize')

const watchify = require('watchify')

const BUILD_DIR = process.env.BUILD_DIR || '/srv/http/data/frontend'
const NODE_ENV = process.env.NODE_ENV || 'development'
const NODE_INSPECT = process.env.NODE_INSPECT ? ' --inspect' : ''
const NODE_PATH = path.join(__dirname, 'node_modules')
const PRODUCTION = argv.production ? argv.production : (process.env.NODE_ENV === 'production')
const RUN_SSR = argv.ssr ? argv.ssr : false
const SRCDIR = path.join(__dirname, 'src')
const WITHDOCS = argv.docs ? argv.docs : false
const WATCHLINKED = argv.linked ? argv.linked : false

let bundlers = {app: null, vendor: null}
let isWatching
let gzipConfig = {append: true, gzipOptions: {level: 9}}
let _nodemon
let sizeConfig = {showFiles: true, showTotal: true}

if (PRODUCTION) gutil.log('(!) Gulp optimized for production')


gulp.task('assets', `Copy required assets to '${BUILD_DIR}'`, () => {
    return gulp.src('./src/img/**', {base: './src'})
        .pipe(addsrc('./src/fonts/**', {base: './src'}))
        .pipe(addsrc(path.join(NODE_PATH, 'roboto-fontface', 'fonts', '**'), {base: path.join(NODE_PATH, 'roboto-fontface')}))
        .pipe(addsrc(path.join(NODE_PATH, 'font-awesome', 'fonts', '**'), {base: path.join(NODE_PATH, 'font-awesome')}))
        .pipe(addsrc(path.join(NODE_PATH, 'vg-icons', 'fonts', '**'), {base: path.join(NODE_PATH, 'vg-icons')}))
        .pipe(addsrc('./src/index.html', {base: './src'}))
        .pipe(gulp.dest(BUILD_DIR))
        .pipe(size(extend({title: 'assets'}, sizeConfig)))
        .pipe(ifElse(isWatching, livereload))
})


gulp.task('build', 'Build application', [
    'assets',
    'js-app',
    'js-vendor',
    'js-translations',
    'templates',
    'scss',
    'scss-vendor',
])


gulp.task('build-clean', `Delete build directory '${BUILD_DIR}'`, function() {
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
        if (stderr) gutil.log(stderr)
        if (stdout) gutil.log(stdout)
        if (isWatching) livereload.changed('rtd.js')
        done()
    })
})


gulp.task('js-app', 'Generate app for the browser', (done) => {
    if (!bundlers.app) {
        bundlers.app = browserify({
            cache: {},
            debug: !PRODUCTION,
            entries: path.join(__dirname, 'src', 'js', 'browser.js'),
            packageCache: {},
        })
        if (isWatching) bundlers.app.plugin(watchify)
    }
    bundlers.app.bundle()
        .on('error', notify.onError('Error: <%= error.message %>'))
        .pipe(source('browser.js'))
        .pipe(buffer())
        .pipe(rename('app.js'))
        .pipe(ifElse(!PRODUCTION, () => sourcemaps.init({loadMaps: true})))
        .pipe(ifElse(PRODUCTION, () => babel({compact: true, presets: ['es2015', 'es2016', 'es2017']})))
        .pipe(envify({NODE_ENV: NODE_ENV}))
        .pipe(ifElse(PRODUCTION, () => minifier()))
        .on('error', notify.onError('Error: <%= error.toString() %>'))
        .on('end', () => {
            if (!PRODUCTION) del(path.join(BUILD_DIR, 'js', '*.js.gz'), {force: true})
            if (isWatching) {
                if (RUN_SSR) _nodemon.emit('restart', 'app.js')
                // Let the docs task handle livereload when it
                // is part of the build.
                else if (!WITHDOCS) livereload.changed('app.js')
            }

            done()
        })
        .pipe(ifElse(!PRODUCTION, () => sourcemaps.write('./')))
        .pipe(gulp.dest(path.join(BUILD_DIR, 'js')))
        .pipe(ifElse(PRODUCTION, () => gzip(gzipConfig)))
        .pipe(ifElse(PRODUCTION, () => gulp.dest(path.join(BUILD_DIR, 'js'))))
        .pipe(size(extend({title: 'js-app'}, sizeConfig)))
        .pipe(ifElse(PRODUCTION, () => size(extend({title: 'js-app[gzip]'}, sizeConfig))))
})


gulp.task('js-translations', 'Generate translations', (done) => {
    return gulp.src('./src/js/i18n/*.js', {base: './src/js/'})
        .pipe(ifElse(PRODUCTION, () => minifier()))
        .pipe(gulp.dest(path.join(BUILD_DIR, 'js')))
        .pipe(size(extend({title: 'js-translations'}, sizeConfig)))
        .pipe(ifElse(isWatching, livereload))
})


gulp.task('js-vendor', 'Generate vendor.js', (done) => {
    if (!bundlers.vendor) {
        bundlers.vendor = browserify({
            cache: {},
            debug: !PRODUCTION,
            entries: path.join(__dirname, 'src', 'js', 'lib', 'vendor.js'),
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
        .pipe(ifElse(PRODUCTION, () => minifier()))
        .on('end', () => {
            if (!PRODUCTION) del(path.join(BUILD_DIR, 'js', 'lib', '*.js.gz'), {force: true})
            if (isWatching) {
                if (RUN_SSR) _nodemon.emit('restart', 'vendor.js')
                else livereload.changed('vendor.js')
            }
            done()
        })
        .pipe(ifElse(!PRODUCTION, () => sourcemaps.write('./')))
        .pipe(gulp.dest(path.join(BUILD_DIR, 'js', 'lib')))
        .pipe(size(extend({title: 'js-vendor'}, sizeConfig)))
        .pipe(ifElse(PRODUCTION, () => gzip(gzipConfig)))
        .pipe(ifElse(PRODUCTION, () => gulp.dest(path.join(BUILD_DIR, 'js', 'lib'))))
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
            if (!PRODUCTION) del(path.join(BUILD_DIR, 'css', '*.css.gz'), {force: true})
            if (isWatching) livereload.changed('main.css')
            done()
        })
        .pipe(gulp.dest(path.join(BUILD_DIR, 'css')))
        .pipe(size(extend({title: 'scss'}, sizeConfig)))
        .pipe(ifElse(PRODUCTION, () => gzip(gzipConfig)))
        .pipe(ifElse(PRODUCTION, () => gulp.dest(path.join(BUILD_DIR, 'css'))))
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
            if (!PRODUCTION) del(path.join(BUILD_DIR, 'css', '*.css.gz'), {force: true})
            if (isWatching) livereload.changed('vendor.css')
            done()
        })
        .pipe(gulp.dest(path.join(BUILD_DIR, 'css')))
        .pipe(ifElse(PRODUCTION, () => gzip(gzipConfig)))
        .pipe(ifElse(PRODUCTION, () => gulp.dest(path.join(BUILD_DIR, 'css'))))
        .pipe(ifElse(PRODUCTION, () => size(extend({title: 'scss-vendor[gzip]'}, sizeConfig))))
        .pipe(ifElse(isWatching, livereload))
})


gulp.task('templates', 'Build Vue templates', () => {
    gulp.src('./src/vue/**/*.vue')
        .pipe(fuet({
            commonjs: false,
            namespace: 'global.templates',
            pathfilter: ['src', 'vue'],
        }))
        .on('error', notify.onError('Error: <%= error.message %>'))
        .pipe(ifElse(PRODUCTION, () => minifier()))
        .on('end', () => {
            if (isWatching) {
                if (RUN_SSR) _nodemon.emit('restart', 'vendor.js')
                else livereload.changed('templates.js')
            }
            if (!PRODUCTION) del(path.join(BUILD_DIR, 'js', 'templates.js.gz'), {force: true})
        })
        .pipe(concat('templates.js'))
        .pipe(insert.prepend('global.templates={};'))
        .pipe(gulp.dest(path.join(BUILD_DIR, 'js', 'lib')))
        // Also write the templates to the src directory to be
        // used by the ssr instance.
        .pipe(gulp.dest(path.join(SRCDIR, 'js', 'lib')))
        .pipe(size(extend({title: 'templates'}, sizeConfig)))
        .pipe(ifElse(PRODUCTION, () => gzip(gzipConfig)))
        .pipe(ifElse(PRODUCTION, () => gulp.dest(path.join(BUILD_DIR, 'js', 'lib'))))
        .pipe(ifElse(PRODUCTION, () => size(extend({title: 'templates[gzip]'}, sizeConfig))))
})


gulp.task('test', function() {
    return gulp.src('test/**/*.js')
        .pipe(tape({
            reporter: tapColorize(),
        }))
})


gulp.task('watch', 'Watch for changes using livereload', () => {
    isWatching = true
    livereload.listen({silent: false})
    gulp.watch([
        path.join(__dirname, 'src', 'js', '**', '*.js'),
        `!${path.join(__dirname, 'src', 'js', 'lib', 'vendor.js')}`,
        `!${path.join(__dirname, 'src', 'js', 'i18n', '*.js')}`,
        `!${path.join(__dirname, 'src', 'js', 'lib', 'templates.js')}`,
    ], () => {
        gulp.start('js-app')
        if (WITHDOCS) gulp.start('docs')
    })

    gulp.watch([path.join(__dirname, 'test', '**', '*.js')], ['test'])

    if (RUN_SSR) {
        gutil.log('Starting SSR daemon')
        _nodemon = nodemon({
            env: {NODE_ENV: NODE_ENV},
            exec: `node${NODE_INSPECT}`,
            ext: 'js',
            // Reloads are triggered manually from the appropriate tasks.
            ignore: [
                '*.js',
            ],
            restartable: true,
            script: 'src/js/server.js',
        })


        _nodemon.on('crash', function() {
            console.error('Application has crashed!\n Trying to restart in 3 seconds...\n')
            _nodemon.emit('restart', 3)
        })

        _nodemon.on('start:child', function() {
            livereload.changed('app.js')
        })
    }



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
        gulp.watch([
            path.join(NODE_PATH, 'vue-stash-i18n', 'src', '*.js'),
            path.join(NODE_PATH, 'fuet-pagination', 'src', 'js', '*.js'),
            path.join(NODE_PATH, 'fuet-notify', 'src', 'js', '*.js'),
            path.join(NODE_PATH, 'fuet-tabs', 'src', 'js', '*.js'),
        ], ['js-vendor'])
        gulp.watch([
            path.join(NODE_PATH, 'fuet-notify', 'src', 'scss', 'styles.scss'),
            path.join(NODE_PATH, 'fuet-tabs', 'src', 'scss', 'styles.scss'),
        ], ['scss-vendor'])
    }

    gulp.watch(path.join(__dirname, 'src', 'js', 'i18n', '*.js'), ['js-translations'])
    gulp.watch(path.join(__dirname, 'src', 'js', 'lib', 'vendor.js'), ['js-vendor'])
    gulp.watch(path.join(__dirname, 'src', 'vue', '**', '*.vue'), ['templates'])
    gulp.watch(path.join(__dirname, 'src', 'index.html'), ['assets'])
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
