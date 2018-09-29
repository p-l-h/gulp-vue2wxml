
var path = require('path');
var compiler = require('vue-template-compiler');
var through = require('through2');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;

module.exports = function () {
    return through.obj(function(file, enc, callback) {
        var self = this;
        var compiledContent = compiler.parseComponent(file.contents.toString());
        var f = path.parse(file.path);

        var jsFile = file.clone();
        jsFile.contents = new Buffer(compiledContent.script.content);
        jsFile.path = path.join(f.dir, f.name + '.js');
        self.push(jsFile);

        var cssFile = file.clone();
        var styles = compiledContent.styles;
        if (styles && styles.length) {
            cssFile.contents = new Buffer(styles[0].content);
            cssFile.path = path.join(f.dir, f.name + '.wxss');
            self.push(cssFile);
        }

        var htmlFile = file.clone();
        htmlFile.contents = new Buffer(compiledContent.template.content);
        htmlFile.path = path.join(f.dir, f.name + '.wxml');
        self.push(htmlFile);

        var configFile = file.clone();
        var others = compiledContent.customBlocks;
        if (others && others.length) {
            others.forEach(function (item) {
                if (item.type === 'config') {
                    var configContent = item.content.replace(/[\n\r]+/g, '');
                    var tempFunc = new Function('return ' + configContent + ';');
                    configFile.contents = new Buffer(
                        (JSON.stringify(tempFunc()))
                    );
                    configFile.path = path.join(f.dir, f.name + '.json');
                    self.push(configFile);
                }
            });
        }
        callback();
    });
};
