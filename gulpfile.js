/* eslint-disable no-console, no-unused-vars, quotes, no-empty*/
var gulp = require('gulp');
var markdown = require('gulp-markdown-it');
var hljs = require('highlightjs');
var header = require('gulp-header');
var footer = require('gulp-footer');
var through = require('through2');

markdown.html = true;

function getRelativePathSteps(relativeFilePath) {

    let relativeSteps = [];
    let steps = relativeFilePath.split('\\');
    for (let i = 0; i < steps.length - 1; i++) {
        relativeSteps.push("..");
    }
    return relativeSteps.join("/");
}


gulp.task('markdown', function () {
    const config = {
        options: {
            html: true,
            preset: 'commonmark',
            highlight: function (str, lang) {
                lang = lang || this.lastLang || "javascript";
                if (lang && hljs.getLanguage(lang)) {
                    this.lastLang = lang || this.lastLang;
                    try {
                        return hljs.highlight(lang, str, true).value;
                    } catch (__) { }
                }

                return this.lastLang || ''; // use external default escaping
            }
            //   linkify: true,
            //   typographer: true
        },
        plugins: ["../../md_highlight_inline"] // This gets loaded from node_modules\markdown-it\lib\index.js so need relative path
    };
    class GulpFile {
        constructor(file) {
            this._File = file;
        }
        get relativeSteps() {
            return getRelativePathSteps(this._File.relative);
        }
    }


    const myGulpStep = function () {
        return through.obj(function (file, enc, callback) {
            console.log("Started processing  " + file.relative);
            if (typeof (global.relativeSteps) == 'undefined')
                global.relativeSteps = getRelativePathSteps;

            // make sure the file goes through the next gulp plugin
            this.push(file);
            callback();
        });
    };
    const addHeader = function () {
        return through.obj(function (file, enc, callback) {
            this.push(file);
            callback();
        });
    };

    var md = markdown(config);
    return gulp.src(['**/*.md', "!**/node_modules/**", "!README.md"])
        // .pipe(through.obj(function (file, enc, callback) {
        //     console.log("Started processing  " + file.relative);
        //     global.current_gulpfile = file;
        //     // make sure the file goes through the next gulp plugin
        //     this.push(file);
        //     callback();
        // }))
        .pipe(myGulpStep())
        .pipe(md)
        .pipe(header('\ufeff' +
            '<!DOCTYPE html>\n<html>\n\t<head>\n\t\t<title></title>\n\t\t' +
            '<link type="text/css" rel="stylesheet" href="<%=global.relativeSteps(file.relative)%>/styles/vs.css">\n' +
            '<link type="text/css" rel="stylesheet" href="<%=global.relativeSteps(file.relative)%>/styles/markdown.css">\n' +
            '\n\t' +
            '<!-- Global site tag (gtag.js) - Google Analytics -->\n' +
            '<script async src="https://www.googletagmanager.com/gtag/js?id=UA-58458282-5"></script>\n' +
            '<script>\n' +
            '  window.dataLayer = window.dataLayer || [];\n' +
            '  function gtag(){dataLayer.push(arguments);}\n' +
            '  gtag("js", new Date());\n' +
            '\n' +
            '  gtag("config", "UA-58458282-5");\n' +
            '</script>\n' +
            '<!-- Source File <%= file.relative %> -->\n' +
            '</head>\n<body>\n')
        )
        .pipe(footer('<div style="width:100%;padding-top:8vh;"><div style="text-align:center">Jonas Brandel y CloudCraic S.L. © 2018</div></div></body></html>'))
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