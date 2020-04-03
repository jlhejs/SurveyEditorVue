import Jsoneditor from './src/main.vue';

/* link:jsoneditor */
Jsoneditor.install = function(Vue) {
  Vue.component(Jsoneditor.name, Jsoneditor);
};

export default Jsoneditor;
