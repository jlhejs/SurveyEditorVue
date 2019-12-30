<template>
  <div>PropertyEditor-triggers</div>
</template>
<script>
  export default {
    name:"PropertyEditor-triggers",
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