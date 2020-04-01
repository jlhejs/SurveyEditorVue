<template>
  <div id="editor-pages-editor" class="editor-pages-editor">
    <el-row>
      <el-col :span="22">  
        <el-tabs class="page-editor" v-model="PagesEditor.selectedPageIndex" >
            <el-tab-pane label="item.name" :name="key+''" :key="key" v-for="(item,key) in editor.pages"  style="    background: red;">
               <el-dropdown trigger="hover" size="mini" slot="label" style="width: 100%;"  @click.native ="PagesEditor.onPageClick(item)">
                <span class="el-dropdown-link handle" >
                  {{item.name}}
                </span>
                <el-dropdown-menu slot="dropdown" >
                  <el-dropdown-item icon="el-icon-edit" @click.native ="PagesEditor.showPageSettings(item)">编辑</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-circle-plus" @click.native ="PagesEditor.deletePage" v-if="!PagesEditor.isLastPage()">删除</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-circle-plus-outline" @click.native ="PagesEditor.copyPage(item)">复制</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <span style="display: none;"></span>
            </el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span="2">
      {{PagesEditor.selectedPageIndex}}
        <i class="el-icon-plus pages-add" :title="editor.getLocString('ed.addNewPage')" @click="editor.addPage"></i>
      </el-col>
    </el-row>
    {{editor.text}}
  </div>
</template>
<script>
  import { PagesEditor } from "@/js/pagesEditor.ts";
  import Sortable from 'sortablejs'
  export default {
    name:"PagesEditor",
    props: {
       editor: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        myarr:[1,2,3,4,5,6,7,8],
        PagesEditor: new PagesEditor(this.editor, "editor-pages-editor")
      }
    },
    mounted() {
     this.rowDrop();   //行拖拽效果
    },

    methods: {
      rowDrop:function (param) { 
        // const el= document.querySelector(".el-tabs__nav");
        // const _this = this;
        // console.log(_this.PagesEditor.sortableOptions)
        // Sortable.create(el, _this.PagesEditor.sortableOptions)
      },
      clickAdd:function(){
        var div = document.createElement('div');
      div.innerHTML = `<div v-for="item in 10">{{item}}</div>`;
      
      document.getElementById('editor-pages-editor').appendChild(div)
      }
    },
    updated() {
      
      
    },
    computed: {
      "PagesEditor.pagesSelection"(){
        debugger
        return this.PagesEditor.computedPagesEditorPagesSelection()
      }
    },
    watch: {
      "editor.selectedObject"(newVal,oldValue) {
        return this.PagesEditor.watchEditorSelectedObject(newVal,oldValue)
      }
    }
  }
</script>
<style scoped>
.pages-add{
  line-height: 40px;
  width:40px;
  cursor: pointer;
  text-align:center
}
.pages-add:hover{
  color: #409EFF;
}
</style>