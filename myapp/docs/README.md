# Nodejs

[link](http://blog.fens.me/nodejs-npm-package/)
[Express](http://blog.fens.me/nodejs-express3/), [grunt](http://blog.fens.me/nodejs-grunt-intro/), [npm](http://blog.fens.me/nodejs-npm-package/).

## Config Environment

### Express

- 首先安装express: `npm install -g express`
- 创建项目: `express myapp`
- 进入项目myapp后安装依赖包: `npm install`
- 最后用`DEBUG=myapp npm start`启动这个应用
- 在浏览器中用 `DEBUG=myapp npm start` 访问这个应用.(注意Express3.X版本用的是node app.js)

### npm

- NPM是一个NodeJS包管理和分发工具, 我们用它来快速管理我们需要的工具包
- `npm init`可以创建 *package.json* 一个文件
- `npm install * --dev-save`可以把安装的依赖写入到 *package.json* 文件中，下次安装直接使用`npm install`命令即可
- 自定义一个依赖见 [there](http://blog.fens.me/nodejs-npm-package/)

### grunt

- Grunt是一个自动化的项目构建工具.我们用它来执行像压缩, 编译, 单元测试, 代码检查以及打包发布等任务
- 首先安装 *grunt-cli*: `npm install -g grunt-cli`它的作用是管理本地各版本的grunt，让命令行可以直接执行grunt命令
- 接下来安装 *grunt*: `npm install -g grunt`, 用 `--save-dev` 可以添加依赖到 *package.json* 中
- 执行 *grunt*, 系统提示缺少 *Gruntfile* 文件
- 创建Gruntfile.js, input:
```js
    module.exports = function(grunt) {
      // Project configuration.
      grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
          options: {
            banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
          },
          build: {
            src: 'src/<%= pkg.name %>.js',
            dest: 'build/<%= pkg.name %>.min.js'
          }
        }
      });
      // Load the plugin that provides the "uglify" task.
      grunt.loadNpmTasks('grunt-contrib-uglify');
      // Default task(s).
      grunt.registerTask('default', ['uglify']);
    };
```

- 再次执行 `grunt`，将提示你安装依赖,安装完即可
- 创建两个目录src和build