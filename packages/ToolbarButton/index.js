import ToolbarButton from './src/main.vue';

/* link:survey-creator component   */
ToolbarButton.install = function(Vue) {
  Vue.component(ToolbarButton.name, ToolbarButton);
};

export default ToolbarButton;
