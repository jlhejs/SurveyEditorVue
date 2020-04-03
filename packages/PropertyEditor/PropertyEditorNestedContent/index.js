import PropertyEditorNestedContent from './src/main.vue';

/*引用 */
PropertyEditorNestedContent.install = function(Vue) {
  Vue.component(PropertyEditorNestedContent.name, PropertyEditorNestedContent);
};

export default PropertyEditorNestedContent;
