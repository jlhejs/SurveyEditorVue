import ToolbarHeader from './src/main.vue';

/* 引用 se-component-toolbox-header*/
ToolbarHeader.install = function(Vue) {
  Vue.component(ToolbarHeader.name, ToolbarHeader);
};

export default ToolbarHeader;
