var gulp = require('gulp');
var markdown = require('gulp-markdown-it');
var hljs = require('highlightjs');
var header = require('gulp-header');
var footer = require('gulp-footer');
var through = require('through2');
markdown.html = true;

gulp.task('markdown', function () {
    const config = {
        options: {
            html: true,
            preset: 'commonmark',
            highlight: function (str, lang) {
                if (lang && hljs.getLanguage(lang)) {
                    try {
                        return hljs.highlight(lang, str, true).value;
                    } catch (__) { }
                }

                return ''; // use external default escaping
            }

            //   linkify: true,
            //   typographer: true
        }
    };
    return gulp.src(['**/*.md', "!**/node_modules/**", "!README.md"])
        .pipe(through.obj(function (file, enc, callback) {
            console.log("Started processing  " + file.relative);
            // make sure the file goes through the next gulp plugin
            this.push(file);
            callback();
        }))
        .pipe(markdown(config))
        .pipe(header('\ufeff' +
            '<!DOCTYPE html>\n<html>\n\t<head>\n\t\t<title></title>\n\t\t' +
            '<link type="text/css" rel="stylesheet" href="../styles/vs.css">\n' +
            '<link type="text/css" rel="stylesheet" href="../styles/markdown.css">\n' +
            '\n\t</head>\n<body>\n'))
        .pipe(footer('</body></html>'))
        .pipe(through.obj(function (file, enc, callback) {
            console.log("Finishing processing  " + file.relative);
            // make sure the file goes through the next gulp plugin
            this.push(file);
            callback();
        }))
        .pipe(gulp.dest(function (f) {
            return f.base;
        }));
});

gulp.task('default', ['markdown'], function () {
    gulp.watch('**/*.md', ['markdown']);
});