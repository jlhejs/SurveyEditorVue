<template>
  <el-container class="survey-editor">
    <el-header style="height: 40px;padding:0">
      <Tabs :editor="editor"></Tabs>
    </el-header>
    <el-container class="editor-container">
      <el-aside style="width:auto;max-width: 200px;overflow: initial;border-right: solid 1px #e6e6e6;" class="nav left">
        <Toolbox v-if="editor.showToolbox" :editor="editor"></Toolbox>
      </el-aside>
      <el-main>
        <Designer :editor="editor"></Designer>
      </el-main>
      <el-aside style="width: 320px;overflow: hidden;border-left: solid 1px #e6e6e6;" class="nav right">
        <Advanced :editor="editor"></Advanced>
      </el-aside>
    </el-container>
  </el-container>
</template>
<script>
  import {
    Component,
    Vue
  } from 'vue-property-decorator';
  import {
    SurveyCreator,
    SurveyEditor
  } from "@/js/editor.ts";

  var options = {
    showJSONEditorTab: true,
    showTranslationTab: true,
    inplaceEditForValues: true,
    useTabsInElementEditor: true,
    showPropertyGrid: true,
    showToolbox: true,
    allowModifyPages: true,
    showOptions: true,
    generateValidJSON: true,
    isAutoSave: true,
    designerHeight: true,
    showErrorOnFailedSave: true,
    showObjectTitles: true,
    showTitlesInExpressions: true,
    showPagesInTestSurveyTab: true,
    showDefaultLanguageInTestSurveyTab: true,
    showInvisibleElementsInTestSurveyTab: true
  }
  export default {
    name: "Editor",
    data: function () {
      return {
        editor: {},
      }
    },
    created() {
      var editorModel = new SurveyEditor("app", options)
      this.$set(this, 'editor', editorModel)
    },
  
    watch: {
      "editor.selectedObject":function(newValue){
        this.editor.selectedObjectChanged(newValue != null ? newValue.value : null);

      }
    },
  }
</script>
<style scoped>
  .editor-container{
    height: calc(100vh - 40px);
  }
  
</style>
