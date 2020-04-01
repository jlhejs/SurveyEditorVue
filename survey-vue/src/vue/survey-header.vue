<template>
  <div :class="css.header" @click="surveyFooter()">
    <div class="top-tips-wrap"></div>
    <div class="page-cover-pic" v-if="survey.completeShowGuideAnm">
      <div class="laptop anim">
        <div class="laptop-t"></div>
        <div class="laptop-b"></div>
        <div class="hook">
          <div class="paper">
            <span class="paper-line l1"></span>
            <span class="paper-line l2"></span>
            <span class="paper-line l3"></span>
            <span class="paper-line l4"></span>
            <span class="paper-line l5"></span>
            <span class="paper-line l6"></span>
            <span class="paper-line l7"></span>
            <span class="paper-block"></span>
          </div>
          <div class="pen">
            <div class="pen-t "></div>
            <div class="pen-m"></div>
            <div class="pen-b " style="transition: background 0.2s ease 0s;"></div>
          </div>
        </div>
        <div class="quote-l">
          <div class="quote-l-bg" style="transition: background 0.2s ease 0s;">
            <div class="quote-l-drop"></div>
          </div>
          <span class="quote-l-line l1"></span>
          <span class="quote-l-line l2"></span>
          <span class="quote-l-line l3"></span>
        </div>
        <div class="quote-r">
          <div class="quote-r-bg "></div>
          <span class="quote-r-dot d1 " style="transition: background 0.2s ease 0s;"></span>
          <span class="quote-r-dot d2 " style="transition: background 0.2s ease 0s;"></span>
          <span class="quote-r-dot d3 " style="transition: background 0.2s ease 0s;"></span>
        </div>
      </div>
    </div>
    <div   :class="css.title" v-if="survey.showTitle" v-html="survey.processedTitle">
    </div>
    <div  :class="css.description" v-html="survey.processedDescription">
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import { SurveyModel } from "../survey";
@Component
export class SurveyHeeader extends Vue {
   @Prop({ required: false }) survey: SurveyModel;
    surveyFooter(){
      console.log(this)
      return "surveyFooter"
    }
    get css() {
      return this.survey?this.survey.css:{};
    }
}
Vue.component("survey-heeader", SurveyHeeader);

