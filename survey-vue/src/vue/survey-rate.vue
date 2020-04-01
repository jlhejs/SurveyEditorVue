<template>
  <fieldset :class="question.cssClasses.root">
    <legend v-bind:aria-label="question.locTitle.renderedHtml"></legend>
    <el-row :gutter="0"  :class="question.cssClasses.root">
        <el-rate
        @click.native="question.clearableValue"
        @change="changeValue"
        v-model="question.value" 
        :max="question.max"
        :disabled="question.isReadOnly"
        :show-score="question.showScore"
        :show-text="question.showText"
        :text-color	="question.textColor	"
        :void-color="question.voidColor"
        :void-icon-class="question.voidIconClass"
        :score-template="question.scoreTemplate"
        :low-threshold="question.lowThreshold"
        :high-threshold="question.highThreshold"
        :colors="question.colors"
        :icon-classes="question.iconClasses"
        :texts="question.texts"
        :disabled-void-color	="question.disabledVoidColor	"
        :allow-half	="question.allowHalf	"
        class="rate"></el-rate>
    </el-row>
  </fieldset>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import { default as QuestionVue } from "./question";
import { QuestionRatetimeModel } from "../question_rate";

@Component
export class Rate extends QuestionVue<QuestionRatetimeModel> {
  oldValue=0

  changeValue(){
    this.question.elIsChange()
  }
}
Vue.component("survey-rate", Rate);

export default Rate;
</script>
<style scoped>
.rate{
  height:auto;
}
</style>