<template>
 <div>
   {{test}}
 </div>
</template>
<script>
export default {
  name:"DesignerContainer",
  componentName: 'DesignerContainer',
  data: () => ({
    test:"DesignerContainer"
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