import PropertyGrid from './src/main.vue';

/*引用 */
PropertyGrid.install = function(Vue) {
  Vue.component(PropertyGrid.name, PropertyGrid);
};

export default PropertyGrid;
