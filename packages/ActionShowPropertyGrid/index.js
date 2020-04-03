import ActionShowPropertyGrid from './src/main.vue';

/* link:survey-creator component  <script type="text/html" id="action-separator"> 问题编辑分开个个操作按钮*/
ActionShowPropertyGrid.install = function(Vue) {
  Vue.component(ActionShowPropertyGrid.name, ActionShowPropertyGrid);
};

export default ActionShowPropertyGrid;
