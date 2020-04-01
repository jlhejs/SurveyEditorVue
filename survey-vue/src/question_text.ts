import { QuestionFactory } from "./questionfactory";
import { Serializer } from "./jsonobject";
import { Question } from "./question";
import { LocalizableString } from "./localizablestring";
import { Helpers } from "./helpers";
import { EmailValidator, SurveyValidator } from "./validator";

/**
 * A Model for an input text question.
 */
export class QuestionTextModel extends Question {
  constructor(public name: string) {
    super(name);
    this.createLocalizableString("placeHolder", this);
  }
  protected isTextValue(): boolean {
    return this.inputType == "text";
  }
  public getType(): string {
    return "text";
  }
  /**
   * Use this property to change the default input type.
   */
  public get inputType(): string {
    return this.getPropertyValue("inputType");
  }
  public set inputType(val: string) {
    val = val.toLowerCase();
    if (val == "datetime_local") val = "datetime-local";
    this.setPropertyValue("inputType", val.toLowerCase());
  }
  public getValidators(): Array<SurveyValidator> {
    var validators = super.getValidators();
    if (
      this.inputType === "email" &&
      !this.validators.some(v => v.getType() === "emailvalidator")
    ) {
      validators.push(new EmailValidator());
    }
    return validators;
  }
  isLayoutTypeSupported(layoutType: string): boolean {
    return true;
  }
  /**
   * The maximim text length. If it is -1, defaul value, then the survey maxTextLength property will be used.
   * If it is 0, then the value is unlimited
   * @see SurveyModel.maxTextLength
   */
  public get maxLength(): number {
    return this.getPropertyValue("maxLength");
  }
  public set maxLength(val: number) {
    this.setPropertyValue("maxLength", val);
  }
  public getMaxLength(): any {
    return Helpers.getMaxLength(
      this.maxLength,
      this.survey ? this.survey.maxTextLength : -1
    );
  }

  /**
   * The text inputSize 输入框大小
   */
  public get inputSize(): string {
    return this.getPropertyValue("inputSize","small");
  }
  public set inputSize(val: string) {
    this.setPropertyValue("inputSize", val);
  }
   /**
   * The text input width
   */
  public get inputWidth(): number {
    return this.getPropertyValue("inputWidth");
  }
  public set inputWidth(val: number) {
    this.setPropertyValue("inputWidth", val);
  }
   /**
   * The text input clearable
   */
  public get clearable(): boolean {
    return this.getPropertyValue("clearable",false);
  }
  public set clearable(val: boolean) {
    this.setPropertyValue("clearable", val);
  }
  /**
   * 输入框头部图标
   */
  public get prefixIcon(): string {
    return this.getPropertyValue("prefixIcon","none");
  }
  public set prefixIcon(val: string) {
    this.setPropertyValue("prefixIcon", val);
  }
  /**
   * 输入框尾部图标
   */
  public get suffixIcon(): string {
    return this.getPropertyValue("suffixIcon","none");
  }
  public set suffixIcon(val: string) {
    this.setPropertyValue("suffixIcon", val);
  }

  isEmpty(): boolean {
    return super.isEmpty() || this.value === "";
  }
  supportGoNextPageAutomatic() {
    return true;
  }
  /**
   * The input place holder.
   */
  public get placeHolder(): string {
    return this.getLocalizableStringText("placeHolder");
  }
  public set placeHolder(val: string) {
    this.setLocalizableStringText("placeHolder", val);
  }
  get locPlaceHolder(): LocalizableString {
    return this.getLocalizableString("placeHolder");
  }
  protected setNewValue(newValue: any) {
    newValue = this.correctValueType(newValue);
    super.setNewValue(newValue);
  }
  protected correctValueType(newValue: any): any {
    if (!newValue) return newValue;
    if (this.inputType == "number" || this.inputType == "range") {
      return Helpers.isNumber(newValue) ? parseFloat(newValue) : "";
    }
    return newValue;
  }
  protected addSupportedValidators(supportedValidators: Array<string>) {
    super.addSupportedValidators(supportedValidators);
    supportedValidators.push("numeric", "text", "regex", "email");
  }
}
var icon=[
  "none",
  "el-icon-platform-eleme",
"el-icon-eleme",
"el-icon-delete-solid",
"el-icon-delete",
"el-icon-s-tools",
"el-icon-setting",
"el-icon-user-solid",
"el-icon-user",
"el-icon-phone",
"el-icon-phone-outline",
"el-icon-more",
"el-icon-more-outline",
"el-icon-star-on",
"el-icon-star-off",
"el-icon-s-goods",
"el-icon-goods",
"el-icon-warning",
"el-icon-warning-outline",
"el-icon-question",
"el-icon-info",
"el-icon-remove",
"el-icon-circle-plus",
"el-icon-success",
"el-icon-error",
"el-icon-zoom-in",
"el-icon-zoom-out",
"el-icon-remove-outline",
"el-icon-circle-plus-outline",
"el-icon-circle-check",
"el-icon-circle-close"]
Serializer.addClass(
  "text",
  [
    {
      name: "inputType",
      default: "text",
      choices: [
        "color",
        "date",
        "email",
        "month",
        "number",
        "password",
        "range",
        "tel",
        "text",
        "time",
        "textarea"
      ]
    },
    { name: "clearable:boolean", default: false },
    { name: "inputSize:string", 
      default: "small" ,
      choices: [
      "medium",
      "small",
      "mini",
      
    ]},
    { name: "inputWidth:number", default: 250 },
    { name: "maxLength:number", default: -1 },
    {
      name: "prefixIcon",
      default: "none",
      choices: icon
    },
    {
      name: "suffixIcon",
      default: "none",
      choices: icon
    },
    { name: "placeHolder", serializationProperty: "locPlaceHolder" }
  ],
  function() {
    return new QuestionTextModel("");
  },
  "question"
);

QuestionFactory.Instance.registerQuestion("text", name => {
  return new QuestionTextModel(name);
});
