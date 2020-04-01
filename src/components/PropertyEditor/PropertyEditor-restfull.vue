<template>
  <div>PropertyEditor-restfull1</div>
</template>
<script>
  export default {
    name:"PropertyEditor-restfull",
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
    created()  {
      console.log(this.property)
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