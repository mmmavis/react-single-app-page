var gulp = require("gulp");
var gutil = require("gulp-util");
var webpack = require('webpack');
var gulpWebpack = require('webpack-stream');
var webpackConfig = require("./webpack.config.js");
var lightweightDynamicServer = require("./app.js");

var PORT = '9090';

gulp.task("watch", function() {
  gulp.watch(["pages/**/*"], ["webpack:build"]);
});


gulp.task('webpack', function() {
  // console.log("\n\n\n\n\ webpackConfig ////////////", webpackConfig);
  return gulp.src(webpackConfig.entry)
    .pipe(gulpWebpack(webpackConfig, webpack))
    .pipe(gulp.dest('./dist'));
});

gulp.task("webpack:build", function(callback) {
  // modify some webpack config options
  var myConfig = Object.create(webpackConfig);
  myConfig.plugins = myConfig.plugins.concat(
    new webpack.DefinePlugin({
      "process.env": {
        // This has effect on the react lib size
        "NODE_ENV": JSON.stringify("production")
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin()
  );

  // run webpack
  webpack(myConfig, function(err, stats) {
    if(err) throw new gutil.PluginError("webpack:build", err);
    gutil.log("[webpack:build]", stats.toString({
      colors: true
    }));
    callback();
  });
});


gulp.task('default', ['webpack:build'], function() {
  console.log("\n\n\n\n\ hi ////////////");
});

gulp.task('app', ['webpack:build', 'watch'], function() {
  lightweightDynamicServer.listen(PORT, function() {
    gutil.log('Lightweight dynamic server listening at ' +
              gutil.colors.green.bold(PORT) + '.');
  });
});

