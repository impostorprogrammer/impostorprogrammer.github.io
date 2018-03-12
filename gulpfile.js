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
    const steps = relativeFilePath.replace('\\', '/').split('/');
    for (let i = 0; i < steps.length; i++) {
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
    class GulpFile {
        constructor(file)
        {
            this._File = file;
        }
        get relativeSteps()
        {
            return getRelativePathSteps(this._File.relative);
        }
    }
    

    const myGulpStep = function (){
        return through.obj(function (file, enc, callback) {
            console.log("Started processing  " + file.relative);
            file.relativeSteps = getRelativePathSteps;
            // make sure the file goes through the next gulp plugin
            this.push(file);
            callback();
        });
    };
    const addHeader = function (){
        return through.obj(function (file, enc, callback) {
            this.push(file);
            callback();
        });
    };

    return gulp.src(['**/*.md', "!**/node_modules/**", "!README.md"])
        // .pipe(through.obj(function (file, enc, callback) {
        //     console.log("Started processing  " + file.relative);
        //     global.current_gulpfile = file;
        //     // make sure the file goes through the next gulp plugin
        //     this.push(file);
        //     callback();
        // }))
        .pipe(myGulpStep())
        .pipe(markdown(config))
        .pipe(header('\ufeff' +
                    '<!DOCTYPE html>\n<html>\n\t<head>\n\t\t<title></title>\n\t\t' +
                    '<link type="text/css" rel="stylesheet" href="<%=file.relativeSteps(file.relative)%>/styles/vs.css">\n' +
                    '<link type="text/css" rel="stylesheet" href="<%=file.relativeSteps(file.relative)%>/styles/markdown.css">\n' +
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
                    '<!-- Source File <%= file.relativeSteps(file.relative) %> -->\n' +
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