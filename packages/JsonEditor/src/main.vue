<template>
 <div>
   {{test}}
 </div>
</template>
<script>
export default {
  name:"JsonEditor",
  componentName: 'JsonEditor',
  data: () => ({
    test:"JsonEditor"
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