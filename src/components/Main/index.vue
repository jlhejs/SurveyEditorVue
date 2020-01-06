<template>
    <div id="editor-main">

      <QuillEditor content="qwer"></QuillEditor>
    </div>
</template>
<script>
    export default {
      name:"Main",
      props: {
        editor: {
          required: true,
          type: Object,
        }
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
