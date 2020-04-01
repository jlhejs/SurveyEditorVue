<template>
  <el-color-picker  v-model="property.value"  @change="property.editor.onValueChanged(property.value)" show-alpha size="mini" ></el-color-picker>
</template>
<script>
  export default {
    name:"PropertyEditor-color",
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
    
  }
</script>

<style scoped>

</style>