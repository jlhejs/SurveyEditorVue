<template>
 <div>
   {{test}}
 </div>
</template>
<script>
export default {
  name:"ToolbarOptions",
  componentName: 'ToolbarOptions',
  data: () => ({
    test:"ToolbarOptions"
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