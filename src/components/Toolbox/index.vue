<template>
  <div  class="toolbox">
    <el-scrollbar>
      <el-menu  class="toolbox-menu"  :collapse="editor.hideToolboxCollapse">
        <template v-if="!editor.toolbox.koHasCategories()">
          <template v-for="(item,key) in editor.toolbox.koItems()">
            <el-menu-item :index="item.name" @click.native="editor.clickToolboxItem(item)" :key="item.name" class="toolbox-menu-item">
              <i :class="[item.iconName,'iconfont']"></i>
              <span slot="title">{{item.title}}</span>
            </el-menu-item>
          </template>
        </template>
      </el-menu>
      </el-scrollbar>
      <ToolboxHamburger :editor="editor" id="toolbox-hamburger"></ToolboxHamburger>
  </div>
</template>
<script>
  import { Component, Vue } from 'vue-property-decorator';
  @Component({
    name:"Toolbox",
    props: {
      editor: {
        required: true,
        type: Object,
      },
    },
    data() {
      return {
      }
    },
    methods: {
    },
    computed: {
      test:function(){
      }
    },
    created () {
      // debugger
    }
  })
  export default class Toolbox extends Vue {

  }
</script>
<style scoped >
  .toolbox {
    position: relative;
   


    /* .sv-toolbox-item {
      height: 34px;
      line-height: 34px;
      border: 1px solid #e0e0e0;
      background-color: #fff;
      margin-bottom: 3px;
    }
    .sv-toolbox-tabitem {
        height: 38px;
        line-height: 38px;
        font-size: 14px;
        text-align: center;
        margin-right: -1px;
        border: 1px solid #e0e0e0;
        &.current {
          background-color: #479de6;
          color: #fff;
          border-color: #368cd5;
          z-index: 1;
        }
      } */

  }
  #toolbox-hamburger{
    display: inline-block;
    position: absolute;
    transform:translate(36px, 4px);
    top: 0;
    right: 0;
    }
    /deep/ .el-menu{
      border-right: 0;
    }
    .toolbox-menu{
      max-height: calc(100vh - 40px);
    }
    .toolbox-menu-item{
    }
    .iconfont{
      vertical-align: middle;
    margin-right: 5px;
    width: 24px;
    text-align: center;
    font-size: 18px;
    }
 
</style>