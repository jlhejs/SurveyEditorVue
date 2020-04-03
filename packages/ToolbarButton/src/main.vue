<template>
 <div>
   {{test}}
 </div>
</template>
<script>
export default {
  name:"ToolbarButton",
  componentName: 'ToolbarButton',
  data: () => ({
    test:"ToolbarButton"
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