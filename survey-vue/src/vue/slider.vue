<template>
  <fieldset :class="question.cssClasses.root">
    <legend v-bind:aria-label="question.locTitle.renderedHtml"></legend>
    <el-row :gutter="0"  style="padding-right: 3px;">
       <el-slider 
        v-model="question.value" 
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
import * as ele from "element-ui";
var slider=ele.Slider

@Component({ // 引入子组件 
    components: {
      SurveySlider:slider
    }
})
export class Slider extends QuestionVue<QuestionSliderModel> {

  style(){
    var style={height:"auto"};
    var question = this.question;
    if(question.vertical){
      style.height=this.question.height+"px"||"200px"
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
