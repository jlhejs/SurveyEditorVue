import TabJson from './src/main.vue';

/* link:jsoneditor */
TabJson.install = function(Vue) {
  Vue.component(TabJson.name, TabJson);
};

export default TabJson;
