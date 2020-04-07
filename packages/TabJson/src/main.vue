<template>
 <div>
   {{test}}
 </div>
</template>
<script>
export default {
  name:"TabJson",
  componentName: 'TabJson',
  data: () => ({
    test:"TabJson"
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