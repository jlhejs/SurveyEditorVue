<template>
  <div>
    QuestionEditorContent
  </div>
</template>
<script>
  export default {
    name:"QuestionEditorContent",
    props: {
      modal:{
        default:{},
        type:Object,
        required: false,
      }
      
    },
    data() {
      return {
      
      }
    },
    updated() {
      console.log(this.name)
    },
  }
</script>

<style scoped>

</style>