<template>
  <div>
    <Toolbar :editor="editor"></Toolbar>
    <PagesEditor :editor="editor"></PagesEditor>
    <Main :editor="editor" ></Main>
    <QuestionEditor :editor="editor"></QuestionEditor>
    {{editor.text}}
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
    updated() {
     
    },
  }
</script>
<style>

</style>