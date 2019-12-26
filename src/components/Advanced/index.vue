<template>
  <div class="editor-advanced">
    <el-row class="editor-advanced-selector">
      <el-col :span="20">
        <el-select v-model="value" size="mini" placeholder="编辑" id="object-elector">
          <el-option
            v-for="(item,key) in option"
            :key="key"
            :label="item.text"
            :value="item.id">
            <span style="float: left">{{ item.text }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.id}}</span>
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4"> <el-button type="text" size="mini" icon="el-icon-edit" @click.native="editor.editCurrentObject">编辑</el-button></el-col>
    </el-row> 
    <el-divider class="editor-advanced-divider"></el-divider>
    
    <el-row class="seditor-advanced-editor">
      <template v-for="(item,key) in editor.selectedObjectEditor.koProperties">
        <el-col :span="24" class="propertys" :key="key">
          <el-col :span="14" :title="item.displayName" class="displayname" >{{item.displayName}}</el-col>
          <el-col :span="10" class="displayname-edit">
            
            <el-switch
            size="mini"
              v-if="item.editorTypeTemplate=='boolean'"
              v-model="item.value"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>

            <el-input v-else-if="item.editorTypeTemplate=='number'" v-model="item.value" size="mini" type="number" :placeholder="item.defaultValue"></el-input>

            <span v-else-if="item.editorTypeTemplate=='html'">
              <el-input
              size="mini"
              :placeholder="item.defaultValue"
              :value="item.value">
              <i slot="suffix" class="el-input__icon el-icon-edit"   @click="item.editor.onShowModal">
              </i>
            </el-input>
            <PropertyEditorModal :modal="item.editor"></PropertyEditorModal>
            </span>
            

            
            <el-input
              v-else-if="item.editorTypeTemplate=='text'"
              size="mini"
              :placeholder="item.defaultValue"
              v-model="item.value">
              
            </el-input>
            <el-input v-else-if="item.editorTypeTemplate=='html'" v-model="item.value" size="mini"  placeholder="item.defaultValue"></el-input>
            
        
            <el-badge :value="1" class="item"  v-else-if="item.editorTypeTemplate=='triggers'"  size="mini" >
              <el-button size="mini">数量<span>{{1}}</span></el-button>
            </el-badge>
            <el-select size="mini" v-model="item.value" :placeholder="item.defaultValue" v-else-if="item.editorTypeTemplate=='dropdown'">
              <el-option
                v-for="(item,key) in item.editor.koChoices"
                :key="key"
                :label="item.text"
                :value="item.value">
              </el-option>
            </el-select>

            <div v-else>
              {{item.editorTypeTemplate}}
            </div>
            
          
          </el-col>
        </el-col>

      </template>
    </el-row>
  </div>
</template>
<script>
  export default {
    name:"Advanced",
    props: {
      editor: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        value:""
      }
    },
    updated() {
      
    },
    computed: {
      "option":function(){
        for(var i=0;i<this.editor.objects.length;i++){
          this.editor.objects[i].id=Math.random().toString(36).substr(2);
        }
        return this.editor.objects
      }
    },
  }
</script>
<style scoped>
  .editor-advanced{
    height: 100%;
  }
  #object-elector{

  }
  .editor-advanced-selector{
    padding: 10px 15px;
  }
  .editor-advanced-divider{
    margin: 0;
  }
  .seditor-advanced-editor{
    overflow-x: hidden;
    height: calc(100% - 50px);
    overflow-y: scroll;
    padding: 0 15px;
  }
  .propertys{
    padding: 5px 0;
  }
  .displayname{
    white-space: nowrap;
    overflow: hidden;
    font-size: 14px;
    line-height: 28px;
    text-overflow: ellipsis;

  }
  .displayname-edit{
    font-size: 14px;
  }
  .displayname-edit>div{
    float: left;
  }
</style>