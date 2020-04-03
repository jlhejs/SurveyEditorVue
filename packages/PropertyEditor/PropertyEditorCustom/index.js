import PropertyEditorCustom from './src/main.vue';

/*引用 */
PropertyEditorCustom.install = function(Vue) {
  Vue.component(PropertyEditorCustom.name, PropertyEditorCustom);
};

export default PropertyEditorCustom;
