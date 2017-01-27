const gulp = require('gulp'),
    l = require('gulp-load-plugins')(),
    combine = require('stream-combiner2').obj,
    gulpSharp = require('gulp-sharp');

module.exports = function(options){
  return function () {

    return combine(
        gulp.src(options.src),
            gulpSharp({
              resize : [1920, 995],
              max : true,
              quality : 80,
              progressive : true
            }),
            gulp.dest(options.dist)
    );
  }
};