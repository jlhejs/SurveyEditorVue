import PropertyEditorString from './src/main.vue';

/*引用 */
PropertyEditorString.install = function(Vue) {
  Vue.component(PropertyEditorString.name, PropertyEditorString);
};

export default PropertyEditorString;
