<template>
  <el-container class="survey-editor">
    <el-header style="height: 40px;padding:0">
      <Tabs :editor="editor"></Tabs>
    </el-header>


    <TemplateDesigner :editor="editor" v-show="editor.viewType=='designer'"></TemplateDesigner>
    <TemplateLive :editor="editor" v-show="editor.viewType=='test'"></TemplateLive>
    <TemplateLogic :editor="editor" v-show="editor.viewType=='logic'"></TemplateLogic>
    <TemplateEditor :editor="editor" v-show="editor.viewType=='editor'"></TemplateEditor>
    <TemplateEmbed :editor="editor" v-show="editor.viewType=='embed'"></TemplateEmbed>
    <TemplateTranslation :editor="editor" v-show="editor.viewType=='translation'"></TemplateTranslation>

  </el-container>
</template>
<script>
  import { Component, Vue} from 'vue-property-decorator';
  import { SurveyCreator, SurveyEditor} from "@/js/editor.ts";

  var options = {
    showJSONEditorTab: true,
    showEmbededSurveyTab: true,
    showTranslationTab: true,
    showTranslationTab: true,
    inplaceEditForValues: true,
    useTabsInElementEditor: true,
    showLogicTab: true,
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
    name: "Editor2",
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
      },
      "editor.generateValidJSON":function(newValue){
        if (!this.editor.options) this.editor.options = {};
        this.editor.options.generateValidJSON = newValue;
        if (this.editor.generateValidJSONChangedCallback)
        this.editor.generateValidJSONChangedCallback(newValue);
      }
    },
  }
</script>
<style scoped>
  
</style>
