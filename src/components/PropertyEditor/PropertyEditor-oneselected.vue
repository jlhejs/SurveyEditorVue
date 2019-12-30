<template>
  <div>PropertyEditor-oneselected</div>
</template>
<script>
  export default {
    name:"PropertyEditor-oneselected",
    props: {
      modal:{
        type:Object,
        required: false,
      }
      
    },
    data() {
      return {
        modalfalse:false
      }
    },
    updated() {
    },
  }
</script>

<style scoped>

</style>