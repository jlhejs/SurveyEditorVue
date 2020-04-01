<template>
  <div class="survey-copyright" >
    <div v-html="survey.processedCopyrightHtml"></div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import { SurveyModel } from "../survey";
@Component
export class SurveyCopyright extends Vue {
   @Prop({ required: false }) survey: SurveyModel;
   getYear(){
     var date = new Date();
     return date.getFullYear();
   }

}
Vue.component("survey-copyright", SurveyCopyright);

export default SurveyCopyright;
</script>
<style scoped>
.survey-copyright {
  text-align: center;
    color: #606266;
    position: relative;
    z-index: 10;
    padding: 32px 0px 40px;
    font-size: 14px;
}
a{
   text-decoration: none;
   color: inherit;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  outline: none;
}

</style>