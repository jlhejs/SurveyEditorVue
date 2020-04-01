<template>
  <div :class="question.cssClasses.root">
    <label :class="itemClass">
      <!-- <span :class="getLabelClass(false)" style="font-size: 14px;padding-right: 10px;">{{question.locLabelFalse.renderedHtml}}</span> -->
      <!-- <el-checkbox
      :name="question.name"
      :id="question.inputId"
      v-model="question.checkedValue"
      :disabled="question.isReadOnly"
      v-bind:aria-required="question.isRequired"
      :aria-label="question.locTitle.renderedHtml"
      :true-label="question.valueTrue"
      :false-label="question.valueFalse" 
      :indeterminate="indeterminate()">
      <span :class="getLabelClass(true)">{{question.locLabelTrue.renderedHtml}}</span>
      </el-checkbox> -->
      <div>
        
      </div>
      
     <el-switch
      v-model="question.checkedValue"
      :id="question.inputId"
       v-bind:aria-required="question.isRequired"
      :active-value="question.valueTrue"
      :inactive-value="question.valueFalse"
      :active-text="question.locLabelTrue.renderedHtml"
      :inactive-text="question.locLabelFalse.renderedHtml">
    </el-switch>
    </label>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import { default as QuestionVue } from "./question";
import { QuestionBooleanModel } from "../question_boolean";

@Component
export class Boolean extends QuestionVue<QuestionBooleanModel> {
  get itemClass() {
    var question = this.question;
    var cssClasses = question.cssClasses;
    let isChecked = question.checkedValue;
    let isDisabled = question.isReadOnly;
    let itemClass = cssClasses.item;
    if (isDisabled) itemClass += " " + cssClasses.itemDisabled;
    if (isChecked) itemClass += " " + cssClasses.itemChecked;
    else if (isChecked === null)
      itemClass += " " + cssClasses.itemIndeterminate;
    return itemClass;
  }
  getLabelClass(checked: boolean): string {
    var question = this.question;
    var cssClasses = this.question.cssClasses;
    return (
      cssClasses.label +
      " " +
      (question.checkedValue === !checked || question.isReadOnly
        ? question.cssClasses.disabledLabel
        : "")
    );
  }
  indeterminate(){
    return this.question.checkedValue!==this.question.getValueTrue()&&this.question.checkedValue!==this.question.getValueFalse()
  }
}
Vue.component("survey-boolean", Boolean);

export default Boolean;
</script>