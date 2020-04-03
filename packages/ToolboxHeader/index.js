import ToolboxHeader from './src/main.vue';

/* 引用 <script type="text/html" id="se-component-toolbox-header">  */
ToolboxHeader.install = function(Vue) {
  Vue.component(ToolboxHeader.name, ToolboxHeader);
};

export default ToolboxHeader;
