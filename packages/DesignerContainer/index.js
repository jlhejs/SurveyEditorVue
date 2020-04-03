import DesignerContainer from './src/main.vue';

/* link:jsoneditor */
DesignerContainer.install = function(Vue) {
  Vue.component(DesignerContainer.name, DesignerContainer);
};

export default DesignerContainer;
