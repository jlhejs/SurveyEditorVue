<template>
   <el-select v-model="property.value" @change="valueChanged" size="mini"  placeholder="请选择" >
    <el-option
      v-for="item in property.editor.choices"
      :key="item.value"
      :label="item.text"
      :value="item.value">
    </el-option>
  </el-select>
</template>
<script>
  export default {
    name:"PropertyEditor-dropdown",
    props: {
      property:{
        type:Object,
        required: false,
      }
      
    },
    data() {
      return {
        modalfalse:false
      }
    },
    created() {
      
    },
    methods: {
      valueChanged:function(){
        this.property.editor.onValueChanged(this.property.value)
      }
    },
  }
</script>

<style scoped>

</style>