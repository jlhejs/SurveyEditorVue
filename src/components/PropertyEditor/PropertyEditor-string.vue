<template>
  <el-input v-model="property.value" @change="valueChanged" placeholder="请输入内容string" size="mini"  :disabled="property.disabled" max="100"></el-input>
</span>
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
    data() {
      return {
      }
    },
    created() {
    },
    methods: {
      valueChanged:function(){
        debugger
        this.property.editor.onValueChanged(this.property.value)
      }
    },
  }
</script>

<style scoped>

</style>