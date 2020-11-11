/**
 * GULP modules
 */
var gulp = require("gulp");
var sass = require("gulp-sass");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
var cleanCSS = require("gulp-clean-css");
var svgstore = require("gulp-svgstore");
var svgmin = require("gulp-svgmin");
var inject = require("gulp-inject");
var px2rem = require("gulp-px2rem");
var autoprefixer = require("gulp-autoprefixer");

/**
 * PATHS
 */
var paths = {
  styles: {
    src: "./src/styles/**/*.scss",
    dest: "./assets/css/"
  },
  scripts: {
    src: "./src/scripts/**/*.js",
    dest: "./assets/js/"
  },
  svg: {
    src: "./src/svg/*.svg",
    dest: "./assets/img/svg/",
    html: "./template/include/"
  }
};

var px2remOptions = {
  replace: false
};

function styles() {
  return gulp
    .src(paths.styles.src)
    .pipe(sass())
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 3 versions"],
        cascade: false
      })
    )
    .pipe(px2rem(px2remOptions))
    .pipe(cleanCSS())
    .pipe(
      rename({
        basename: "main",
        suffix: ".min"
      })
    )
    .pipe(gulp.dest(paths.styles.dest));
}

function scripts() {
  return gulp
    .src(paths.scripts.src, { sourcemaps: true })
    .pipe(uglify())
    .pipe(concat("vendor.min.js"))
    .pipe(gulp.dest(paths.scripts.dest));
}

function svgMinify() {
  return gulp
    .src(paths.svg.src)
    .pipe(
      svgmin({
        plugins: [
          {
            removeViewBox: false
          }
        ]
      })
    )
    .pipe(svgstore({ inlineSvg: true }))
    .pipe(gulp.dest(paths.svg.dest));
}

function svgInjectToHtml() {
  var sources = gulp.src("./assets/img/svg/svg.svg", { read: false });
  var target = gulp.src("./template/include/svg.html.twig");

  return target.pipe(inject(sources));
}

function watch() {
  gulp.watch(paths.scripts.src, scripts);
  gulp.watch(paths.styles.src, styles);
}

var build = gulp.parallel(styles, scripts);
var svg = gulp.series(svgMinify);

/**
 * Define methods
 */
exports.styles = styles;
exports.scripts = scripts;
exports.svg = svg;
exports.watch = watch;
exports.build = build;

/**
 * Define default task
 */
exports.default = build;
