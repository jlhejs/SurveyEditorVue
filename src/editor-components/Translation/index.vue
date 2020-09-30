<!-- by sunyy -->
<template>
  <div>Translation</div>
</template>

<script>
// import { listStoreManage } from '@/api/user'

export default {
  name: 'Translation',
  components: {
  },
  props: {
    value: {
      type: [String, Number],
      required: false,
      default: 100
    }
  },
  data() {
    return {
    }
  },
  // 计算属性
  computed: {},

  // watch
  watch: {},

  // 创建完成（可以访问当前this实例）
  created() {},

  // 挂载完成（可以访问DOM元素）
  mounted() {},

  // 创建之前
  beforeCreate() {},

  // 挂载之前
  beforeMount() {},
  // 更新之前
  beforeUpdate() {},

  // 更新之后
  updated() {},

  // 销毁之前
  beforeDestroy() {},

  // 销毁完成
  destroyed() {},

  // 如果页面有keep-alive缓存功能，这个函数会触发
  activated() {},

  // 方法集合
  methods: {}
}
</script>

<style lang='scss'>
</style>
<style lang='scss' scoped>
// @import url(s); 引入公共css类
</style>
