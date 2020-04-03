import QuestionEditorTab from './src/main.vue';

/*引用 */
QuestionEditorTab.install = function(Vue) {
  Vue.component(QuestionEditorTab.name, QuestionEditorTab);
};

export default QuestionEditorTab;
