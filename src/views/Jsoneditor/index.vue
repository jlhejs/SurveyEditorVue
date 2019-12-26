<template>
  <div class="Jsoneditor">
    <HelloWorld msg="Welcome to Jsoneditor"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Jsoneditor',
  components: {
    HelloWorld
  },
  created () {
  }
}
</script>
