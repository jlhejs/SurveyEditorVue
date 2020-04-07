import QuestionEditorPropertyGrid from './src/main.vue';

/*引用 */
QuestionEditorPropertyGrid.install = function(Vue) {
  Vue.component(QuestionEditorPropertyGrid.name, QuestionEditorPropertyGrid);
};

export default QuestionEditorPropertyGrid;
