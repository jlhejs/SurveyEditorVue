<template>
 <div>
   {{test}}
 </div>
</template>
<script>
export default {
  name:"PropertyEditorNestedContent",
  componentName: 'PropertyEditorNestedContent',
  data: () => ({
    test:"PropertyEditorNestedContent"
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