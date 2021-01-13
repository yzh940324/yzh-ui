
module.exports.css = {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps
    sourceMap: false,
    // css预设器配置项 (全局样式引用,变量，函数，混入才能公用)
    loaderOptions: {
        sass: {
            // so this assumes you have a file named `src/variables.scss`
            data: `
                   @import "@/assets/css/variable.scss"; 
                   @import "@/assets/css/mixin.scss";
                  `
        }
    },
    // 启用 CSS modules for all css / pre-processor files.
    modules: false
}