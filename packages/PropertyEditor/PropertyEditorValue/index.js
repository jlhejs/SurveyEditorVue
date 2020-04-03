import PropertyEditorValue from './src/main.vue';

/*引用 */
PropertyEditorValue.install = function(Vue) {
  Vue.component(PropertyEditorValue.name, PropertyEditorValue);
};

export default PropertyEditorValue;
