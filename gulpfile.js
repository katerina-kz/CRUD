const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const watch = require('gulp-watch');
const eslint = require('gulp-eslint');
const browserSync = require('browser-sync').create();
const del = require('del');
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const csso = require('gulp-csso'); 
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const cssConcat = require('gulp-concat-css');
const rename = require("gulp-rename");


const jsDefault = () => {
    return gulp.src([
        './src/js/**/*.js'
    ])
        .pipe(sourcemaps.init())
        // .pipe(eslint())
        // .pipe(eslint.format())
        // .pipe(eslint.failAfterError())
        .pipe(babel({
            "presets": ["@babel/preset-env"],
            "plugins": [
                "@babel/plugin-proposal-class-properties",
              ]
        }))
        .pipe(uglify())
        // .pipe(concat('app.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./build/js'));
};

const cssDefault = () => {
    return gulp.src([
        './src/styles/style.css'
    ])
        .pipe(sourcemaps.init())
        .pipe(autoprefixer())
        // .pipe(cssConcat("style.css"))
        .pipe(csso())
        .pipe(rename("style.min.css"))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./build/css'));
};

// * if sass:
// gulp.task('sass', function () {
//     return gulp.src('./src/sass/**/*.scss')
//         .pipe(sass.sync().on('error', sass.logError))
//         .pipe(gulp.dest('./src/css'));
// });

gulp.task('clean', () => {
    return del('./build');
});

gulp.task('clean-html-json', () => {
    // return (del(['./build/index.html', './build/data.json']))
    return (del(['./build/index.html']))
})

gulp.task('move', () => {
    return gulp.src([
        './src/*.html',
        // './src/data.json',
    ])
        .pipe(gulp.dest('./build'));
});

// gulp.task('images', () => {
//     return gulp.src('./src/img/**/*.*')
// //! не запускайте минификацию изображений
// //! очень-очень долго будет грузить
// //! это уже для финальной сборки
//         // .pipe(imagemin())
//         .pipe(gulp.dest('./build/img'));
// });

// * if fonts:
// gulp.task('fonts', () => {
//     return gulp.src('./src/fonts/*.*')
//         .pipe(gulp.dest('./build/fonts'));
// });



// gulp.task('compile', gulp.series('sass', cssDefault, 'images','fonts', jsDefault, 'move'));
gulp.task('compile', gulp.series(cssDefault, 'images', jsDefault, 'move'));


gulp.task('server', () => {
    browserSync.init({
        server: {
            baseDir: "./build",
            routes: {
                "/node_modules": "node_modules"
            }
        },
        watch: true
    });
    // watch(['./src/index.html', './src/data.json'], gulp.series('clean-html-json', 'move'));
    // watch('./src/sass/**/*.scss', gulp.series('sass', cssDefault));
    watch(['./src/index.html'], gulp.series('clean-html-json', 'move'));
    // watch([gulp.series(cssDefault)]);
    watch('./src/js/**/*.js', jsDefault);
    // watch('./src/img/**/*.*', 'images');
    // watch('./src/fonts/*.*', 'fonts');
});

gulp.task('start', gulp.series('clean', 'compile', 'server'));