<template>
  <span @click="editor.changeHideAdvancedSettings()">
    <i class="el-icon-s-fold" :class="{'is-active':!editor.hideAdvancedSettings,'hamburger':1}"  ></i>
  </span>
</template>
<script>
export default {
  name: 'AdvancedHamburger',
  props: {
      editor: {
        type: Object,
        required: true
      }
    },
  data:function(){
    return {  
    }
  },
  methods: {
    changeHideAdvancedSettings:function(){
    }
  },
  updated: function(){
    console.log("AdvancedHamburger",this.editor.hideAdvancedSettings)
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
