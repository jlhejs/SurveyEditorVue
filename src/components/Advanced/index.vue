<template>
  <div :class="['editor-advanced',editor.hideAdvancedSettings ? 'hide-advanced' : '']">
    <el-row class="editor-advanced-selector">
      <el-col :span="20">
        <el-select v-model="editor.selectedObject" size="mini" placeholder="editor.selectedObject.text" id="object-elector">
          <el-option v-for="(item,key) in editor.objects" :key="key" :label="item.text" :value="item">
            <span style="float: left">{{ item.text }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.id}}</span>
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-button type="text" size="mini" icon="el-icon-edit" @click.native="editor.editCurrentObject">编辑</el-button>
      </el-col>
    </el-row>
    <el-divider class="editor-advanced-divider"></el-divider>
    <el-scrollbar class="seditor-advanced-editor">
      <el-row class="seditor-advanced-editor-box">
        <template v-for="(item,key) in editor.selectedObjectEditor.properties">
          <ObjectEditorProperty :property="item" :key="key"></ObjectEditorProperty>
        </template>
      </el-row>
    </el-scrollbar>
    <AdvancedHamburger :editor="editor" id="advanced-hamburger"></AdvancedHamburger>
  </div>
</template>
<script>
  export default {
    name: "Advanced",
    props: {
      editor: {
        type: Object,
        required: true
      }
    },
    data() {
      return {

      }
    },
    methods: {

    },
    updated() {},
    computed: {


    },
  }
</script>
<style scoped>
  .editor-advanced {
    height: 100%;
    transition: width 1s linear 2s;
    position: relative;
  }

  .hide-advanced {
    width: 0;
    transition: width 1s linear 2s;
  }

  .editor-advanced-selector {
    padding: 10px 15px;
  }

  .editor-advanced-divider {
    margin: 0;
  }

  .seditor-advanced-editor {
    height: calc(100% - 50px);
    width: 100%;
  }

  .seditor-advanced-editor-box {
    padding: 15px;
  }


  .displayname-edit {
    font-size: 14px;
  }

  .displayname-edit>div {
    float: left;
  }

  #advanced-hamburger {
    position: absolute;
    top: 0;
    left: -40px;
  }
</style>