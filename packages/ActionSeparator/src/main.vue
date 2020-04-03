<template>
 <div>
   {{test}}
 </div>
</template>
<script>
export default {
  name:"ActionSeparator",
  componentName: 'ActionSeparator',
  data: () => ({
    test:"ActionSeparator"
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