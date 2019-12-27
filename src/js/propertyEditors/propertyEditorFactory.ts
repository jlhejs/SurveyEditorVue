import * as ko from "knockout";
import Vue from "vue";
import * as Survey from "survey-vue";
import { SurveyPropertyEditorBase } from "./propertyEditorBase";
import { SurveyPropertyCustomEditor } from "./propertyCustomEditor";
import { editorLocalization } from "../editorLocalization";
import { JsonObjectProperty } from "survey-vue";

export class SurveyPropertyEditorFactory {
  public static defaultEditor: string = "string";
  private static creatorList = {};
  private static creatorByClassList = {};
  private static widgetRegisterList = {};
  public static getOperators(): Array<any> {
    var operators = [
      "empty",
      "notempty",
      "equal",
      "notequal",
      "contains",
      "notcontains",
      "anyof",
      "allof",
      "greater",
      "less",
      "greaterorequal",
      "lessorequal"
    ];
    var result = [];
    for (var i = 0; i < operators.length; i++) {
      var name = operators[i];
      result.push({
        name: name,
        text: editorLocalization.getString("op." + name)
      });
    }
    return result;
  }
  public static registerEditor(
    name: string,
    creator: (property: Survey.JsonObjectProperty) => SurveyPropertyEditorBase,
    editableClassName: string = null
  ) {
    SurveyPropertyEditorFactory.creatorList[name] = creator;
    var className = editableClassName ? editableClassName : name;
    SurveyPropertyEditorFactory.creatorByClassList[className] = creator;
  }
  public static registerCustomEditor(name: string, widgetJSON: any) {
    SurveyPropertyEditorFactory.widgetRegisterList[name] = widgetJSON;
  }
  public static unregisterCustomEditor(name: string) {
    delete SurveyPropertyEditorFactory.widgetRegisterList[name];
  }
  public static createEditor(
    property: Survey.JsonObjectProperty,
    func: (newValue: any) => any
  ): SurveyPropertyEditorBase {
    var editorType = property.type;
    if (
      SurveyPropertyEditorFactory.isDropdownEditor(property) &&
      (!editorType || editorType == SurveyPropertyEditorFactory.defaultEditor)
    ) {
      editorType = "dropdown";
    }
    var propertyEditor = SurveyPropertyEditorFactory.createCustomEditor(
      editorType,
      property
    );
    if (!propertyEditor) {
      var creator = SurveyPropertyEditorFactory.creatorList[editorType];
      if (creator) propertyEditor = creator(property);
    }
    if (!propertyEditor) {
      if (
        property.isArray &&
        Survey.Serializer.isDescendantOf(property.className, "itemvalue")
      ) {
        var creator = SurveyPropertyEditorFactory.creatorList["itemvalue[]"];
        if (creator) propertyEditor = creator(property);
      }
    }
    if (!propertyEditor) {
      creator = SurveyPropertyEditorFactory.findParentCreator(editorType);
      propertyEditor = creator(property);
    }
    propertyEditor.onChanged = func;
    return propertyEditor;
  }
  private static isDropdownEditor(
    property: Survey.JsonObjectProperty
  ): boolean {
    if (property["hasChoices"] !== undefined)
      return property["hasChoices"] === true;
    return property.choices != null;
  }
  private static createCustomEditor(
    name: string,
    property: Survey.JsonObjectProperty
  ) {
    var widgetJSON = SurveyPropertyEditorFactory.widgetRegisterList[name];
    if (!widgetJSON) return null;
    return new SurveyPropertyCustomEditor(property, widgetJSON);
  }
  private static findParentCreator(
    name: string
  ): (property: Survey.JsonObjectProperty) => SurveyPropertyEditorBase {
    var jsonClass = Survey.Serializer.findClass(name);
    while (jsonClass && jsonClass.parentName) {
      var creator =
        SurveyPropertyEditorFactory.creatorByClassList[jsonClass.parentName];
      if (creator) return creator;
      jsonClass = Survey.Serializer.findClass(jsonClass.parentName);
    }
    return SurveyPropertyEditorFactory.creatorList[
      SurveyPropertyEditorFactory.defaultEditor
    ];
  }
}
export class SurveyStringPropertyEditor extends SurveyPropertyEditorBase {
  constructor(property: Survey.JsonObjectProperty) {
    super(property);
  }
  public get editorType(): string {
    return "string";
  }
}
export class SurveyDropdownPropertyEditor extends SurveyPropertyEditorBase {
  public koChoices: any;
  public koHasFocus: any;
  constructor(property: Survey.JsonObjectProperty) {
    super(property);
    this.koChoices = Vue.observable([]);
    this.koHasFocus = Vue.observable(false);
    var self = this;
    // this.koHasFocus.subscribe(function(newValue) {
    //   //TODO isDynamicChoices obsolete, use dependsOn attribute
    //   if (newValue && self.property["isDynamicChoices"]) {
    //     self.updateChoices();
    //   }
    // });
  }
  public get editorType(): string {
    return "dropdown";
  }
  public getValueText(value: any): string {
    if (this.property.name === "locale") {
      let text = editorLocalization.getLocaleName(value);
      if (text) return text;
    }
    if (this.property.name === "cellType") {
      let text = editorLocalization.getString("qt." + value);
      if (text) return text;
    }
    if (value === null) return null;
    return editorLocalization.getPropertyValue(value);
  }
  public setObject(value: any) {
    super.setObject(value);
    this.beginValueUpdating();
    if (this.koChoices.length == 0) {
      this.updateChoices();
    }
    this.endValueUpdating();
  }
  public updateDynamicProperties() {
    super.updateDynamicProperties();
    this.updateChoices();
  }
  public updateChoices() {
    var choices = this.getPropertyChoices();
    this.setChoices(choices);
  }
  private setChoices(choices: Array<Survey.ItemValue>) {
    choices = this.makeChoicesLocalizable(choices);
    if (!!choices && Array.isArray(choices)) {
      this.koChoices=choices;
    }
  }
  private makeChoicesLocalizable(choices: Array<Survey.ItemValue>) {
    if (!choices) return choices;
    var res = new Array<Survey.ItemValue>();
    Survey.ItemValue.setData(res, choices);
    for (var i = 0; i < res.length; i++) {
      var value = res[i].value;
      var text = this.getValueText(value);
      if (text != value) {
        res[i].text = text;
      }
    }
    return res;
  }
  private getPropertyChoices(): Array<any> {
    if (!this.property) return null;
    if (!!this.object) {
      var obj = this.object;
      this.object["getEditingPropertyValue"] = function(name: string) {
        if (!!obj.editingProperties && obj.editingProperties[name] != undefined)
          return obj.editingProperties[name];
        return obj[name];
      };
    }
    var self = this;
    return (<any>this.property["getChoices"])(this.object, function(
      choices: any
    ) {
      self.setChoices(choices);
    });
  }
}
export class SurveyBooleanPropertyEditor extends SurveyPropertyEditorBase {
  constructor(property: Survey.JsonObjectProperty) {
    super(property);
  }
  public get editorType(): string {
    return "boolean";
  }
  public get alwaysShowEditor(): boolean {
    return true;
  }
  public get canShowDisplayNameOnTop(): boolean {
    return false;
  }
  public getValueText(value: any): string {
    return editorLocalization.getPropertyValue(value);
  }
}
export class SurveyNumberPropertyEditor extends SurveyPropertyEditorBase {
  constructor(property: Survey.JsonObjectProperty) {
    super(property);
  }
  public get editorType(): string {
    return "number";
  }
  protected getCorrectedValue(value: any): any {
    if (!value) return value;
    if (typeof value === "string" || value instanceof String) {
      value = Number(value);
      if (!value) value = 0;
    }
    return super.getCorrectedValue(value);
  }
}


