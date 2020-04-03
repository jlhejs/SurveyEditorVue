import SurveyLive from './src/main.vue';

/* link:survey-creator component   */
SurveyLive.install = function(Vue) {
  Vue.component(SurveyLive.name, SurveyLive);
};

export default SurveyLive;
