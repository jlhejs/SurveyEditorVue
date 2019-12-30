<template>
  <div>PropertyEditor-matrixdropdowncolumns</div>
</template>
<script>
  export default {
    name:"PropertyEditor-matrixdropdowncolumns",
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