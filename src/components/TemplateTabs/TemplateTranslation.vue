<template>
 <span>父组件的值：{{syy}}
<testsyy v-model="syy" :value="syy"></testsyy>
<input type="text" v-model="syy.name">

 </span>
</template>
<script>
  import {Survey} from 'survey-vue'
  export default {
    name:"TemplateTranslation",
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
        syy:new Object({})
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