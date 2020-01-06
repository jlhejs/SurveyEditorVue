<template>
  <fieldset :class="question.cssClasses.root">
    <legend v-bind:aria-label="question.locTitle.renderedHtml"></legend>
    <el-row :gutter="0"  :class="question.css.root">
      <el-radio-group v-model="question.renderedValue" style="width: 100%;" :disabled="question.isReadOnly">
          <template  v-for="(item, index) in question.visibleChoices" >
            <el-col tag="span" :span="getSpan(item)" :key="item.value" :class="getItemClass(item)" v-if="question.hasColumns">
              <el-radio  :label="item.value" >{{item.text}}</el-radio>
            </el-col>
            <span :key="item.value" :class="getItemClass(item)"  v-else>
              <el-radio  :label="item.value" :class="getItemClass(item)">{{item.text}}</el-radio>
            </span>
          </template>
      </el-radio-group>
    </el-row>
<!-- 
    <survey-radiogroup-item
      v-if="!question.hasColumns"
      v-for="(item, index) in question.visibleChoices"
      :key="item.value"
      :class="getItemClass(item)"
      :question="question"
      :item="item"
      :index="index"
    ></survey-radiogroup-item>

    <div
      v-if="question.hasColumns"
      v-for="(column, colIndex) in question.columns"
      :class="question.getColumnClass()"
    >
      <survey-radiogroup-item
        v-for="(item, index) in column"
        :key="item.value"
        :class="getItemClass(item)"
        :question="question"
        :item="item"
        :index="'' + colIndex + index"
      ></survey-radiogroup-item>
    </div>

    <div v-if="question.canShowClearButton">
      <input
        type="button"
        :class="question.cssClasses.clearButton"
        v-on:click="function() { question.clearValue(); }"
        :value="question.clearButtonCaption"
      />
    </div> -->
  </fieldset>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { default as QuestionVue } from "./question";
import { QuestionRadiogroupModel } from "../question_radiogroup";

@Component
export class Radiogroup extends QuestionVue<QuestionRadiogroupModel> {
  get choicesCount() {
    return this.question.visibleChoices.length - 1;
  }
  getItemClass(item: any) {
    var cssClasses = this.question.cssClasses;
    var isDisabled = this.question.isReadOnly || !item.isEnabled;
    var isChecked = item.value === this.question.renderedValue;
    var allowHover = !isDisabled && !isChecked;
    var itemClass = this.question.cssClasses.item;
    if (isDisabled) itemClass += " " + cssClasses.itemDisabled;
    if (isChecked) itemClass += " " + cssClasses.itemChecked;
    if (allowHover) itemClass += " " + cssClasses.itemHover;
    if (!this.question.hasColumns) {
      itemClass +=
        this.question.colCount === 0
          ? " " + cssClasses.itemInline
          : " sv-q-col-" + this.question.colCount;
    }

    return itemClass;
  }
  getSpan(item: any){
    var question = this.question;
    console.log(this)
    if (question.hasColumns) {
      return question.colCount === 0? "":  Math.floor(24/question.colCount)
    }
  }
}
Vue.component("survey-radiogroup", Radiogroup);
export default Radiogroup;
</script>
