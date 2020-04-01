<template>
  <div>
    <div v-html="data.koHtmlTop">{{data.koHtmlTop}}</div>
    <!-- ko template: { name: 'propertyeditorcontent-' + editorTypeTemplate, data: $data, afterRender: $data.koAfterRender } -->
    <!-- /ko -->
    <component :is="'PropertyEditor-' +data.editorTypeTemplate+'Content'" :data="data"></component>

    <div v-html="data.koHtmlBottom"></div>
   
  </div>
</template>
<script>
  export default {
    name:"PropertyEditor-modalContent",
    props: {
      data:{
        type:Object,
        required: false,
      }
      
    },
    data() {
      return {
      }
    },
    created() {
    
    },
   methods: {}
  }
</script>

<style scoped>

</style>