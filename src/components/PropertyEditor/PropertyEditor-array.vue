<template>
  <span>
   
    <el-select
    @change="valueChanged"
    v-model="property.value"
  
    multiple
    filterable
    size="mini"
    allow-create
    default-first-option
   >
   <el-option
   v-for="(item,key ) in property.editor.choices"
   :key="key"
   :label="item.value"
   :value="item.value">
 </el-option>
  </el-select>
  </span>
 
</template>
<script>
  export default {
    name:"PropertyEditor-array",
    props: {
      property:{
        type:Object,
        required: true,
      }
      
    },
    data() {
      return {
      }
    },
    updated() {
      console.log(this)
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