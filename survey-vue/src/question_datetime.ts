import { QuestionFactory } from "./questionfactory";
import { Serializer } from "./jsonobject";
import { Question } from "./question";
import { LocalizableString } from "./localizablestring";
import { Helpers } from "./helpers";
import { EmailValidator, SurveyValidator } from "./validator";

/**
 * A Model for an input text question.
 */
export class QuestionDatetimeModel extends Question {
  constructor(public name: string) {
    super(name);
    this.createLocalizableString("placeHolder", this);
  }
  public getType(): string {
    return "datetime";
  }
  protected getValueCore() {
    var value = super.getValueCore();
    if(value !== undefined) {
      return value;
    }
    if(this.inputType=="datetimerange"||this.inputType=="daterange") {
      return [];
    }
    return  value;
  }
  /**
   * Use this property to change the default input type.
   */
  public get inputType(): string {
    return this.getPropertyValue("inputType");
  }
  public set inputType(val: string) {
    this.setPropertyValue("inputType", val);
  }
  /**
   * The text input size 输入框大小
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
  /**
   * 输入框尾部图标
   */
  public get valueFormat(): string {
    return this.getPropertyValue("valueFormat","yyyy-MM-dd HH:mm:ss");
  }
  public set valueFormat(val: string) {
    this.setPropertyValue("valueFormat", val);
  }
  public get format(): string {
    return this.getPropertyValue("format","yyyy-MM-dd HH:mm:ss");
  }
  public set format(val: string) {
    this.setPropertyValue("format", val);
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
/* 
"year",
"month",
"date",
"week",
"datetime",
"datetimerange",
"daterange",
 */
 Serializer.addClass(
  "datetime",
  [
    {
      name: "inputType",
      default: "date",
      choices: [
        "year",
        "month",
        "date",
        "week",
        "datetime",
        "datetimerange",
        "daterange",
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
    { name: "valueFormat:string", 
      default: "yyyy-MM-dd HH:mm:ss" ,
    },
    { name: "format:string", 
      default: "yyyy-MM-dd HH:mm:ss" ,
    },
    { name: "inputWidth:number", default: 250 },
    { name: "maxLength:number", default: -1 },
   
   
    { name: "placeHolder", serializationProperty: "locPlaceHolder" }
  ],
  function() {
    return new QuestionDatetimeModel("");
  },
  "question"
);

QuestionFactory.Instance.registerQuestion("datetime", name => {
  return new QuestionDatetimeModel(name);
});
