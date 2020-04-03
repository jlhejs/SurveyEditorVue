import PropertyEditorText from './src/main.vue';

/*引用 */
PropertyEditorText.install = function(Vue) {
  Vue.component(PropertyEditorText.name, PropertyEditorText);
};

export default PropertyEditorText;
