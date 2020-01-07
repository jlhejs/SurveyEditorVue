import { Serializer } from "./jsonobject";
import { QuestionFactory } from "./questionfactory";
import { QuestionCheckboxBase } from "./question_baseselect";
import { Helpers } from "./helpers";
import { ItemValue } from "./itemvalue";
import { surveyLocalization } from "./surveyStrings";
import { LocalizableString } from "./localizablestring";

/**
 * A Model for a Cascader question
 */
export class QuestionCascaderModel extends QuestionCheckboxBase {
  private noneItemValue: ItemValue = new ItemValue("none");
  constructor(public name: string) {
    super(name);
    // var noneItemText = this.createLocalizableString("noneText", this, true);
    // noneItemText.onGetTextCallback = function(text) {
    //   return !!text ? text : surveyLocalization.getString("noneItemText");
    // };
    // this.noneItemValue.locOwner = this;
    // this.noneItemValue.setLocText(noneItemText);



    var self = this;
    // this.registerFunctionOnPropertiesValueChanged(
    //   ["hasNone", "noneText", "hasSelectAll", "selectAllText"],
    //   function() {
    //     self.onVisibleChoicesChanged();
    //   }
    // );
  }
  public getType(): string {
    return "cascader";
  }
  public get computedVisibleChoices(): Array<ItemValue> {
    var visibleChoices=this.visibleChoices;
    for(var i=0;i<visibleChoices.length;i++){
      if(visibleChoices[i].value.indexOf("+")){

      }
    }
    return this.getPropertyValue("visibleChoices", []);
  }
  public get visibleChoicesToText(): Array<ItemValue> {
    var visibleChoices=this.visibleChoices;
    for(var i=0;i<visibleChoices.length;i++){
      if(visibleChoices[i].value.indexOf("+")){

      }
    }
    return this.getPropertyValue("visibleChoices", []);
  }
  protected onCreating() {
    super.onCreating();
    this.createNewArray("renderedValue");
    this.createNewArray("value");
  }
  protected getFirstInputElementId(): string {
    return this.inputId + "_0";
  }


