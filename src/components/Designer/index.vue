<template>
  <div>
    <Toolbar :editor="editor"></Toolbar>
    <PagesEditor :editor="editor"></PagesEditor>
    <Main :editor="editor" ></Main>
    <QuestionEditor :editor="editor"></QuestionEditor> 
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