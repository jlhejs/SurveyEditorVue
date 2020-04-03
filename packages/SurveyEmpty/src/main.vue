<template>
 <div>
   {{test}}
 </div>
</template>
<script>
export default {
  name:"SurveyEmpty",
  componentName: 'SurveyEmpty',
  data: () => ({
    test:"SurveyEmpty"
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