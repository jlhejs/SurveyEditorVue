import SurveyLiveSimulator from './src/main.vue';

/* link:survey-creator component   */
SurveyLiveSimulator.install = function(Vue) {
  Vue.component(SurveyLiveSimulator.name, SurveyLiveSimulator);
};

export default SurveyLiveSimulator;
