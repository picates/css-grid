var gulp = require('gulp');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer')
var browserSync = require('browser-sync');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var minify = require('gulp-minify-css');
var plumber = require('gulp-plumber');

function onError(err) {
    console.log(err);
}

// Copy All HTML files
gulp.task('copy', function(){
  gulp.src('src/*.html')
      .pipe(gulp.dest('dist'));
{
  gulp.src('src/fonts/*')
      .pipe(gulp.dest('dist/fonts'));
}
{
  gulp.src('src/js/plugins/*')
      .pipe(gulp.dest('dist/js'));
}
});



// Compile Sass
gulp.task('sass', function(){
    return gulp.src('src/sass/*')
        .pipe(sass())
        .pipe(prefix('last 2 versions'))
        .pipe(gulp.dest('dist/css'))
        .pipe(plumber({
            errorHandler: onError
        }))
});


// Optimize Images
gulp.task('imageMin', () =>
	gulp.src('src/images/*')
		.pipe(imagemin())
		.pipe(gulp.dest('dist/images'))
);


// Scripts
gulp.task('scripts', function(){
  gulp.src('src/js/*.js')
      .pipe(concat('main.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest('dist/js'));
});


gulp.task('browser-sync', function(){
	browserSync.init(["dist/*.html", "dist/images/*", "dist/css/*.css", "dist/js/*.js"], {
		server: {
			baseDir: "dist"
		}
	});
});

gulp.task('default', ['imageMin', 'scripts', 'copy', 'sass', 'browser-sync'], function () {
	gulp.watch('src/sass/*', ['sass']);
	gulp.watch('src/*.html', ['copy']);
	gulp.watch('src/js/*.js', ['scripts']);
  gulp.watch('src/images/*', ['imageMin']); 
});
