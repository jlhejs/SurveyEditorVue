import PropertyEditorModal from './src/main.vue';

/*引用 */
PropertyEditorModal.install = function(Vue) {
  Vue.component(PropertyEditorModal.name, PropertyEditorModal);
};

export default PropertyEditorModal;
