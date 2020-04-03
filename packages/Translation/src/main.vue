<template>
 <div>
   {{test}}
 </div>
</template>
<script>
export default {
  name:"Translation",
  componentName: 'Translation',
  data: () => ({
    test:"Translation"
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