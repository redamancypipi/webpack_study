 const path = require('path');

module.exports ={
    // 项目的入口文件
    entry: "./src/index.js",
    // 编译完后的出口
    output: {
        filename: "build.js", // 指定的文件名
        path: path.resolve(__dirname, 'dist') // 必须使用绝对路径
    },
    // 放具体匹配规则
    module: {
        rules: [
            // 多个匹配规则
            // {
            //     test: /\.css$/, // 一般是正则表达式，用于匹配需要处理的文件类型
            //     use: [
            //         {
            //             loader: 'css-loader',
            //             // options: 
            //         }
            //     ]
            // },
            // 简写形式
            // {
            //     test: /\.css$/, // 一般是正则表达式，用于匹配需要处理的文件类型
            //     loader: 'css-loader'                 
            // }
            {
                test: /\.css$/, // 一般是正则表达式，用于匹配需要处理的文件类型
                use: [
                    'style-loader',// 让样式显示到页面上
                    'css-loader',
                    // 自动给css样式加前缀，实现兼容性
                    // {
                    //     loader: "postcss-loader",
                    //     options: {
                    //         postcssOptions: {
                    //             plugins: [
                    //                 // require('autoprefixer'),// 被包含到了postcss-preset-env中
                    //                 // require('postcss-preset-env')
                    //                 'postcss-preset-env' // 简写
                    //             ]
                    //         }
                    //     }
                    // }
                    'postcss-loader' // 公共部分已写到配置文件中
                ]//从下到上执行                
            },
            {
                test: /\.less$/, // 一般是正则表达式，用于匹配需要处理的文件类型
                use: [
                    'style-loader',// 让样式显示到页面上
                    'css-loader',
                    'postcss-loader',
                    'less-loader'
                ]//从下到上执行                
            }
        ]
    }
}