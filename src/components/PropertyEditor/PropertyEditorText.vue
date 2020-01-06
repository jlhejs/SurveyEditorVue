<template>
<PropertyEditor-modal v-model="property" @change="valueChanged"></PropertyEditor-modal>
</template>
<script>
  export default {
    name:"PropertyEditor-text",
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
      // console.log(this.property.editorTypeTemplate,this.property)
    },
    methods: {
      valueChanged:function(){
        debugger
        this.property.editor.onValueChanged(this.property.value)
      }
    },
    watch: {
      "property.value":function(newValue,oldValue){
        this.property.editor.onValueChanged(newValue);
      }
    },
  }
</script>

<style scoped>

</style>