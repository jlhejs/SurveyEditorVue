<template>
  <div class="template-logic">
    <template v-if="editor.logic.mode == 'view' ">
      <el-button size="small" type="primary" icon="el-icon-plus" @click="editor.logic.koAddNew">{{editor.getLocString('pe.addNew')}}</el-button>
      <el-collapse accordion class="logic-items" v-if="editor.logic.koItems.length>0">
        <el-collapse-item v-for="item in editor.logic.koItems" class="logic-item">
          <template slot="title">
            <el-button size="mini" type="text" icon="el-icon-edit" class="edit-text" v-if="!item.isReadOnly" @click.stop="item.edit">{{item.editText}}</el-button>
            <el-button type="text" icon="el-icon-delete"  @click.stop="item.remove"></el-button>
            {{item.title}}
          </template>
          <div>{{item.expressionText}}</div>
          <div v-for="item in item.koOperations">
            {{item.text}}
          </div>
        </el-collapse-item>
      </el-collapse>
    </template>

    <template v-if="editor.logic.mode == 'new' || editor.logic.mode== 'edit'">
      <el-button size="small" type="primary"  @click="editor.logic.koSaveAndShowView">{{editor.getLocString('pe.saveAndBack')}}</el-button>
      <el-button size="small" type="primary"  @click="editor.logic.koSaveEditableItem">{{editor.getLocString('pe.save')}}</el-button>
      <el-button size="small" type="primary"  @click="editor.logic.koShowView">{{editor.getLocString('pe.back')}}</el-button>
      <PropertyEditor-error :data="editor.logic"></PropertyEditor-error>
      <PropertyEditor :data="editor.logic.expressionEditor"></PropertyEditor>  
      <template v-if="editor.logic.koEditableItem != null">
        <div v-for="(item,index) in editor.logic.koEditableItem.koOperations">
          <template v-if="item.templateObject!== null">
            <el-alert
            type="info"
            :closable="false">
            <el-button type="text" icon="el-icon-delete" @click.stop="editor.logic.koRemoveOperation(item)"></el-button>{{item.name}}
          </el-alert>
          {{item.template}}
            <component :is="item.template" v-model="item.templateObject"></component>
          </template>
        </div>
      </template>
      <el-alert
        :title="editor.logic.addNewOperationText"
        type="info"
        :closable="false">
      </el-alert>
      <div class="logic-types-items">
        <el-popover
          v-for="item in editor.logic.koLogicTypes"
          :key="item.name"
          v-if="item.koVisible"
          :class="['logic-types-item', item.name]"
          placement="bottom-end"
          :title="item.displayName"
          width="200"
          trigger="hover"
          :content="item.description">
          <el-button slot="reference" size="small" @click="editor.logic.koAddNewOperation(item)">{{item.displayName}}</el-button>
        </el-popover>
      </div>     
    </template>    
  </div>
</template>
<script>
  import {Survey} from 'survey-vue'
  export default {
    name:"TemplateLogic",
    props: {
      editor: {
        type: Object,
        required: true
      }
    },
    components:{

     
    },
    methods:{
     
    },
    data() {
      return {
      }
    },
    updated() {
      console.log(this.editor.logic)
    },
    computed: {
      showDialog:function(){
        return this.editor.surveyLive.hasFrame()
      },
    }
  }
</script>
<style scoped>
  .template-logic{
    height: calc(100vh - 40px);
    padding: 20px;
  }
</style>