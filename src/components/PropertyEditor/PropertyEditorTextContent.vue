<template>
  <QuillEditor v-model="value.value"></QuillEditor>
</template>
<script>
  export default {
    name:"PropertyEditor-textContent",
    props: {
      value:{
        type:Object,
        required: true,
      }
      
    },
    data() {
      return {
      }
    },
    updated() {
      debugger
      console.log(this.value)
    },
    methods: {
      // valueInput:function(value){
      //   debugger
      //    this.$emit('input', value)
      // }
    },
  }
</script>

<style scoped>

</style>