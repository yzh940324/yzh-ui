//开发环境配置
let devServer = {
    host: '0.0.0.0',
    port: process.env.PORT || 8088,
    proxy: {
        '/demo': {
            target: 'http://***.***.*.**:****',  // 需要代理的根目录 （后台接口根目录）
            changeOrigin: true, //接口跨域时，需要配置，本地会虚拟一个服务端接收请求并发送请求
            ws: true,
            pathRewrite:{
                '^/demo':'/'  //这里理解成使用的地址
            }
        },
        '/foo': {
            target: '<other_url>'
        }
    },
    //inline: true, //开启页面自动刷新
    disableHostCheck: true //解决部署到服务器上提示Invalid Host header
}

module.exports.devServer = devServer;
