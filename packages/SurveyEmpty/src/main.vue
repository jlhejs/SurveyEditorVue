<template>
  <div>
    {{test}}
    <h3>标签管理</h3>
    <!-- 放置tag的容器，从网络获取的tags都要放在这个div里面 -->
    <div ref="tagsContext">
        <div v-if="!tags">标签加载中...</div>
        <div v-else-if="tags && tags.length === 0">没有标签</div>
    </div>
    <button @click="addTag">添加标签</button>
  </div>
 </template>
 <script>
 import Util from './Util';
 
 export default {
   name:"SurveyEmpty",
   componentName: 'SurveyEmpty',
   data: () => ({
     test:"SurveyEmpty",
     tags:[]
   }),
   computed: {
     computedTest () {
     }
   },
   methods: {
      // 添加tag
      addTag() {
        let tagText = "标签" + this.tags.length;
        this.tags.push(tagText);
        this.initTagComponentAndShowTag(tagText);
       },// 有tag被删除
      onTagDelete(tag) {
        // 从数组中移除。
        this.tags.splice(this.tags.indexOf(tag), 1);
     },
     initTagComponentAndShowTag (tagText) {
         let tag = Util.newTag(tagText);
         // 添加删除监听
         tag.$on("delete", this.onTagDelete);
         // 挂载组件，即创建虚拟dom。
         tag.$mount();
         // 将组件添加到显示tag的div里面
         this.$refs.tagsContext.appendChild(tag.$el);
     }
   },
   watch: {
     watchTest (val) {
     }
   }
 }
 </script>
 
 <style scoped>
   .style-test{
     font-size: 16px;
   }
   </style>