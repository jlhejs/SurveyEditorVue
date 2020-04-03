import PropertyEditorExpression from './src/main.vue';

/*引用 */
PropertyEditorExpression.install = function(Vue) {
  Vue.component(PropertyEditorExpression.name, PropertyEditorExpression);
};

export default PropertyEditorExpression;
