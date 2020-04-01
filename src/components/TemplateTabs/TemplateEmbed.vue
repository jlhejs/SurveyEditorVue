<template>
 <span>TemplateEmbed111111111</span>
</template>
<script>
  import {Survey} from 'survey-vue'
  export default {
    name:"TemplateEmbed",
    props: {
      editor: {
        type: Object,
        required: true
      }
    },
    components:{
     
    },
    methods:{
     
    },
    data() {
      return {
      }
    },
    updated() {
    },
    computed: {
      showDialog:function(){
        return this.editor.surveyLive.hasFrame()
      },
    }
  }
</script>
<style scoped>
  a{}
</style>