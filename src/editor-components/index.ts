const requireComponent = require.context('./',true,/\.vue$/)
const components={}
requireComponent.keys().forEach(filename => {
  //获取组件配置
  const componentConfig = requireComponent(filename);
  // //截取出组件名称
  // filename = filename.replace(/^\.\//,'').replace(/.vue$/,'')
  // //全局注册组件
  // console.log(filename,componentConfig.default.name || componentConfig)
  components[componentConfig.default.name]=componentConfig.default
});

export default components