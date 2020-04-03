<template>
 <div>
   {{test}}
 </div>
</template>
<script>
export default {
  name:"SurveyLiveTab",
  componentName: 'SurveyLiveTab',
  data: () => ({
    test:"SurveyLiveTab"
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