<template>
 <div>
   {{test}}
 </div>
</template>
<script>
export default {
  name:"Jsoneditor",
  componentName: 'Jsoneditor',
  data: () => ({
    test:"Jsoneditor"
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