import QuestionEditor from './src/main.vue';

/*引用 */
QuestionEditor.install = function(Vue) {
  Vue.component(QuestionEditor.name, QuestionEditor);
};

export default QuestionEditor;
