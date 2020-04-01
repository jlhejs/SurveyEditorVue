<template>
<div :class="css.progress">
    <!-- <div
      :class="css.progressBar"
      :style="{width: progress}"
      role="progressbar"
      aria-valuemin="0"
      aria-valuemax="100"
    >
      <span :class="css.progressText + ' ' + css.progressTextInBar">{{survey.progressText}}</span>
    </div>
    <span :class="css.progressText + ' ' + css.progressTextUnderBar">{{survey.progressText}}</span> -->
    <el-progress :class="css.progressBar" :color="colors" :percentage="progress" :format="format" :text-inside="true" :stroke-width="18" ></el-progress>
  </div> 
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { SurveyModel } from "../survey";

@Component
export class Progress extends Vue {
  @Prop({ required: false }) survey: SurveyModel;
  @Prop({ required: false }) css: any;
  get progress() {
    return this.survey.getProgress() ;
  }
  format(){
    return this.survey.progressText
  }
  get colors(){
    return [ 
      {color: '#409eff', percentage: 0},
      {color: '#409eff', percentage: 100},    
      ]
  }

  get isShowProgressBarOnTop(){
    return this.survey.isShowProgressBarOnTop
  }
  get isShowProgressBarOnBottom(){
    return this.survey.isShowProgressBarOnBottom
  }
}
Vue.component("survey-progress", Progress);
export default Progress;
</script>
<style scoped>
.progress{
  margin:10px 0;
}
</style>
