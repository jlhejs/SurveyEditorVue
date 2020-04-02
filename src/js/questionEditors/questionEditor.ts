import Vue from "vue";
import { ISurveyObjectEditorOptions } from "../propertyEditors/propertyEditorBase";
import { editorLocalization } from "../editorLocalization";
import {
  SurveyQuestionEditorProperty,
  SurveyQuestionEditorProperties
} from "./questionEditorProperties";
import {
  SurveyQuestionEditorDefinition,
  ISurveyQuestionEditorDefinition
} from "./questionEditorDefinition";
import * as Survey from "survey-vue";
// import RModal from "rmodal";
import { SurveyHelper } from "../surveyHelper";
import { focusFirstControl } from "../utils/utils";
import { EditableObject } from "../propertyEditors/editableObject";
import { SurveyObjectProperty } from "../objectProperty";

export class SurveyPropertyEditorShowWindow {
  visible: any;
  editor: any;
  constructor() {
    this.visible = Vue.observable(false);
    this.editor = Vue.observable(null);
  }
  public show(
    question: Survey.Base,
    elWindow: HTMLElement,
    onChanged: (question: Survey.Question) => any,
    options: ISurveyObjectEditorOptions = null,
    onClosed: () => any = null
  ) {
    var editor = new SurveyQuestionEditor(question, null, options);
    editor.onChanged = onChanged;

    this.editor=editor;
    this.visible=true;

     var modal = new RModal(elWindow, {
       bodyClass: "",
       closeTimeout: 100,
       dialogOpenClass: "animated fadeIn",
       focus: false,
       afterClose: function() {
         if (onClosed) onClosed();
       }
     });
     modal.open();

    // document.addEventListener(
    //   "keydown",
    //   function(ev) {
    //     modal.keydown(ev);
    //   },
    //   false
    // );
    // editor.onHideWindow = function() {
    //   modal.close();
    // };
  }
}

export class SurveyQuestionEditorPropertyDefinition {
  public property: Survey.JsonObjectProperty;
  public title: string;
  public category: string;
  public createdFromTabName: boolean;
  public get name(): string {
    return this.property.name;
  }
}

export class SurveyQuestionEditorTabDefinition {
  public name: string;
  public title: string;
  public visible: boolean = true;
  public index: number = 0;
  public properties: Array<SurveyQuestionEditorPropertyDefinition> = [];
}

export class SurveyQuestionProperties {
  private properties: Array<Survey.JsonObjectProperty>;
  private editorDefinition: Array<ISurveyQuestionEditorDefinition>;
  constructor(
    public obj: any,
    public options: ISurveyObjectEditorOptions = null
  ) {
    this.properties = Survey.Serializer.getPropertiesByObj(this.obj);
    this.editorDefinition = SurveyQuestionEditorDefinition.getAllDefinitionsByClass(
      this.obj.getType()
    );
  }
  public getProperty(propertyName: string): Survey.JsonObjectProperty {
    var property = this.getPropertyCore(propertyName);
    if (!property) return null;
    return SurveyHelper.isPropertyVisible(this.obj, property, this.options)
      ? property
      : null;
  }
  private getPropertyCore(propertyName: string): Survey.JsonObjectProperty {
    for (var i = 0; i < this.properties.length; i++) {
      if (this.properties[i].name == propertyName) return this.properties[i];
    }
    return null;
  }
  public getProperties(tab: any): Array<Survey.JsonObjectProperty> {
    return this.editorDefinition
      .reduce((a, b) => a.concat(b.properties), [
        <any>{ name: tab.name, tab: tab.name }
      ])
      .filter(
        prop =>
          prop !== undefined &&
          typeof prop !== "string" &&
          prop.tab === tab.name
      )
      .map(prop => typeof prop !== "string" && this.getPropertyCore(prop.name))
      .filter(
        prop =>
          !!prop &&
          ((prop.name == tab.name && tab.visible === true) ||
            SurveyHelper.isPropertyVisible(this.obj, prop, this.options))
      );
  }
}

