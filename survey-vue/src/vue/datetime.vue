<template>
  <fieldset :class="question.cssClasses.root">
    <legend v-bind:aria-label="question.locTitle.renderedHtml"></legend>
    <el-row :gutter="0"  >
      {{question.value}}
     <el-date-picker
       v-model="question.value"
      :type="question.inputType"
      :disabled="question.isReadOnly"
      :size="question.inputSize"
      :placeholder="question.placeHolder"
      :clearable="question.clearable"
      :value-format="question.valueFormat">
    </el-date-picker>
       <!-- <el-date-picker
      v-model="question.value"
      type="week"
      format="yyyy 第 WW 周"
      placeholder="选择周">
    </el-date-picker>

     <el-date-picker
     v-model="question.value"
      type="week"
      format="yyyy 第 WW 周"
      placeholder="选择周">
    </el-date-picker> -->
    </el-row>
  </fieldset>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { default as QuestionVue } from "./question";
import { QuestionDatetimeModel } from "../question_datetime";

@Component
export class Datetime extends QuestionVue<QuestionDatetimeModel> {
  showFilterable(){
    return this.question
  }

}
Vue.component("survey-datetime", Datetime);
export default Datetime;
</script>
