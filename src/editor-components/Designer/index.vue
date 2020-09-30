<!-- by sunyy -->
<template>
  <div>
    <Toolbox :supportedQuestions = 'editor.options.questionTypes'/>
  </div>
</template>

<script  lang="ts">
// import { listStoreManage } from '@/api/user'
import { Component, Prop, Watch, Vue } from "vue-property-decorator";
@Component
export default class Designer extends Vue {
  @Prop() public editor:  Object

}
</script>

<style lang='scss'>
</style>
<style lang='scss' scoped>
// @import url(s); 引入公共css类
</style>
