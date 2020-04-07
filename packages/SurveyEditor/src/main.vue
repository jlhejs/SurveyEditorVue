<template>
  <div>
    {{test}}
    {{level}}
  </div>
 </template>
 <script>
 export default {
   name:"SurveyEditor",
   componentName: 'SurveyEditor',
   props: {
      level: ""
    },
   data: () => ({
     test:"SurveyEditor"
   }),
   computed: {
     computedTest () {
     }
   },
   methods: {
     methodsTest (params) {
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