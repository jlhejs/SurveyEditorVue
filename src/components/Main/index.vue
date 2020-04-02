<template>
    <div id="editor-main">
      <transition name="el-zoom-in-top">
        <Survey :survey="editor.survey" v-show="!editor.isCurrentPageEmpty()"></Survey>
      </transition>
      <transition name="el-zoom-in-top">
        <emptySurvey :editor="editor" v-show="editor.isCurrentPageEmpty()"></emptySurvey>
      </transition>
    </div>
</template>
<script>
  import {Survey} from 'survey-vue'
    export default {
      name:"Main",
      props: {
        editor: {
          required: true,
          type: Object,
        }
      },
      components: {
        Survey
      },
      data() {
        return {
          onLine: navigator.onLine,
        }
      },
      created() {
        window.addEventListener('offline', function(){
        // 网络由正常常到异常时触发
        });
      },
      methods:{
        updateOnlineStatus(e) {
          const { type } = e;
          this.onLine = type === 'online';
        },
      },
      mounted:function(){
        window.addEventListener('online',  this.updateOnlineStatus);
        window.addEventListener('offline', this.updateOnlineStatus);
      },    
      
    }
  </script>
