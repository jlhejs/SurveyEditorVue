<template>
  <el-switch
  @change="valueChanged"
  v-model="property.value"
  active-color="#409EFF"
  inactive-color="#DCDFE6">
</el-switch>
</template>
<script>
  export default {
    name:"PropertyEditor-boolean",
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
        this.property.editor.onValueChanged(this.property.value)
      }
    },
  }
</script>

<style scoped>

</style>