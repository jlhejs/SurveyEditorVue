<template>
 <div>
   {{test}}
 </div>
</template>
<script>
export default {
  name:"PropertyEditorCustomContent",
  componentName: 'PropertyEditorCustomContent',
  data: () => ({
    test:"PropertyEditorCustomContent"
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