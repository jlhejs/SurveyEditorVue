<template>
<el-col :span="24" class="property"  :data-property="property.name" v-if="property.koVisible">
      <el-col :span="14" :title="property.displayName" class="displayname" >{{property.displayName}}</el-col>
      <el-col :span="10" class="displayname-edit">
        <component v-bind:is="'PropertyEditor-'+property.editorTypeTemplate" :property="property"></component>
      </el-col>
    </el-col>
</template>
<script>
  import { Component, Vue } from 'vue-property-decorator';
  @Component({
    name:"ObjectEditorProperty",
    props: {
      property: {
        required: true,
        type: Object,
      },
    },
    data() {
      return {
      }
    },
    methods: {
    },
    computed: {
    },
    created() {
      // console.log(this.property.editorTypeTemplate,this.property)
    },
  })
  export default class ObjectEditorProperty extends Vue {

  }
</script>
<style scoped >
  
 .property{
    padding: 5px 0;
  }
  .displayname{
    white-space: nowrap;
    overflow: hidden;
    font-size: 14px;
    line-height: 28px;
    text-overflow: ellipsis;
  }
</style>