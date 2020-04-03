import Toolbox from './src/main.vue';

/* 引用se-component-toolbox  <script type="text/html" id="se-component-toolbox">*/
Toolbox.install = function(Vue) {
  Vue.component(Toolbox.name, Toolbox);
};

export default Toolbox;
