<template>
 <div>
   {{test}}
 </div>
</template>
<script>
export default {
  name:"PropertyGrid",
  componentName: 'PropertyGrid',
  data: () => ({
    test:"PropertyGrid"
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