// console.log(SurveyPropertyEditorFactory)


SurveyPropertyEditorFactory.registerEditor("string", function(
  property: Survey.JsonObjectProperty
): SurveyPropertyEditorBase {
  return new SurveyStringPropertyEditor(property);
});
SurveyPropertyEditorFactory.registerEditor("dropdown", function(
  property: Survey.JsonObjectProperty
): SurveyPropertyEditorBase {
  return new SurveyDropdownPropertyEditor(property);
});
SurveyPropertyEditorFactory.registerEditor("boolean", function(
  property: Survey.JsonObjectProperty
): SurveyPropertyEditorBase {
  return new SurveyBooleanPropertyEditor(property);
});
SurveyPropertyEditorFactory.registerEditor("number", function(
  property: Survey.JsonObjectProperty
): SurveyPropertyEditorBase {
  return new SurveyNumberPropertyEditor(property);
});





import { focusFirstControl } from "../utils/utils";
import RModal from "rmodal";
import { MessageBox } from 'element-ui';

export class SurveyPropertyModalEditorCustomWidget {
  private static customWidgetId = 1;
  private static customWidgetName = "modalEditorCustomWidget";
  constructor(public json: any) {}
  public afterRender(editor: SurveyPropertyModalEditor, el: HTMLElement) {
    if (this.json && this.json.afterRender) {
      if (!el.id) {
        el.id =
          SurveyPropertyModalEditorCustomWidget.customWidgetName +
          SurveyPropertyModalEditorCustomWidget.customWidgetId;
        SurveyPropertyModalEditorCustomWidget.customWidgetId++;
      }
      this.json.afterRender(editor, el);
      if (this.json.destroy) {
        var self = this;
        ko.utils.domNodeDisposal.addDisposeCallback(el, function() {
          self.destroy(editor, el);
        });
      }
    }
  }
  public destroy(editor: SurveyPropertyModalEditor, el: HTMLElement) {
    if (this.json && this.json.destroy) {
      this.json.destroy(editor, el);
    }
  }
}

