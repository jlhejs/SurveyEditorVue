import ActionSeparator from './src/main.vue';

/* link:survey-creator component  <script type="text/html" id="action-separator"> 问题编辑分开个个操作按钮*/
ActionSeparator.install = function(Vue) {
  Vue.component(ActionSeparator.name, ActionSeparator);
};

export default ActionSeparator;
