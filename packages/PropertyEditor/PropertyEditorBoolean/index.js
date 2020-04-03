import PropertyEditorBoolean from './src/main.vue';

/*引用 */
PropertyEditorBoolean.install = function(Vue) {
  Vue.component(PropertyEditorBoolean.name, PropertyEditorBoolean);
};

export default PropertyEditorBoolean;