export class SurveyElementEditorContent {
  public onCorrectValueBeforeSet: (
    prop: Survey.JsonObjectProperty,
    newValue: any
  ) => any;
  public onPropertyChanged: (
    prop: Survey.JsonObjectProperty,
    oldValue: any
  ) => void;
  public onAfterRenderCallback: (
    object: any,
    htmlElement: HTMLElement,
    property: SurveyObjectProperty
  ) => any;
  vueTabs: any;
  vueActiveTab = "ko.observable<string>()";
  protected properties: SurveyQuestionProperties;
  private originalObjValue: any;
  constructor(
    obj: any,
    public className: string = null,
    public options: ISurveyObjectEditorOptions = null,
    protected useAsPropertyGrid: boolean = false
  ) {
    this.setOriginalObjValue(obj);
    if (!this.className && this.originalObj.getType) {
      this.className = this.originalObj.getType();
    }
    this.properties = new SurveyQuestionProperties(
      this.editableObj,
      this.options,
      this.className
    );
    var tabs = this.buildTabs();
    this.vueTabs = tabs;
    this.assignPropertiesToEditors();
    var self = this;
    this.koActiveTab.subscribe(function(val) {
      if (!val) return;
      var tab = self.getTabByName(val);
      if (!!tab) {
        tab.expand();
      }
    });
    if (tabs.length > 0) {
      this.koActiveTab(tabs[0].name);
    }
  }
  public getLocString(name: string) {
    return editorLocalization.getString(name);
  }
  protected setOriginalObjValue(obj: any) {
    this.originalObjValue = obj;
  }
  protected get originalObj() {
    return this.originalObjValue;
  }
  public get obj(): any {
    return this.originalObjValue;
  }
  public get editableObj(): any {
    return this.originalObjValue;
  }
  public hasError(): boolean {
    var tabs = this.vueTabs;
    for (var i = 0; i < tabs.length; i++) {
      if (tabs[i].hasError()) {
        this.koActiveTab(tabs[i].name);
        return true;
      }
    }
    return false;
  }
  public getPropertyEditorByName(propertyName: string): SurveyObjectProperty {
    var props = this.getAllEditorProperties();
    for (var i = 0; i < props.length; i++) {
      if (props[i].property.name == propertyName) return props[i];
    }
    return null;
  }
  public getTabByName(tabName: string): SurveyQuestionEditorTab {
    var tabs = this.vueTabs;
    for (var i = 0; i < tabs.length; i++) {
      if (tabs[i].name == tabName) return tabs[i];
    }
    return null;
  }
  public focusEditor() {
    if (!!this.vueTabs && this.vueTabs.length > 0) {
      this.vueTabs[0].focusEditor();
    }
  }
  private getAllEditorProperties(): Array<SurveyObjectProperty> {
    var res = [];
    if (!this.vueTabs) return res;
    var tabs = this.vueTabs;
    for (var i = 0; i < tabs.length; i++) {
      var tab = <SurveyQuestionEditorTab>tabs[i];
      var props = tab.editorProperties;
      for (var j = 0; j < props.length; j++) {
        res.push(props[j]);
      }
    }
    return res;
  }
  private buildTabs(): Array<SurveyQuestionEditorTab> {
    var tabs = [];
    this.addPropertiesTabs(tabs);
    return tabs;
  }
  private assignPropertiesToEditors() {
    var props = this.getAllEditorProperties();
    for (var i = 0; i < props.length; i++) {
      this.assignPropertiesToEditor(props[i]);
    }
  }
  protected assignPropertiesToEditor(propEditor: SurveyObjectProperty) {
    propEditor.onCorrectValueBeforeSet = (
      propEditor: SurveyObjectProperty,
      newValue: any
    ): any => {
      if (!this.onCorrectValueBeforeSet) return newValue;
      return this.onCorrectValueBeforeSet(propEditor.property, newValue);
    };
    propEditor.onChanged = (
      propEditor: SurveyObjectProperty,
      oldValue: any
    ): void => {
      if (!!this.onPropertyChanged)
        this.onPropertyChanged(propEditor.property, oldValue);
    };
    propEditor.getObjectPropertyByName = (
      propertyName: string
    ): SurveyObjectProperty => {
      return this.getPropertyEditorByName(propertyName);
    };
  }
  protected addPropertiesTabs(tabs: Array<SurveyQuestionEditorTab>) {
    var tabItems = this.properties.getTabs();
    for (var i = 0; i < tabItems.length; i++) {
      var tabItem = tabItems[i];
      var properties = this.properties.getProperties(tabItem);
      if (properties.length > 0) {
        tabs.push(this.createNewTab(tabItem, properties));
      }
    }
  }
  protected createNewTab(
    tabItem: SurveyQuestionEditorTabDefinition,
    properties: Array<Survey.JsonObjectProperty>
  ): SurveyQuestionEditorTab {
    var propertyTab = new SurveyQuestionEditorTab(
      this.editableObj,
      properties,
      tabItem.name,
      this.options
    );
    propertyTab.title = tabItem.title;
    var firstProperty =
      tabItem.properties.length > 0 ? tabItem.properties[0] : null;
    if (!!firstProperty && firstProperty.createdFromTabName) {
      var firstEditor = propertyTab.getPropertyEditorByName(tabItem.name);
      if (!!firstEditor) firstEditor.editor.displayName = "";
    }
    propertyTab.onAfterRenderCallback = (htmlElement, property) => {
      if (!this.onAfterRenderCallback) return;
      this.onAfterRenderCallback(this.originalObj, htmlElement, property);
    };
    return propertyTab;
  }
  get useTabsInElementEditor() {
    return (
      !this.useAsPropertyGrid &&
      !!this.options &&
      this.options.useTabsInElementEditor &&
      this.vueTabs.length > 1
    );
  }
}

