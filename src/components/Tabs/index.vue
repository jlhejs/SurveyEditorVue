<template>
  <el-menu
  class="edit-tabs"
  :default-active="viewType"
  mode="horizontal"
  @select="handleSelect">
  <template v-for="(item,key) in editor.tabs">
    <el-menu-item :index="item.name" :key="key" class="tabs-item">{{item.title}}</el-menu-item>
  </template>
  <!-- <el-menu-item index="3" disabled>disabled</el-menu-item> -->
</el-menu>
</template>
<script>
  export default {
    name:"Tabs",
    props: {
      editor:{
        required: true,
        type: Object
      }
      
    },
    data:function(){
      return {
      }
    },
    methods: {
      handleSelect(key, keyPath) {
        for(var i=0;i<this.editor.tabs.length;i++){
          if(this.editor.tabs[i].name==key){
            this.editor.tabs[i].action()
          }
        }
      }
    },
    created() {
     
    },
    computed: {
      viewType:function(){
        return this.editor.viewType
      }
    }
  }
</script>
<style scoped>
.tabs-item {
  height: 40px;
    line-height: 40px;
}
.edit-tabs {
  box-sizing: border-box;
  height: 40px;
}
.edit-tabs .tabs-item:hover{
  background: transparent;
}
</style>