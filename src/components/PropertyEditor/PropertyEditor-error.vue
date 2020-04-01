<template>
  <el-alert
    v-if="data.koDisplayError"
    title="错误提示的文案"
    type="error"
    show-icon>
  </el-alert>
</template>
<script>
  export default {
    name:"PropertyEditor-error",
    props: {
      data:{
        type:Object,
        default:function(){
          return {}
        },
        required: false,
      }
      
    },
    data() {
      return {
      
      }
    },
    created() {
    },
  }
</script>

<style scoped>

</style>