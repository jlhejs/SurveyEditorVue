import TabDesigner from './src/main.vue';

/* link:survey-creator component   */
TabDesigner.install = function(Vue) {
  Vue.component(TabDesigner.name, TabDesigner);
};

export default TabDesigner;
