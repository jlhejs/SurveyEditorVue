<template>
  <div class="1111111111111111111111111111">
    <Toolbar :editor="editor" class="toolbar"></Toolbar>
    <PagesEditor :editor="editor" class="pages-editor"></PagesEditor>
    <Main :editor="editor" class="main"></Main>
    <QuestionEditor :editor="editor" class="question-editor"></QuestionEditor> 
  </div>
</template>
<script>

  export default {
    name: "DesignerMain",
    props: {
      editor: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
      }
    },
    created() {
    },
    updated() {
    },
  }
</script>
<style>

</style>