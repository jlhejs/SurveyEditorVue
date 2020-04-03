import SurveyTest from './src/main.vue';

/* link:survey-creator component   */
SurveyTest.install = function(Vue) {
  Vue.component(SurveyTest.name, SurveyTest);
};

export default SurveyTest;
