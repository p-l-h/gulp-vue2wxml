# gulp-vue2wxml
将vue文件转为微信小程序的page/component

## 安装
```bash
yarn add gulp gulp-vue2wxml -D
```

## 使用
```javascript
var gulp = require('gulp');
var vue2wxml = require('gulp-vue2wxml');

gulp.task('default', function() {
    gulp.src('src/**/*.vue')
        .pipe(vue2wxml())
        .dest('dist');
});
```
