<template>
<span>
 
  <el-input v-model="property.value" @change="valueChanged" placeholder="请输入内容" size="mini" type="number" :disabled="property.disabled" max="100"></el-input>
</span>
</template>
<script>
  export default {
    name:"PropertyEditor-number",
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