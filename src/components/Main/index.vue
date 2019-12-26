<template>
    <div id="editor-main">
      <QuillEditor></QuillEditor>
    </div>
</template>
<script>
    export default {
      name:"Main",
      props: {
        editor: {
        required: true,
        type: Object,
      },
      data() {
        return {
       
        }
      },
        
      },
    }
  </script>
