import PropertyEditorCustomContent from './src/main.vue';

/*引用 */
PropertyEditorCustomContent.install = function(Vue) {
  Vue.component(PropertyEditorCustomContent.name, PropertyEditorCustomContent);
};

export default PropertyEditorCustomContent;
