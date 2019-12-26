<template>
  <div >
    <!-- <div class="alert alert-danger" role="alert" data-bind="visible:koDisplayError">
        <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
        <span class="sr-only">Error:</span>
        <span data-bind="text:koErrorText"></span>
    </div> -->
     <el-alert
     v-if="koDisplayError"
      :title="koErrorText"
      type="error"
      show-icon>
  </el-alert>
  </div>
</template>
<script>
  export default {
    name:"PropertyEditorError",
    props: {
      
    },
  }
</script>