var gulp = require('gulp');

// 引入组件
var path = require('path'),
    fse = require('fs-extra'); //初始化目录插件

// 获取当前文件路径
var PWD = process.env.PWD || process.cwd(); //兼容Windows

gulp.task('init', function() {
    var dirs = ['dist', 'dist/html', 'dist/css', 'dist/images', 'dist/js', 'src', 'src/sass', 'src/js', 'src/images', 'src/sprite', 'doc', 'doc/documents', 'doc/psd'];
    dirs.forEach(function(item, index) {
        // 使用mkdirSync方法新建文件夹
        fse.mkdirSync(path.join(PWD + '/' + item));
    })

    var files = ['src/index.html'];
    files.forEach(function(item,index){
      fse.createFileSync(path.join(PWD + '/' + item));
    })
    //往文件里写内容
    fse.writeFileSync(path.join(PWD + '/src/sass/style.scss'), '@charset "utf-8;"');
})
