import ToolbarOptions from './src/main.vue';

/* link:survey-creator component   */
ToolbarOptions.install = function(Vue) {
  Vue.component(ToolbarOptions.name, ToolbarOptions);
};

export default ToolbarOptions;
