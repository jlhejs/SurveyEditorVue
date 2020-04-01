<template>
  <!-- <QuillEditor v-model="value.value" @change="valueChanged"></QuillEditor> -->
  <el-input v-model="property.value" @change="valueChanged" placeholder="pertyEditor-text" size="mini" type="number" :disabled="property.disabled" max="100"></el-input>
</template>
<script>
  export default {
    name:"PropertyEditor-textContent",
    props: {
      value:{
        type:Object,
        required: false,
      }
      
    },
    data() {
      return {
      }
    },
    updated() {
      // debugger
      console.log(this.value)
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