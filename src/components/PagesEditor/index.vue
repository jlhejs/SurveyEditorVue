<template>
  <div id="editor-pageseditor">
    PagesEditor 
  </div>
</template>
<script>
  export default {
    name:"PagesEditor",
    props: {
       editor: {
        type: Object,
        required: true
      }
    },
  }
</script>