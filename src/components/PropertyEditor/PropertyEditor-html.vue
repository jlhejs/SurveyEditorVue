<template>
  <el-input
    size="mini"
    placeholder="请输入内容"
    @change="valueChanged"
    v-model="property.value">
    <i slot="suffix" class="el-icon-date"></i>
  </el-input>
 
</template>
<script>
  export default {
    name:"PropertyEditor-html",
    props: {
      property:{
        type:Object,
        required: true,
      }
      
    },
    data() {
      return {
      }
    },
    updated() {
    },
    methods: {
      valueChanged:function(){
        // debugger
        this.property.editor.onValueChanged(this.property.value)
      }
    },
  }
</script>

<style scoped>

</style>