export class SurveyPropertyModalEditor extends SurveyPropertyEditorBase {
  private static customWidgets;
  public static registerCustomWidget(editorType: string, json: any) {
    if (!SurveyPropertyModalEditor.customWidgets)
      SurveyPropertyModalEditor.customWidgets = {};
    SurveyPropertyModalEditor.customWidgets[
      editorType
    ] = new SurveyPropertyModalEditorCustomWidget(json);
  }
  protected static idCounter = 1;
  public static getCustomWidget(
    editorType: string
  ): SurveyPropertyModalEditorCustomWidget {
    if (!SurveyPropertyModalEditor.customWidgets) return null;
    return SurveyPropertyModalEditor.customWidgets[editorType];
  }
  private isShowingModalValue: boolean = false;
  private elements: HTMLElement[];
  public editingObject: any;
  public onApplyClick: any;
  public onOkClick: any;
  public onResetClick: any;
  public onShowModal: any;
  public onHideModal: any;
  public modalName: string;
  public modalNameTarget: string;
  koShowApplyButton: any;
  koTitleCaption: any;
  koAfterRender: any;
  koHtmlTop: any;
  koHtmlBottom: any;
  constructor(property: Survey.JsonObjectProperty) {
    super(property);
    this.koTitleCaption = Vue.observable("");
    this.koHtmlTop = Vue.observable("");
    this.koHtmlBottom = Vue.observable("");
    if (this.property) {
      this.koTitleCaption=editorLocalization
      .getString("pe.editProperty")
      ["format"](editorLocalization.getPropertyName(this.property.name));
    }
    this.modalName =
      "modelEditor" + this.editorType + SurveyPropertyModalEditor.idCounter;
    SurveyPropertyModalEditor.idCounter++;
    this.modalNameTarget = "#" + this.modalName;
    var self = this;
    this.koShowApplyButton = ko.observable(true);

    self.onHideModal = function() {};
    self.onApplyClick = function() {
      self.apply();
    };
    self.onOkClick = function() {
      self.apply();
      if (!self.koHasError()) self.onHideModal();
    };
    self.onResetClick = function() {
      self.updateValue();
      self.onHideModal();
    };
    self.onShowModal = function() {
      self.beforeShow();
      // self.beforeShow();
      // var modal = new RModal(document.querySelector(self.modalNameTarget), {
      //   bodyClass: "",
      //   closeTimeout: 100,
      //   dialogOpenClass: "animated fadeInDown",
      //   focus: false
      // });
      // modal.open();

 

      self.onHideModal = function() {
        self.beforeCloseModal();
        self.isShowingModalValue=false

      };
      // if (!!this.elements) {
      //   focusFirstControl(this.elements);
      // }
    };
    self.koAfterRender = function(el, con) {
      return self.afterRender(el, con);
    };
  }
  public setup() {
    super.setup();
    this.beforeShow();
  }
  public get isModal(): boolean {
    return true;
  }
  public get isShowingModal(): boolean {
    return this.isShowingModalValue;
  }
  public set isShowingModal(value: boolean) {
    this.isShowingModalValue=value;
  }
  public beforeShow() {
    this.isShowingModalValue = true;
    this.updateValue();
  }
  public beforeCloseModal() {
    this.isShowingModalValue = false;
  }
  protected onOptionsChanged() {
    this.koShowApplyButton = ko.observable(
      !this.options || this.options.showApplyButtonInEditors
    );
  }
  public setObject(value: any) {
    this.editingObject = value;
    super.setObject(value);
    if (this.options && this.property) {
      var html = this.options.onPropertyEditorModalShowDescriptionCallback(
        this.property.name,
        value
      );
      if (html) {
        if (html.top) this.koHtmlTop=html.top;
        if (html.bottom) this.koHtmlBottom=html.bottom;
      }
    }
  }
  public get isEditable(): boolean {
    return false;
  }
  protected afterRender(elements, con) {
    this.elements = elements;
    var customWidget = SurveyPropertyModalEditor.getCustomWidget(
      this.editorType
    );
    if (!!customWidget) {
      var el = this.GetFirstNonTextElement(elements);
      var tEl = elements[0];
      if (tEl.nodeName == "#text") tEl.data = "";
      tEl = elements[elements.length - 1];
      if (tEl.nodeName == "#text") tEl.data = "";
      customWidget.afterRender(this, el);
    }
    focusFirstControl(elements);
  }
  private GetFirstNonTextElement(elements: any) {
    if (!elements || !elements.length) return;
    for (var i = 0; i < elements.length; i++) {
      if (elements[i].nodeName != "#text" && elements[i].nodeName != "#comment")
        return elements[i];
    }
    return null;
  }
}