  /**
  * The text input size 输入框大小尺寸
  */
  public get inputSize(): string {
    return this.getPropertyValue("inputSize","small");
  }
  public set inputSize(val: string) {
    this.setPropertyValue("inputSize", val);
  }
  // placeholder
  // disabled
  // clearable
  /**
  * 是否支持清空选项	https://element.eleme.cn/2.13/#/zh-CN/component/cascader
  */
  public get clearable(): boolean {
    return this.getPropertyValue("clearable",false);
  }
  public set clearable(val: boolean) {
    this.setPropertyValue("clearable", val);
  }
  /**
  * 输入框中是否显示选中值的完整路径 https://element.eleme.cn/2.13/#/zh-CN/component/cascader
  */
  public get showAllLevels (): boolean {
  return this.getPropertyValue("showAllLevels",true);
  }
  public set showAllLevels (val: boolean) {
    this.setPropertyValue("showAllLevels", val);
  }
  /**
  * 输入框中是否显示选中值的完整路径 https://element.eleme.cn/2.13/#/zh-CN/component/cascader
  */
  public get collapseTags (): boolean {
    return this.getPropertyValue("collapseTags",true);

  }
  public set collapseTags (val: boolean) {
    this.setPropertyValue("collapseTags", val);
  }
  /**
  * 选项分隔符 https://element.eleme.cn/2.13/#/zh-CN/component/cascader
  */
  public get separator (): string {
    return this.getPropertyValue("separator","/");
  }
  public set separator (val: string) {
    this.setPropertyValue("separator", val);
  }
  /**
  * 是否可搜索选项 https://element.eleme.cn/2.13/#/zh-CN/component/cascader
  */
  public get filterable (): boolean {
    return this.getPropertyValue("filterable",false);
  }
  public set filterable (val: boolean) {
    this.setPropertyValue("filterable", val);
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
  * 次级菜单的展开方式 https://element.eleme.cn/2.13/#/zh-CN/component/cascader
  */
  public get expandTrigger (): string {
    return this.getPropertyValue("expandTrigger","click");
  }
  public set expandTrigger (val: string) {
    this.setPropertyValue("expandTrigger", val);
  }
  /**
  * 多选 https://element.eleme.cn/2.13/#/zh-CN/component/cascader
  */
  public get multiple (): boolean {
    return this.getPropertyValue("multiple",false);
  }
  public set multiple (val: boolean) {
    this.setPropertyValue("multiple", val);
  }
  /**
  * 选择任意一级选项 https://element.eleme.cn/2.13/#/zh-CN/component/cascader
  */
  public get checkStrictly (): boolean {
    return this.getPropertyValue("checkStrictly",false);
  }
  public set checkStrictly (val: boolean) {
    this.setPropertyValue("checkStrictly", val);
  }
  /**
   * 级联面板 https://element.eleme.cn/2.13/#/zh-CN/component/cascader
   */
  public get isCascaderPanel (): boolean {
    return this.getPropertyValue("isCascaderPanel",false);
  }
  public set isCascaderPanel (val: boolean) {
    this.setPropertyValue("isCascaderPanel", val);
  }
  
  public get propsObj (): any {
    var props:any={emitPath:false}
    if(this.expandTrigger)props.expandTrigger=this.expandTrigger
    if(this.multiple)props.multiple=this.multiple
    if(this.checkStrictly)props.checkStrictly=this.checkStrictly
    // lazy	是否动态加载子节点，需与 lazyLoad 方法结合使用	boolean	-	false
    // lazyLoad	加载动态数据的方法，仅在 lazy 为 true 时有效	function(node, resolve)，node为当前点击的节点，resolve为数据加载完成的回调(必须调用)	-https://element.eleme.cn/2.13/#/zh-CN/component/cascader
    // value	指定选项的值为选项对象的某个属性值	string	—	'value'
    // label	指定选项标签为选项对象的某个属性值	string	—	'label'
    // children	指定选项的子选项为选项对象的某个属性值	string	—	'children'
    // disabled	指定选项的禁用为选项对象的某个属性值	string	—	'disabled'
    // leaf	指定选项的叶子节点的标志位为选项对象的某个属性值	string	—	'leaf'
    return props
  }

  /**
   * Returns true if item is checked
   * @param item checkbox item value
   */
  public isItemSelected(item: ItemValue): boolean {
    var val = this.renderedValue;
    if (!val || !Array.isArray(val)) return false;
    for (var i = 0; i < val.length; i++) {
      if (Helpers.isTwoValueEquals(val[i], item.value)) return true;
    }
    return false;
  }
  protected setNewValue(newValue: any) {
    newValue = this.valueFromData(newValue);
    var value = this.value;
    if (!newValue) newValue = [];
    if (!value) value = [];
    if (Helpers.isTwoValueEquals(value, newValue)) return;
    // if (this.hasNone) {
    //   var prevNoneIndex = this.noneIndexInArray(value);
    //   var newNoneIndex = this.noneIndexInArray(newValue);
    //   if (prevNoneIndex > -1) {
    //     if (newNoneIndex > -1 && newValue.length > 1) {
    //       newValue.splice(newNoneIndex, 1);
    //     }
    //   } else {
    //     if (newNoneIndex > -1) {
    //       newValue.splice(0, newValue.length);
    //       newValue.push(this.noneItem.value);
    //     }
    //   }
    // }
    super.setNewValue(newValue);
  }
  private noneIndexInArray(val: any) {
    if (!val || !Array.isArray(val)) return -1;
    var noneValue = this.noneItem.value;
    for (var i = 0; i < val.length; i++) {
      if (val[i] == noneValue) return i;
    }
    return -1;
  }


  protected getDisplayValueCore(keysAsText: boolean, value: any): any {
    if (!Array.isArray(value))
      return super.getDisplayValueCore(keysAsText, value);
    var items = this.visibleChoices;
    var str = "";
    for (var i = 0; i < value.length; i++) {
      var valStr = this.getChoicesDisplayValue(items, value[i]);
      if (valStr) {
        if (str) str += ", ";
        str += valStr;
      }
    }
    return str;
  }
  protected clearIncorrectValuesCore() {
    this.clearIncorrectAndDisabledValues(false);
  }
  protected clearDisabledValuesCore() {
    this.clearIncorrectAndDisabledValues(true);
  }
  private clearIncorrectAndDisabledValues(clearDisabled: boolean) {
    var val = this.value;
    if (!val) return;
    if (!Array.isArray(val) || val.length == 0) {
      if (!clearDisabled) {
        if (this.hasComment) {
          this.value = null;
        } else {
          this.clearValue();
        }
      }
      return;
    }
    var newValue = [];
    for (var i = 0; i < val.length; i++) {
      if (
        (!clearDisabled && !this.canClearValueAnUnknow(val[i])) ||
        (clearDisabled && !this.isValueDisabled(val[i]))
      ) {
        newValue.push(val[i]);
      }
    }
    if (newValue.length == val.length) return;
    if (newValue.length == 0) {
      this.clearValue();
    } else {
      this.value = newValue;
    }
  }
  public getConditionJson(operator: string = null, path: string = null): any {
    var json = super.getConditionJson();
    if (operator == "contains" || operator == "notcontains") {
      json["type"] = "radiogroup";
    }
    return json;
  }
  public isAnswerCorrect(): boolean {
    return Helpers.isArrayContainsEqual(this.value, this.correctAnswer);
  }
  protected setDefaultValueWithOthers() {
    this.value = this.renderedValueFromDataCore(this.defaultValue);
  }
  protected getHasOther(val: any): boolean {
    if (!val || !Array.isArray(val)) return false;
    return val.indexOf(this.otherItem.value) >= 0;
  }
  protected valueFromData(val: any): any {
    if (!val) return val;
    if (!Array.isArray(val)) return [super.valueFromData(val)];
    let value = [];
    for (let i = 0; i < val.length; i++) {
      let choiceitem = ItemValue.getItemByValue(this.activeChoices, val[i]);
      if (!!choiceitem) {
        value.push(choiceitem.value);
      } else {
        value.push(val[i]);
      }
    }
    return value;
  }
  protected renderedValueFromDataCore(val: any): any {
    if (!val || !Array.isArray(val)) val = [];
    for (var i = 0; i < val.length; i++) {
      if (val[i] == this.otherItem.value) return val;
      if (this.hasUnknownValue(val[i])) {
        this.comment = val[i];
        var newVal = val.slice();
        newVal[i] = this.otherItem.value;
        return newVal;
      }
    }
    return val;
  }
  protected rendredValueToDataCore(val: any): any {
    if (!val || !val.length) return val;
    for (var i = 0; i < val.length; i++) {
      if (val[i] == this.otherItem.value) {
        if (this.getComment()) {
          var newVal = val.slice();
          newVal[i] = this.getComment();
          return newVal;
        }
      }
    }
    return val;
  }
  // protected hasUnknownValue(val: any, includeOther: boolean = false): boolean {
  //   if (this.hasNone && val == this.noneItemValue.value) return false;
  //   return super.hasUnknownValue(val, includeOther);
  // }
  protected addSupportedValidators(supportedValidators: Array<string>) {
    super.addSupportedValidators(supportedValidators);
    supportedValidators.push("answercount");
  }
}
Serializer.addClass(
  "cascader",
  [
    { name: "inputWidth:number", default: 250 },
    { name: "inputSize:string", 
      default: "small" ,
      choices: [
      "medium",
      "small",
      "mini",
      
      ]
    },
    { name: "clearable:boolean", default: false },
    { name: "showAllLevels:boolean", default: true },
    { name: "collapseTags:boolean", default: true },
    { name: "separator:string", default: "/" },
    { name: "filterable:boolean", default: false },
    
    // Props
    { name: "expandTrigger:string", 
      default: "click" ,
      choices: [
      "click",
      "hover",  
      ]
    },
    { name: "multiple:boolean", default: false },
    { name: "checkStrictly:boolean", default: false },
    { name: "isCascaderPanel:boolean", default: false },
  ],
  function() {
    return new QuestionCascaderModel("");
  },
  "checkboxbase"
);
QuestionFactory.Instance.registerQuestion("cascader", name => {
  var q = new QuestionCascaderModel(name);
  q.choices = QuestionFactory.DefaultChoices;
  return q;
});
