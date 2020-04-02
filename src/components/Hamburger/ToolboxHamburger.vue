<template>
  <span @click="editor.changeHideToolboxCollapse()">
    <i :class="[editor.hideToolboxCollapse?'':'is-active','hamburger','el-icon-s-fold']"  ></i>
  </span>
</template>

<script>
export default {
  name: 'ToolboxHamburger',
  props: {
    editor: {
      type: Object,
      default: {}
    }
  },
  data:function(){
    return { 
    }
  },
  methods: {
    toggleClick() {
    
    }
  },
  computed: {
    isActive:function(){
    }
  },
}
</script>
<style scoped>
.hamburger {
  display: inline-block;
  vertical-align: middle;
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  cursor: pointer;
  font-size: 20px;
  transition: width 1s, height 1s, transform 1s;
}

.hamburger.is-active {
  transform: rotate(180deg);
}
</style>
