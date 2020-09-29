<template>
  <QuillEditor v-model="value.value" @change="valueChanged"></QuillEditor>
</template>
<script>
  export default {
    name:"PropertyEditor-htmlContent",
    props: {
      value:{
        type:Object,
        required: true,
      }
      
    },
    data() {
      return {
      }
    },
    updated() {
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