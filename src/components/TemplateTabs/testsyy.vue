<template>
 <div>子组件数据:{{value}}
   <input type="text" v-model="value.name">
 </div>

</template>
<script>
  export default {
    name:"testsyy",
    model: {
      prop: 'data',
      event: 'up'
    },
    props: {
      value: {
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
     
    }
  }
</script>
<style scoped>
  a{}
</style>