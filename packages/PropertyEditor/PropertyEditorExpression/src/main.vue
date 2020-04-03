<template>
 <div>
   {{test}}
 </div>
</template>
<script>
export default {
  name:"PropertyEditorExpression",
  componentName: 'PropertyEditorExpression',
  data: () => ({
    test:"PropertyEditorExpression"
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