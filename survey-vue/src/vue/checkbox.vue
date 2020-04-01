<template>
  <fieldset :class="question.cssClasses.root">
    <legend v-bind:aria-label="question.locTitle.renderedHtml"></legend>
    <el-row :gutter="0"  >
      <el-checkbox-group v-model="question.renderedValue" :disabled="question.isReadOnly">
          <template  v-for="(item, index) in question.visibleChoices">
            <el-col tag="span" :span="getSpan(item)" :key="item.value" :class="getItemClass(item)" v-if="question.hasColumns">
              <el-checkbox :label="item.value" >{{item.text}}</el-checkbox>
            </el-col>
            <span :key="item.value" :class="getItemClass(item)"  v-else>
              <el-checkbox :label="item.value" >{{item.text}}</el-checkbox>
              <template v-if="item.value == question.otherItem.value">
                <survey-other-choice
                  v-show="question.hasOther && question.renderedValue && question.isOtherSelected"
                  :question="question"></survey-other-choice>
              </template>
            </span>
            
          </template>
          
      </el-checkbox-group>
      
    </el-row>
  </fieldset>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import { default as QuestionVue } from "./question";
import { QuestionCheckboxModel } from "../question_checkbox";

@Component
export class Checkbox extends QuestionVue<QuestionCheckboxModel> {
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
    if (question.hasColumns) {
      return question.colCount === 0? "":  Math.floor(24/question.colCount)
    }
  }
}
Vue.component("survey-checkbox", Checkbox);
export default Checkbox;
</script>
