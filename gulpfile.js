// ----------------------------------- //
// ---------- Gulp packages ---------- //
// ----------------------------------- //

const config       = require('./gulpConfig');

// General
const beep         = require('beepbeep'),
      browserSync  = require('browser-sync'),
      del          = require('del'),
      gulp         = require('gulp'),
      rename       = require('gulp-rename'),
      sourcemaps   = require('gulp-sourcemaps'),
      util         = require('gulp-util');

// Styles
const autoprefixer = config.settings.styles ? require('autoprefixer') : null,
      combineMQ    = config.settings.styles ? require('css-mqpacker') : null,
      cssnano      = config.settings.styles ? require('cssnano') : null,
      postcss      = config.settings.styles ? require('gulp-postcss') : null,
      sass         = config.settings.styles ? require('gulp-sass') : null;

// Scripts
const concat       = (config.settings.scripts | config.settings.standaloneScripts) ? require('gulp-concat') : null,
      uglify       = (config.settings.scripts | config.settings.standaloneScripts) ? require('gulp-uglify') : null;

// SVG
const svgSprite    = (config.settings.svgIcons | config.settings.svgSprite) ? require('gulp-svg-sprite') : null;



// ----------------------------------- //
// -------------- Flags -------------- //
// ----------------------------------- //

var isProduction       = false,
    generateStyleGuide = false;

if(util.env.prod === true) {
  isProduction   = true;
}

if(util.env.styleguide === true) {
  generateStyleGuide   = true;
}



// ----------------------------------- //
// -------------- Tasks -------------- //
// ----------------------------------- //

// Styles
function styles(done) {
  if (!config.settings.styles) return done();

  var plugins = [
    autoprefixer({ browsers: config.compatibility }),
    combineMQ(),
    cssnano()
  ];

  return gulp.src(config.styles.src)
    .pipe(isProduction ? util.noop() : sourcemaps.init())
    .pipe(sass())
    .on('error', swallowError)
    .pipe(isProduction ? postcss(plugins) : postcss([autoprefixer({ browsers: config.compatibility })]))
    .pipe(rename(config.styles.filename))
    .pipe(isProduction ? util.noop() : sourcemaps.write('.'))
    .pipe(gulp.dest(config.styles.build))
    .pipe(generateStyleGuide ? gulp.dest(config.styles.styleguide) : util.noop())
}


// Scripts
function scripts(done) {
  if (!config.settings.scripts) return done();

  return gulp.src(config.scripts.src.concat)
    .pipe(isProduction ? util.noop() : sourcemaps.init())
    .pipe(concat(config.scripts.filename))
    .on('error', swallowError)
    .pipe(isProduction ? uglify() : util.noop())
    .pipe(rename({ suffix: config.scripts.suffix }))
    .pipe(isProduction ? util.noop() : sourcemaps.write('.'))
    .pipe(gulp.dest(config.scripts.build))
    .pipe(generateStyleGuide ? gulp.dest(config.scripts.styleguide) : util.noop())
}

function standalones(done) {
  if (!config.settings.standaloneScripts) return done();

  return gulp.src(config.scripts.src.standalones)
    .pipe(isProduction ? uglify() : util.noop())
    .pipe(rename({ suffix: config.scripts.suffix }))
    .pipe(gulp.dest(config.scripts.build))
    .pipe(generateStyleGuide ? gulp.dest(config.scripts.styleguide) : util.noop())
}


// Images
function images(done) {
  if (!config.settings.images) return done();

  return gulp.src(config.images.src)
    .pipe(gulp.dest(config.images.build))
    .pipe(generateStyleGuide ? gulp.dest(config.images.styleguide) : util.noop())
}


// SVG
function icons(done) {
  if (!config.settings.svgIcons) return done();

  return gulp.src(config.svg.icons.src)
    .pipe(svgSprite({ svg: config.svg.parameters, mode: config.svg.icons.mode }))
    .pipe(gulp.dest(config.svg.build))
    .pipe(generateStyleGuide ? gulp.dest(config.svg.styleguide) : util.noop())
}

function sprite(done) {
  if (!config.settings.svgSprite) return done();

  return gulp.src(config.svg.sprite.src)
    .pipe(svgSprite({ svg: config.svg.parameters, mode: config.svg.sprite.mode }))
    .pipe(gulp.dest(config.svg.build))
    .pipe(generateStyleGuide ? gulp.dest(config.svg.styleguide) : util.noop())
}


// Fonts
function fonts(done) {
  if (!config.settings.fonts) return done();

  return gulp.src(config.fonts.src)
    .pipe(gulp.dest(config.fonts.build))
    .pipe(generateStyleGuide ? gulp.dest(config.fonts.styleguide) : util.noop())
}


// Cleanup
function cleanup() {
  var paths = [
    config.paths.build,
    config.paths.styleguide
  ];
  return del(paths);
}


// Watch
function watch() {
  browserSync.init(config.browserSync);

  if (config.settings.styles)            gulp.watch(config.styles.src, styles);
  if (config.settings.scripts)           gulp.watch(config.scripts.src.concat, scripts);
  if (config.settings.standaloneScripts) gulp.watch(config.scripts.src.standalones, standalones);
  if (config.settings.images)            gulp.watch(config.images.src, images);
  if (config.settings.svgIcons)          gulp.watch(config.svg.icons.src, icons);
  if (config.settings.svgSprite)         gulp.watch(config.svg.sprite.src, sprite);
  if (config.settings.fonts)             gulp.watch(config.fonts.src, fonts);
}


// Prevent errors from breaking gulp watch
function swallowError (error) {
  console.log(error.toString());
  beep();
  this.emit('end');
}



// ----------------------------------- //
// ------------- Commands ------------ //
// ----------------------------------- //

var run  = gulp.parallel(styles, scripts, standalones, images, icons, sprite, fonts),
    dev  = gulp.series(cleanup, run, watch),
    prod = gulp.series(cleanup, run);

isProduction ? gulp.task('default', prod) : gulp.task('default', dev );
