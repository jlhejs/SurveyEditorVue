import SurveyLiveTab from './src/main.vue';

/* link:survey-creator component   */
SurveyLiveTab.install = function(Vue) {
  Vue.component(SurveyLiveTab.name, SurveyLiveTab);
};

export default SurveyLiveTab;
