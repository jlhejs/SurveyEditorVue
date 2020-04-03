<template>
 <div>
   {{test}}
 </div>
</template>
<script>
export default {
  name:"ToolbarState",
  componentName: 'ToolbarState',
  data: () => ({
    test:"ToolbarState"
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