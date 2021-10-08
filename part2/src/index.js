import {sum} from './js/utils.js'
// 引入 CSS 样式
// css-loader将css代码处理为可以识别的类型，但是不能把样式放到页面中使用
// 使用 css-loader 方式一
// import 'css-loader!./css/index.css'
import './css/index.css'

import './css/index.less'
const getInfo = require('./js/api.js')
console.log(sum(2,3));

console.log(getInfo());

/*
    "build": "webpack --config 自定义名称"可以修改webpack 配置文件的名称和路径
    browserslist 设置兼容平台
    postcss: JavaScript 转换样式的工具
    postcss-cli: 可以在终端使用 postcss 的命令
    postcss-preset-env: 预设
*/