<template>
  <div :class="['editor',editor.themeCss() ,editor.readOnly ? 'svd_container_disabled' : '']">
    <template v-if="!editor.haveCommercialLicense ">
      <div class="svd_commercial_container">
        <a class="svd_commercial_text" href="https://www.surveyjs.io/Buy" target="_blank">
          <span class="svd_commercial_product svd-main-color">Please purchase a SurveyJS Creator developer license to use it in your app.</span>
          <span class="svd_noncommercial_use svd-light-text-color"></span>
        </a>
      </div>
    </template>
     <div @click="test">
        {{editor.viewType}}

        </div>
    <el-header height="40px" class="nav-tabs editor-nav">
      <el-menu  class="el-menu-demo" mode="horizontal"  v-if="editor.tabs().length>1">
        <template v-for="(item,key)  in editor.tabs()">
            <el-menu-item :index="item.title" :key='key' class="nav-item" @click.native ="editor.makeNewViewActive(item.name)">{{item.title}}{{key}}</el-menu-item>
        </template>
      </el-menu>
    </el-header>
    <el-main class="editor-content editor-main">
      <template v-for="(item,key) in editor.tabs()" >
        <component :is="item.template" :key="key" v-show="item.name==editor.viewType"></component>
      </template>
    </el-main>
    <div data-bind="template: { name: 'questioneditor', data: questionEditorWindow }"></div>
  </div> 
 
</template>
<script>
import { Component, Vue } from 'vue-property-decorator';

import * as Editor from "survey-creator";
console.log(Editor)
var s=Editor
var creator = new Editor.SurveyCreator("creatorElement", {});

@Component({
  name:"SurveyEditor",
  componentName: 'SurveyEditor',
  data: function(){
    return {
      editor:creator,
      ss:123
    }
  },
    beforeCreate: function() {
      console.group('------beforeCreate创建前状态------');
      console.log("%c%s", "color:red" , "el     : " + this.$el); //undefined
      console.log("%c%s", "color:red","data   : " + this.$data); //undefined 
      console.log("%c%s", "color:red","message: " + this.message) 
    },
    created: function() {
      console.group('------created创建完毕状态------');
      console.log("%c%s", "color:red","el     : " + this.$el); //undefined
      console.log("%c%s", "color:red","data   : " + this.$data); //已被初始化 
      console.log("%c%s", "color:red","message: " + this.message); //已被初始化
    },
    beforeMount: function() {
      console.group('------beforeMount挂载前状态------');
      console.log("%c%s", "color:red","el     : " + (this.$el)); //已被初始化
      console.log(this.$el);
      console.log("%c%s", "color:red","data   : " + this.$data); //已被初始化  
      console.log("%c%s", "color:red","message: " + this.message); //已被初始化  
    },
    mounted: function() {
      console.group('------mounted 挂载结束状态------');
      console.log("%c%s", "color:red","el     : " + this.$el); //已被初始化
      console.log(this.$el);    
      console.log("%c%s", "color:red","data   : " + this.$data); //已被初始化
      console.log("%c%s", "color:red","message: " + this.message); //已被初始化 
    },
    beforeUpdate: function () {
      console.group('beforeUpdate 更新前状态===============》');
      console.log("%c%s", "color:red","el     : " + this.$el);
      console.log(this.$el);   
      console.log("%c%s", "color:red","data   : " + this.$data); 
      console.log("%c%s", "color:red","message: " + this.message); 
    },
    updated: function () {
      console.group('updated 更新完成状态===============》');
      console.log("%c%s", "color:red","el     : " + this.$el);
      console.log(this.$el); 
      console.log("%c%s", "color:red","data   : " + this.$data); 
      console.log("%c%s", "color:red","message: " + this.message); 
    },
    beforeDestroy: function () {
      console.group('beforeDestroy 销毁前状态===============》');
      console.log("%c%s", "color:red","el     : " + this.$el);
      console.log(this.$el);    
      console.log("%c%s", "color:red","data   : " + this.$data); 
      console.log("%c%s", "color:red","message: " + this.message); 
    },
    destroyed: function () {
      console.group('destroyed 销毁完成状态===============》');
      console.log("%c%s", "color:red","el     : " + this.$el);
      console.log(this.$el);  
      console.log("%c%s", "color:red","data   : " + this.$data); 
      console.log("%c%s", "color:red","message: " + this.message)
    },
   methods:{
     test(){
       console.log(this)
     }
   }
 })
// export default class SurveyEditor extends Vue{
// }
export default class SurveyEditor extends Vue {}
</script>
<style lang="scss" scoped>
.editor{
  height: 100vh;
  width: 100%;
  max-width: 100%;
  overflow: hidden;
}
.nav-item{
  height: 40px;
  line-height: 40px;
}
.nav-tabs{
  padding: 0;
}
.editor-content{
  background-color: #f4f4f4;

}
</style>