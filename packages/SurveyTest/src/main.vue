<template>
 <div>
   {{test}}
 </div>
</template>
<script>
export default {
  name:"SurveyTest",
  componentName: 'SurveyTest',
  data: () => ({
    test:"SurveyTest"
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