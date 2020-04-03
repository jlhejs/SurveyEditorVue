import PropertyEditorHtmlContent from './src/main.vue';

/*引用 */
PropertyEditorHtmlContent.install = function(Vue) {
  Vue.component(PropertyEditorHtmlContent.name, PropertyEditorHtmlContent);
};

export default PropertyEditorHtmlContent;
