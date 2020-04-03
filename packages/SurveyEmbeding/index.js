import SurveyEmbeding from './src/main.vue';

/* link:survey-creator component   */
SurveyEmbeding.install = function(Vue) {
  Vue.component(SurveyEmbeding.name, SurveyEmbeding);
};

export default SurveyEmbeding;
