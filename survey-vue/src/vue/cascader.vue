<template>
  <fieldset :class="question.cssClasses.root">
    <legend v-bind:aria-label="question.locTitle.renderedHtml"></legend>
    <el-row :gutter="0"  >
      <el-cascader
      v-model="question.renderedValue"
      v-bind:aria-label="question.locTitle.renderedHtml"
      :filterable="question.filterable"
      :clearable="question.clearable"
      :show-all-levels="question.showAllLevels"
      :props="question.propsObj"
      :size="question.inputSize"
      @change="changeCascader"
      :collapse-tags="question.collapseTags"
      :disabled="question.isReadOnly"
      :separator="question.separator"
      :popper-class="question.cssClasses.popper"
      :options="options()"
      v-if="!question.isCascaderPanel"></el-cascader>
      
     <el-cascader-panel  
     v-model="question.renderedValue"
     v-bind:aria-label="question.locTitle.renderedHtml"
     :filterable="question.filterable"
     :clearable="question.clearable"
     :show-all-levels="question.showAllLevels"
     :props="question.propsObj"
     :size="question.inputSize"
     @change="changeCascader"
     :collapse-tags="question.collapseTags"
     :disabled="question.isReadOnly"
     :separator="question.separator"
     :popper-class="question.cssClasses.popper"
     :options="options()"
     v-else ></el-cascader-panel>
    </el-row>
  </fieldset>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import { default as QuestionVue } from "./question";
import { QuestionCascaderModel } from "../question_cascader";
var cityData = require("./cityData/cityData.json");

@Component
export class Cascader extends QuestionVue<QuestionCascaderModel> {
  getItemClass(item: any) {
    var question = this.question;
    var cssClasses = question.cssClasses;
    var isChecked = question.isItemSelected(item);
    var isDisabled = question.isReadOnly || !item.isEnabled;
    var allowHover = !isChecked && !isDisabled;
    var itemClass = cssClasses.item;
    if (!question.hasColumns) {
      itemClass +=
        question.colCount === 0
          ? " " + cssClasses.itemInline
          : " svrvey-q-col-" + question.colCount;
    }
    if (isDisabled) itemClass += " " + cssClasses.itemDisabled;
    if (isChecked) itemClass += " " + cssClasses.itemChecked;
    if (allowHover) itemClass += " " + cssClasses.itemHover;
    return itemClass;
  }
  getSpan(item: any){
    var question = this.question;
    console.log(this)
    if (question.hasColumns) {
      return question.colCount === 0? "":  Math.floor(24/question.colCount)
    }
  }
  changeCascader(){
  }
  options(){
    var options=cityData
    return options
  }
}
Vue.component("survey-cascader", Cascader);
export default Cascader;
</script>
