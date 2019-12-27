<template>
  <el-container class="survey-editor">
    <el-header style="height: 40px;padding:0">
      <Tabs :editor="editor"></Tabs>
    </el-header>


    <TemplateDesigner :editor="editor" v-show="editor.viewType=='designer'"></TemplateDesigner>
    <TemplateLive :editor="editor" v-show="editor.viewType=='test'"></TemplateLive>

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
      console.log(editorModel.tabs)
    },
  
    watch: {
      "editor.selectedObject":function(newValue){
        this.editor.selectedObjectChanged(newValue != null ? newValue.value : null);

      }
    },
  }
</script>
<style scoped>
  
</style>
