var gulp = require("gulp");
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var tsify = require("tsify");
var uglify = require("gulp-uglify");
var sourcemaps = require("gulp-sourcemaps");
var buffer = require("vinyl-buffer");
var karma  = require("karma").Server;
var nodeFs = require("fs");

//var paths = {
//    pages: ["src/*.html"]
//};

gulp.task("clean", function() {
    if (!nodeFs.existsSync("dist")) {
        nodeFs.mkdirSync("dist");
    }

    var path  = nodeFs.realpathSync("dist");
	var files = nodeFs.readdirSync(path);

	files.forEach(function(file, index, files) {
		if (files.hasOwnProperty(index)) {
			nodeFs.unlinkSync(path + "/" + file);
		}
	});
});

//gulp.task("copy", function () {
//    return gulp.src(paths.pages)
//        .pipe(gulp.dest("dist"));
//});

gulp.task("browserify", function () {
    return browserify({
        basedir: ".",
        debug: true,
        entries: ["src/main/ts/CBSiTracker.ts"],
        cache: {},
        packageCache: {}
    })
    .plugin(tsify)
    .transform("babelify", {
        presets: ["es2015"],
        extensions: [".ts"]
    })
    .bundle()
    .pipe(source("CBSiTracker.js"))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify())
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest("dist"));
});

gulp.task("single-run-tests", ["browserify"], function(done) {
	var server = new karma({
		configFile: __dirname + "/karma.conf.js",
		singleRun: true
	}, function(exitCode) {
		process.exit(1);
	});

	server.start();
});

gulp.task("default", ["single-run-tests"]);

/*
.pipe(uglify({
    compress: {
        global_defs: {
            "DEBUG": false
        }
    }
}))
To remove console logs like:
if (DEBUG) {
	console.log("");
}
*/
