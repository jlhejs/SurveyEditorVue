<template>
 <div>
   {{test}}
 </div>
</template>
<script>
export default {
  name:"PropertyEditorExpressionContent",
  componentName: 'PropertyEditorExpressionContent',
  data: () => ({
    test:"PropertyEditorExpressionContent"
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