export class SurveyElementEditorContentNoCategries extends SurveyElementEditorContent {
  public koProperties = ko.observableArray<SurveyObjectProperty>();
  public koTab: any;
  constructor(
    obj: any,
    public className: string = null,
    public options: ISurveyObjectEditorOptions = null,
    private onSortPropertyCallback: (
      object: any,
      property1: Survey.JsonObjectProperty,
      property2: Survey.JsonObjectProperty
    ) => number = null
  ) {
    super(obj, className, options, true);
    this.koTab = this.vueTabs[0];
    this.koProperties(this.getObjectProperties());
    this.koTab().expand();
  }
  protected addPropertiesTabs(tabs: Array<SurveyQuestionEditorTab>) {
    var properties = this.getProperties();
    var tabItem = new SurveyQuestionEditorTabDefinition();
    tabs.push(this.createNewTab(tabItem, properties));
  }
  protected assignPropertiesToEditor(propEditor: SurveyObjectProperty) {
    super.assignPropertiesToEditor(propEditor);
    propEditor.isInPropertyGrid = true;
  }
  private getObjectProperties(): Array<SurveyObjectProperty> {
    var res = [];
    var props = this.koTab().editorProperties;
    for (var i = 0; i < props.length; i++) {
      res.push(props[i]);
    }
    var self = this;
    var sortEvent = function(
      a: SurveyObjectProperty,
      b: SurveyObjectProperty
    ): number {
      var res = 0;
      if (self.onSortPropertyCallback) {
        res = self.onSortPropertyCallback(
          self.originalObj,
          a.property,
          b.property
        );
      }
      if (res) return res;
      if (a.displayName == b.displayName) return 0;
      if (a.displayName > b.displayName) return 1;
      return -1;
    };
    res = res.sort(sortEvent);
    return res;
  }
  private getProperties(): Array<Survey.JsonObjectProperty> {
    var res = [];
    var tabItems = this.properties.getTabs();
    for (var i = 0; i < tabItems.length; i++) {
      var tabProperties = this.properties.getProperties(tabItems[i]);
      for (var j = 0; j < tabProperties.length; j++) {
        res.push(tabProperties[j]);
      }
    }
    return res;
  }
}