export class SurveyPropertyTextEditor extends SurveyPropertyModalEditor {
  public koTextValue: any;

  constructor(property: Survey.JsonObjectProperty) {
    super(property);
    this.koTextValue = ko.observable();
    var self = this;
    this.koTextValue.subscribe(function(newValue) {
      self.onkoTextValueChanged(newValue);
    });
  }
  public get editorType(): string {
    return "text";
  }
  public get isEditable(): boolean {
    return true;
  }
  public getValueText(value: any): string {
    if (!value) return null;
    var str = value;
    if (str.length > 20) {
      str = str.substr(0, 20) + "...";
    }
    return str;
  }
  protected onkoTextValueChanged(newValue) {}
  public onValueChanged() {
    this.koTextValue(this.editingValue);
  }
  protected onBeforeApply() {
    this.setValueCore(this.koTextValue());
  }
}

export class SurveyPropertyHtmlEditor extends SurveyPropertyTextEditor {
  constructor(property: Survey.JsonObjectProperty) {
    super(property);
  }
  public get editorType(): string {
    return "html";
  }
}
SurveyPropertyEditorFactory.registerEditor("text", function(
  property: Survey.JsonObjectProperty
): SurveyPropertyEditorBase {
  return new SurveyPropertyTextEditor(property);
});
SurveyPropertyEditorFactory.registerEditor("html", function(
  property: Survey.JsonObjectProperty
): SurveyPropertyEditorBase {
  return new SurveyPropertyHtmlEditor(property);
});





import Sortable from "sortablejs";

export class SurveyPropertyItemsEditor extends SurveyPropertyModalEditor {
  public koItems: any;
  public onDeleteClick: any;
  public onAddClick: any;
  public onClearClick: any;
  koAllowAddRemoveItems: any;

  constructor(property: Survey.JsonObjectProperty) {
    super(property);
    this.koItems = ko.observableArray();
    this.editingValue = [];
    this.koAllowAddRemoveItems = ko.observable(true);
    var self = this;
    self.onDeleteClick = function(item) {
      self.koItems.remove(item);
    };
    self.onClearClick = function(item) {
      self.koItems.removeAll();
    };
    self.onAddClick = function() {
      self.AddItem();
    };
  }
  public getValueText(value: any): string {
    var len = value ? value.length : 0;
    return editorLocalization.getString("pe.items")["format"](len);
  }
  protected getCorrectedValue(value: any): any {
    if (value == null || !Array.isArray(value)) value = [];
    return super.getCorrectedValue(value);
  }
  protected createEditorOptions(): any {
    return { allowAddRemoveItems: true };
  }
  protected onSetEditorOptions(editorOptions: any) {
    this.koAllowAddRemoveItems(editorOptions.allowAddRemoveItems);
  }
  public sortableOptions = {
    handle: ".svd-drag-handle",
    animation: 150
  };
  protected AddItem() {
    this.koItems.push(this.createEditorItemCore());
  }

