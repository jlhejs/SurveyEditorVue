<template>
  <span>
    {{property.value}}
      <el-input v-model="property.value" @change="valueChanged" placeholder="pertyEditor-text" size="mini">
         <i
        class="el-icon-edit el-input__icon"
        slot="suffix"
        @click="dialogVisible = true">
      </i>
      </el-input>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      >
      {{property.value}}
      <QuillEditor  @change="valueChanged" :value="property.value"></QuillEditor>
    </el-dialog> 
  </span>
</template>
<script>
  export default {
    name:"PropertyEditor-html",
    props: {
      property:{
        type:Object,
        required: true,
      }
      
    },
    data() {
      return {
        dialogVisible: false
      }
    },
    updated() {
    },
    methods: {
      valueChanged:function(value){
         this.property.value=value
        this.property.editor.onValueChanged(value)
      }
    },
  }
</script>

<style scoped>

</style>