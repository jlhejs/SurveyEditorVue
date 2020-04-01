<template>
  <span :class="question.cssClasses.root" id="123456789">
    <span v-for="(row, rowindex) in question.getRows()"
    :key="question.inputId + 'rowkey' + rowindex"
    :class="question.cssClasses.row">
    <template v-for="item in row">
      <span :key="'label' + item.editor.id" :class="question.cssClasses.itemTitle + ' ' + question.cssClasses.cell">
        <survey-string :locString="item.locTitle"/>
      </span>
      <span :key="item.editor.id" :css="question.cssClasses.cell">
        <survey-errors v-if="hasErrorsOnTop" :question="item.editor" :location="'top'"/>
        <component :is="getWidgetComponentName(item.editor)" :question="item.editor"/>
        <survey-errors v-if="hasErrorsOnBottom" :question="item.editor" :location="'bottom'"/>
      </span>
    </template>
    </span>
   
  </span>
  
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { default as QuestionVue } from "./question";
import { Question } from "../question";
import { QuestionMultipleTextModel } from "../question_multipletext";

@Component
export class MultipleText extends QuestionVue<QuestionMultipleTextModel> {
  getWidgetComponentName(question: Question) {
    if (question.customWidget) {
      return "survey-customwidget";
    }
    return "survey-text";
  }
  get hasErrorsOnTop() {
    return this.question.survey.questionErrorLocation === "top";
  }
  get hasErrorsOnBottom() {
    return this.question.survey.questionErrorLocation === "bottom";
  }
}
Vue.component("survey-multipletext", MultipleText);
export default MultipleText;
</script>
