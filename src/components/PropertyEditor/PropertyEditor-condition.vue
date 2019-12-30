<template>
  <PropertyEditor-modal :property="property"></PropertyEditor-modal>
</template>
<script>
  export default {
    name:"PropertyEditor-condition",
    props: {
      property:{
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