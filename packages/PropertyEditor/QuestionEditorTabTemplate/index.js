import QuestionEditorTabTemplate from './src/main.vue';

/*引用 */
QuestionEditorTabTemplate.install = function(Vue) {
  Vue.component(QuestionEditorTabTemplate.name, QuestionEditorTabTemplate);
};

export default QuestionEditorTabTemplate;
