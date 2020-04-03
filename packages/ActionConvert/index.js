import ActionConvert from './src/main.vue';

/* link:survey-creator component  <script type="text/html" id="convert-action"> 问题编辑时候转换其他类型的题目*/
ActionConvert.install = function(Vue) {
  Vue.component(ActionConvert.name, ActionConvert);
};

export default ActionConvert;
