<template>
  <div id="editor-pageseditor">
    <el-tabs class="page-editor">
      <template v-for="item in editor.pages">
        <el-tab-pane label="用户管理" >
          <span slot="label" class="page-item">用户管理<i class="el-icon-close page-del" ></i></span>
          <span style="display: none;"></span>
        </el-tab-pane>
      </template>
      
    </el-tabs>
    <span @click="editor.addPage" class="page-add">+</span>
    {{editor.pages}}
    <div class="svd-page-selector svd_custom_select svd-light-bg-color svd-light-border-color">
      <select onmousewheel="return false;" data-bind="options: pagesSelection, value: pageSelection, optionsText: getDisplayText"></select>
    </div>
    <div tabindex="0" class="svd-page-scroller-arrow" data-bind="key2click, clickNoFocus: moveLeft, attr: {title: getLocString('ed.moveLeft')}">
        <span>
           
        </span>
    </div>

    <div class="svd-pages" data-bind="sortable: {foreach: editor.pages, options: sortableOptions}, event: {wheel: onWheel}">
        <div tabindex="0" class="svd-page svd-light-border-color" data-bind="key2click, css: $parent.getPageClass($data), clickNoFocus: $parent.onPageClick">
            <span class="svd-page-name" data-bind="text: $parent.getDisplayText($data)"></span>
            <span class="svd-page-actions-container">
                <!-- ko ifnot: $parent.readOnly -->
                <div style="position: static">
                    <div class="svd-page-actions svd-dark-border-color svd-light-bg-color" data-bind="visible: $parent.showActions($data)">
                        <span class="svd-page-action" data-bind="click: function(model, event) {$parent.showPageSettings($data); event.stopPropagation();}, attr: {title: $parent.getLocString('ed.editPage')}">
                            <span>
                            </span>
                            <span class="svd-main-color" data-bind="text: $parent.getLocString('ed.edit')"></span>
                        </span>
                        <span class="svd-page-action" data-bind="click: function(model, event) {$parent.deletePage($data); event.stopPropagation();}, attr: {title: $parent.getLocString('ed.deletePage')}, visible: !$parent.isLastPage()">
                        </span>
                        <span class="svda_action_separator svd-dark-border-color" data-bind="visible: !$parent.isLastPage()"></span>
                        <span class="svd-page-action" data-bind="click: function(model, event) {$parent.copyPage($data); event.stopPropagation();}, attr: {title: $parent.getLocString('survey.Copy')}">
                        </span>
                    </div>
                </div>
                <!-- /ko -->
            </span>
        </div>
    </div>
    <div tabindex="0" class="svd-page-scroller-arrow" data-bind="key2click, clickNoFocus: moveRight, attr: {title: getLocString('ed.moveRight')}">
        <span>
        </span>
    </div>
    <!-- ko ifnot: readOnly -->
    <div tabindex="0" class="svd-page-add" data-bind="key2click, clickNoFocus: addPage, attr: {title: getLocString('ed.addNewPage')}">
        <span>
        </span>
    </div>
    <!-- /ko -->
    </div>
</template>
<script>
  export default {
    name:"PagesEditor",
    props: {
       editor: {
        type: Object,
        required: true
      }
    },
    updated() {
      console.log(this.editor)
    },
  }
</script>