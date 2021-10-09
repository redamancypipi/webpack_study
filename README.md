##### webpack_study

https://www.bilibili.com/video/BV1iv411N7jg?share_source=copy_web

#####  webpack 五个核心

- Entry
  入口(Entry)指示 webpack 以哪个文件为入口起点开始打包，分析构建内部依赖图。
- Output
  输出(Output)指示 webpack 打包后的资源 bundles 输出到哪里去，以及如何命名。
- Loader
  Loader 让 webpack 能 够 去 处 理 那 些 非 JavaScript 文 件 (webpack 自 身 只 理 解
  JavaScript)
- Plugins
  插件(Plugins)可以用于执行范围更广的任务。插件的范围包括，从打包优化和压缩，
  一直到重新定义环境中的变量等。
- Mode
  模式(Mode)指示 webpack 使用相应模式的配置。

| 选项        | 描述                                                         | 特点                       |
| ----------- | ------------------------------------------------------------ | -------------------------- |
| development | 会将 DefinePlugin 中 process.env.NODE_ENV 的值设置为 development。启用 NamedChunksPlugin 和NamedModulesPlugin。 | 能让代码本地调试运行的环境 |
| production  | 会将 DefinePlugin 中 process.env.NODE_ENV 的值设置为 production。启用 FlagDependencyUsagePlugin, FlagIncludedChunksPlugin, ModuleConcatenationPlugin, NoEmitOnErrorsPlugin, OccurrenceOrderPlugin, SideEffectsFlagPlugin 和 TerserPlugin。 | 能让代码优化上线运行的环境 |

##### 编译打包应用

- 创建文件
- 运行指令
  开发环境指令：webpack src/js/index.js -o build/js/built.js --mode=development
  功能：webpack 能够编译打包 js 和 json 文件，并且能将 es6 的模块化语法转换成
  浏览器能识别的语法。
  生产环境指令：webpack src/js/index.js -o build/js/built.js --mode=production
  功能：在开发配置功能上多一个功能，压缩代码。
- 结论
  webpack 能够编译打包 js 和 json 文件。
  能将 es6 的模块化语法转换成浏览器能识别的语法。
  能压缩代码。
- 问题
  不能编译打包 css、img 等文件。
  不能将 js 的 es6 基本语法转化为 es5 以下语法。 第 3 章：webpack 开发环境的基本配置

#### 开发环境的基本配置

##### 	创建配置文件

- 创建文件 webpack.config.js

- 配置内容如下

  ```javascript
  // 最基本的配置
  const { resolve } = require('path'); // node 内置核心模块，用来处理路径问题。
  
  module.exports = {
      entry: './src/js/index.js', // 入口文件
      output: { // 输出配置
          filename: './built.js', // 输出文件名
          path: resolve(__dirname, 'build/js') // 输出文件路径配置，必须使用绝对路径
      },
      // 放具体匹配规则
  	// loader的配置
      module: {}
      mode: 'development' //开发环境
  };
  ```

- 运行指令: webpack
- 结论: 此时功能与上节一致

  ##### 打包样式资源

安装loader包

- npm i -D less-loader less style-loader css-loader

```javascript
// 放具体匹配规则
// loader的配置
  module: {
    rules: [
      // 详细loader配置
      // 不同文件必须配置不同loader处理
      {
        // 匹配哪些文件
        test: /\.css$/,
        // 使用哪些loader进行处理
        use: [
          // use数组中loader执行顺序：从右到左，从下到上 依次执行
          // 创建style标签，将js中的样式资源插入进行，添加到head中生效
          'style-loader',
          // 将css文件变成commonjs模块加载js中，里面内容是样式字符串
          'css-loader'
        ]// 从下往上执行
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          // 将less文件编译成css文件
          // 需要下载 less-loader和less
          'less-loader'
        ]
      }
    ]
```



##### 兼容性设置

browserslist 设置兼容平台

- .browserslistrc 配置文件

  ```
  >1%
  last 2 version
  not dead
  ```

- postcss: JavaScript 转换样式的工具
- postcss-cli: 可以在终端使用 postcss 的命令
- postcss-preset-env: 预设
- npm i -D  postcss postcss-cli postcss-preset-env		

```
module: {
	rules: [
		{
            test: /\.css$/, // 一般是正则表达式，用于匹配需要处理的文件类型
            use: [
                'style-loader',// 让样式显示到页面上
                'css-loader',
                // 自动给css样式加前缀，实现兼容性
                {
                    loader: "postcss-loader",
                    options: {
                        postcssOptions: {
                            plugins: [
                                // require('autoprefixer'),// 被包含到了postcss-preset-env中，用来实现给不兼容所有浏览器的样式加前缀
                                // require('postcss-preset-env')
                                'postcss-preset-env' // 简写
                            ]
                        }
                    }
                }
            ]//从下到上执行                
        },
        {
            test: /\.less$/, // 一般是正则表达式，用于匹配需要处理的文件类型
            use: [
                'style-loader',// 让样式显示到页面上
                'css-loader',
                // 自动给css样式加前缀，实现兼容性
                {
                    loader: "postcss-loader",
                    options: {
                        postcssOptions: {
                            plugins: [
                                // require('autoprefixer'),// 被包含到了postcss-preset-env中，用来实现给不兼容所有浏览器的样式加前缀
                                // require('postcss-preset-env')
                                'postcss-preset-env' // 简写
                            ]
                        }
                    }
                }，
                'less-loader'
            ]//从下到上执行                
        }
	]
}
```

- 因为less和css都使用到了postcss的配置，所以可以写到配置文件中

- postcss.config.js	

```
// 公用配置
module.exports = {
    plugins: [
        require('postcss-preset-env')
    ]
}
```

- webpack.config.js

```
module: {
	rules: [
		{
            test: /\.css$/, // 一般是正则表达式，用于匹配需要处理的文件类型
                use: [
                'style-loader',// 让样式显示到页面上
                'css-loader',
                // 自动给css样式加前缀，实现兼容性
                'postcss-loader' // 公共部分已写到配置文件中
            ]//从下到上执行                
        },
        {
            test: /\.less$/, // 一般是正则表达式，用于匹配需要处理的文件类型
            use: [
                'style-loader',// 让样式显示到页面上
                'css-loader',
                'postcss-loader',// 会自动去配置文件中找
                'less-loader'
             ]//从下到上执行                
        }
	]
}

```

##### importLoaders

##### file-loader
