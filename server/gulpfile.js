let gulp = require("gulp");
let ts = require("gulp-typescript");
let gulpClean = require("gulp-clean");
let tsProject = ts.createProject("tsconfig.json");

let DIST_FOLDER = './dist';

gulp.task('clean-dist', function () {
    return gulp.src(DIST_FOLDER, {read: false})
        .pipe(gulpClean());
});

gulp.task("build", ['clean-dist'], function () {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest(DIST_FOLDER));
});