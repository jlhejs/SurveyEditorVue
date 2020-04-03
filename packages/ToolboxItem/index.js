import Toolbox from './src/main.vue';

/*引用<script type="text/html" id="se-tab-designer-item"> */
Toolbox.install = function(Vue) {
  Vue.component(Toolbox.name, Toolbox);
};

export default Toolbox;
