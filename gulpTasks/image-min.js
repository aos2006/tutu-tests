const gulp = require('gulp'),
    l = require('gulp-load-plugins')(),
    combine = require('stream-combiner2').obj,
    rev = require('gulp-rev'),
    imagemin = require('gulp-imagemin');

module.exports = function(options){
  return function () {
    return combine(
        gulp.src(options.src),
            imagemin(),
            gulp.dest(options.dist)
    )
  }
};