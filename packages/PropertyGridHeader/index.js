import PropertyGridHeader from './src/main.vue';

/*引用 */
PropertyGridHeader.install = function(Vue) {
  Vue.component(PropertyGridHeader.name, PropertyGridHeader);
};

export default PropertyGridHeader;
