<template>
  <div>PropertyEditor-textitems</div>
</template>
<script>
  export default {
    name:"PropertyEditor-textitems",
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