import * as ko from "knockout";
import Vue from "vue";
import { SurveyTextWorker } from "./textWorker";
import * as Survey from "survey-vue";

interface MyWindow extends Window {
  AceAjax: any;
  ace: any;
}

declare var window: MyWindow;
export class SurveyJSONEditor {
  public static updateTextTimeout: number = 1000;

  private isProcessingImmediately: boolean = false;
  private aceEditor: any;
  private textWorker: SurveyTextWorker;
  textOb : any;
  errors: any;

  constructor() {
    this.textOb = Vue.observable("");
    this.errors  = Vue.observable([]);
    var self = this;
    // this.koText.subscribe(function(newValue) {
    //   self.onJsonEditorChanged();
    // });
  }
  public init(editorElement: HTMLElement) {
    if (!this.hasAceEditor) return;
    this.aceEditor = window.ace.edit(editorElement);
    this.aceEditor.setReadOnly(this.readOnly);
    var self = this;
    //TODO add event to change ace theme and mode
    //this.aceEditor.setTheme("ace/theme/monokai");
    //this.aceEditor.session.setMode("ace/mode/json");
    this.aceEditor.setShowPrintMargin(false);
    this.aceEditor.getSession().on("change", function() {
      self.onJsonEditorChanged();
    });
    this.aceEditor.getSession().setUseWorker(true);
    SurveyTextWorker.newLineChar = this.aceEditor.session.doc.getNewLineCharacter();
  }
  public get hasAceEditor(): boolean {
    return typeof window.ace !== "undefined";
  }
  public get text(): string {
    if (!this.hasAceEditor) return this.textOb;
    return this.aceEditor.getValue();
  }
  public set text(value: string) {
    this.isProcessingImmediately = true;
    this.textOb=value
    if (this.aceEditor) {
      this.aceEditor.setValue(value);
      this.aceEditor.renderer.updateFull(true);
    }
    this.processJson(value);
    this.isProcessingImmediately = false;
    this.onJsonEditorChanged();
  }
  public show(value: string) {
    this.text = value;
    if (this.aceEditor) {
      this.aceEditor.focus();
    }
  }
  public get isJsonCorrect(): boolean {
    this.textWorker = new SurveyTextWorker(this.text);
    return this.textWorker.isJsonCorrect;
  }
  public get survey(): Survey.Model {
    return this.textWorker.survey;
  }
  private timeoutId: number = -1;
  private onJsonEditorChanged(): any {
    if (this.timeoutId > -1) {
      clearTimeout(this.timeoutId);
    }
    if (this.isProcessingImmediately) {
      this.timeoutId = -1;
    } else {
      var self = this;
      this.timeoutId = window.setTimeout(function() {
        self.timeoutId = -1;
        self.processJson(self.text);
      }, SurveyJSONEditor.updateTextTimeout);
    }
  }
  private processJson(text: string): any {
    this.textWorker = new SurveyTextWorker(text);
    if (this.aceEditor) {
      this.aceEditor.getSession().setAnnotations(this.createAnnotations(text, this.textWorker.errors));
    } else {
      this.errors=this.textWorker.errors;
    }
  }
  private createAnnotations(text: string, errors: any[]){
    var annotations = new Array();
    for (var i = 0; i < errors.length; i++) {
      var error = errors[i];
      var annotation = {
        row: error.position.start.row,
        column: error.position.start.column,
        text: error.text,
        type: "error"
      };
      annotations.push(annotation);
    }
    return annotations;
  }
  private _readOnly = ko.observable(false);
  /**
   * A boolean property, false by default. Set it to true to deny editing.
   */
  public get readOnly() {
    return this._readOnly();
  }
  public set readOnly(newVal) {
    this._readOnly(newVal);
  }
}
