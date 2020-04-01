import * as Survey from "survey-vue";
import { SurveyPropertyEditorBase } from "./propertyEditorBase";

export class SurveyPropertyCustomEditor extends SurveyPropertyEditorBase {
  private widgetJSONValue: any;
  public onValueChangedCallback: (newValue: any) => void;
  afterRender: (el: any, con: any) => void;
  constructor(property: Survey.JsonObjectProperty, widgetJSON: any = null) {
    super(property);
    this.widgetJSONValue = widgetJSON;
    var self = this;
    this.afterRender= function(el, con) {
      self.doAfterRender(el, con);
    };
  }
  public get editorType(): string {
    return "custom";
  }
  public get widgetJSON(): any {
    return this.widgetJSONValue;
  }
  public isValueChanging: boolean = false;
  public onValueChanged() {
    if (this.isValueChanging) return;
    this.isValueChanging = true;
    super.onValueChanged(this.editingValue);
    if (this.onValueChangedCallback)
      this.onValueChangedCallback(this.editingValue);
    this.isValueChanging = false;
  }
  protected checkForErrors(): boolean {
    var res = super.checkForErrors();
    if (!!res) return res;
    var errorText = this.widgetValidate();
    if (!!errorText) {
      this.errorText=errorText;
    }
    return !!errorText;
  }
  protected get widgetRender(): any {
    return this.widgetJSON ? this.widgetJSON.render : null;
  }
  protected widgetValidate(): string {
    if (this.widgetJSON && this.widgetJSON.validate) {
      return this.widgetJSON.validate(this, this.value);
    }
    return null;
  }
  protected doAfterRender(elements, con) {
    var el = elements[0];
    if (!!el && this.widgetRender) this.widgetRender(this, el);
  }
}
