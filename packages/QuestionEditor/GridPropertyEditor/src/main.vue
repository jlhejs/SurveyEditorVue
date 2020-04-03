<template>
 <div>
   {{test}}
 </div>
</template>
<script>
export default {
  name:"GridPropertyEditor",
  componentName: 'GridPropertyEditor',
  data: () => ({
    test:"GridPropertyEditor"
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