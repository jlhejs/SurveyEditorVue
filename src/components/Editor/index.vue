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
    name: "Editor",
    data: function () {
      return {
        editor: {},
      }
    },
    created() {
      var editorModel = new SurveyEditor("app", options)
      this.$set(this, 'editor', editorModel)
//       var s={
// 	"pages": [{
// 		"name": "页面1",
// 		"elements": [{
// 			"type": "text",
// 			"name": "Q1"
// 		}, {
// 			"type": "checkbox",
// 			"name": "Q2",
// 			"choices": ["item1", "item2", "item3"]
// 		}, {
// 			"type": "radiogroup",
// 			"name": "Q3",
// 			"choices": ["item1", "item2", "item3"]
// 		}, {
// 			"type": "dropdown",
// 			"name": "Q4",
// 			"choices": ["item1", "item2", "item3"]
// 		}, {
// 			"type": "comment",
// 			"name": "Q5"
// 		}, {
// 			"type": "rating",
// 			"name": "Q6"
// 		}, {
// 			"type": "imagepicker",
// 			"name": "Q7",
// 			"choices": [{
// 				"value": "1",
// 				"imageLink": "http://e.hiphotos.baidu.com/video/pic/item/962bd40735fae6cd80e2473200b30f2442a70f0b.jpg"
// 			}, {
// 				"value": "2",
// 				"imageLink": "2"
// 			}, {
// 				"value": "3",
// 				"imageLink": "3"
// 			}, {
// 				"value": "4",
// 				"imageLink": "4"
// 			}]
// 		}, {
// 			"type": "boolean",
// 			"name": "Q8",
// 			"labelTrue": "Yes",
// 			"labelFalse": "No"
// 		}, {
// 			"type": "html",
// 			"name": "Q9"
// 		}, {
// 			"type": "cascader",
// 			"name": "Q10",
// 			"choices": ["item1", "item2", "item3"]
// 		}, {
// 			"type": "datetime",
// 			"name": "Q11"
// 		}, {
// 			"type": "expression",
// 			"name": "Q12",
// 			"commentText": "Other (describe)"
// 		}, {
// 			"type": "file",
// 			"name": "Q13",
// 			"maxSize": 0
// 		}, {
// 			"type": "matrix",
// 			"name": "Q14",
// 			"columns": ["Column 1", "Column 2", "Column 3"],
// 			"rows": ["Row 1", "Row 2"]
// 		}, {
// 			"type": "matrixdropdown",
// 			"name": "Q15",
// 			"columns": [{
// 				"name": "Column 1"
// 			}, {
// 				"name": "Column 2"
// 			}, {
// 				"name": "Column 3"
// 			}],
// 			"choices": [1, 2, 3, 4, 5],
// 			"rows": ["Column 1", "Column 2", "Column 3"]
// 		}, {
// 			"type": "matrixdynamic",
// 			"name": "Q16",
// 			"columns": [{
// 				"name": "Column 1"
// 			}, {
// 				"name": "Column 2"
// 			}, {
// 				"name": "Column 3"
// 			}],
// 			"choices": [1, 2, 3, 4, 5]
// 		}, {
// 			"type": "multipletext",
// 			"name": "Q17",
// 			"items": [{
// 				"name": "text1"
// 			}, {
// 				"name": "text2"
// 			}]
// 		}, {
// 			"type": "paneldynamic",
// 			"name": "Q18"
// 		}, {
// 			"type": "slider",
// 			"name": "Q19"
// 		}]
// 	}, {
// 		"name": "页面2",
// 		"elements": [{
// 			"type": "expression",
// 			"name": "Q20",
// 			"commentText": "Other (describe)"
// 		}, {
// 			"type": "file",
// 			"name": "Q21",
// 			"maxSize": 0
// 		}, {
// 			"type": "matrix",
// 			"name": "Q22",
// 			"columns": ["Column 1", "Column 2", "Column 3"],
// 			"rows": ["Row 1", "Row 2"]
// 		}, {
// 			"type": "matrixdropdown",
// 			"name": "Q23",
// 			"columns": [{
// 				"name": "Column 1"
// 			}, {
// 				"name": "Column 2"
// 			}, {
// 				"name": "Column 3"
// 			}],
// 			"choices": [1, 2, 3, 4, 5],
// 			"rows": ["Column 1", "Column 2", "Column 3"]
// 		}, {
// 			"type": "matrixdynamic",
// 			"name": "Q24",
// 			"columns": [{
// 				"name": "Column 1"
// 			}, {
// 				"name": "Column 2"
// 			}, {
// 				"name": "Column 3"
// 			}],
// 			"choices": [1, 2, 3, 4, 5]
// 		}, {
// 			"type": "matrixdynamic",
// 			"name": "Q25",
// 			"columns": [{
// 				"name": "Column 1"
// 			}, {
// 				"name": "Column 2"
// 			}, {
// 				"name": "Column 3"
// 			}],
// 			"choices": [1, 2, 3, 4, 5]
// 		}, {
// 			"type": "multipletext",
// 			"name": "Q26",
// 			"items": [{
// 				"name": "text1"
// 			}, {
// 				"name": "text2"
// 			}]
// 		}]
//   }],
//   "showProgressBar": "both"
// }
// this.$set(this.editor, "text",JSON.stringify(s));


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