  protected setupItems() {
    this.koItems(this.getItemsFromValue(this.editingValue));
  }
  public onValueChanged() {
    if (this.isShowingModal) {
      this.setupItems();
    }
  }
  public setup() {
    super.setup();
    this.updateValue();
  }
  protected getItemsFromValue(value: any = null): Array<any> {
    var items = [];
    if (!value) value = this.editingValue;
    for (var i = 0; i < value.length; i++) {
      items.push(this.createEditorItemCore(value[i]));
    }
    return items;
  }
  protected get isCurrentValueEmpty() {
    return this.koItems().length == 0;
  }
  protected onBeforeApply() {
    var items = [];
    var internalItems = this.koItems();
    for (var i = 0; i < internalItems.length; i++) {
      items.push(this.createItemFromEditorItem(internalItems[i]));
    }
    this.setValueCore(items);
  }
  protected createEditorItemCore(item: any = null) {
    var editorItem = !!item
      ? this.createEditorItem(item)
      : this.createNewEditorItem();
    if (!!editorItem.onCreated) {
      editorItem.onCreated();
    }
    return editorItem;
  }
  protected createNewEditorItem(): any {
    throw "Override 'createNewEditorItem' method";
  }
  protected createEditorItem(item: any) {
    return item;
  }
  protected createItemFromEditorItem(editorItem: any) {
    return editorItem;
  }
}



// import { SurveyPropertyItemsEditor } from "./propertyItemsEditor";

// import { SurveyPropertyConditionEditor } from "./propertyConditionEditor";
// import { SurveyPropertyDefaultValueEditor } from "./propertyDefaultValueEditor";
// import {SurveyElementSelector} from "../propertyEditors/surveyElementSelector";
// import { ExpressionToDisplayText } from "../expressionToDisplayText";
// import { EditableObject } from "./editableObject";

interface Element {
  text?: string;
  name?: string;
  page?: Survey.Page;
  question?: Survey.Question;
}

export class SurveyPropertyTriggersEditor extends SurveyPropertyItemsEditor {
  public static createTriggerEditor(
    survey: Survey.SurveyModel,
    trigger: Survey.SurveyTrigger,
    options: any
  ): SurveyPropertyTrigger {
    trigger["survey"] = survey;
    if (trigger.getType() == "setvaluetrigger")
      return new SurveyPropertySetValueTrigger(
        survey,
        <Survey.SurveyTriggerSetValue>trigger,
        options
      );
    if (trigger.getType() == "copyvaluetrigger")
      return new SurveyPropertyCopyValueTrigger(survey, trigger, options);
    if (trigger.getType() == "skiptrigger")
      return new SurveyPropertySkipTrigger(survey, trigger, options);
    if (trigger.getType() == "runexpressiontrigger")
      return new SurveyPropertyRunExpressionTrigger(survey, trigger, options);
    return new SurveyPropertyTrigger(survey, trigger, options);
  }