export class SurveyQuestionEditor extends SurveyElementEditorContent {
  public onChanged: (obj: Survey.Base) => any;
  public onHideWindow: () => any;
  public onOkClick: any;
  public onApplyClick: any;
  public onResetClick: any;
  koTabs: ko.ObservableArray<SurveyQuestionEditorTab>;
  koActiveTab = ko.observable<string>();
  koTitle = ko.observable<string>();
  koShowApplyButton: any;
  onTabClick: any;
  private editableObject: EditableObject;

  constructor(
    obj: any,
    public className: string = null,
    public options: ISurveyObjectEditorOptions = null
  ) {
    super(obj, className, options, false);
    var self = this;
    self.onApplyClick = function() {
      self.apply();
    };
    self.onOkClick = function() {
      self.doCloseWindow(false);
    };
    self.onResetClick = function() {
      self.doCloseWindow(true);
    };
    this.onTabClick = function(tab) {
      self.koActiveTab(tab.name);
    };
    this.koShowApplyButton = ko.observable(
      !this.options || this.options.showApplyButtonInEditors
    );
    this.koTitle(this.getTitle());
  }
  protected setOriginalObjValue(obj: any) {
    super.setOriginalObjValue(obj);
    this.editableObject = new EditableObject(obj);
  }
  public get obj(): any {
    return this.editableObject.obj;
  }
  public get editableObj(): any {
    return this.editableObject.editableObj;
  }
  public get readOnly(): boolean {
    return !!this.options && this.options.readOnly;
  }
  private getTitle(): string {
    var res;
    if (this.editableObj["name"]) {
      res = editorLocalization
        .getString("pe.qEditorTitle")
        ["format"](this.editableObj["name"]);
    } else {
      res = editorLocalization.getString("pe.surveyEditorTitle");
    }
    if (!!this.options && this.options.onGetElementEditorTitleCallback) {
      res = this.options.onGetElementEditorTitleCallback(this.editableObj, res);
    }
    return res;
  }
  protected doCloseWindow(isCancel: boolean) {
    var appliedSuccesfull = false;
    if (!isCancel) {
      appliedSuccesfull = this.apply();
    }
    if (isCancel || appliedSuccesfull) {
      if (this.onHideWindow) this.onHideWindow();
    }
  }
  public reset() {
    this.editableObject.reset();
    var tabs = this.koTabs();
    for (var i = 0; i < tabs.length; i++) {
      tabs[i].reset();
    }
  }
  public apply(): boolean {
    var res = true;
    var isFirstError = false;
    var tabs = this.koTabs();
    for (var i = 0; i < tabs.length; i++) {
      var tabRes = tabs[i].hasError();
      if (tabRes) {
        tabs[i].expand();
        if (!isFirstError) {
          this.koActiveTab(tabs[i].name);
          isFirstError = true;
        }
      }
      res = !tabRes && res;
    }

    if (res) {
      if (!!this.options) {
        this.options.startUndoRedoTransaction();
      }
      this.editableObject.applyAll();
      if (this.onChanged) {
        this.onChanged(this.obj);
      }
      if (!!this.options) {
        this.options.stopUndoRedoTransaction();
      }
    }
    return res;
  }
}

