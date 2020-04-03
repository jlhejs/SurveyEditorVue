import PropertyEditorTextContent from './src/main.vue';

/*引用 */
PropertyEditorTextContent.install = function(Vue) {
  Vue.component(PropertyEditorTextContent.name, PropertyEditorTextContent);
};

export default PropertyEditorTextContent;