  koElements: any;
  koQuestions: any;
  koPages: any;
  public koSelected: any;
  public koTriggers: any;
  public availableTriggers: Array<string> = [];
  private triggerClasses: Array<Survey.JsonMetadataClass> = [];
  constructor(property: Survey.JsonObjectProperty) {
    super(property);
    var self = this;
    this.onDeleteClick = function() {
      if (self.readOnly()) return;
      self.koItems.remove(self.koSelected());
    };
    this.onAddClick = function(item) {
      self.addItem(item.value);
    };
    this.koSelected = ko.observable(null);
    this.koSelected.subscribe(function(newValue) {
      if (!!newValue) {
        newValue.beforeShow();
      }
    });
    this.koPages = ko.observableArray();
    this.koQuestions = ko.observableArray();
    this.koElements = ko.observableArray();
    this.triggerClasses = Survey.Serializer.getChildrenClasses(
      "surveytrigger",
      true
    );
    this.availableTriggers = this.getAvailableTriggers();
    this.koTriggers = ko.observableArray(this.getLocalizedTriggers());
  }
  public get editorType(): string {
    return "triggers";
  }
  public onValueChanged() {
    if (this.editingObject) {
      var allQuestions = this.getOrigionalSurvey().getAllQuestions();
      this.koPages(this.getElements(this.getOrigionalSurvey().pages));
      this.koQuestions(this.getElements(allQuestions));
      this.koElements(this.getElements(this.getAllElements()));
    }
    super.onValueChanged();
    if (this.koSelected) {
      this.koSelected(this.koItems().length > 0 ? this.koItems()[0] : null);
    }
  }
  //TODO this code should be in the library
  private getAllElements(): Array<any> {
    var res = [];
    var pages = this.getOrigionalSurvey().pages;
    for (var i = 0; i < pages.length; i++) {
      this.addElemenetsIntoList(pages[i], res);
    }
    return res;
  }
  private addElemenetsIntoList(element: any, list: Array<any>) {
    var elements = element.getElementsInDesign(false);
    if (!elements) return;
    for (var i = 0; i < elements.length; i++) {
      list.push(elements[i]);
      this.addElemenetsIntoList(<Survey.SurveyElement>elements[i], list);
    }
  }
  private addItem(triggerType: string) {
    var trigger = Survey.Serializer.createClass(triggerType);
    var triggerItem = this.createPropertyTrigger(trigger);
    this.koItems.push(triggerItem);
    this.koSelected(triggerItem);
  }
  protected createEditorItem(item: any) {
    var jsonObj = new Survey.JsonObject();
    var trigger = Survey.Serializer.createClass(item.getType());
    jsonObj.toObject(item, trigger);
    return this.createPropertyTrigger(<Survey.SurveyTrigger>trigger);
  }
  protected createItemFromEditorItem(editorItem: any) {
    var editorTrigger = <SurveyPropertyTrigger>editorItem;
    return editorTrigger.createTrigger();
  }
  private getLocalizedTriggers(): Array<any> {
    var res = [];
    for (var i = 0; i < this.availableTriggers.length; i++) {
      var name = this.availableTriggers[i];
      res.push({ value: name, text: editorLocalization.getTriggerName(name) });
    }
    return res;
  }
  private getAvailableTriggers(): Array<string> {
    var result = [];
    for (var i = 0; i < this.triggerClasses.length; i++) {
      var name = this.triggerClasses[i].name;
      if (name == "visibletrigger") continue;
      result.push(name);
    }
    return result;
  }
  private getElements(items: Array<any>): Array<string> {
    var elements = [];
    var options = <any>this.options;

    items.forEach(item => {
      var element: Element = {};

      element.name = item.name;
      element.text = item.name;

      if (
        this.options &&
        this.options.showTitlesInExpressions &&
        item["title"]
      ) {
        element.text = item.title;
      }

      if (item.isPage) {
        element.page = item;
      } else {
        element.question = item;
      }

      elements.push(element);
    });

    options &&
      options.onConditionQuestionsGetListCallback(
        this.editablePropertyName,
        this,
        options,
        elements
      );

    return elements;
  }
  private createPropertyTrigger(
    trigger: Survey.SurveyTrigger
  ): SurveyPropertyTrigger {
    var survey = this.getSurvey();
    trigger["survey"] = survey;
    if (trigger.getType() == "visibletrigger") {
      return new SurveyPropertyVisibleTrigger(
        survey,
        <Survey.SurveyTriggerVisible>trigger,
        this.options,
        this.koPages,
        this.koElements
      );
    }
    return SurveyPropertyTriggersEditor.createTriggerEditor(
      survey,
      trigger,
      this.options
    );
  }
  private getSurvey(): Survey.SurveyModel {
    return !!this.object ? this.object : this.editingObject;
  }
  private getOrigionalSurvey(): Survey.SurveyModel {
    return EditableObject.getOrigionalSurvey(this.getSurvey());
  }
}
export class SurveyPropertyTrigger {
  private triggerType: string;
  koType: any;
  koText: any;
  koIsValid: any;
  conditionEditor: SurveyPropertyConditionEditor = null;

  constructor(
    public survey: Survey.SurveyModel,
    public trigger: Survey.SurveyTrigger,
    public options?: any
  ) {
    this.triggerType = trigger.getType();
    this.koType = ko.observable(this.triggerType);
    var expressionProperty = Survey.Serializer.findProperty(
      "trigger",
      "expression"
    );
    this.conditionEditor = new SurveyPropertyConditionEditor(
      expressionProperty
    );
    this.conditionEditor.options = options;
    this.conditionEditor.showHelpText = false;
    if (!this.trigger.expression) {
      this.trigger.expression = this.trigger.buildExpression();
    }
    this.conditionEditor.object = this.trigger;
    var self = this;
    this.koIsValid = ko.computed(() => {
      var text = self.conditionEditor.koTextValue();
      return !!text;
    });
    this.koText = ko.computed(() => {
      return self.getText();
    });
  }
  public beforeShow() {
    this.conditionEditor.beforeShow();
  }
  public hasError(): boolean {
    return false;
  }
  public createTrigger(): Survey.SurveyTrigger {
    var trigger = <Survey.SurveyTrigger>(
      Survey.Serializer.createClass(this.triggerType)
    );
    trigger["expression"] = this.conditionEditor.koTextValue();
    this.applyProperties(trigger);
    return trigger;
  }
  public applyProperties(trigger: Survey.SurveyTrigger) {}
  private getText(): string {
    if (!this.koIsValid())
      return editorLocalization.getString("pe.triggerNotSet");
    var res = this.conditionEditor.koTextValue();
    if (!res) return "";
    if (!!this.options && this.options.showTitlesInExpressions) {
      res = new ExpressionToDisplayText(this.survey).toDisplayText(res);
    }
    return editorLocalization.getString("pe.triggerRunIf") + ": " + res;
  }
  public get setToNameOptions(): string {
    return editorLocalization.getString("pe.conditionSelectQuestion");
  }
  protected createElementSelector(koValue: any): SurveyElementSelector {
    var res = new SurveyElementSelector(
      this.survey,
      "question",
      !!this.options && this.options.showTitlesInExpressions
    );
    res.value = koValue();
    res.onValueChangedCallback = function(newValue: string) {
      koValue(newValue);
    };
    return res;
  }
}

