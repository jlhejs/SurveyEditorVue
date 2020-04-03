<template>
 <div>
   {{test}}
 </div>
</template>
<script>
export default {
  name:"PropertyEditor",
  componentName: 'PropertyEditor',
  data: () => ({
    test:"PropertyEditor"
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