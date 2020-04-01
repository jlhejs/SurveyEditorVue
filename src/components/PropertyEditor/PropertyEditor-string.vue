<template>
  <el-input v-model="property.value" @change="property.editor.onValueChanged(property.value)" placeholder="请输入" size="mini"  :disabled="property.disabled" max="100"></el-input>
</template>
<script>
  export default {
    name:"PropertyEditor-string",
    props: {
      property:{
        type:Object,
        required: true,
      }
      
    },
    methods: {
    },
  }
</script>

<style scoped>

</style>