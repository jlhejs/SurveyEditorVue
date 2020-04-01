<template>
  <span role="alert" v-show="isShow" :class="classes">
    <template v-for="error in question.errors">
      <el-tag type="danger" size="small" :class="question.cssClasses ? question.cssClasses.error.item : 'panel-error-item'">
        <i  :class="question.cssClasses ? question.cssClasses.error.icon : 'panel-error-icon'"></i>
        <survey-string :locString="error.locText"/>
      </el-tag>
    </template>
   
  </span>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { Question } from "../question";
import { SurveyError } from "../base";

@Component
export class Errors extends Vue {
  @Prop({ required: false }) question: Question;
  @Prop({ required: false }) location: String;

  get isShow() {
    return !!this.question.errors && this.question.errors.length > 0
  }

  get classes() {
    var question = this.question;
    var classes = question.cssClasses
      ? question.cssClasses.error.root
      : "panel-error-root";

    var additionalClasses = "";

    if (this.location === "top") {
      additionalClasses = question.cssClasses.error.locationTop;
    } else if (this.location === "bottom") {
      additionalClasses = question.cssClasses.error.locationBottom;
    }

    if (additionalClasses) classes += " " + additionalClasses;

    return classes;
  }
}
Vue.component("survey-errors", Errors);
export default Errors;
</script>
<style scoped>
.error-item{
  animation: shake-horizontal 1s ease-in-out both;
}
@-webkit-keyframes shake-horizontal {
  0%,
  100% {
    -webkit-transform: translateX(0);
            transform: translateX(0);
  }
  10%,
  30%,
  50%,
  70%,
  90% {
    -webkit-transform: translateX(-2px);
            transform: translateX(-2px);
  }
  20%,
  40%,
  60%,
  80% {
    -webkit-transform: translateX(2px);
            transform: translateX(2px);
  }
}
@keyframes shake-horizontal {
  0%,
  100% {
    -webkit-transform: translateX(0);
            transform: translateX(0);
  }
  10%,
  30%,
  50%,
  70%,
  90% {
    -webkit-transform: translateX(-2px);
            transform: translateX(-2px);
  }
  20%,
  40%,
  60%,
  80% {
    -webkit-transform: translateX(2px);
            transform: translateX(2px);
  }
}
</style>
