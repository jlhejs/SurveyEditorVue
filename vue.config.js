const path = require('path'); //引入path模块
function resolve(dir) {
  return path.join(__dirname, dir) //path.join(__dirname)设置绝对路径
}

module.exports = {
  configureWebpack: {
    devtool: 'source-map'
  },

  pluginOptions: {
    survey: {
      param: '用来监听survey-vue生成打包文件'
    }
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('./src'))
      .set('survey-vue', resolve('./survey-vue/src/entries/vue.ts'))
    //set第一个参数：设置的别名，第二个参数：设置的路径

  },
  // lintOnSave:false,
  // devServer: {
  //   proxy: {
  //     '/apijuhe': {
  //       target: 'http://apis.juhe.cn',
  //       changeOrigin: true,
  //       pathRewrite: {
  //         // 路径重写
  //         "/apijuhe": "" // 这个意思就是以api开头的，定向到哪里, 如果你的后边还有路径的话， 会自动拼接上
  //       }
  //     },
  //     '/apisohu': {
  //       target: 'http://pv.sohu.com',
  //       changeOrigin: true,
  //       pathRewrite: {
  //         // 路径重写
  //         "/apisohu": "" // 这个意思就是以api开头的，定向到哪里, 如果你的后边还有路径的话， 会自动拼接上
  //       }
  //     }
  //   }
  // }
  css: {
    sourceMap: true
  }
}