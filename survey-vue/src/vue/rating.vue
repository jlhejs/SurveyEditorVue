<template>
  <div>
    <div :class="getRootClass(question)">
      <el-rate v-model="question.value"  
      :allow-half="showWallowHalf()" 
      @change="change"
      :show-text="showShowText()"
      :texts="texts()"
      disabled-void-icon-class="el-icon-edit"
      :void-icon-class="showVoidIconClass()"
      :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
      score-template="{question.value}"></el-rate>
      <!-- <label
        v-for="(item, index) in question.visibleRateValues"
        :key="item.value"
        :class="getCss(question, item)"
      >
        <input
          type="radio"
          class="sv-visuallyhidden"
          :name="question.name"
          :id="question.name + index"
          :value="item.value"
          :disabled="question.isReadOnly"
          @change="change"
          v-bind:aria-required="question.isRequired"
          :aria-label="item.locText.text"
        />
        <span v-if="index === 0" :class="question.cssClasses.minText">
          <survey-string :locString="question.locMinRateDescription" />
        </span>
        <span :class="question.cssClasses.itemText">
          <survey-string :locString="item.locText" />
        </span>
        <span
          v-if="index === question.visibleRateValues.length-1"
          :class="question.cssClasses.maxText"
        >
          <survey-string :locString="question.locMaxRateDescription" />
        </span>
      </label> -->
    </div>
    <survey-other-choice
      v-show="question.hasOther"
      :class="question.cssClasses.other"
      :question="question"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { default as QuestionVue } from "./question";
import { QuestionRatingModel } from "../question_rating";

@Component
export class Rating extends QuestionVue<QuestionRatingModel> {
  showWallowHalf(){
    return this.question.allowHalf
  }
  showShowText(){
    
    return this.question.showText
  }
  showVoidIconClass(){
    return this.question.voidIconClass
  }
  texts(){
    var texts=[]
    for(var i=0;i<this.question.visibleRateValues.length;i++){
      texts.push(this.question.visibleRateValues[i].text)
    }
    return texts

  }
  getCss(question: QuestionRatingModel, item: any) {
    let css = question.cssClasses.item;
    if (question.value == item.value) {
      css = css + " " + question.cssClasses.selected;
    }
    return css;
  }
  change(e: any) {
    if (!this.question.isInputTextUpdate) return;
    if(e.target){
      this.question.value = e.target.value;
    }
   
  }
  getRootClass(question: QuestionRatingModel) {
    const classes = question.cssClasses;
    if (question.isReadOnly) return classes.root + " " + classes.disabled;
    return classes.root;
  }
}
Vue.component("survey-rating", Rating);
export default Rating;
</script>
