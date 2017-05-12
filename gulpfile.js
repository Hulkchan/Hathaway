'use strict';

var gulp = require('gulp');

// 引入组件
var path = require('path'),
    fse = require('fs-extra'), // 初始化目录插件
    sass = require('gulp-sass'), // 编译sass
    autoprefix = require('gulp-autoprefixer'), // 自动补全css前缀
    spritesmith = require('gulp.spritesmith-multi'), // 雪碧图
    merge = require('merge-stream'), //把生成的img和css分别放进不同的文件夹
    concat = require('gulp-concat'), //将文件合并为一个
    browserSync = require('browser-sync').create(), // 服务器+监听
    htmlmin = require('gulp-htmlmin'), // 压缩html
    inject = require('gulp-inject'), //注入引用
    vinyPaths = require('vinyl-paths'),
    cssmin = require('gulp-minify-css'),
    minify = require('gulp-minify'),
    del = require('del'),
    imagemin = require('gulp-imagemin'),
    plumber = require('gulp-plumber')
// 获取当前文件路径
var PWD = process.env.PWD || process.cwd(); //兼容Windows
// 构建文件目录
gulp.task('init', function() {
    var dirs = [
        'dist',
        'dist/html',
        'dist/css',
        'dist/font',
        'dist/images',
        'dist/js',
        'src',
        'src/html',
        'src/sass',
        'src/css',
        'src/font',
        'src/js',
        'src/images',
        'doc',
        'doc/documents',
        'doc/psd'
    ];
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

gulp.task('sass', function() {
    var srcCss = gulp.src('src/sass/**/*.scss')
        // 基于一些配置项 运行sass()命令
        .pipe(plumber())
        .pipe(sass({
            errLogToConsole: true,
            outputStyle: 'expanded'
        }).on('error', sass.logError))
        // 添加前缀
        .pipe(plumber())
        .pipe(autoprefix({
            browsers: ['ios 5', 'android 2.3'],
            cascade: false
        }))
        // 输出css
        .pipe(gulp.dest('src/css'))
        .on('end', function() {
            distCss()
        })
    var distCss = function distCss() {
        gulp.src('src/css/**/*.css')
            .pipe(plumber())
            .pipe(cssmin({
                advanced: false, //类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
                compatibility: 'ie7', //保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
                keepBreaks: true, //类型：Boolean 默认：false [是否保留换行]
                keepSpecialComments: '*'
                //保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
            }))
            .pipe(gulp.dest('dist/css'))
            .pipe(browserSync.stream());
    }

    return srcCss
});

gulp.task('jsmin',function(){
    return gulp.src('src/js/**/*.js')
               .pipe(plumber())
               .pipe(minify())
               .pipe(gulp.dest("dist/js"))
               .pipe(browserSync.stream());
})

gulp.task('font',function(){
  return gulp.src('src/font/*')
             .pipe(gulp.dest("dist/font"))
             .pipe(browserSync.stream());
})
gulp.task('image', function() {
    return gulp.src('src/images/*')
        .pipe(plumber())
        .pipe(imagemin({
            optimizationLevel: 1, //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: false, //类型：Boolean 默认：false 无损压缩jpg图片
            interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
        }))
        .pipe(gulp.dest('dist/images'));
});
gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: "./dist"
        },
    });
    // 监听编译文件
    gulp.watch("src/**/*.html", ['htmlmin']);
    gulp.watch("src/sass/**/*.scss", ['sass']);
    gulp.watch("src/js/**/*.js", ['jsmin']);
    gulp.watch("src/font/*", ['font']);
    gulp.watch("src/images", ['image']);
    gulp.watch("src/**/*.html").on('change', browserSync.reload);
    gulp.watch(['src/**/*']).on('change', function(event) {
        if (event.type === 'deleted') {
            var src = event.path;
            var dist = src.replace('src', 'dist');
            del(dist);
        }
    });
});

gulp.task('htmlmin', function() {
    var options = {
        removeComments: true, //清除HTML注释
        collapseWhitespace: true, //压缩HTML
        collapseBooleanAttributes: true, //省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
        minifyJS: true, //压缩页面JS
        minifyCSS: true //压缩页面CSS
    };
    var index = function(){
      gulp.src('src/index.html')
          .pipe(plumber())
          .pipe(htmlmin(options))
          .pipe(gulp.dest('dist'));
    }
    var otherPage = function(){
      gulp.src('src/page/**/*.html')
          .pipe(plumber())
          .pipe(htmlmin(options))
          .pipe(gulp.dest('dist/page'));
    }
    return index(),otherPage()
});

gulp.task('inject', function() {
    var css = gulp.src(['./src/css/**/*.css'], {read: false});
    var js = gulp.src(['./src/js/**/*.js','!./src/js/lib/jquery/jquery.js','!./src/js/index.js'], {read: false});
    var jq = gulp.src(['./src/js/lib/jquery/jquery.js'], {read: false});
    var index = gulp.src(['./src/js/index.js'], {read: false});
    var indexPage = function(){
      gulp.src('./src/index.html')
          .pipe(plumber())
          .pipe(inject(css,{relative: true}))
          .pipe(inject(js,{relative: true}))
          .pipe(inject(index,{name:'index',relative: true}))
          .pipe(inject(jq,{name:'jq',relative: true}))
          .pipe(gulp.dest('./src'));
    }
    var otherPage = function(){
      gulp.src('./src/page/**/*.html')
          .pipe(plumber())
          .pipe(inject(css,{relative: true}))
          .pipe(inject(js,{relative: true}))
          .pipe(inject(index,{name:'index',relative: true}))
          .pipe(inject(jq,{name:'jq',relative: true}))
          .pipe(gulp.dest('./src/page'));
    }
    return indexPage(),otherPage();
})


gulp.task('bower', function() {
    console.log("****将bower包导入src****")
    var bowerConfig = {
        "./bower_components/jquery/dist/jquery.js": "./src/js/lib/jquery",
        "./bower_components/director/build/director.js": "./src/js/lib/director",
        "./bower_components/bootstrap/dist/css/bootstrap.css": "./src/css/lib/bootstrap",
        "./bower_components/bootstrap/dist/js/bootstrap.js": "./src/js/lib/bootstrap"
    };
    for (var key in bowerConfig) {
        var val = bowerConfig[key];
        gulp.src(key)
            .pipe(gulp.dest(val));
    }
})

//publish
gulp.task('default', ['htmlmin', 'serve'])
