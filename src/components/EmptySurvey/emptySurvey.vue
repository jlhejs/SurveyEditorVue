<template>
<div class="empty-survey">
  <transition name="el-zoom-in-top">
    <div class="transition-box" v-html="editor.getLocString('survey.dropQuestion')"></div>
  </transition>
</div>
</template>
<script>
  export default {
    name:"emptySurvey",
    props: {
      editor:{
        required: true,
        type: Object
      }
    },
    data:function(){
      return {
      }
    },
    methods: {
      handleSelect(key, keyPath) {

      }
    },
    created() {
     
    },
    computed: {
    
    }
  }
</script>
<style scoped>
.empty-survey{
  height: 70vh;
}
.empty-survey>div{
    margin: 50px auto;
    font-size: 22px;
    pointer-events: none;
    text-align: center;
    max-width: 300px;
}
</style>