<template>
<span>
  <el-input
    size="mini"
    placeholder="dialog"
    @change="valueChanged"
    :disabled="value.editor.readOnly"
    @focus="onShowModal"
    v-model="value.value">
      <i
        class="el-icon-edit el-input__icon"
        slot="suffix"
        @click="dialogVisible = true">
      </i>
  </el-input>
  <el-dialog
  title="提示"
  :visible.sync="value.editor.isShowingModalValue"
  width="30%"
  >
   <component v-bind:is="'PropertyEditor-'+value.editorTypeTemplate+'Content'" v-model="value"></component>
  <span>这是一段信息{{value.editorTypeTemplate}}</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="onCloseModal">取 消</el-button>
    <el-button type="primary" @click="valueChanged">确 定</el-button>
    <!-- <el-button type="primary" @click="value.editor.onApplyClick">确 定</el-button> -->
  </span>
  </el-dialog>
</span>
  
</template>
<script>
  export default {
    name:"PropertyEditor-modal",
    props: {
      value:{
        type:Object,
        required: false,
      }
      
    },
    data() {
      return {
        modalfalse:false
      }
    },
    created() {
      // console.log(this.value)
    },
   methods: {
    onShowModal:function(){
      console.log(this)
       this.value.editor.onShowModal()
     },
    onCloseModal:function(){
       this.value.editor.isShowingModalValue = false
    },
    valueChanged:function(){
        this.value.editor.onValueChanged(this.value.value)
      }
    }
  }
</script>

<style scoped>

</style>