import Vue from "vue";
import { SurveyHelper, ObjType } from "./surveyHelper";
import { editorLocalization } from "./editorLocalization";

import * as Survey from "survey-vue";

export class SurveyObjectItem {
  public value: Survey.Base;
  public text: any;
  public level: number = 0;
}

export class SurveyObjects {
  public static intend: string = ".";
  surveyValue: Survey.Survey;
  public getItemTextCallback: (obj: Survey.Base, text: string) => string;

  constructor(
    public objects: any,
    public selectedObject: any,
    private getObjectDisplayName:any
  ) {
    var s=this.survey
  }
  public get survey(): Survey.Survey|any {
    return this.surveyValue;
  }
  public set survey(value: Survey.Survey|any) {
    if (this.survey == value) return;
    this.surveyValue = value;
    this.rebuild();
  }
  public addPage(page: Survey.PageModel) {
    this.addElement(page, null);
  }
  public addElement(element: any, parent: any) {
    var parentIndex = parent != null ? this.getItemIndex(parent) : 0;
    if (parentIndex < 0) return;
    var elements =
      parent != null ? this.getElements(parent) : this.survey.pages;
    var elementIndex = elements.indexOf(element);
    var newIndex = elementIndex + 1 + parentIndex;
    if (elementIndex > 0) {
      var prevElement = elements[elementIndex - 1];
      newIndex =
        this.getItemIndex(prevElement) +
        this.getAllElementCount(prevElement) +
        1;
    }
    var item = this.createItem(element, this.objects[parentIndex]);
    this.addItem(item, newIndex);
    var objs = [];
    this.buildElements(objs, this.getElements(element), item);
    for (var i = 0; i < objs.length; i++) {
      this.objects.splice(newIndex + 1 + i, 0, objs[i]);
    }
    this.selectedObject=item;
  }
  public selectObject(obj: Survey.Base|null) {
    var objs = this.objects;
    for (var i = 0; i < objs.length; i++) {
      if (objs[i].value == obj) {
        this.selectedObject=objs[i];
        continue  ;
      }
    }
  }
  public getSelectedObjectPage(obj: Survey.Base = null): Survey.Page |null {
    if (!this.survey) return null;
    if (!obj) {
      if (!this.selectedObject) return;
      obj = this.selectedObject.value;
    }
    var objs = this.objects;
    var index = this.getItemIndex(obj);
    while (index > 0) {
      var item = objs[index];
      if (item.level == 1) return item.value;
      index--;
    }
    return null;
  }
  public removeObject(obj: Survey.Base) {
    var index = this.getItemIndex(obj);
    if (index < 0) return;
    var countToRemove = 1 + this.getAllElementCount(obj);
    this.objects.splice(index, countToRemove);
  }
  public nameChanged(obj: Survey.Base) {
    var index = this.getItemIndex(obj);
    if (index < 0) return;
    this.objects[index].text=this.getText(this.objects[index]);
  }
  public selectNextQuestion(isUp: boolean) {
    var question = this.getSelectedQuestion();
    var itemIndex = this.getItemIndex(question);
    if (itemIndex < 0) return question;
    var objs = this.objects;
    var newItemIndex = itemIndex + (isUp ? -1 : 1);
    if (
      newItemIndex < objs.length &&
      SurveyHelper.getObjectType(objs[newItemIndex].value) == ObjType.Question
    ) {
      itemIndex = newItemIndex;
    } else {
      newItemIndex = itemIndex;
      while (
        newItemIndex < objs.length &&
        SurveyHelper.getObjectType(objs[newItemIndex].value) == ObjType.Question
      ) {
        itemIndex = newItemIndex;
        newItemIndex += isUp ? 1 : -1;
      }
    }
    this.selectedObject=objs[itemIndex];
  }
  private getAllElementCount(element: any) {
    var elements = this.getElements(element);
    var res = 0;
    for (var i = 0; i < elements.length; i++) {
      res += 1 + this.getAllElementCount(elements[i]);
    }
    return res;
  }
  private getSelectedQuestion(): Survey.Question|null {
    if (!this.selectedObject) return null;
    var obj = this.selectedObject.value;
    if (!obj) return null;
    return SurveyHelper.getObjectType(obj) == ObjType.Question? <Survey.Question>obj: null;
  }
  private addItem(item: SurveyObjectItem, index: number) {
    if (index > this.objects.length) {
      this.objects.push(item);
    } else {
      this.objects.splice(index, 0, item);
    }
  }
  private rebuild() {
    var objs = [];
    if (this.survey == null) {
      this.objects=objs;
      this.selectObject(null);
      return;
    }
    var root = this.createItem(this.survey, null);
    objs.push(root);
    for (var i = 0; i < this.survey.pages.length; i++) {
      var page:any = <Survey.Page>this.survey.pages[i];
      var pageItem = this.createItem(page, root);
      objs.push(pageItem);
      this.buildElements(objs, this.getElements(page), pageItem);
    }
    this.objects=objs;
    this.selectObject(this.survey);
  }
  private getElements(element: any): Array<any> {
    return SurveyHelper.getElements(element);
  }
  private buildElements(
    objs: Array<any>,
    elements: Array<any>,
    parentItem: SurveyObjectItem
  ) {
    for (var i = 0; i < elements.length; i++) {
      var el = elements[i];
      var item = this.createItem(<Survey.Survey>el, parentItem);
      objs.push(item);
      this.buildElements(objs, this.getElements(el), item);
    }
  }
  private createItem(value: Survey.Survey, parent: any) {
    var item:any = new SurveyObjectItem();
    item.value = value;
    item.level = parent != null ? parent.level + 1 : 0;
    item.text = Vue.observable(this.getText(item));
    return item;
  }
  private getItemIndex(value: Survey.Base): number {
    if (!value) return -1;
    if (value["selectedElementInDesign"])
      value = value["selectedElementInDesign"];
    var objs = this.objects;
    for (var i = 0; i < objs.length; i++) {
      if (objs[i].value == value) return i;
    }
    return -1;
  }
  private getText(item: SurveyObjectItem): string {
    if (item.level == 0) return editorLocalization.getString("ed.survey");
    var intend = SurveyObjects.intend;
    for (var i = 1; i < item.level; i++) {
      intend += SurveyObjects.intend;
    }
    var text = !!this.getObjectDisplayName
      ? this.getObjectDisplayName(item.value)
      : SurveyHelper.getObjectName(item.value, false);
    if (this.getItemTextCallback) {
      text = this.getItemTextCallback(item.value, text);
    }
    return intend + text;
  }
}
