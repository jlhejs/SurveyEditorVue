import SurveyAttach from './src/main.vue';

/* link:survey-creator component   */
SurveyAttach.install = function(Vue) {
  Vue.component(SurveyAttach.name, SurveyAttach);
};

export default SurveyAttach;
