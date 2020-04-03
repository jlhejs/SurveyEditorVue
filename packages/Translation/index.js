import Translation from './src/main.vue';

/* link:survey-creator component   */
Translation.install = function(Vue) {
  Vue.component(Translation.name, Translation);
};

export default Translation;
