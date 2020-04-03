import PropertyEditor from './src/main.vue';

/*引用 */
PropertyEditor.install = function(Vue) {
  Vue.component(PropertyEditor.name, PropertyEditor);
};

export default PropertyEditor;
