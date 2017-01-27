const gulp = require('gulp'),
    l = require('gulp-load-plugins')(),
    combine = require('stream-combiner2').obj,
    svgSymbols = require('gulp-svg-symbols'),
    cheerio = require('gulp-cheerio'),
    path = require('path');

module.exports = function(options){
  return function () {
    return combine(
        gulp.src(options.src),
            svgSymbols({
              id:         'icon-%f',
              className:  '.icon-%f',
              title:      false,
              fontSize:   16,
              templates: [
                'default-svg',
                'default-demo',
                path.join(options.dirname, options.scssTemplatePath),
                path.join(options.dirname, options.twigTemplatePath),
              ]
            }),
            cheerio({
              run: function ($) {
                $('[fill]').removeAttr('fill');
                $('[style]').removeAttr('style');
                $('i').remove();
              },
              parserOptions: { xmlMode: true }
            }),
            gulp.dest(options.dist)
    )
  }
};
