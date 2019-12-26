<template>
  <el-dialog
  :title="modal.koTitleCaption"
  :visible.sync="modal.isShowingModal"
  :before-close="modal.onResetClick"
  :close-on-click-modal="modalfalse"  
  width="50%">
  <span>modal.koTitleCaption</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="modal.onOkClick" type="primary" size="small">确 定</el-button>
    <el-button @click="modal.onResetClick" type="info" size="small">取 消</el-button>
  </span>
</el-dialog>
</template>
<script>
  export default {
    name:"propertyEditorModalString",
    props: {
      modal:{
        default:{},
        type:Object,
        required: false,
      }
      
    },
    data() {
      return {
        modalfalse:false
      }
    },
    updated() {
      console.log(this.modal)
    },
  }
</script>

<style scoped>

</style>