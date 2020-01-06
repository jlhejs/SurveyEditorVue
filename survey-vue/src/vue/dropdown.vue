<template>
  <div :class="question.cssClasses.root">
    <div  :class="question.cssClasses.selectWrapper">
      <el-select
      v-model="question.renderedValue" 
      :disabled="question.isReadOnly"
      :id="question.inputId" 
      placeholder="请选择"  
      :class="question.cssClasses.control" 
      v-bind:aria-label="question.locTitle.renderedHtml"
      :filterable="showFilterable()"
      :size="showInputSize()"
      :allowCreate="showAllowCreate()"
      :multiple="showMultiple()"
      :style="{ width: (question.inputWidth)+'px'}"
      :clearable="showClearable()">
        <el-option
        v-if="question.showOptionsCaption" :value="undefined" :label="question.optionsCaption">
        </el-option>
        <el-option
        v-for="item in question.visibleChoices"
        :value="item.value"
        :key="item.value"
        :label="item.text"
        :disabled="!item.isEnabled">
        </el-option>
      </el-select>
     
    </div>
    <span  v-if="isOtherSelected"
    :class="question.cssClasses.control">
    {{isOtherSelected ? question.otherText : question.displayValue}}
    <survey-other-choice v-show="isOtherSelected" :question="question" />
    </span>
    
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { default as QuestionVue } from "./question";
import { QuestionDropdownModel } from "../question_dropdown";

@Component
export class Dropdown extends QuestionVue<QuestionDropdownModel> {
  showFilterable(){
    return this.question.filterable
  }
  showClearable(){
    return this.question.clearable
  }
  showInputSize(){
    return this.question.inputSize
  }
  showAllowCreate(){
    return this.question.filterable&&this.question.allowCreate
  }
  showMultiple(){
    return this.question.multiple
  }
  get isOtherSelected() {
    
    const question = this.question;
    return question.hasOther && question.isOtherSelected;
  }
}
Vue.component("survey-dropdown", Dropdown);
export default Dropdown;
</script>
