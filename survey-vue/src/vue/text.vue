<template>
  <el-input 
  :disabled="question.isReadOnly"
  :show-password="showPassword()"
  :show-word-limit="showWordLimit()"
  :clearable="showClearable()"
  :size="showInputSize()"
  :prefix-icon="showPrefixIcon()"
  :suffix-icon="showSuffixIcon()"
  :class="question.cssClasses.root"
  :type="question.inputType"
  :maxlength="question.getMaxLength()"

  :style="{ width: (question.inputWidth)+'px'}"
  :id="question.inputId"
  :placeholder="question.placeHolder"
  v-model="question.value"
  @blur="blur"
  v-bind:aria-label="question.locTitle.renderedHtml"></el-input> 
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { default as QuestionVue } from "./question";
import { QuestionTextModel } from "../question_text";

@Component
export class Text extends QuestionVue<QuestionTextModel> {
  showPassword(){
    return this.question.inputType=='password'
  }
  showWordLimit(){
    return this.question.inputType=="text"&&this.question.getMaxLength()>0
  }
  showClearable(){
    return this.question.clearable
  }
  showInputSize(){
    return this.question.inputSize
  }
  showPrefixIcon(){
    if(this.question.inputType=="text"&&this.question.prefixIcon!="none"){
      return this.question.prefixIcon
    } 
    return ""
  }
  showSuffixIcon(){
    if(this.question.inputType=="text"&&this.question.suffixIcon!="none"){
      return this.question.suffixIcon
    }
    return ""
  }
  blur(event: any) {
    if (!this.question.isInputTextUpdate) return;
    if(event.target) {
      this.question.value = event.target.value;
    }
  }
}
Vue.component("survey-text", Text);
export default Text;
</script>
