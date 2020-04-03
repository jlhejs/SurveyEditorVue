<template>
 <div>
   {{test}}
 </div>
</template>
<script>
export default {
  name:"TranslationGroup",
  componentName: 'TranslationGroup',
  data: () => ({
    test:"TranslationGroup"
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