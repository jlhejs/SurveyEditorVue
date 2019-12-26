import Vue from "vue";
import * as Survey from "survey-vue";

export class SurveyUndoRedo {
  private items: Array<UndoRedoItem>=[];
  private index: number = -1;
  public  canUndo;
  public  canRedo;
  
  public maximumCount: number = 10;
  constructor() {
    this.canUndo=Vue.observable(this.index >= 1 && this.index < this.items.length);
    this.canRedo=Vue.observable(this.items.length > 1 && this.index < this.items.length - 1);;
  }
  public clear() {
    this.items = [];
    this.canUndo=false;
    this.canRedo=false;
  }
  public setCurrent(survey: Survey.Survey, selectedObjName: string) {
    var item = new UndoRedoItem();
    item.surveyJSON = new Survey.JsonObject().toJsonObject(survey);
    item.selectedObjName = selectedObjName;
    if (this.index < this.items.length - 1) {
      this.items.splice(this.index + 1);
    }
    this.items.push(item);
    this.removeOldData();
    this.index = this.items.length - 1;
    this.updateCanUndoRedo();
  }
  public undo(): UndoRedoItem {
    if (!this.canUndo) return null;
    return this.doUndoRedo(-1);
  }
  public redo(): UndoRedoItem {
    if (!this.canRedo) return null;
    return this.doUndoRedo(1);
  }
  public updateCanUndoRedo() {
    this.canUndo=this.canUndo;
    this.canRedo=this.canRedo;
  }
  public doUndoRedo(dIndex: number): UndoRedoItem {
    this.index += dIndex;
    this.updateCanUndoRedo();
    return this.index >= 0 && this.index < this.items.length
      ? this.items[this.index]
      : null;
  }
  public removeOldData() {
    if (this.items.length - 1 < this.maximumCount) return;
    this.items.splice(0, this.items.length - this.maximumCount - 1);
  }
}

export class UndoRedoItem {
  surveyJSON: any;
  selectedObjName: string;
}
