<template>
    <el-container class="editor-container" >
      
      <el-aside style="width:auto;max-width: 200px;overflow: initial;border-right: solid 1px #e6e6e6;" class="nav left">
        <Toolbox v-if="editor.showToolbox" :editor="editor"></Toolbox>
      </el-aside>
      <el-main>
        <DesignerMain :editor="editor"></DesignerMain>
      </el-main>
      <el-aside style="max-width: 320px;width:auto;overflow: visible;border-left: solid 1px #e6e6e6;" class="nav right">
        <Advanced :editor="editor"></Advanced>
      </el-aside>
    </el-container>
</template>
<script>
  export default {
    name:"TemplateDesigner",
    props: {
      editor: {
        type: Object,
        required: true
      }
    },
  }
</script>
<style scope>
.editor-container{
    height: calc(100vh - 40px);
    overflow: hidden;
  }
  
</style>