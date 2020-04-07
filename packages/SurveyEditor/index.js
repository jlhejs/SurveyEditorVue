import SurveyEditor from './src/main.vue';

/* 首页   */
SurveyEditor.install = function(Vue) {
  Vue.component(SurveyEditor.name, SurveyEditor);
  Vue.component("SurveyCreate", SurveyEditor);
};

export default SurveyEditor;
