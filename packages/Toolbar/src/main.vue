<template>
 <div>
   {{test}}
 </div>
</template>
<script>
export default {
  name:"Toolbar",
  componentName: 'Toolbar',
  data: () => ({
    test:"Toolbar"
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