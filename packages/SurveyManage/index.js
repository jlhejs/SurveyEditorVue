import SurveyManage from './src/main.vue';

/* link:survey-creator component   */
SurveyManage.install = function(Vue) {
  Vue.component(SurveyManage.name, SurveyManage);
};

export default SurveyManage;
