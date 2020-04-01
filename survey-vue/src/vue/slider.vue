<template>
  <fieldset :class="question.cssClasses.root">
    <legend v-bind:aria-label="question.locTitle.renderedHtml"></legend>
    <el-row :gutter="0"  style="padding-right: 3px;">
       <el-slider 
        v-model="question.value" 
        @change="question.elIsChange()" 
       :min="question.rateMin"
       :max="question.rateMax"
       :disabled="question.isReadOnly"
       :step="question.rateStep"
       :show-input="question.showInput"
       :show-input-controls="question.showInputControls"
       :input-size="question.inputBoxSize"
       :show-stops="question.showStops"
       :show-tooltip="question.showTooltip"
       :marks="question.marks"
       :range="question.range"
       :vertical="question.vertical"
       :style="style()"
       ></el-slider>
    </el-row>
  </fieldset>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import { default as QuestionVue } from "./question";
import { QuestionSliderModel } from "../question_slider";

@Component
export class Slider extends QuestionVue<QuestionSliderModel> {
  propsOption(){
    var question = this.question;
    var propsOption={}
    if(question.multiple){
      propsOption.multiple=question.multiple
    }
    return propsOption
  }
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
  changeValue(){
    this.question.hasRequiredError=false
  }
  options(){
    var options=[]
    return options
  }
  style(){
    var style={};
    var question = this.question;
    if(question.vertical){
      style.height="200px"
    }
    return style
  }
}
Vue.component("survey-slider", Slider);
export default Slider;
</script>
<style scoped>
.question-slider{
  min-height: 50px;
}
</style>
