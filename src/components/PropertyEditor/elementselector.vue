<template>
  <span>
    elementselector
  </span>
 
</template>
<script>
  export default {
    name:"elementselector",
    props: {
      data:{
        type:Object,
        required: true,
      }
      
    },
    data() {
      return {
      }
    },
    updated() {
      console.log(this)
    },
    methods: {
    },
  }
</script>

<style scoped>

</style>