export class SurveyElementPropertyGrid {
  private selectedObjectValue: any = null;
  public koElementEditor = null;
  public koHasObject = false;
  public hasCategories: boolean = true;
  public onAfterRenderCallback: (
    object: any,
    htmlElement: HTMLElement,
    property: SurveyObjectProperty
  ) => any;
  public onSortPropertyCallback: (
    object: any,
    property1: Survey.JsonObjectProperty,
    property2: Survey.JsonObjectProperty
  ) => number;
  public onPropertyChanged: (
    obj: any,
    prop: Survey.JsonObjectProperty,
    oldValue: any
  ) => void;
  public onCorrectValueBeforeSet: (
    obj: any,
    prop: Survey.JsonObjectProperty,
    newValue: any
  ) => any;
  constructor(
    public propertyEditorOptions: ISurveyObjectEditorOptions = null
  ) {}
  public get contentHtmlTemplate(): string {
    return this.hasCategories
      ? "questioneditor-content"
      : "questioneditor-propertygridcontent";
  }
  public objectChanged() {}
  public get selectedObject(): any {
    return this.selectedObjectValue;
  }
  public set selectedObject(value: any) {
    if (this.selectedObjectValue == value) return;
    this.selectedObjectValue = value;
    this.koHasObject=false;
    if (!!value) {
      var elementEditor = this.createSurveyElementEditor(value);
      elementEditor.onAfterRenderCallback = this.onAfterRenderCallback;
      elementEditor.onPropertyChanged = (
        prop: Survey.JsonObjectProperty,
        oldValue: any
      ) => {
        if (this.onPropertyChanged)
          this.onPropertyChanged(this.selectedObjectValue, prop, oldValue);
      };
      elementEditor.onCorrectValueBeforeSet = (
        prop: Survey.JsonObjectProperty,
        newValue: any
      ): any => {
        if (!this.onCorrectValueBeforeSet) return newValue;
        return this.onCorrectValueBeforeSet(
          this.selectedObjectValue,
          prop,
          newValue
        );
      };
      this.koElementEditor(elementEditor);
    } else {
      this.koElementEditor(null);
    }
    this.koHasObject=!!value;
  }
  public getPropertyEditorByName(propertyName: string): SurveyObjectProperty {
    if (!this.koElementEditor()) return null;
    return this.koElementEditor().getPropertyEditorByName(propertyName);
  }
  public focusEditor() {
    if (!!this.koElementEditor()) {
      this.koElementEditor().focusEditor();
    }
  }
  protected createSurveyElementEditor(value: any): SurveyElementEditorContent {
    if (this.hasCategories)
      return new SurveyElementEditorContent(
        value,
        "",
        this.propertyEditorOptions,
        true
      );
    var res = new SurveyElementEditorContentNoCategries(
      value,
      "",
      this.propertyEditorOptions,
      this.onSortPropertyCallback
    );
    return res;
  }
}

export class SurveyQuestionEditorTab {
  private titleValue: string;
  public onExpand: () => void;
  constructor(
    public obj: any,
    public properties: SurveyQuestionEditorProperties = null,
    private _name
  ) {}
  public expand() {
    if (!!this.onExpand) this.onExpand();
  }
  public koAfterRender(elements: HTMLElement[], context) {
    focusFirstControl(elements);
  }
  public get name(): string {
    return this._name;
  }
  public get title() {
    if (this.titleValue) return this.titleValue;
    var str = editorLocalization.getString("pe.tabs." + this.name);
    return str ? str : this.name;
  }
  public set title(value: string) {
    this.titleValue = value;
  }
  public get htmlTemplate(): string {
    return "questioneditortab";
  }
  public get templateObject(): any {
    return this;
  }
  public hasError(): boolean {
    return this.properties.hasError();
  }
  public beforeShow() {
    this.properties.beforeShow();
  }
  public reset() {
    this.properties.reset();
  }
  public apply(): boolean {
    return this.properties.apply();
  }
  public applyToObj(obj: Survey.Base) {
    return this.properties.applyToObj(obj);
  }
  public getPropertyEditorByName(
    propertyName: string
  ): SurveyQuestionEditorProperty {
    return this.properties.getPropertyEditorByName(propertyName);
  }
  public doCloseWindow() {}
  protected getValue(property: Survey.JsonObjectProperty): any {
    return property.getPropertyValue(this.obj);
  }
}
