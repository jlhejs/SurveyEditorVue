<template>
 <div>
  <label v-if="data.showDisplayNameOnTop">{{data.displayName}}</label>
  <PropertyEditor-error :data="data"></PropertyEditor-error>
  <component :is="data.contentTemplateName" :data="data"></component>
 </div>
</template>
<script>
  export default {
    name:"PropertyEditor",
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
      console.log(this.data)
    },
  }
</script>

<style scoped>

</style>