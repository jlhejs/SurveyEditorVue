<template>
 <div>
   {{test}}
 </div>
</template>
<script>
export default {
  name:"PropertyEditorValue",
  componentName: 'PropertyEditorValue',
  data: () => ({
    test:"PropertyEditorValue"
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