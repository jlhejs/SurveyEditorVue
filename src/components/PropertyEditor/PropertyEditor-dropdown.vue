<template>
      <el-select v-model="property.editor.value" @change="valueChanged" size="mini"  placeholder="请选择"   value-key="key">
      <el-option
        v-for="(item,key) in property.editor.choices"
        :key="key"
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
       if("dropdown"==this.property.editorType&&this.property.name=="page")console.log(this.property)
      
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