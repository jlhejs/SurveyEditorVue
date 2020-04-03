import GridPropertyEditor from './src/main.vue';

/*引用 */
GridPropertyEditor.install = function(Vue) {
  Vue.component(GridPropertyEditor.name, GridPropertyEditor);
};

export default GridPropertyEditor;
