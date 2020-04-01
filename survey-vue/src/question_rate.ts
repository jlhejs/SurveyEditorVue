import { QuestionFactory } from "./questionfactory";
import { Serializer } from "./jsonobject";
import { Question } from "./question";
import { LocalizableString } from "./localizablestring";
import { Helpers } from "./helpers";
import { EmailValidator, SurveyValidator } from "./validator";
import { icons } from "./icons";
/**
 * A Model for an input text question.
 */
export class QuestionRatetimeModel extends Question {
  private isChange: boolean=false;
  constructor(public name: string) {
    super(name);
  }
  public getType(): string {
    return "rate";
  }
  protected hasRequiredError(): boolean {
    return this.isRequired && !this.isChange
  }
  public elIsChange(){
    this.isChange=true
  }
  public clearableValue(){
    var THIS=this
    if(!this.question.clearable)return
    if(this.question.value===this.oldValue){
      this.question.value=0
      this.question.isChange=false
    }
    this.oldValue=this.question.value
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
   * 输入框头部图标
   */
  public get allowHalf(): boolean {
    return this.getPropertyValue("allowHalf",false);
  }
  public set allowHalf(val: boolean) {
    this.setPropertyValue("allowHalf", val);
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
   * zuidazhi 
   */
  public get max	(): number {
    return this.getPropertyValue("max",10);
  }
  public set max(val: number) {
    this.setPropertyValue("max", val);
  }
  /**
   * 输入框尾部图标
   */
  public get lowThreshold		(): number {
    return this.getPropertyValue("lowThreshold",3);
  }
  public set lowThreshold(val: number) {
    this.setPropertyValue("lowThreshold", val);
  }
 
  public get highThreshold		(): number {
    return this.getPropertyValue("highThreshold",7);
  }
  public set highThreshold(val: number) {
    this.setPropertyValue("highThreshold", val);
  }
 
  public get voidColor(): string {
    return this.getPropertyValue("voidColor","#C6D1DE");
  }
  public set voidColor(val: string) {
    this.setPropertyValue("voidColor", val);
  }
  public get disabledVoidColor(): string {
    return this.getPropertyValue("disabledVoidColor","#C6D1DE");
  }
  public set disabledVoidColor(val: string) {
    this.setPropertyValue("disabledVoidColor", val);
  }
  public get iconClasses(): any {
    return this.getPropertyValue("iconClasses");
  }
  public set iconClasses(val: any) {
    // 解决elebug
    if(this.voidIconClass){
      this.voidIconClass="icon-rate-face-off"
    }
    this.setPropertyValue("iconClasses", val);
  }
  public get showText(): boolean {
    return this.getPropertyValue("showText",false);
  }
  public set showText(val: boolean) {
    this.setPropertyValue("showText", val);
  }
  public get showScore(): boolean {
    return this.getPropertyValue("showScore",false);
  }
  public set showScore(val: boolean) {
    this.setPropertyValue("showScore", val);
  }
  public get textColor(): boolean {
    return this.getPropertyValue("textColor","#1F2D3D");
  }
  public set textColor(val: boolean) {
    this.setPropertyValue("textColor", val);
  }
  public get scoreTemplate(): boolean {
    return this.getPropertyValue("scoreTemplate","{value}");
  }
  public set scoreTemplate(val: boolean) {
    this.setPropertyValue("scoreTemplate", val);
  }
  public get texts(): any {
    return this.getPropertyValue("texts");
  }
  public set texts(val: any) {
    this.setPropertyValue("texts", val);
  }
  public get voidIconClass(): any {
    return this.getPropertyValue("voidIconClass");
  }
  public set voidIconClass(val: any) {
    this.setPropertyValue("voidIconClass", val);
  }
  public get colors(): any {
    return this.getPropertyValue("colors");
  }
  public set colors(val: any) {
    this.setPropertyValue("colors", val);
  }

  isEmpty(): boolean {
    return super.isEmpty() || this.value === "";
  }
  supportGoNextPageAutomatic() {
    return true;
  }
}
 Serializer.addClass(
  "rate",
  [
    
    { name: "clearable:boolean", default: false },
    { name: "max:number", default: 10 },
    { name: "allowHalf:boolean", default: false },
    { name: "lowThreshold:number", default: 3 },
    { name: "highThreshold:number", default: 7 },
    { name: "voidColor:color", default: "#C6D1DE" },
    { name: "disabledVoidColor:color", default: "#C6D1DE" },
    { name: "iconClasses:array", default:[], choices: icons},
    { name: "texts:array", default:[], choices: [] },
    { name: "showText:boolean", default: false },
    { name: "showScore:boolean", default: false },
    { name: "textColor:color", default: "#1F2D3D" },
    { name: "scoreTemplate:string", default: "{value}" },
    { name: "voidIconClass:string", default: "" , choices: icons},
    { name: "colors:array", default: "" , choices: []},
    { name: "inputSize:string", 
      default: "small" ,
      choices: [
      "medium",
      "small",
      "mini",
      
    ]},   
  ],
  function() {
    return new QuestionRatetimeModel("");
  },
  "question"
);

QuestionFactory.Instance.registerQuestion("rate", name => {
  return new QuestionRatetimeModel(name);
});
