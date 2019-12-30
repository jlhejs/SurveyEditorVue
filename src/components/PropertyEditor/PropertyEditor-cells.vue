<template>
  <div>PropertyEditor-cells</div>
</template>
<script>
  export default {
    name:"PropertyEditor-cells",
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