import PropertyEditorNumber from './src/main.vue';

/*引用 */
PropertyEditorNumber.install = function(Vue) {
  Vue.component(PropertyEditorNumber.name, PropertyEditorNumber);
};

export default PropertyEditorNumber;
