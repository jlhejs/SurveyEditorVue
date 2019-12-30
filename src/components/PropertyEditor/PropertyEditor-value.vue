<template>
  <div>PropertyEditor-value</div>
</template>
<script>
  export default {
    name:"PropertyEditor-value",
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