// 部署优化
const CompressionPlugin = require('compression-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
let v = process.env.VUE_APP_VERSION;//版本号
module.exports.configureWebpack = function(config) {
    let configures = {
        // 使用CDN， 在index.html引入
        externals: {
            
        },
        // GZIP压缩
        plugins: [
            // 修改打包后css文件名
            new MiniCssExtractPlugin({
                filename: `css/[name].${v}.css`,
                chunkFilename: `css/[name].${v}.css` //todo 不起作用
            }),
            new CompressionPlugin({
                test: /\.js$|\.html$|\.css|.woff/, // 匹配文件
                threshold: 10240, // 对超过10k文件压缩
                deleteOriginalAssets:false // 是否删除源文件
            })
        ],
        // 修改打包后js文件名
        output: { // 输出重构  打包编译后的 文件名称  【模块名称.版本号.js】
            filename: `js/[name].${v}.js`,
            chunkFilename: `js/[name].${v}.js`
        },
    };
    return configures;
}