export class SurveyPropertyVisibleTrigger extends SurveyPropertyTrigger {
  public pages: SurveyPropertyTriggerObjects;
  public questions: SurveyPropertyTriggerObjects;
  constructor(
    public valueSurvey: Survey.SurveyModel,
    public trigger: Survey.SurveyTriggerVisible,
    public options: any,
    koPages: any,
    koQuestions: any
  ) {
    super(valueSurvey, trigger, options);
    this.pages = new SurveyPropertyTriggerObjects(
      editorLocalization.getString("pe.triggerMakePagesVisible"),
      koPages(),
      trigger.pages
    );
    this.questions = new SurveyPropertyTriggerObjects(
      editorLocalization.getString("pe.triggerMakeQuestionsVisible"),
      koQuestions(),
      trigger.questions
    );
  }
  public applyProperties(trigger: Survey.SurveyTrigger) {
    super.applyProperties(trigger);
    var tr = <Survey.SurveyTriggerVisible>trigger;
    tr.pages = this.pages.koChoosen().map(o => o.name);
    tr.questions = this.questions.koChoosen().map(o => o.name);
  }
}

export class SurveyPropertySetValueTrigger extends SurveyPropertyTrigger {
  private static emptySurvey = undefined;
  setToNameSelector: SurveyElementSelector;
  kosetToName: any;
  kosetValue: any;
  koisVariable: any;
  koSurvey: any;
  koHasSurvey: any;
  valueSurvey: Survey.SurveyModel;
  constructor(
    public survey: Survey.SurveyModel,
    public trigger: Survey.SurveyTriggerSetValue,
    public options: any
  ) {
    super(survey, trigger, options);
    if (!SurveyPropertySetValueTrigger.emptySurvey) {
      SurveyPropertySetValueTrigger.emptySurvey =
        !!options && options.createSurvey({}, "triggersEditor");
    }
    this.koSurvey = ko.observable(SurveyPropertySetValueTrigger.emptySurvey);
    this.koHasSurvey = ko.observable(false);
    this.kosetToName = ko.observable(trigger.setToName);
    this.kosetValue = ko.observable(trigger.setValue);
    this.koisVariable = ko.observable(trigger.isVariable);
    this.setToNameSelector = this.createElementSelector(this.kosetToName);
    var self = this;
    this.kosetToName.subscribe(function(newValue) {
      if (!self.koisVariable()) {
        self.kosetValue(null);
      }
      self.buildSurvey();
    });
    this.koisVariable.subscribe(function(newValue) {
      self.kosetToName("");
      self.kosetValue(null);
      self.buildSurvey();
    });
    this.buildSurvey();
  }
  public hasError(): boolean {
    return this.setToNameSelector.hasError();
  }
  public applyProperties(trigger: Survey.SurveyTrigger) {
    super.applyProperties(trigger);
    var tr = <Survey.SurveyTriggerSetValue>trigger;
    tr.setToName = this.kosetToName();
    tr.setValue = this.kosetValue();
    tr.isVariable = this.koisVariable();
  }
  private buildSurvey() {
    var question =
      !this.koisVariable() && !!this.kosetToName()
        ? this.survey.getQuestionByName(this.kosetToName())
        : null;
    if (!question) {
      this.valueSurvey = null;
      this.koHasSurvey(false);
      this.koSurvey(SurveyPropertySetValueTrigger.emptySurvey);
      return;
    }
    var qJson = SurveyPropertyDefaultValueEditor.createJsonFromQuestion(
      question,
      false
    );
    qJson.titleLocation = "top";
    qJson.title = editorLocalization.getString("pe.triggerSetValue");
    this.valueSurvey = SurveyPropertyDefaultValueEditor.createSurveyFromJsonQuestion(
      qJson,
      this.options
    );
    this.valueSurvey.setValue("question", this.kosetValue());
    var self = this;
    this.valueSurvey.onValueChanged.add(function(sender, options) {
      self.kosetValue(options.value);
    });
    this.koSurvey(this.valueSurvey);
    this.koHasSurvey(true);
  }
}
export class SurveyPropertyCopyValueTrigger extends SurveyPropertyTrigger {
  setToNameSelector: SurveyElementSelector;
  fromNameSelector: SurveyElementSelector;
  kosetToName: any;
  kofromName: any;
  constructor(
    public survey: Survey.SurveyModel,
    public trigger: Survey.SurveyTrigger,
    options?: any
  ) {
    super(survey, trigger, options);
    this.kosetToName = ko.observable(trigger["setToName"]);
    this.kofromName = ko.observable(trigger["fromName"]);
    this.setToNameSelector = this.createElementSelector(this.kosetToName);
    this.fromNameSelector = this.createElementSelector(this.kofromName);
  }
  public hasError(): boolean {
    var a = this.setToNameSelector.hasError();
    var b = this.fromNameSelector.hasError();
    return a || b;
  }
  public applyProperties(trigger: Survey.SurveyTrigger) {
    super.applyProperties(trigger);
    var tr = <Survey.SurveyTriggerCopyValue>trigger;
    tr.setToName = this.kosetToName();
    tr.fromName = this.kofromName();
  }
}
export class SurveyPropertySkipTrigger extends SurveyPropertyTrigger {
  koQuestions: any;
  koGotoName: any;
  gotoNameSelector: SurveyElementSelector;
  constructor(
    public survey: Survey.SurveyModel,
    public trigger: Survey.SurveyTrigger,
    options?: any
  ) {
    super(survey, trigger, options);
    this.koGotoName = ko.observable(trigger["gotoName"]);
    this.gotoNameSelector = this.createElementSelector(this.koGotoName);
  }
  public hasError(): boolean {
    return this.gotoNameSelector.hasError();
  }
  public applyProperties(trigger: Survey.SurveyTrigger) {
    super.applyProperties(trigger);
    trigger["gotoName"] = this.koGotoName();
  }
}
export class SurveyPropertyRunExpressionTrigger extends SurveyPropertyTrigger {
  setToNameSelector: SurveyElementSelector;
  kosetToName: any;
  korunExpression: any;
  public koErrorText: any;
  public koDisplayError: any;

