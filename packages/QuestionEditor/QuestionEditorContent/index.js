import QuestionEditorContent from './src/main.vue';

/*引用 */
QuestionEditorContent.install = function(Vue) {
  Vue.component(QuestionEditorContent.name, QuestionEditorContent);
};

export default QuestionEditorContent;
