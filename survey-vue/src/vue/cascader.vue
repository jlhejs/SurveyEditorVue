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
     var options=[{
           value: 1,
           label: '东南',
           children: [{
             value: 2,
             label: '上海',
             children: [
               { value: 3, label: '普陀' },
               { value: 4, label: '黄埔' },
               { value: 5, label: '徐汇' }
             ]
           }, {
             value: 7,
             label: '江苏',
             children: [
               { value: 3, label: '南京' },
               { value: 9, label: '苏州' },
               { value: 10, label: '无锡' }
             ]
           }, {
             value: 12,
             label: '浙江',
             children: [
               { value: 13, label: '杭州' },
               { value: 14, label: '宁波' },
               { value: 15, label: '嘉兴' }
             ]
           }]
         }, {
           value: 17,
           label: '西北',
           children: [{
             value: 18,
             label: '陕西',
             children: [
               { value: 19, label: '西安' },
               { value: 20, label: '延安' }
             ]
           }, {
             value: 21,
             label: '新疆维吾尔族自治区',
             children: [
               { value: 22, label: '乌鲁木齐' },
               { value: 23, label: '克拉玛依' }
             ]
           }]
         }]
    // for(var i=0;i<this.question.visibleChoices.length;i++){
    //   options.push({
    //     value:this.question.visibleChoices[i].value,
    //     label: this.question.visibleChoices[i].text,
    //   })
    // }
      
    return options
  }
}
Vue.component("survey-cascader", Cascader);
export default Cascader;
</script>
