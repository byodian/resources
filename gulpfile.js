const settings = {
  clean: true,
  scripts: true,
  polyfills: true,
  styles: true,
  svgs: true,
  copy: true,
  reload: true
}

const paths = {
  input: ['src/','public/'],
  output: 'dist/',
  scripts: {
    input: 'src/js/**/*.js',
    output: 'dist/js'
  },
  styles: {
    input: 'src/sass/**/*.{scss, sass}',
    output: 'dist/css'
  },
  svgs: {
    input: 'src/assets/svg/**/*',
    output: 'dist/svg'
  },
  copy: {
    input: ['src/assets/**/*', '!src/assets/svg/*', 'public/*'],
    output: 'dist/'
  },
  reload: './dist/'
}

/**
 * Gulp Packages
 */

// General
const { src, dest, watch, series, parallel } = require('gulp');
const del = require('del');
const rename = require('gulp-rename');

// Scripts
const terser = require('gulp-terser');
const mode = require('gulp-mode')();
const babel = require('gulp-babel');
const webpack = require('webpack-stream');

// Styles 
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const csso = require('gulp-csso');
const sourcemaps = require('gulp-sourcemaps');

// images
const svgmin = require('gulp-svgmin')

const browserSync = require('browser-sync');

/**
 * Gulp Tasks
 */

const clean = function(cb) {
  if (!settings.clean) return cb();

  del.sync([
    paths.output
  ]);

  return cb();
}

const buildScripts = function(cb) {
  if(!settings.scripts) return cb();

  return src(paths.scripts.input)
    .pipe(babel())
    .pipe(webpack({
      mode: 'development',
      devtool: 'inline-source-map'
    }))
    .pipe(mode.development(sourcemaps.init({ loadMaps: true})))
    .pipe(mode.development(rename('main.js')))
    .pipe(mode.production(terser({output: {comments: false}})))
    .pipe(mode.production(rename({
      basename: 'main',
      suffix: '.min'
    })))
    .pipe(mode.development( sourcemaps.write() ))
    .pipe(dest(paths.scripts.output))
}


const buildStyles = function(cb) {
  if (!settings.styles) return cb();

  return src(paths.styles.input, {sourcemaps: true})
    .pipe(mode.development(sourcemaps.init()))
    .pipe(sass({
      outputStyle: 'expanded',
      sourceComments: true
    }))
    .pipe(autoprefixer())
    .pipe(mode.production(csso()))
    .pipe(mode.production(rename({suffix: '.min'})))
    .pipe(mode.development(sourcemaps.write()))
		.pipe(dest(paths.styles.output));
}

// Optimize SVG files
const buildImages = function (cb) {
	if (!settings.svgs) return cb();
  return src(paths.svgs.input)
    .pipe(svgmin())
    .pipe(dest(paths.svgs.output));
};

// Copy static files into output folder
const copyFiles = function (cb) {
	if (!settings.copy) return cb();

	return src(paths.copy.input)
		.pipe(dest(paths.copy.output));
};

const startServer = function(cb) {
	if (!settings.reload) return cb();
	browserSync.init({
		server: {
      baseDir: paths.reload,
		}
	});

	cb();
}

const reloadBrowser = function(cb) {
  if (!settings.reload) return cb();
  browserSync.reload();
  cb();
}

const watchSource = function(cb) {
  watch(paths.input, series(exports.default, reloadBrowser));
  cb();
}

/**
 * Exports Tasks
 */

exports.default = series(
  clean,
  parallel(
    buildScripts,
    buildStyles,
    buildImages,
    copyFiles
  )
);

// Watch and reload
// gulp watch
exports.dev = series(
  exports.default,
  startServer,
  watchSource
);