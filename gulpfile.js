var gulp = require('gulp');

// 引入组件
var path = require('path'),
    fse = require('fs-extra'), // 初始化目录插件
    sass = require('gulp-sass'); // 编译sass

// 获取当前文件路径
var PWD = process.env.PWD || process.cwd(); //兼容Windows

gulp.task('init', function() {
    var dirs = ['dist', 'dist/html', 'dist/css', 'dist/images', 'dist/js', 'src', 'src/sass', 'src/js', 'src/images', 'src/sprite', 'doc', 'doc/documents', 'doc/psd'];
    dirs.forEach(function(item, index) {
        // 使用mkdirSync方法新建文件夹
        fse.mkdirSync(path.join(PWD + '/' + item));
    })

    var files = ['src/index.html'];
    files.forEach(function(item, index) {
        // 使用 createFileSync方法创建文件
        fse.createFileSync(path.join(PWD + '/' + item));
    })
    //往文件里写内容
    fse.writeFileSync(path.join(PWD + '/src/sass/style.scss'), '@charset "utf-8;"');
})

gulp.task('sass', function () {
  return gulp
    // 在src/sass目录下匹配所有的.scss文件
    .src('src/sass/**/*.scss')

    // 基于一些配置项 运行sass()命令
    .pipe(sass({
        errLogToConsole: true,
        outputStyle: 'expanded'
    }).on('error', sass.logError))

    // 输出css
    .pipe(gulp.dest('dist/css'));
});
