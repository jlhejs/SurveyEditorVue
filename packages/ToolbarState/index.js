import ToolbarState from './src/main.vue';

/* link:survey-creator component   */
ToolbarState.install = function(Vue) {
  Vue.component(ToolbarState.name, ToolbarState);
};

export default ToolbarState;