  constructor(
    public survey: Survey.SurveyModel,
    public trigger: Survey.SurveyTrigger,
    options?: any
  ) {
    super(survey, trigger, options);
    this.kosetToName = ko.observable(trigger["setToName"]);
    this.korunExpression = ko.observable(trigger["runExpression"]);
    this.setToNameSelector = this.createElementSelector(this.kosetToName);
    this.koErrorText = ko.observable("");
    var self = this;
    this.koDisplayError = ko.computed(function() {
      return !!self.koErrorText();
    });
  }
  public hasError(): boolean {
    var text = !this.korunExpression()
      ? editorLocalization.getString("pe.triggerRunExpressionEmpty")
      : "";
    this.koErrorText(text);
    return !!text;
  }
  public applyProperties(trigger: Survey.SurveyTrigger) {
    super.applyProperties(trigger);
    trigger["setToName"] = this.kosetToName();
    trigger["runExpression"] = this.korunExpression();
  }
}

export class SurveyPropertyTriggerObjects {
  koObjects = ko.observableArray<Element>();
  koChoosen = ko.observableArray<Element>();
  koSelected = ko.observable<Element>();
  koChoosenSelected = ko.observable<Element>();
  public onDeleteClick: any;
  public onAddClick: any;
  constructor(
    public title: string,
    allObjects: Array<Element>,
    choosenObjects: Array<string>
  ) {
    allObjects.forEach(obj => {
      if (choosenObjects.indexOf(obj.name) !== -1) {
        this.koChoosen.push(obj);
      } else {
        this.koObjects.push(obj);
      }
    });
  }
  private deleteItem = () => {
    this.changeItems(this.koChoosenSelected(), this.koChoosen, this.koObjects);
  };
  private addItem = () => {
    this.changeItems(this.koSelected(), this.koObjects, this.koChoosen);
  };
  private changeItems(item: Element, removedFrom: any, addTo: any) {
    if (!item) return;
    removedFrom.remove(item);
    addTo.push(item);
    removedFrom.sort();
    addTo.sort();
  }
}
SurveyPropertyEditorFactory.registerEditor("triggers", function(
  property: Survey.JsonObjectProperty
): SurveyPropertyEditorBase {
  return new SurveyPropertyTriggersEditor(property);
});