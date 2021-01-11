//HTML
import htmlmin from 'gulp-htmlmin';
//css
import postscss from 'gulp-postcss';
import cssnano from 'cssnano';
import autoprefixer from 'autoprefixer';

//javascript
import gulp from 'gulp';
import babel from 'gulp-babel';
import terser from 'gulp-terser';

//pug
import pug from 'gulp-pug';

//sas
import sass from 'gulp-sass';

//common
import concat from 'gulp-concat';

//clear css
import clean from 'gulp-purgecss';

//cache bust
import cacheBust from 'gulp-cache-bust';

//optimizacion imagenes
import imagemin from 'gulp-imagemin';

//browser sync
import {init as server, stream, reload} from 'browser-sync';

//plumber
import plumber from 'gulp-plumber';


const producction = true;

const cssPlugins = [cssnano(), autoprefixer()];


gulp.task('babel', ()=>{
    return gulp
    .src('./src/js/*.js')
    .pipe(plumber())
    .pipe(concat('scripts-min.js'))
    .pipe(babel())
    .pipe(terser())
    .pipe(gulp.dest('./docs/js'))
})

gulp.task('views', ()=>{
    return gulp
    .src('./src/views/pages/*.pug')
    .pipe(plumber())
    .pipe(pug({pretty: producction ? false: true}))
    .pipe(cacheBust({type: 'timestamp'}))
    .pipe(gulp.dest('./docs'))
})

gulp.task('sass', ()=>{
    return gulp
    .src('./src/scss/styles.scss')
    .pipe(plumber())
    .pipe(sass({
        outputStyle:'compressed'
    }))
    .pipe(postscss(cssPlugins))
    .pipe(gulp.dest('./docs/css'))
    .pipe(stream())
})

gulp.task('clean', ()=>{
    return gulp
    .src('./docs/css/styles.css')
    .pipe(plumber())
    .pipe(clean({
        content:['./docs/*.html']
    }))
    .pipe(gulp.dest('./docs/css'))
})

gulp.task('default', ()=>{
    server({
        server: './docs'
    })
    gulp.watch('./src/views/**/*.pug', gulp.series('views')).on('change', reload);
    gulp.watch('./src/scss/**/*.scss', gulp.series('sass'));
    gulp.watch('./src/js/*.js', gulp.series('babel')).on('change', reload);
})