<template>
  <span @click="toggleClick">
    <i class="el-icon-s-fold" :class="{'is-active':isActive,'hamburger':1}"  ></i>
  </span>
</template>

<script>
export default {
  name: 'Hamburger',
  props: {
    editor: {
      type: Object,
      default: true
    }
  },
  data:function(){
    return {
    
      
    }
  },
  methods: {
    toggleClick() {
      this.editor.toolboxCollapse=!this.editor.toolboxCollapse
    }
  },
  computed: {
    isActive:function(){
        return !this.editor.toolboxCollapse
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
}

.hamburger.is-active {
  transform: rotate(180deg);
}
</style>
