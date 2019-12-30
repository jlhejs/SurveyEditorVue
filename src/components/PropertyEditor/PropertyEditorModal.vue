<template>
<span>
  <el-input
    size="mini"
    placeholder="dialog"
    @change="valueChanged"
    :disabled="property.editor.readOnly"
    @focus="onShowModal"
    v-model="property.value">
    <i slot="suffix" class="el-icon-date"></i>
  </el-input>
 
  <el-dialog
  title="提示"
  :visible.sync="property.editor.isShowingModalValue"
  width="30%"
  >
  <span>这是一段信息</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="property.editor.isShowingModalValue = false">取 消</el-button>
    <el-button type="primary" @click="property.editor.isShowingModalValue = false">确 定</el-button>
  </span>
  </el-dialog>
</span>
  
</template>
<script>
  export default {
    name:"PropertyEditor-modal",
    props: {
      property:{
        type:Object,
        required: false,
      }
      
    },
    data() {
      return {
        modalfalse:false
      }
    },
   methods: {
     onShowModal:function(){
       this.property.editor.onShowModal()
     },
      valueChanged:function(){
        debugger
        this.property.editor.onValueChanged(this.property.value)
      }
    }
  }
</script>

<style scoped>

</style>