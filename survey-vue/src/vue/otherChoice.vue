<template>
  <div class="other">
    <el-input 
    v-model="question.comment" 
    :readonly="question.isReadOnly"
    :disabled="question.isReadOnly" 
    :maxlength="question.getOthersMaxLength()"
    :placeholder="question.otherPlaceHolder"
    v-bind:aria-label="question.locTitle.renderedHtml"
    size="mini"
    class="other-input"
   ></el-input>
    <!-- <textarea
      :readonly="question.isReadOnly"
      :disabled="question.isReadOnly"
      :value="question.comment"
      :maxlength="question.getOthersMaxLength()"
      :placeholder="question.otherPlaceHolder"
      v-bind:aria-label="question.locTitle.renderedHtml"
      @change="change"
      @keyup="keyup"
    />  -->
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { Question } from "../question";
@Component
export class OtherChoice extends Vue {
  @Prop({ required: false }) question: Question;
  @Prop({ required: false }) commentClass: any;
   change(event: any) {
     this.question.comment = event.target.value;
   }
   keyup(event: any) {
     if (!this.question.isSurveyInputTextUpdate) return;
     this.question.comment = event.target.value;
   }
}
Vue.component("survey-other-choice", OtherChoice);
export default OtherChoice;
</script>
<style scoped>
  .other{
    display: inline-block;
  }
.other-input{
  display: inline;
  width: auto;
}
</style>