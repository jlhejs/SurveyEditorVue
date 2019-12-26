<template>
  <div class="Theme">
    <HelloWorld msg="Welcome to Theme"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Theme',
  components: {
    HelloWorld
  },
  created () {
  }
}
</script>
