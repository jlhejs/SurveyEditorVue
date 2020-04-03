import Toolbar from './src/main.vue';

/* link:se-component-toolbar */
Toolbar.install = function(Vue) {
  Vue.component(Toolbar.name, Toolbar);
};

export default Toolbar;
