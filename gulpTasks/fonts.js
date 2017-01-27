const gulp = require('gulp'),
    l = require('gulp-load-plugins')(),
    combine = require('stream-combiner2').obj,
    fontgen = require('gulp-fontgen');

module.exports = function(options){
  return function () {

    return combine(
      gulp.src(options.src),
          fontgen({
            dest: options.dist
          })
    );
  }
};
