<template>
<div v-if="editor.questionEditorWindow.editor">
 <el-dialog
  :title="editor.questionEditorWindow.editor.koTitle"
  :visible.sync="editor.questionEditorWindow.visible"
  width="30%"
  >

  {{1111}}
  <!-- <div id="surveyquestioneditorwindow" class="modal" data-bind="with:koEditor">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-bind="click: onResetClick">&times;</button>
                <h4 class="modal-title" data-bind="text:koTitle"></h4>
            </div>
            <div class="modal-body svd_notopbottompaddings">
                <! ko template: { name: "questioneditor-content", data: $data } >
                <! /ko -12->
            </div>
            <div class="modal-footer">
                <input type="button" class="btn btn-primary" data-bind="visible: koShowApplyButton, disable: readOnly, click: onApplyClick, value: $root.getLocString('pe.apply')"
                    style="width:100px" />
                <input type="button" class="btn btn-default btn-secondary" data-bind="click: onOkClick, disable: readOnly, value: $root.getLocString('pe.ok')"
                    style="width:100px" />
                <input type="button" class="btn btn-primary" data-bind="click: onResetClick, value: $root.getLocString('pe.cancel')" style="width:100px"
                />
            </div>
        </div>
    </div>
  </div> -->
  <span slot="footer" class="dialog-footer">
    <el-button @click="editor.questionEditorWindow.editor.onOkClick" type="primary" size="small">确 定</el-button>
    <el-button @click="editor.questionEditorWindow.editor.onResetClick" type="info" size="small">取 消</el-button>
  </span>

</el-dialog>
</div>
</template>
<script>
  export default {
    name:"QuestionEditor",
    props: {
      editor:{
        type:Object,
        required: true,
      }
      
    },
    methods:{
    },
    data() {
      return {
        dialogVisible: false
      }
    },
    created() {
      // console.log("created",this.editor.questionEditorWindow)
    },
    updated() {
      // console.log(this.editor.questionEditorWindow)
    },
  }
</script>

<style scoped>

</style>