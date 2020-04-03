import TranslationGroup from './src/main.vue';

/* link:survey-creator component   */
TranslationGroup.install = function(Vue) {
  Vue.component(TranslationGroup.name, TranslationGroup);
};

export default TranslationGroup;
