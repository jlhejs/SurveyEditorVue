<template>
  <div>
    <div :class="getRootClass(question)">
      <el-radio-group v-model="question.value"
      v-if="!question.multiple"
      :disabled="question.isReadOnly"
      :size="question.inputSize" 
      >
      {{question.visibleRateValues}}
        <template v-for="(item, index) in question.visibleRateValues" >
          <el-radio-button 
          :label="item.value"
          :class="getCss(question, item)"  
          :id="question.id + index" 
          
          :aria-required="question.isRequired"
          :aria-label="item.locText.text" 
          v-if="index === 0" >
            <survey-string :locString="question.locMinRateDescription" :class="question.cssClasses.minText" v-if="question.minRateDescription"/>
            <survey-string :locString="item.locText" v-else-if="!question.minRateDescription"/>
          </el-radio-button>

          <el-radio-button 
          :label="item.value" 
          :class="getCss(question, item)"
          :id="question.id + index" 
          :aria-required="question.isRequired"
          :aria-label="item.locText.text" 
          v-if="index !== 0&&index !== question.visibleRateValues.length-1">
            <survey-string :locString="item.locText" />
            <span>{{item.locText.text}}</span>
          </el-radio-button>

          <el-radio-button 
          :label="item.value" 
          :class="getCss(question, item)"
          :id="question.id + index" 
          :aria-required="question.isRequired"
          :aria-label="item.locText.text"  
          v-if="index === question.visibleRateValues.length-1">
            <survey-string 
            :locString="question.locMaxRateDescription"  
            :class="question.cssClasses.maxText" 
            v-if="question.maxRateDescription"/>
            <survey-string :locString="item.locText" v-else-if="!question.maxRateDescription"/>
          </el-radio-button>
        </template>
      </el-radio-group>
      <el-checkbox-group v-model="question.value"
      v-else-if="question.multiple"
      :size="question.inputSize" 
      :disabled="question.isReadOnly">
        
      <template v-for="(item, index) in question.visibleRateValues" >
          <el-checkbox-button 
          :label="item.value"
          :class="getCss(question, item)"  
          :id="question.id + index" 
          :aria-required="question.isRequired"
          :aria-label="item.locText.text" 
          v-if="index === 0" >
            <survey-string :locString="question.locMinRateDescription" :class="question.cssClasses.minText" v-if="question.minRateDescription"/>
            <survey-string :locString="item.locText" v-else-if="!question.minRateDescription"/>
          </el-checkbox-button>

          <el-checkbox-button
          :label="item.value" 
          :class="getCss(question, item)"
          :id="question.id + index" 
          :aria-required="question.isRequired"
          :aria-label="item.locText.text" 
          v-if="index !== 0&&index !== question.visibleRateValues.length-1">
            <survey-string :locString="item.locText" />
            <span>{{item.locText.text}}</span>
          </el-checkbox-button>

          <el-checkbox-button
          :label="item.value" 
          :class="getCss(question, item)"
          :id="question.id + index" 
          :aria-required="question.isRequired"
          :aria-label="item.locText.text"  
          v-if="index === question.visibleRateValues.length-1">
            <survey-string 
            :locString="question.locMaxRateDescription"  
            :class="question.cssClasses.maxText" 
            v-if="question.maxRateDescription"/>
            <survey-string :locString="item.locText" v-else-if="!question.maxRateDescription"/>
          </el-checkbox-button>
        </template>
      </el-checkbox-group>
      <!-- <label
        v-for="(item, index) in question.visibleRateValues"
        :key="item.value"
        :class="getCss(question, item)"
      >
        <input
          type="radio"
          class="svrvey-visuallyhidden"
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
  
  getRootClass(question: QuestionRatingModel) {
    const classes = question.cssClasses;
    if (question.isReadOnly) return classes.root + " " + classes.disabled;
    return classes.root;
  }
}
Vue.component("survey-rating", Rating);
export default Rating;
</script>
