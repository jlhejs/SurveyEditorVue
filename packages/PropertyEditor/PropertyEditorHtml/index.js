import PropertyEditorHtml from './src/main.vue';

/*引用 */
PropertyEditorHtml.install = function(Vue) {
  Vue.component(PropertyEditorHtml.name, PropertyEditorHtml);
};

export default PropertyEditorHtml;
