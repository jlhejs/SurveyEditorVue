<template>
 <div>
   {{test}}
 </div>
</template>
<script>
export default {
  name:"ToolbarHeader",
  componentName: 'ToolbarHeader',
  data: () => ({
    test:"ToolbarHeader"
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