<template>
  <el-container class="survey-editor">
    <el-aside width="320px" class="nav left">
      <Toolbox v-if="editor.showToolbox" :editor="editor"></Toolbox>
    </el-aside>
    <el-container>
      <el-main>
        <Main></Main>
      </el-main>
    </el-container>
    <el-aside width="300px" class="nav right">
      <Properties :editor="editor"></Properties>
    </el-aside>
  </el-container>
</template>
<script>
  import { Component, Vue } from 'vue-property-decorator';
  import Toolbox from './Toolbox'
  import Properties from './Properties'
  import Main from './Main'

  @Component({
    name: "Editor",
    props: {
      editor: {
        required: true,
        type: Object,
      },
    },
    components: {
      Toolbox,
      Properties,
      Main
    },

  })
  export default class Editor extends Vue {

    data() {
      return {
      }
    }
    created() {
    }
  }
</script>
<style scoped>
</style>