export default SurveyHeeader;
</script>
<style scoped>
.survey-header {
    text-align: center;
    padding: 108px 72px 64px;
}
.top-tips-wrap {
    text-align: left;
    position: fixed;
    top: 0px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
    transition: opacity 0.2s ease 0s;
}
.survey-title {
    margin-top: 10px;
    font-size: 30px;
}
.survey-description {
    margin-top: 20px;
    font-size: 16px;
}
.page-cover-pic {
    margin-top: 10px;
    margin-bottom: 40px;
  height: 150px;
}
.survey-pc .page-cover-pic {
  margin-top: 10px;
  margin-bottom: 40px;
}
.page-cover-pic .laptop {
  position: relative;
  width: 232px;
  height: 150px;
  margin: 0 auto;
}
.page-cover-pic .laptop .pen {
  position: absolute;
  right: 44px;
  bottom: 0;
  width: 16px;
  height: 93px;
}
.page-cover-pic .laptop .pen-t {
  position: absolute;
  left: 4px;
  top: 0;
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 8px solid #242d3b;
  z-index: 1;
}
.page-cover-pic .laptop .pen-m {
  position: absolute;
  left: 0;
  top: 0;
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 16px solid #dfe6f0;
}
.page-cover-pic .laptop .pen-b {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 16px;
  height: 77px;
  background: #018fff;
}
.page-cover-pic .laptop .hook {
  position: absolute;
  left: 30px;
  bottom: 16px;
  width: 172px;
  height: 134px;
  overflow: hidden;
}
.page-cover-pic .laptop .paper {
  position: absolute;
  left: 29px;
  bottom: 0;
  width: 118px;
  height: 134px;
  overflow: hidden;
}
.page-cover-pic .laptop .paper:before {
  content: "";
  position: absolute;
  top: 0;
  left: 50%;
  margin-left: -57px;
  width: 114px;
  height: 134px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  background-color: #ffffff;
  -webkit-box-shadow: 0 2px 2px 0 #ced8e3;
          box-shadow: 0 2px 2px 0 #ced8e3;
}
.page-cover-pic .laptop .paper-line {
  position: absolute;
  left: 19px;
  top: 28px;
  width: 80px;
  height: 5px;
  background: #d8e0ea;
}
.page-cover-pic .laptop .paper-line.l2 {
  top: 42px;
}
.page-cover-pic .laptop .paper-line.l3 {
  width: 49px;
  left: 50px;
  top: 56px;
}
.page-cover-pic .laptop .paper-line.l4 {
  width: 49px;
  left: 50px;
  top: 70px;
}
.page-cover-pic .laptop .paper-line.l5 {
  top: 84px;
}
.page-cover-pic .laptop .paper-line.l6 {
  top: 98px;
}
.page-cover-pic .laptop .paper-line.l7 {
  top: 112px;
}
.page-cover-pic .laptop .paper-block {
  position: absolute;
  left: 19px;
  top: 56px;
  width: 23px;
  height: 19px;
  background: #d8e0ea;
}
.page-cover-pic .laptop .quote-l {
  position: absolute;
  left: 2px;
  top: 55px;
  width: 66px;
  height: 50px;
}
.page-cover-pic .laptop .quote-l-bg {
  position: absolute;
  left: 0;
  top: 0;
  width: 66px;
  height: 40px;
  border-radius: 3px;
  background-color: #018fff;
}
.page-cover-pic .laptop .quote-l-drop {
  content: "";
  position: absolute;
  bottom: -10px;
  left: 9px;
  width: 0;
  height: 0;
  border-top: 5px solid #0d79d2;
  border-left: 5px solid #0d79d2;
  border-right: 5px solid transparent;
  border-bottom: 5px solid transparent;
}
.page-cover-pic .laptop .quote-l-line {
  position: absolute;
  left: 9px;
  top: 9px;
  width: 48px;
  height: 4px;
  background: #fff;
}
.page-cover-pic .laptop .quote-l-line.l2 {
  top: 18px;
}
.page-cover-pic .laptop .quote-l-line.l3 {
  top: 27px;
}
.page-cover-pic .laptop .quote-r {
  position: absolute;
  top: 43px;
  right: 0;
  width: 48px;
  height: 58px;
}
.page-cover-pic .laptop .quote-r-bg {
  position: absolute;
  top: 0;
  right: 0;
  width: 48px;
  height: 48px;
  border-radius: 3px;
  background-color: #018fff;
}
.page-cover-pic .laptop .quote-r-bg:after {
  content: "";
  position: absolute;
  bottom: -10px;
  right: 9px;
  width: 0;
  height: 0;
  border-top: 5px solid #0d79d2;
  border-left: 5px solid transparent;
  border-right: 5px solid #0d79d2;
  border-bottom: 5px solid transparent;
}
.page-cover-pic .laptop .quote-r-dot {
  position: absolute;
  left: 11px;
  top: 21px;
  width: 6px;
  height: 6px;
  background-color: #ffffff;
}
.page-cover-pic .laptop .quote-r-dot.d2 {
  left: 21px;
}
.page-cover-pic .laptop .quote-r-dot.d3 {
  left: 31px;
}
.page-cover-pic .laptop.anim {
  -webkit-animation: a-c-laptop 0.3s 0s cubic-bezier(0.71, 0.05, 0.29, 0.97) both;
          animation: a-c-laptop 0.3s 0s cubic-bezier(0.71, 0.05, 0.29, 0.97) both;
}
.page-cover-pic .laptop.anim .laptop-t {
  -webkit-animation: a-c-laptop-t 0.3s 0.15s linear both;
          animation: a-c-laptop-t 0.3s 0.15s linear both;
}
.page-cover-pic .laptop.anim .paper {
  -webkit-animation: a-c-paper 0.5s 0.45s cubic-bezier(0.42, 1.14, 1, 1) both;
          animation: a-c-paper 0.5s 0.45s cubic-bezier(0.42, 1.14, 1, 1) both;
}
.page-cover-pic .laptop.anim .paper-line.l1 {
  -webkit-animation: a-c-quote-1-line 0.2s 0.6s linear both;
          animation: a-c-quote-1-line 0.2s 0.6s linear both;
}
.page-cover-pic .laptop.anim .paper-line.l2 {
  -webkit-animation: a-c-quote-1-line 0.2s 0.7s linear both;
          animation: a-c-quote-1-line 0.2s 0.7s linear both;
}
.page-cover-pic .laptop.anim .paper-line.l3 {
  -webkit-animation: a-c-quote-1-line 0.2s 0.8s linear both;
          animation: a-c-quote-1-line 0.2s 0.8s linear both;
}
.page-cover-pic .laptop.anim .paper-line.l4 {
  -webkit-animation: a-c-quote-1-line 0.2s 0.9s linear both;
          animation: a-c-quote-1-line 0.2s 0.9s linear both;
}
.page-cover-pic .laptop.anim .paper-line.l5 {
  -webkit-animation: a-c-quote-1-line 0.2s 1s linear both;
          animation: a-c-quote-1-line 0.2s 1s linear both;
}
.page-cover-pic .laptop.anim .paper-line.l6 {
  -webkit-animation: a-c-quote-1-line 0.2s 1.1s linear both;
          animation: a-c-quote-1-line 0.2s 1.1s linear both;
}
.page-cover-pic .laptop.anim .paper-line.l7 {
  -webkit-animation: a-c-quote-1-line 0.2s 1.2s linear both;
          animation: a-c-quote-1-line 0.2s 1.2s linear both;
}
.page-cover-pic .laptop.anim .paper-block {
  -webkit-animation: a-c-quote-1-line 0.2s 0.8s linear both;
          animation: a-c-quote-1-line 0.2s 0.8s linear both;
}
.page-cover-pic .laptop.anim .pen {
  -webkit-animation: a-c-paper 0.5s 0.7s cubic-bezier(0.42, 1.14, 1, 1) both;
          animation: a-c-paper 0.5s 0.7s cubic-bezier(0.42, 1.14, 1, 1) both;
}
.page-cover-pic .laptop.anim .quote-l {
  -webkit-animation: a-c-quote-1-1 1.6s 1.5s linear both infinite;
          animation: a-c-quote-1-1 1.6s 1.5s linear both infinite;
}
.page-cover-pic .laptop.anim .quote-l-bg {
  -webkit-animation: a-c-quote-1 0.5s 1s linear both;
          animation: a-c-quote-1 0.5s 1s linear both;
}
.page-cover-pic .laptop.anim .quote-l-line.l1 {
  -webkit-animation: a-c-quote-1-line 0.2s 1.2s linear both;
          animation: a-c-quote-1-line 0.2s 1.2s linear both;
}
.page-cover-pic .laptop.anim .quote-l-line.l2 {
  -webkit-animation: a-c-quote-1-line 0.2s 1.3s linear both;
          animation: a-c-quote-1-line 0.2s 1.3s linear both;
}
.page-cover-pic .laptop.anim .quote-l-line.l3 {
  -webkit-animation: a-c-quote-1-line 0.2s 1.4s linear both;
          animation: a-c-quote-1-line 0.2s 1.4s linear both;
}
.page-cover-pic .laptop.anim .quote-r {
  -webkit-animation: a-c-quote-1-1 1.6s 1.8s linear both infinite;
          animation: a-c-quote-1-1 1.6s 1.8s linear both infinite;
}
.page-cover-pic .laptop.anim .quote-r-bg {
  -webkit-animation: a-c-quote-1 0.5s 1.3s linear both;
          animation: a-c-quote-1 0.5s 1.3s linear both;
}
.page-cover-pic .laptop.anim .quote-r-dot.d1 {
  -webkit-animation: a-c-quote-2-dot 0.2s 1.5s linear both;
          animation: a-c-quote-2-dot 0.2s 1.5s linear both;
}
.page-cover-pic .laptop.anim .quote-r-dot.d2 {
  -webkit-animation: a-c-quote-2-dot 0.2s 1.6s linear both;
          animation: a-c-quote-2-dot 0.2s 1.6s linear both;
}
.page-cover-pic .laptop.anim .quote-r-dot.d3 {
  -webkit-animation: a-c-quote-2-dot 0.2s 1.7s linear both;
          animation: a-c-quote-2-dot 0.2s 1.7s linear both;
}
.page-cover-pic .laptop-t {
  position: absolute;
  left: 50%;
  bottom: 8px;
  margin-left: -94px;
  width: 188px;
  height: 127px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background-color: #242d3b;
  -webkit-transform-origin: 50% 100%;
      -ms-transform-origin: 50% 100%;
          transform-origin: 50% 100%;
}
.page-cover-pic .laptop-t:after {
  content: "";
  position: absolute;
  left: 8px;
  right: 8px;
  bottom: 8px;
  top: 8px;
  background-color: #ced8e3;
}
.page-cover-pic .laptop-b {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 232px;
  height: 8px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  background-color: #c4ccd9;
}
.page-cover-pic .laptop-b:after {
  content: "";
  position: absolute;
  left: 100px;
  top: 0;
  width: 32px;
  height: 4px;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  background-color: #99a2b3;
}
@-webkit-keyframes a-c-laptop {
  0% {
    opacity: 0;
    -webkit-transform: scale(0.3, 0.5) translate(0, 120px);
            transform: scale(0.3, 0.5) translate(0, 120px);
  }
  100% {
    opacity: 1;
    -webkit-transform: scale(1, 1);
            transform: scale(1, 1);
  }
}
@keyframes a-c-laptop {
  0% {
    opacity: 0;
    -webkit-transform: scale(0.3, 0.5) translate(0, 120px);
            transform: scale(0.3, 0.5) translate(0, 120px);
  }
  100% {
    opacity: 1;
    -webkit-transform: scale(1, 1);
            transform: scale(1, 1);
  }
}
@-webkit-keyframes a-c-laptop-t {
  0% {
    -webkit-transform: rotateX(88deg);
            transform: rotateX(88deg);
  }
  100% {
    -webkit-transform: rotateX(0deg);
            transform: rotateX(0deg);
  }
}
@keyframes a-c-laptop-t {
  0% {
    -webkit-transform: rotateX(88deg);
            transform: rotateX(88deg);
  }
  100% {
    -webkit-transform: rotateX(0deg);
            transform: rotateX(0deg);
  }
}
@-webkit-keyframes a-c-paper {
  0% {
    -webkit-transform: translate(0px, 142px) scale(0.9, 1.1);
            transform: translate(0px, 142px) scale(0.9, 1.1);
  }
  30% {
    -webkit-transform: translate(0px, -10px) scale(1.2, 0.8);
            transform: translate(0px, -10px) scale(1.2, 0.8);
  }
  60% {
    -webkit-transform: translate(0px, 5px) scale(0.95, 1.05);
            transform: translate(0px, 5px) scale(0.95, 1.05);
  }
  80% {
    -webkit-transform: translate(0px, -2px) scale(1.02, 0.98);
            transform: translate(0px, -2px) scale(1.02, 0.98);
  }
  100% {
    -webkit-transform: translate(0px, 0px) scale(1, 1);
            transform: translate(0px, 0px) scale(1, 1);
  }
}
@keyframes a-c-paper {
  0% {
    -webkit-transform: translate(0px, 142px) scale(0.9, 1.1);
            transform: translate(0px, 142px) scale(0.9, 1.1);
  }
  30% {
    -webkit-transform: translate(0px, -10px) scale(1.2, 0.8);
            transform: translate(0px, -10px) scale(1.2, 0.8);
  }
  60% {
    -webkit-transform: translate(0px, 5px) scale(0.95, 1.05);
            transform: translate(0px, 5px) scale(0.95, 1.05);
  }
  80% {
    -webkit-transform: translate(0px, -2px) scale(1.02, 0.98);
            transform: translate(0px, -2px) scale(1.02, 0.98);
  }
  100% {
    -webkit-transform: translate(0px, 0px) scale(1, 1);
            transform: translate(0px, 0px) scale(1, 1);
  }
}
@-webkit-keyframes a-c-quote-1 {
  0% {
    -webkit-transform: translate(0px, 5px) scale(0.1, 0.1);
            transform: translate(0px, 5px) scale(0.1, 0.1);
    opacity: 0;
  }
  30% {
    -webkit-transform: translate(0px, -2px) scale(1.2, 0.8);
            transform: translate(0px, -2px) scale(1.2, 0.8);
    opacity: 1;
  }
  60% {
    -webkit-transform: translate(0px, 1px) scale(0.95, 1.05);
            transform: translate(0px, 1px) scale(0.95, 1.05);
    opacity: 1;
  }
  80% {
    -webkit-transform: translate(0px, -1px) scale(1.02, 0.98);
            transform: translate(0px, -1px) scale(1.02, 0.98);
    opacity: 1;
  }
  100% {
    -webkit-transform: translate(0px, 0px) scale(1, 1);
            transform: translate(0px, 0px) scale(1, 1);
    opacity: 1;
  }
}
@keyframes a-c-quote-1 {
  0% {
    -webkit-transform: translate(0px, 5px) scale(0.1, 0.1);
            transform: translate(0px, 5px) scale(0.1, 0.1);
    opacity: 0;
  }
  30% {
    -webkit-transform: translate(0px, -2px) scale(1.2, 0.8);
            transform: translate(0px, -2px) scale(1.2, 0.8);
    opacity: 1;
  }
  60% {
    -webkit-transform: translate(0px, 1px) scale(0.95, 1.05);
            transform: translate(0px, 1px) scale(0.95, 1.05);
    opacity: 1;
  }
  80% {
    -webkit-transform: translate(0px, -1px) scale(1.02, 0.98);
            transform: translate(0px, -1px) scale(1.02, 0.98);
    opacity: 1;
  }
  100% {
    -webkit-transform: translate(0px, 0px) scale(1, 1);
            transform: translate(0px, 0px) scale(1, 1);
    opacity: 1;
  }
}
@-webkit-keyframes a-c-quote-1-1 {
  0% {
    -webkit-transform: translate(0px, 0px) scale(1, 1);
            transform: translate(0px, 0px) scale(1, 1);
    opacity: 1;
  }
  20% {
    -webkit-transform: translate(0px, -2px) scale(1, 1);
            transform: translate(0px, -2px) scale(1, 1);
    opacity: 1;
  }
  60% {
    -webkit-transform: translate(0px, 3px) scale(1, 1);
            transform: translate(0px, 3px) scale(1, 1);
    opacity: 1;
  }
  80% {
    -webkit-transform: translate(0px, -1px) scale(1, 1);
            transform: translate(0px, -1px) scale(1, 1);
    opacity: 1;
  }
  100% {
    -webkit-transform: translate(0px, 0px) scale(1, 1);
            transform: translate(0px, 0px) scale(1, 1);
    opacity: 1;
  }
}
@keyframes a-c-quote-1-1 {
  0% {
    -webkit-transform: translate(0px, 0px) scale(1, 1);
            transform: translate(0px, 0px) scale(1, 1);
    opacity: 1;
  }
  20% {
    -webkit-transform: translate(0px, -2px) scale(1, 1);
            transform: translate(0px, -2px) scale(1, 1);
    opacity: 1;
  }
  60% {
    -webkit-transform: translate(0px, 3px) scale(1, 1);
            transform: translate(0px, 3px) scale(1, 1);
    opacity: 1;
  }
  80% {
    -webkit-transform: translate(0px, -1px) scale(1, 1);
            transform: translate(0px, -1px) scale(1, 1);
    opacity: 1;
  }
  100% {
    -webkit-transform: translate(0px, 0px) scale(1, 1);
            transform: translate(0px, 0px) scale(1, 1);
    opacity: 1;
  }
}
@-webkit-keyframes a-c-quote-1-line {
  0% {
    opacity: 0;
    -webkit-transform: translate(0, 1px) scale(0.9, 1);
            transform: translate(0, 1px) scale(0.9, 1);
  }
  50% {
    opacity: 1;
    -webkit-transform: translate(0, -1px) scale(1.1, 1);
            transform: translate(0, -1px) scale(1.1, 1);
  }
  100% {
    opacity: 1;
    -webkit-transform: translate(0, 0px) scale(1, 1);
            transform: translate(0, 0px) scale(1, 1);
  }
}
@keyframes a-c-quote-1-line {
  0% {
    opacity: 0;
    -webkit-transform: translate(0, 1px) scale(0.9, 1);
            transform: translate(0, 1px) scale(0.9, 1);
  }
  50% {
    opacity: 1;
    -webkit-transform: translate(0, -1px) scale(1.1, 1);
            transform: translate(0, -1px) scale(1.1, 1);
  }
  100% {
    opacity: 1;
    -webkit-transform: translate(0, 0px) scale(1, 1);
            transform: translate(0, 0px) scale(1, 1);
  }
}
@-webkit-keyframes a-c-quote-2-dot {
  0% {
    opacity: 0;
    -webkit-transform: scale(0.5);
            transform: scale(0.5);
  }
  50% {
    opacity: 1;
    -webkit-transform: scale(1.5);
            transform: scale(1.5);
  }
  100% {
    opacity: 1;
    -webkit-transform: scale(1);
            transform: scale(1);
  }
}
@keyframes a-c-quote-2-dot {
  0% {
    opacity: 0;
    -webkit-transform: scale(0.5);
            transform: scale(0.5);
  }
  50% {
    opacity: 1;
    -webkit-transform: scale(1.5);
            transform: scale(1.5);
  }
  100% {
    opacity: 1;
    -webkit-transform: scale(1);
            transform: scale(1);
  }
}

</style>