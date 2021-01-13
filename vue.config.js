let server = require('./config/serverConfig').server;
let css = require('./config/cssConfig').css;
let webpack = require('./config/webpackConfig').webpack();

module.exports = {
    // 开发环境配置
    server,
    // 部署配置
    webpack,
    // CSS配置
    css,
    // 打包后的路径引用配置
    publicPath: process.env.NODE_DEV == 'production' ? '/' : '/',
    // 链式操作
    chainWebpack: config => {
        // 路径简写配置,默认@ == src,无需配置
        config.resolve.alias
            .set('@', resolve('src'))
            .set('assets', resolve('src/assets'))
            .set('components', resolve('src/components'))
        // 图片压缩  相对路径 ("./、@/")会被webpage处理,绝对路径（"/、http://"）不会
        config.module
            .rule('images')
            .use('image-webpack-loader')
            .loader('image-webpack-loader')
        //项目图片打包时，修改图片名称
        config.module
            .rule('images')
            .use('url-loader')
            .tap(options => {
                return {
                    limit: 5046,
                    fallback: {
                        loader: 'file-loader',
                        options: {
                            name: `img/[name].${process.env.VUE_APP_VERSION}.[ext]`
                        }
                    }
                };
            })

        if (process.env.NODE_ENV == 'production') {
            config.optimization.splitChunks({ // todo 报错  分割代码
                cacheGroups: {
                    vendors: {
                        name: 'chunk-vendors',
                        minChunks: 2, //当前项目里面的html的个数
                        test: /node_modules/,
                        priority: -10,
                        chunks: 'initial' //'all'所有代码块，'async'按需加载的代码块，'initial'初始化代码块
                    },
                    common: {} //除了vendors提取后，剩余的满足条件的公共静态模块
                }
            })
        } else {
            config.optimization.minimize(false); //不压缩
        }
    },
    // 打包时不生成.map文件 避免看到源码
    productionSourceMap: false,
    lintOnSave: false, // 是否开启编译时是否不符合eslint提示
    //assetsDir: 'static',   // 静态文件目录
}