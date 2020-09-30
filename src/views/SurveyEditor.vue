<template>
  <div class="survey-editor" v-if="editor">
  <el-container class="survey-editor">
    <el-header style="height: 40px;padding:0">
      <Tabs :editor="editor"></Tabs>
    </el-header>
    <TemplateDesigner :editor="editor" v-show="viewType=='designer'"></TemplateDesigner>
    <TemplateLive :editor="editor" v-show="viewType=='test'"></TemplateLive>
    <TemplateLogic :editor="editor" v-show="viewType=='logic'"></TemplateLogic>
    <TemplateEditor :editor="editor" v-show="viewType=='editor'"></TemplateEditor>
    <TemplateEmbed :editor="editor" v-show="viewType=='embed'"></TemplateEmbed>
    <TemplateTranslation :editor="editor" v-show="viewType=='translation'"></TemplateTranslation>

  </el-container>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import * as ko from "knockout";
import { setting } from "../js/setting";

import { editorLocalization } from "../js/editorLocalization";
import { SurveyObjectEditor } from "../js/objectEditor";
import { ISurveyObjectEditorOptions, SurveyPropertyEditorBase} from "../js/propertyEditors/propertyEditorBase";
import { SurveyLiveTester } from "../js/surveylive";
import { SurveyEmbedingWindow } from "../js/surveyEmbedingWindow";
import { SurveyObjects } from "../js/surveyObjects";
import { QuestionConverter } from "../js/questionconverter";
import { SurveyPropertyEditorShowWindow,SurveyElementPropertyGrid } from "../js/questionEditors/questionEditor";
import { SurveyJSONEditor } from "../js/surveyJSONEditor";
import { SurveyTextWorker } from "../js/textWorker";
import { SurveyUndoRedo, UndoRedoItem } from "../js/undoredo";
import { SurveyHelper, ObjType } from "../js/surveyHelper";
import { DragDropHelper } from "../js/dragdrophelper";
import { QuestionToolbox } from "../js/questionToolbox";
import { SurveyJSON5 } from "../js/json5";
import * as Survey from "survey-vue";
import { SurveyForDesigner, createAfterRenderHandler } from "../js/surveyjsObjects";
import { StylesManager } from "../js/stylesmanager";
import { itemAdorner } from "../js/adorners/item-editor";
import { Translation } from "../js/translation";
import { SurveyLogic } from "../js/logic";
@Component
export class SurveyCreator extends Vue {
  @Prop({ required: false }) question;
  public testclick(val) {
    window.surveyEditortest=this
    console.log(editor)
  }
  public editor:any = '';

  public static defaultNewSurveyText: string = "{ pages: [ { name: 'page1'}] }";
  private _haveCommercialLicense = Vue.observable(false);
  private renderedElement: HTMLElement;
  private surveyjs: HTMLElement;
  private jsonEditor: SurveyJSONEditor;
  private elementPropertyGridValue: SurveyElementPropertyGrid;
  public selectedObjectEditorValue: SurveyObjectEditor;
  private questionEditorWindow: SurveyPropertyEditorShowWindow;

  public pages: any;
  public selectPage: Function;

  private surveyLive: SurveyLiveTester;
  private surveyEmbeding: SurveyEmbedingWindow;
  private translationValue: Translation;
  private logicValue: SurveyLogic;
  // SurveyObjects
  private surveyObjects: any={};
  private toolboxValue: QuestionToolbox;
  private undoRedo: SurveyUndoRedo;
  private surveyValue = Vue.observable<any>({});
  private saveSurveyFuncValue: (
    no: number,
    onSaveCallback: (no: number, isSuccess: boolean) => void
  ) => void;
  private options: any;
  private stateValue: string = "";
  private dragDropHelper: DragDropHelper = null;
  private showJSONEditorTabValue = Vue.observable<boolean>(false);
  private showTestSurveyTabValue = Vue.observable<boolean>(false);
  private showEmbededSurveyTabValue = Vue.observable<boolean>(false);
  private showTranslationTabValue = Vue.observable<boolean>(false);
  private showLogicTabValue = Vue.observable<boolean>(false);
  private select2: any = null;
  private alwaySaveTextInPropertyEditorsValue: boolean = false;
  private showApplyButtonValue: boolean = true;
  private isRTLValue: boolean = false;

  public scrollToNewElement: boolean = true;
  hideAdvancedSettings: boolean = false;
  hideToolboxCollapse: boolean = false;
  tabs = Vue.observable([]);

  public get haveCommercialLicense() {
    return this._haveCommercialLicense;
  }
  public set haveCommercialLicense(val) {
    this._haveCommercialLicense=val;
  }

  public get inplaceEditForValues() {
    return itemAdorner.inplaceEditForValues;
  }
  public set inplaceEditForValues(val) {
    itemAdorner.inplaceEditForValues = val;
  }

  public useTabsInElementEditor = false;

  public showObjectTitles = false;

  public showTitlesInExpressions = false;

  public showPagesInTestSurveyTab = true;

  public allowModifyPages = true;

  public showDefaultLanguageInTestSurveyTab: boolean | string = "auto";

  public showInvisibleElementsInTestSurveyTab = true;

  public surveyId: string = null;

  public surveyPostId: string = null;

  public generateValidJSONChangedCallback: (generateValidJSON: boolean) => void;

  public onBeforeUndo: Survey.Event<(sender: SurveyCreator, options: any) => any,any> = new Survey.Event<(sender: SurveyCreator, options: any) => any, any>();

  public onBeforeRedo: Survey.Event<(sender: SurveyCreator, options: any) => any,any> = new Survey.Event<(sender: SurveyCreator, options: any) => any, any>();

  public onAfterUndo: Survey.Event<(sender: SurveyCreator, options: any) => any,any> = new Survey.Event<(sender: SurveyCreator, options: any) => any, any>();

  public onAfterRedo: Survey.Event<(sender: SurveyCreator, options: any) => any,any> = new Survey.Event<(sender: SurveyCreator, options: any) => any, any>();

  public onSelectedElementChanging: Survey.Event<(sender: SurveyCreator, options: any) => any,any> = new Survey.Event<(sender: SurveyCreator, options: any) => any, any>();

  public onSelectedElementChanged: Survey.Event<(sender: SurveyCreator, options: any) => any,any> = new Survey.Event<(sender: SurveyCreator, options: any) => any, any>();

  public onShowingProperty: Survey.Event<(sender: SurveyCreator, options: any) => any,any> = new Survey.Event<(sender: SurveyCreator, options: any) => any, any>();

  public onCanShowProperty: Survey.Event<(sender: SurveyCreator, options: any) => any,any> = this.onShowingProperty;

  public onEditorTabRendered: Survey.Event<(sender: SurveyCreator, options: any) => any,any> = new Survey.Event<(sender: SurveyCreator, options: any) => any, any>();

  public onActiveTabChanged: Survey.Event<(sender: SurveyCreator, options: any) => any,any> = new Survey.Event<(sender: SurveyCreator, options: any) => any, any>();

  public onGetPropertyReadOnly: Survey.Event<(sender: SurveyCreator, options: any) => any,any> = new Survey.Event<(sender: SurveyCreator, options: any) => any, any>();

  public onCustomSortProperty: Survey.Event<(sender: SurveyCreator, options: any) => any,any> = new Survey.Event<(sender: SurveyCreator, options: any) => any, any>();

  public onGetObjectDisplayName: Survey.Event<(sender: SurveyCreator, options: any) => any,any> = new Survey.Event<(sender: SurveyCreator, options: any) => any, any>();

  public onPropertyAfterRender: Survey.Event<(sender: SurveyCreator, options: any) => any,any> = new Survey.Event<(sender: SurveyCreator, options: any) => any, any>();

  public onElementDeleting: Survey.Event<(sender: SurveyCreator, options: any) => any,any> = new Survey.Event<(sender: SurveyCreator, options: any) => any, any>();

  public onQuestionAdded: Survey.Event<(sender: SurveyCreator, options: any) => any,any> = new Survey.Event<(sender: SurveyCreator, options: any) => any, any>();

  public onElementDoubleClick: Survey.Event<(sender: SurveyCreator, options: any) => any,any> = new Survey.Event<(sender: SurveyCreator, options: any) => any, any>();

  public onItemValueAdded: Survey.Event<(sender: SurveyCreator, options: any) => any,any> = new Survey.Event<(sender: SurveyCreator, options: any) => any, any>();

  public onMatrixColumnAdded: Survey.Event<(sender: SurveyCreator, options: any) => any,any> = new Survey.Event<(sender: SurveyCreator, options: any) => any, any>();

  public onPanelAdded: Survey.Event<(sender: SurveyCreator, options: any) => any,any> = new Survey.Event<(sender: SurveyCreator, options: any) => any, any>();

  public onPageAdded: Survey.Event<(sender: SurveyCreator, options: any) => any,any> = new Survey.Event<(sender: SurveyCreator, options: any) => any, any>();
  
  public onModified: Survey.Event<(sender: SurveyCreator, options: any) => any,any> = new Survey.Event<(sender: SurveyCreator, options: any) => any, any>();

  public onElementNameChanged: Survey.Event<(sender: SurveyCreator, options: any) => any,any> = new Survey.Event<(sender: SurveyCreator, options: any) => any, any>();

  public onSurveyInstanceCreated: Survey.Event<(sender: SurveyCreator, options: any) => any,any> = new Survey.Event<(sender: SurveyCreator, options: any) => any, any>();
 
  public onDesignerSurveyCreated: Survey.Event<(sender: SurveyCreator, options: any) => any,any> = new Survey.Event<(sender: SurveyCreator, options: any) => any, any>();
 
  public onTestSurveyCreated: Survey.Event<(sender: SurveyCreator, options: any) => any,any> = new Survey.Event<(sender: SurveyCreator, options: any) => any, any>();

  public onSetPropertyEditorOptions: Survey.Event<(sender: SurveyCreator, options: any) => any,any> = new Survey.Event<(sender: SurveyCreator, options: any) => any, any>();

  public onPropertyValidationCustomError: Survey.Event<(sender: SurveyCreator, options: any) => any,any> = new Survey.Event<(sender: SurveyCreator, options: any) => any, any>();

  public onPropertyValueChanging: Survey.Event<(sender: SurveyCreator, options: any) => any,any> = new Survey.Event<(sender: SurveyCreator, options: any) => any, any>();

  public onPropertyEditorObjectAssign: Survey.Event<(sender: SurveyCreator, options: any) => any,any> = new Survey.Event<(sender: SurveyCreator, options: any) => any, any>();

  public onConditionValueSurveyCreated: Survey.Event<(sender: SurveyCreator, options: any) => any,any> = new Survey.Event<(sender: SurveyCreator, options: any) => any, any>();

  public onConditionQuestionsGetList: Survey.Event<(sender: SurveyCreator, options: any) => any,any> = new Survey.Event<(sender: SurveyCreator, options: any) => any, any>();

  public onPropertyEditorKeyDown: Survey.Event<(sender: SurveyCreator, options: any) => any,any> = new Survey.Event<(sender: SurveyCreator, options: any) => any, any>();

  public onElementAllowOperations: Survey.Event<(sender: SurveyCreator, options: any) => any,any> = new Survey.Event<(sender: SurveyCreator, options: any) => any, any>();

  public onDefineElementMenuItems: Survey.Event<(sender: SurveyCreator, options: any) => any,any> = new Survey.Event<(sender: SurveyCreator, options: any) => any, any>();

  public onShowPropertyModalEditorDescription: Survey.Event<(sender: SurveyCreator, options: any) => any,any> = new Survey.Event<(sender: SurveyCreator, options: any) => any, any>();

  public onGetObjectTextInPropertyGrid: Survey.Event<(sender: SurveyCreator, options: any) => any,any> = new Survey.Event<(sender: SurveyCreator, options: any) => any, any>();

  autoSave = false;

  public onCustomElementAddingIntoToolbox: Survey.Event<(sender: SurveyCreator, options: any) => any,any> = new Survey.Event<(sender: SurveyCreator, options: any) => any, any>();

  public onCustomElementAddedIntoToolbox: Survey.Event<(sender: SurveyCreator, options: any) => any,any> = new Survey.Event<(sender: SurveyCreator, options: any) => any, any>();

  public onUploadFile: Survey.Event<(sender: SurveyCreator, options: any) => any,any> = new Survey.Event<(sender: SurveyCreator, options: any) => any, any>();

  public onTranslationImported: Survey.Event<(sender: SurveyCreator, options: any) => any,any> = new Survey.Event<(sender: SurveyCreator, options: any) => any, any>();
 
  public onDragDropAllow: Survey.Event<(sender: SurveyCreator, options: any) => any,any> = new Survey.Event<(sender: SurveyCreator, options: any) => any, any>();
 
  public onAdornerRendered: Survey.Event<(sender: SurveyCreator, options: any) => any,any> = new Survey.Event<(sender: SurveyCreator, options: any) => any, any>();
 
  public onElementEditorClosed: Survey.Event<(sender: SurveyCreator, options: any) => any,any> = new Survey.Event<(sender: SurveyCreator, options: any) => any, any>();
 
  public get isAutoSave() {
    return this.autoSave;
  }

  public set isAutoSave(newVal) {
    this.autoSave=newVal;
  }
 
  public showErrorOnFailedSave: boolean = true;
  vueShowState = Vue.observable(false);

  public get showState() {
    return this.vueShowState;
  }
  public set showState(newVal) {
    this.vueShowState=newVal;
  }
  vueReadOnly = false;

  public get readOnly() {
    return this.vueReadOnly;
  }
  public set readOnly(newVal) {
    this.vueReadOnly=newVal;
  }

  public isShowDesigner: any;
  public viewType: string = "designer";
  public canDeleteObject: any;
  public showSaveButton: any;
  public generateValidJSON: any;
  public showOptions: any;
  vueShowPropertyGrid: any;
  showToolbox = Vue.observable(true);
  testSurveyWidth: any;
  designerHeight: any;
  showPagesToolbox: any;
  generateValidJSONClick: any;
  generateReadableJSONClick: any;
  doUndoClick: any;
  doRedoClick: any;
  deleteObjectClick: any;
  runSurveyClick: any;
  saveButtonClick: any;
  draggingToolboxItem: any;
  clickToolboxItem: any;
  dragEnd: any;

  @Watch('selectedObject')
  selectedObjectChange(newValue){
    this.selectedObjectChanged(newValue != null ? newValue.value : null);
  }
  @Watch('generateValidJSON')
  generateValidJSONs(newValue){
    if (!this.editor.options) this.editor.options = {};
    this.editor.options.generateValidJSON = newValue;
    if (this.editor.generateValidJSONChangedCallback)
    this.editor.generateValidJSONChangedCallback(newValue);
  }
  created(value) {
    this.editor = this
    this.showOptions = false;
    this.generateValidJSON = true;
    this.designerHeight = "";
    this.showPagesToolbox = true;
    this.setOptions({});
    this.canDeleteObject = false;
    debugger
    var self = this;

    StylesManager.applyTheme(StylesManager.currentTheme);

    this.pages = '';

    this.showSaveButton = false;
    this.testSurveyWidth = "100%";
    this.saveButtonClick = function() {
      self.doSave();
    };
    window["sel"] = this.selectedObject;
    this.selectedObject = Vue.observable("");
    // this.selectedObject.subscribe(function(newValue) {
    //   self.selectedObjectChanged(newValue != null ? newValue.value : null);
    // });
    // this.generateValidJSON.subscribe(function(newValue) {
    //   if (!self.options) self.options = {};
    //   self.options.generateValidJSON = newValue;
    //   if (self.generateValidJSONChangedCallback)
    //     self.generateValidJSONChangedCallback(newValue);
    // });
    this.surveyObjects = new SurveyObjects(
      this.objects,
      this.selectedObject,
      function(obj: Survey.Base): string {
        return self.getObjectDisplayName(obj);
      }
    );
    this.surveyObjects.getItemTextCallback = function(obj, text) {
      var options = { obj: obj, text: text };
      self.onGetObjectTextInPropertyGrid.fire(self, options);
      return options.text;
    };
    this.selectPage = (page: Survey.PageModel) => {
      this.surveyObjects.selectObject(page);
    };
    this.elementPropertyGridValue = new SurveyElementPropertyGrid(this);



    this.undoRedo = new SurveyUndoRedo();

    this.selectedObjectEditorValue = new SurveyObjectEditor(this);
    this.selectedObjectEditorValue.onSortPropertyCallback = function(
      obj: any,
      property1: Survey.JsonObjectProperty,
      property2: Survey.JsonObjectProperty
    ): number {
      return self.onCustomSortPropertyObjectProperty(obj, property1, property2);
    };
    this.selectedObjectEditorValue.onPropertyValueChanged.add(
      (sender, options) => {
        options.updatedValue = self.onPropertyValueChanged(
          options.property,
          options.object,
          options.newValue
        );
      }
    );
    this.selectedObjectEditorValue.onAfterRenderCallback = function(
      obj,
      htmlElement,
      prop
    ) {
      if (self.onPropertyAfterRender.isEmpty) return;
      var options = {
        obj: obj,
        htmlElement: htmlElement,
        property: prop.property,
        propertyEditor: prop.editor
      };
      self.onPropertyAfterRender.fire(self, options);
    };
    this.questionEditorWindow = new SurveyPropertyEditorShowWindow();
    this.surveyLive = new SurveyLiveTester(this);
    this.surveyEmbeding = new SurveyEmbedingWindow();
    this.translationValue = new Translation(
      this.createSurvey({}, "translation")
    );
    this.translation.importFinishedCallback = function() {
      self.onTranslationImported.fire(self, {});
    };
    this.translation.availableTranlationsChangedCallback = () => {
      this.setModified({ type: "TRANSLATIONS_CHANGED" });
    };
    this.translation.tranlationChangedCallback = (
      locale: string,
      name: string,
      value: string,
      context: any
    ) => {
      this.setModified({
        type: "TRANSLATIONS_CHANGED",
        locale,
        name,
        value,
        context
      });
    };
    this.logicValue = new SurveyLogic(this.createSurvey({}, "logic"));
    this.logic.onChangedCallback = (item, changeType) => {
      this.setModified({
        type: "LOGIC_CHANGED",
        item: item,
        changeType: changeType
      });
    };
    this.toolboxValue = new QuestionToolbox(
      this.options && this.options.questionTypes
        ? this.options.questionTypes
        : null
    );

    // this.viewType.subscribe(function(newValue) {
    //   self.onActiveTabChanged.fire(self, { tabName: newValue });
    // });
    this.isShowDesigner = function() {
      return self.viewType == "designer";
    };
    this.generateValidJSONClick = function() {
      self.generateValidJSON=true;
    };
    this.generateReadableJSONClick = function() {
      self.generateValidJSON=false;
    };
    this.runSurveyClick = function() {
      self.showLiveSurvey();
    };
    this.deleteObjectClick = function() {
      self.deleteCurrentObject();
    };
    this.draggingToolboxItem = function(item, e) {
      self.doDraggingToolboxItem(item.json, e);
    };
    this.clickToolboxItem = function(item) {
      self.doClickToolboxItem(item.json);
    };
    this.dragEnd = function(item, e) {
      self.dragDropHelper.end();
    };

    this.doUndoClick = function() {
      var options = { canUndo: true };
      self.onBeforeUndo.fire(self, options);
      if (options.canUndo) {
        var item = self.undoRedo.undo();
        self.doUndoRedo(item);
        self.onAfterUndo.fire(self, { state: item });
      }
    };
    this.doRedoClick = function() {
      var options = { canRedo: true };
      self.onBeforeRedo.fire(self, options);
      if (options.canRedo) {
        var item = self.undoRedo.redo();
        self.doUndoRedo(item);
        self.onAfterRedo.fire(self, { state: item });
      }
    };

    this.jsonEditor = new SurveyJSONEditor();
    // ko.computed(() => {
    //   this.jsonreadOnly = this.readOnly;
    // });

    this.tabs=[];
    this.tabs.push({
      name: "designer",
      title: this.getLocString("ed.designer"),
      template: "se-tab-designer",
      data: this
    });
    if (this.showTestSurveyTab) {
      this.tabs.push({
        name: "test",
        title: this.getLocString("ed.testSurvey"),
        template: "se-tab-test",
        data: this
      });
    }
    if (this.showLogicTab) {
      this.tabs.push({
        name: "logic",
        title: this.getLocString("ed.logic"),
        template: "surveylogic",
        data: this.logic
      });
    }
    if (this.showJSONEditorTab) {
      this.tabs.push({
        name: "editor",
        title: this.getLocString("ed.jsonEditor"),
        template: "jsoneditor",
        data: this.jsonEditor
      });
    }
    if (this.showEmbededSurveyTab) {
      this.tabs.push({
        name: "embed",
        title: this.getLocString("ed.embedSurvey"),
        template: "surveyembeding",
        data: this.surveyEmbeding
      });
    }
    if (this.showTranslationTab) {
      this.tabs.push({
        name: "translation",
        title: this.getLocString("ed.translation"),
        template: "translation",
        data: this.translation
      });
    }
    var renderedElement ='app'

    if (renderedElement) {
      this.renderSurveyEditor(renderedElement);
    }

    this.text = "";

    this.addToolbarItems();
  }

  
  
  themeCss = () => {
    return ["bootstrap", "bootstrapmaterial"].indexOf(  StylesManager.currentTheme) === -1
      ? "sv_default_css"
      : "sv_" + StylesManager.currentTheme + "_css";
  };

  public toolbarItems = Vue.observable([]);
  protected addToolbarItems() {
    this.toolbarItems.push({
      id: "svd-undo",
      icon: "icon-actionundo",
      visible: this.isShowDesigner,
      enabled: this.undoRedo.canUndo,
      action: this.doUndoClick,
      title: this.getLocString("ed.undo")
    });
    this.toolbarItems.push({
      id: "svd-redo",
      icon: "icon-actionredo",
      visible: this.isShowDesigner,
      enabled: this.undoRedo.canRedo,
      action: this.doRedoClick,
      title: this.getLocString("ed.redo")
    });
    this.toolbarItems.push({
      id: "svd-survey-settings",
      icon: "icon-actionsettings",
      visible: this.isShowDesigner,
      enabled: false,
      action: () => {
        this.surveyObjects.selectObject(this.survey);
        this.showQuestionEditor(this.survey);
      },
      title: this.getLocString("ed.settings")
    });
    this.toolbarItems.push({
      id: "svd-options",
      visible: this.isShowDesigner && this.showOptions,
      title: this.getLocString("ed.options"),
      template: "svd-toolbar-options",
      items: ko.observableArray([
        {
          id: "svd-valid-json",
          visible: true,
          css: ko.computed(() => (this.generateValidJSON ? "active" : "")),
          action: this.generateValidJSONClick,
          title: this.getLocString("ed.generateValidJSON")
        },
        {
          id: "svd-readable-json",
          visible: true,
          css: ko.computed(() => (!this.generateValidJSON ? "active" : "")),
          action: this.generateReadableJSONClick,
          title: this.getLocString("ed.generateReadableJSON")
        }
      ])
    });
    this.toolbarItems.push({
      id: "svd-test",
      visible:  this.viewType === "test",
      title:this.getLocString("ed.testSurveyWidth") +
      " " +
      this.testSurveyWidth,
      template: "svd-toolbar-options",
      items: ko.observableArray([
        {
          id: "svd-100-json",
          visible: true,
          action: () => this.testSurveyWidth="100%",
          title: "100%"
        },
        {
          id: "svd-1200px-json",
          visible: true,
          action: () => this.testSurveyWidth="1200px",
          title: "1200px"
        },
        {
          id: "svd-1000px-json",
          visible: true,
          action: () => this.testSurveyWidth="1000px",
          title: "1000px"
        },
        {
          id: "svd-800px-json",
          visible: true,
          action: () => this.testSurveyWidth="800px",
          title: "800px"
        },
        {
          id: "svd-600px-json",
          visible: true,
          action: () => this.testSurveyWidth="600px",
          title: "600px"
        },
        {
          id: "svd-400px-json",
          visible: true,
          action: () => this.testSurveyWidth="400px",
          title: "400px"
        }
      ])
    });
    this.toolbarItems.push({
      id: "svd-save",
      visible: this.showSaveButton,
      action: this.saveButtonClick,
      innerCss: "svd_save_btn",
      title: this.getLocString("ed.saveSurvey")
    });
    this.toolbarItems.push({
      id: "svd-state",
      visible: this.showState,
      css: "svd_state",
      innerCss: "icon-" + this.state,
      title: this.getLocString("ed." + this.state),
      template: "svd-toolbar-state"
    });
  }

  protected setOptions(options: any) {
    if (!options) options = {};
    if (!options.hasOwnProperty("generateValidJSON"))options.generateValidJSON = true;
    this.options = options;
    this.showJSONEditorTabValue= typeof options.showJSONEditorTab !== "undefined"? options.showJSONEditorTab: true;
    this.showTestSurveyTabValue=typeof options.showTestSurveyTab !== "undefined"? options.showTestSurveyTab: true;
    this.showEmbededSurveyTabValue=typeof options.showEmbededSurveyTab !== "undefined"? options.showEmbededSurveyTab: false;
    this.showTranslationTabValue=typeof options.showTranslationTab !== "undefined"? options.showTranslationTab: false;
    this.showLogicTabValue=typeof options.showLogicTab !== "undefined" ? options.showLogicTab : false;
    this.haveCommercialLicense =typeof options.haveCommercialLicense !== "undefined"  ? options.haveCommercialLicense  : false;
    this.inplaceEditForValues =typeof options.inplaceEditForValues !== "undefined"  ? options.inplaceEditForValues  : false;
    this.showObjectTitles =typeof options.showObjectTitles !== "undefined"  ? options.showObjectTitles  : false;
    this.showTitlesInExpressions =typeof options.showTitlesInExpressions !== "undefined"  ? options.showTitlesInExpressions  : false;
    this.useTabsInElementEditor =typeof options.useTabsInElementEditor !== "undefined"  ? options.useTabsInElementEditor  : false;
    this.showState =typeof options.showState !== "undefined" ? options.showState : false;
    this.showOptions= typeof options.showOptions !== "undefined" ? options.showOptions : false;
    this.vueShowPropertyGrid =typeof options.showPropertyGrid !== "undefined"  ? options.showPropertyGrid  : true;
    this.showToolbox =typeof options.showToolbox !== "undefined" ? options.showToolbox : true;
    this.generateValidJSON=this.options.generateValidJSON;
    this.isAutoSave =typeof options.isAutoSave !== "undefined" ? options.isAutoSave : false;
    this.showErrorOnFailedSave =typeof options.showErrorOnFailedSave !== "undefined"  ? options.showErrorOnFailedSave  : true;
    this.isRTLValue =typeof options.isRTL !== "undefined" ? options.isRTL : false;
    this.scrollToNewElement =typeof options.scrollToNewElement !== "undefined"  ? options.scrollToNewElement  : true;
    if (options.designerHeight) { this.designerHeight=options.designerHeight;}
    if (options.objectsIntend) {  SurveyObjects.intend = options.objectsIntend;}
    if (typeof options.showPagesToolbox !== "undefined") {  this.showPagesToolbox=options.showPagesToolbox;}
    if (typeof options.readOnly !== "undefined") {  this.readOnly=options.readOnly;}
    if (typeof options.showPagesInTestSurveyTab !== "undefined") {  this.showPagesInTestSurveyTab = options.showPagesInTestSurveyTab;}
    if (typeof options.showDefaultLanguageInTestSurveyTab !== "undefined") {  this.showDefaultLanguageInTestSurveyTab =    options.showDefaultLanguageInTestSurveyTab;}
    if (typeof options.showInvisibleElementsInTestSurveyTab !== "undefined") {  this.showInvisibleElementsInTestSurveyTab =    options.showInvisibleElementsInTestSurveyTab;}
    if (typeof options.allowModifyPages !== "undefined") {  this.allowModifyPages = options.allowModifyPages;}
  }

  public get survey(): SurveyForDesigner {
    return this.surveyValue;
  }
  public get selectedElementPropertyGrid(): SurveyElementPropertyGrid {
    return this.elementPropertyGridValue;
  }
  public get objects(){
    return this.surveyObjects?this.surveyObjects.objects:[]
  }
  public get  selectedObject(){
    return this.surveyObjects.selectedObject
  }
  public set  selectedObject(newValue){
    this.surveyObjects.selectedObject=newValue
  }
  public get selectedObjectEditor(): SurveyObjectEditor {
    return this.selectedObjectEditorValue;
  }

  public update(element: Survey.Question) {
    element["koElementType"].notifySubscribers();
  }

  public render(element: any = null, options: any = null) {
    if (options) this.setOptions(options);
    var self = this;
    if (element && typeof element == "string") {
      element = document.getElementById(element);
    }
    if (element) {
      this.renderedElement = element;
    }
    element = this.renderedElement;
    // if (!element) return;
    // element.innerHTML = templateEditorHtml;
    self.applyBinding();
  }
  public renderSurveyEditor(element: any = null, options: any = null) {
    if (options) this.setOptions(options);
    var self = this;
    if (element && typeof element == "string") {
      element = document.getElementById(element);
    }
    if (element) {
      this.renderedElement = element;
    }
    element = this.renderedElement;
    // if (!element) return;
    // element.innerHTML = templateEditorHtml;
    self.applyBinding();
  }
  public loadSurvey(surveyId: string) {
    var self = this;
    new Survey.dxSurveyService().loadSurvey(surveyId, function(
      success: boolean,
      result: string,
      response: any
    ) {
      if (success && result) {
        self.text = JSON.stringify(result);
      }
    });
  }

  public get text(): string {
    if (this.viewType == "editor") return this.jsontext;
    return this.getSurveyTextFromDesigner();
  }
  public set text(value: string) {
    this.changeText(value, true);
  }

  public get JSON(): any {
    return this.survey.toJSON();
  }
  public set JSON(val: any) {
    if (this.viewType == "editor") {
      this.setTextValue(JSON.stringify(val));
    } else {
      this.initSurveyWithJSON(val, true);
    }
  }

  public changeText(value: string, clearState = false) {
    var textWorker = new SurveyTextWorker(value);
    this.setTextValue(value);
    if (textWorker.isJsonCorrect) {
      this.initSurveyWithJSON(textWorker.survey.toJSON(), clearState);
    } else {
      this.setTextValue(value);
      this.viewType="editor";
    }
  }
  private initSurveyWithJSON(json: any, clearState: boolean) {
    this.initSurvey(json);
    this.showDesigner();
    this.setUndoRedoCurrentState(clearState);
  }

  public get toolbox(): QuestionToolbox {
    return this.toolboxValue;
  }

  public get translation(): Translation {
    return this.translationValue;
  }

  public get logic(): SurveyLogic {
    return this.logicValue;
  }


  public get customToolboxQuestionMaxCount(): number {
    return this.toolbox.copiedItemMaxCount;
  }
  public set customToolboxQuestionMaxCount(value: number) {
    this.toolbox.copiedItemMaxCount = value;
  }

  public get state(): string {
    return this.stateValue;
  }
  protected setState(value: string) {
    this.stateValue = value;
  }

  public autoSaveDelay: number = 500;
  private autoSaveTimerId = null;
  protected doAutoSave() {
    if (this.autoSaveDelay <= 0) {
      this.doSave();
      return;
    }
    if (!!this.autoSaveTimerId) {
      clearTimeout(this.autoSaveTimerId);
    }
    var self = this;
    this.autoSaveTimerId = setTimeout(function() {
      clearTimeout(self.autoSaveTimerId);
      self.autoSaveTimerId = null;
      self.doSave();
    }, this.autoSaveDelay);
  }
  saveNo: number = 0;
  protected doSave() {
    this.setState("saving");
    if (this.saveSurveyFunc) {
      this.saveNo++;
      var self = this;
      this.saveSurveyFunc(this.saveNo, function doSaveCallback(
        no: number,
        isSuccess: boolean
      ) {
        if (self.saveNo === no) {
          if (isSuccess) {
            self.setState("saved");
          } else {
            if (self.showErrorOnFailedSave) {
              alert(self.getLocString("ed.saveError"));
            }
            self.setState("modified");
          }
        }
      });
    }
  }
  public setModified(options: any = null) {
    this.setState("modified");
    this.setUndoRedoCurrentState();
    this.onModified.fire(this, options);
    this.isAutoSave && this.doAutoSave();
  }

  public undo(): boolean {
    if (!this.undoRedo.canUndo) return false;
    this.doUndoRedo(this.undoRedo.undo());
    return true;
  }

  public redo(): boolean {
    if (!this.undoRedo.canRedo) return false;
    this.doUndoRedo(this.undoRedo.redo());
    return true;
  }
  private setUndoRedoCurrentState(clearState: boolean = false) {
    if (clearState) {
      this.undoRedo.clear();
    }
    var selObj = this.selectedObject ? this.selectedObject.value : null;
    this.undoRedo.setCurrent(this.surveyValue, selObj ? selObj.name : null);
  }

  public get saveSurveyFunc() {
    return this.saveSurveyFuncValue;
  }
  public set saveSurveyFunc(value: any) {
    this.saveSurveyFuncValue = value;
    this.showSaveButton=(value != null && !this.isAutoSave);
  }

  public get showPropertyGrid() {
    return this.vueShowPropertyGrid
  }
  public set showPropertyGrid(value: boolean) {
    this.vueShowPropertyGrid=value;
    this.hideAdvancedSettings=!value;
  }

  protected changeHideAdvancedSettings() {
    this.hideAdvancedSettings=(!this.hideAdvancedSettings)
  }
  protected changeHideToolboxCollapse() {
    this.hideToolboxCollapse=(!this.hideToolboxCollapse)
  }

  public get showJSONEditorTab() {
    return this.showJSONEditorTabValue;
  }
  public set showJSONEditorTab(value: boolean) {
    this.showJSONEditorTabValue=value;
  }

  public get showTestSurveyTab() {
    return this.showTestSurveyTabValue;
  }
  public set showTestSurveyTab(value: boolean) {
    this.showTestSurveyTabValue=value;
  }

  public get showEmbededSurveyTab() {
    return this.showEmbededSurveyTabValue;
  }
  public set showEmbededSurveyTab(value: boolean) {
    this.showEmbededSurveyTabValue=value;
  }
  showExternalHelpLink = ko.observable(false);

  public get showTranslationTab() {
    return this.showTranslationTabValue;
  }
  public set showTranslationTab(value: boolean) {
    this.showTranslationTabValue=value;
  }

  public get showLogicTab() {
    return this.showLogicTabValue;
  }
  public set showLogicTab(value: boolean) {
    this.showLogicTabValue=value;
  }

  public get isRTL() {
    return this.isRTLValue;
  }
  public set isRTL(value: boolean) {
    this.isRTLValue = value;
  }
  public canShowObjectProperty(object: any, propertyName: string) {
    if (!object || !object.getType) {
      return true;
    }
    var property = Survey.Serializer.findProperty(
      object.getType(),
      propertyName
    );
    return this.onCanShowObjectProperty(object, property);
  }
  protected onCanShowObjectProperty(
    object: any,
    property: Survey.JsonObjectProperty
  ): boolean {
    var options = { obj: object, property: property, canShow: true };
    this.onCanShowProperty.fire(this, options);
    return options.canShow;
  }
  protected onCustomSortPropertyObjectProperty(
    object: any,
    property1: Survey.JsonObjectProperty,
    property2: Survey.JsonObjectProperty
  ): number {
    if (this.onCustomSortProperty.isEmpty) return 0;
    var options = {
      obj: object,
      property1: property1,
      property2: property2,
      result: 0
    };
    this.onCustomSortProperty.fire(this, options);
    return options.result;
  }

  private setTextValue(value: string) {
    this.jsontext = value;
  }

  public addPage = () => {
    var name = SurveyHelper.getNewPageName(this.pages);
    var page = <Survey.Page>this.survey.addNewPage(name);
    // this.pages.valueHasMutated(); //TODO why this is need ? (ko problem)
    this.addPageToUI(page);
    this.setModified({ type: "PAGE_ADDED", newValue: page });
  };
  public deletePage = () => {
    this.deleteCurrentObject();
    // this.pages.valueHasMutated(); //TODO why this is need ? (ko problem)
  };

  public getLocString(str: string) {
    return editorLocalization.getString(str);
  }
  public movePage = (indexFrom: number, indexTo: number) => {
    var page = <Survey.Page>this.pages[indexTo];
    this.surveyObjects.survey = null; // TODO may be we don't need this hack
    this.surveyObjects.survey = this.survey;
    this.surveyObjects.selectObject(page);
    this.setModified({
      type: "PAGE_MOVED",
      page: page,
      indexFrom: indexFrom,
      indexTo: indexTo
    });
  };
  public addPageToUI(page: Survey.Page) {
    this.surveyObjects.addPage(page);
  }
  private doOnQuestionAdded(question: Survey.Question, parentPanel: any) {
    if (!this.dragDropHelper.isMoving) {
      var page = this.getPageByElement(question);
      var options = { question: question, page: page };
      this.onQuestionAdded.fire(this, options);
    }
    if (parentPanel.elements.indexOf(question) !== -1) {
      this.surveyObjects.addElement(question, parentPanel);
    }
  }
  private doOnElementRemoved(element: Survey.Base) {
    this.surveyObjects.removeObject(element);
  }
  private doOnPanelAdded(panel: Survey.Panel, parentPanel: any) {
    if (!this.dragDropHelper.isMoving) {
      var page = this.getPageByElement(panel);
      var options = { panel: panel, page: page };
      this.onPanelAdded.fire(this, options);
    }
    if (parentPanel.elements.indexOf(panel) !== -1) {
      this.surveyObjects.addElement(panel, parentPanel);
    }
  }
  private doOnPageAdded(page: Survey.Page) {
    var options = { page: page };
    this.onPageAdded.fire(this, options);
  }
  public onPropertyValueChanged(
    property: Survey.JsonObjectProperty,
    obj: any,
    newValue: any
  ) {
    var oldValue = obj[property.name];
    if (property.name === "page" && typeof newValue === "string") {
      obj[property.name] = obj.survey.getPageByName(newValue);
    } else {
      obj[property.name] = newValue;
    }

    if (property.name == "name") {
      var newName = this.generateUniqueName(obj, newValue);
      this.updateConditions(oldValue, newName);
      this.onElementNameChanged.fire(this, {
        obj: obj,
        oldName: oldValue,
        newName: newName
      });
      if (newName != newValue) {
        return newName;
      }
    }
    if (property.name == "name" || property.name == "title") {
      this.surveyObjects.nameChanged(obj);
    }
    if (property.name === "name") {
      this.dirtyPageUpdate(); //TODO why this is need ? (ko problem)
    } else if (property.name === "page") {
      this.selectPage(newValue);
      this.surveyObjects.selectObject(obj);
    }
    this.setModified({
      type: "PROPERTY_CHANGED",
      name: property.name,
      target: obj,
      oldValue: oldValue,
      newValue: newValue
    });
    //TODO add a flag to a property, may change other properties
    if (
      property.name == "locale" ||
      property.name == "hasComment" ||
      property.name == "hasSelectAll" ||
      property.name == "hasNone" ||
      property.name == "hasOther"
    ) {
      this.selectedObjectEditorValue.objectChanged();
    }
    return null;
  }
  private doUndoRedo(item: UndoRedoItem) {
    this.initSurvey(item.surveyJSON);
    if (item.selectedObjName) {
      var selObj = this.findObjByName(item.selectedObjName);
      if (selObj) {
        this.surveyObjects.selectObject(selObj);
      }
    }
    this.setState("modified");
    this.isAutoSave && this.doSave();
  }
  private findObjByName(name: string): Survey.Base {
    var page = this.survey.getPageByName(name);
    if (page) return page;
    var question = <Survey.Question>this.survey.getQuestionByName(name);
    if (question) return question;
    return null;
  }
  private canSwitchViewType(newType: string): boolean {
    if (newType && this.viewType == newType) return false;
    if (this.viewType == "designer") {
      this.jsontext = this.getSurveyTextFromDesigner();
    }
    if (
      (this.viewType == "translation" || this.viewType == "logic") &&
      newType == "designer"
    ) {
      this.survey.render();
    }
    if (this.viewType != "editor") return true;
    if (!this.jsonisJsonCorrect) {
      alert(this.getLocString("ed.correctJSON"));
      this.viewType = "editor"
      return false;
    }
    if (!this.readOnly) {
      this.initSurvey(
        new Survey.JsonObject().toJsonObject(this.jsonsurvey)
      );
      this.setModified({ type: "VIEW_TYPE_CHANGED", newType: newType });
    }
    return true;
  }

  public get showingViewName(): string {
    return this.viewType;
  }

  public makeNewViewActive(viewType: string = this.viewType): boolean {
    if (!this.canSwitchViewType(viewType)) return false;
    if (viewType == "editor") {
      this.jsonshow(this.getSurveyTextFromDesigner());
    }
    if (viewType == "test") {
      this.showLiveSurvey();
    }
    if (viewType == "embed") {
      this.showSurveyEmbeding();
    }
    if (viewType == "translation") {
      this.showSurveyTranslation();
    }
    return true;
  }

  public showDesigner() {
    debugger
    this.makeNewViewActive("designer");
  }

  public showJsonEditor() {
    this.makeNewViewActive("editor");
  }

  public showTestSurvey() {
    this.makeNewViewActive("test");
  }

  public showEmbedEditor() {
    this.makeNewViewActive("embed");
  }

  public showTranslationEditor() {
    this.makeNewViewActive("translation");
  }

  public showLogicEditor() {
    if (!this.canSwitchViewType("logic")) return;
    this.showSurveyLogic();
    this.viewType="logic";
  }
  private getSurveyTextFromDesigner() {
    var json = this.survey.toJSON();
    if (this.options && this.options.generateValidJSON)
      return JSON.stringify(json, null, 1);
    return new SurveyJSON5().stringify(json, null, 1);
  }
  private getPageByElement(obj: Survey.Base): Survey.Page {
    var page = this.survey.getPageByElement(<Survey.IElement>(<any>obj));
    if (page) return <Survey.Page>page;
    return this.surveyObjects.getSelectedObjectPage(obj);
  }

  public get selectedElement(): any {
    return !!this.selectedObject ? this.selectedObject.value : null;
  }
  public set selectedElement(val: any) {
    this.surveyObjects.selectObject(val);
  }
  private selectedObjectChanged(obj: Survey.Base) {
    var options = { newSelectedElement: obj };
    this.onSelectedElementChanging.fire(this, options);
    if (obj != options.newSelectedElement) {
      this.surveyObjects.selectObject(options.newSelectedElement);
      return;
    }
    var canDeleteObject = false;
    this.selectedObjectEditorValue.selectedObject = obj;
    var objType = SurveyHelper.getObjectType(obj);
    if (objType == ObjType.Page) {
      this.survey.currentPage = <Survey.Page>obj;
      canDeleteObject = this.pages.length > 1;
    }
    if (objType == ObjType.Question || objType == ObjType.Panel) {
      this.survey.selectedElement = obj;
      canDeleteObject = true;
      this.survey.currentPage = this.getPageByElement(obj);
      var id = obj["id"];
      if (this.renderedElement && id && this.survey.currentPage) {
        let el = <HTMLElement>this.renderedElement.querySelector("#" + id);
        SurveyHelper.scrollIntoViewIfNeeded(el);
      }
    } else {
      this.survey.selectedElement = null;
    }
    this.canDeleteObject=canDeleteObject;
    //Select2 work-around
    if (this.renderedElement && this.select2) {
      var el = <HTMLElement>(
        this.renderedElement.querySelector("#select2-objectSelector-container")
      ); //TODO
      if (el) {
        var item = this.surveyObjects.koSelected();
        if (item && item.text) {
          el.innerText = item.text();
        }
      }
    }
    this.onSelectedElementChanged.fire(this, options);
  }
  private applyBinding() {
    // if (this.renderedElement == null) return;
    // ko.cleanNode(this.renderedElement);
    // ko.applyBindings(this, this.renderedElement);
    this.surveyjs = <HTMLElement>(
      this.renderedElement.querySelector("#surveyjs")
    );
    if (this.surveyjs) {
      var self = this;
      this.surveyjs.onkeydown = function(e) {
        if (!e) return;
        // if (e.keyCode == 46) self.deleteQuestion();
        if (e.keyCode == 38 || e.keyCode == 40) {
          self.selectQuestion(e.keyCode == 38);
        }
      };
    }

    this.initSurvey(this.getDefaultSurveyJson());
    this.setUndoRedoCurrentState(true);    
    this.jsonEditor.init(<HTMLElement>(
      this.renderedElement.querySelector("#surveyjsJSONEditor")
    ));
    // if (typeof jQuery !== "undefined" && jQuery()["select2"]) {
    //   var options: any = {
    //     width: "100%"
    //   };
    //   if (this.isRTLValue) {
    //     options.dir = "rtl";
    //   }
    //   var $objectSelector = jQuery("#objectSelector");
    //   this.select2 = $objectSelector["select2"](options);
    //   $objectSelector.on("select2:select", (sel_evt: any) => {
    //     this.selectedObject=sel_evt.target.value;
    //   });
    // }
  }
  private getDefaultSurveyJson(): any {
    var json = new SurveyJSON5().parse(SurveyCreator.defaultNewSurveyText);
    if (
      json["pages"] &&
      json["pages"]["length"] > 0 &&
      json["pages"][0]["name"]
    ) {
      json["pages"][0]["name"] =
        editorLocalization.getString("ed.newPageName") + "1";
    }
    return json;
  }
  public createSurvey(
    json: any = {},
    reason: string = "designer",
    surveyType = Survey.Model
  ) {
    var survey = new surveyType(json);
    this.onSurveyInstanceCreated.fire(this, { survey: survey, reason: reason });
    return survey;
  }
  private initSurvey(json: any) {
    var self = this;
    this.surveyValue=this.createSurvey({}, "designer", SurveyForDesigner);
    this.dragDropHelper = new DragDropHelper(
      <Survey.ISurvey>this.survey,
      function(options) {
        self.setModified(options);
      },
      this.renderedElement
    );
    this.dragDropHelper.readOnly = this.readOnly;
    this.surveyValue.getEditor = () => self;
    this.surveyValue.setJsonObject(json);
    if (this.surveyValue.isEmpty) {
      this.surveyValue.setJsonObject(this.getDefaultSurveyJson());
    }
    Survey.surveyLocalization.currentLocale = this.surveyValue["locale"];
    this.surveyValue.dragDropHelper = this.dragDropHelper;
    this.surveyValue.onUpdateElementAllowingOptions = function(options) {
      self.onElementAllowOperations.fire(self, options);
    };
    var afterRenderElementHandler = createAfterRenderHandler(
      this,
      this.surveyValue
    );
    this.surveyValue.onAfterRenderQuestion.add((sender, options) => {
      afterRenderElementHandler(
        options.htmlElement,
        options.question,
        false,
        true
      );
    });
    this.surveyValue.onAfterRenderPanel.add((sender, options) => {
      if (options.panel.getType() === "flowpanel") {
        afterRenderElementHandler(
          options.htmlElement,
          options.panel,
          true,
          options.panel.koIsDragging()
        );
        var pnlEl = options.htmlElement.querySelector("f-panel");
        if (!!pnlEl) {
          if (!!pnlEl.className) {
            pnlEl.className += " svd_flowpanel";
          } else {
            pnlEl.className = "svd_flowpanel";
          }
        }
      } else {
        if (options.panel.elements.length == 0) {
          options.panel.emptyElement = addEmptyPanelElement(
            this.surveyValue,
            options.htmlElement,
            options.panel.dragDropHelper(),
            options.panel
          );
        }
        afterRenderElementHandler(
          options.htmlElement,
          options.panel,
          true,
          options.panel.koIsDragging()
        );
      }
    });
    this.surveyValue.onDragDropAllow.add(function(sender, options) {
      options.survey = sender;
      self.onDragDropAllow.fire(self, options);
    });
    this.surveyValue.onGetMenuItems.add((sender, options) => {
      if (this.readOnly) {
        return;
      }

      let opts = options.obj.allowingOptions;
      if (!opts) opts = {};

      if (opts.allowEdit) {
        options.items.push({
          name: "editelement",
          text: this.getLocString("survey.edit"),
          hasTitle: true,
          onClick: question => this.showQuestionEditor(question)
        });
      }

      if (opts.allowDelete) {
        var deleteLocaleName = options.obj.isPanel
          ? "survey.deletePanel"
          : "survey.deleteQuestion";
        options.items.push({
          name: "delete",
          text: self.getLocString(deleteLocaleName),
          onClick: function(selObj) {
            self.deleteObject(selObj);
          }
        });
      }

      if (
        opts.allowShowHideTitle &&
        typeof options.obj.titleLocation !== "undefined"
      ) {
        var isShowTitle = ko.observable<boolean>(
          options.obj.titleLocation !== "hidden"
        );
        options.items.push({
          name: "showtitle",
          text: this.getLocString("pe.showTitle"),
          icon: ko.computed(() => {
            if (isShowTitle()) {
              return "icon-actionshowtitle";
            }
            return "icon-actionhidetitle";
          }),
          onClick: (question: Survey.Question) => {
            if (question.titleLocation !== "hidden") {
              question.titleLocation = "hidden";
              if (question.getType() === "boolean") {
                question["showTitle"] = false;
              }
            } else {
              question.titleLocation = "default";
              if (question.getType() === "boolean") {
                question["showTitle"] = true;
              }
            }
            isShowTitle(question.titleLocation !== "hidden");
            this.onQuestionEditorChanged(question);
          }
        });
      }

      if (
        opts.allowChangeRequired &&
        typeof options.obj.isRequired !== "undefined"
      ) {
        var isRequired = ko.computed(() => options.obj.isRequired);
        options.items.push({
          name: "isrequired",
          text: this.getLocString("pe.isRequired"),
          icon: ko.computed(() => {
            if (isRequired()) {
              return "icon-actionisrequired";
            }
            return "icon-actionnotrequired";
          }),
          onClick: (question: Survey.Question) => {
            question.isRequired = !question.isRequired;
            this.onQuestionEditorChanged(question);
          }
        });
      }

      if (options.items.length > 0) {
        options.items.push({ template: "action-separator" });
      }

      if (opts.allowCopy) {
        options.items.push({
          name: "copy",
          text: self.getLocString("survey.copy"),
          onClick: function(selObj) {
            self.fastCopyQuestion(selObj);
          }
        });
      }

      if (opts.allowAddToToolbox) {
        options.items.push({
          name: "addtotoolbox",
          text: self.getLocString("survey.addToToolbox"),
          onClick: function(selObj) {
            self.addCustomToolboxQuestion(selObj);
          }
        });
      }

      if (opts.allowChangeType) {
        if (options.items.length > 0) {
          options.items.push({ template: "action-separator" });
        }
        var currentType = options.obj.getType();
        var convertClasses = QuestionConverter.getConvertToClasses(
          currentType,
          this.toolbox.itemNames
        );
        var allowChangeType = convertClasses.length > 0;
        var createTypeByClass = className => {
          return {
            name: this.getLocString("qt." + className),
            value: className
          };
        };
        var availableTypes = [createTypeByClass(currentType)];
        for (var i = 0; i < convertClasses.length; i++) {
          var className = convertClasses[i];
          availableTypes.push(createTypeByClass(className));
        }
        options.items.push({
          text: this.getLocString("qt." + currentType),
          title: this.getLocString("survey.convertTo"),
          type: currentType,
          allowChangeType: allowChangeType,
          template: "convert-action",
          availableTypes: availableTypes,
          onConvertType: (data, event) => {
            var newType = event.target.value;
            this.convertCurrentObject(options.obj, newType);
          }
        });
      }

      if (opts.allowDragging) {
        options.items.push({
          name: "dragelement",
          needFocus: false,
          text: self.getLocString("survey.drag"),
          onClick: function(selObj) {}
        });
      }

      self.onDefineElementMenuItems.fire(self, options);
    });

    this.onDesignerSurveyCreated.fire(this, { survey: this.surveyValue });
    this.survey.render(this.surveyjs);
    this.surveyObjects.survey = this.survey;
    this.pages=this.survey.pages;
    this.surveyValue.onSelectedElementChanged.add(
      (sender: Survey.Survey, options) => {
        self.surveyObjects.selectObject(sender["selectedElement"]);
      }
    );
    this.surveyValue.onEditButtonClick.add((sender: Survey.Survey) => {
      self.showQuestionEditor(self.selectedObject.value);
    });
    this.surveyValue.onElementDoubleClick.add(
      (sender: Survey.Survey, options) => {
        self.onElementDoubleClick.fire(self, options);
      }
    );
    this.surveyValue.onProcessHtml.add((sender: Survey.Survey, options) => {
      options.html = self.processHtml(options.html);
    });
    this.surveyValue.onQuestionAdded.add((sender: Survey.Survey, options) => {
      self.doOnQuestionAdded(options.question, options.parentPanel);
    });
    this.surveyValue.onQuestionRemoved.add(
      (sender: Survey.Survey, options) => {
        self.doOnElementRemoved(options.question);
      }
    );
    this.surveyValue.onPanelAdded.add((sender: Survey.Survey, options) => {
      self.doOnPanelAdded(options.panel, options.parentPanel);
    });
    this.surveyValue.onPanelRemoved.add((sender: Survey.Survey, options) => {
      self.doOnElementRemoved(options.panel);
    });
    var pAdded = <any>this.surveyValue["onPageAdded"];
    if (pAdded && pAdded.add) {
      pAdded.add((sender: Survey.Survey, options) => {
        self.doOnPageAdded(options.page);
      });
    }
  }
  private processHtml(html: string): string {
    if (!html) return html;
    var scriptRegEx = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
    while (scriptRegEx.test(html)) {
      html = html.replace(scriptRegEx, "");
    }
    return html;
  }
  private doDraggingToolboxItem(json: any, e) {
    this.dragDropHelper.startDragToolboxItem(
      e,
      this.getNewName(json["type"]),
      json
    );
  }
  private newQuestions: Array<any> = [];
  private newPanels: Array<any> = [];
  private doClickToolboxItem(json: any) {
    if (!this.readOnly) {
      var newElement = this.createNewElement(json);
      this.doClickQuestionCore(newElement);
    }
  }
  public copyElement(element: Survey.Base): Survey.IElement {
    var json = new Survey.JsonObject().toJsonObject(element);
    json.type = element.getType();
    return this.createNewElement(json);
  }
  private getRows(pnl: Survey.PanelModelBase): Array<any> {
    return !!pnl["koRows"] ? pnl["koRows"]() : pnl.rows;
  }
  public isCurrentPageEmpty (){
    return !!this.surveyValue &&
    !!this.surveyValue.currentPage &&
    this.getRows(this.surveyValue.currentPage).length === 0;
  }
  public dragOverQuestionsEditor(data, e) {
    data.survey.dragDropHelper.doDragDropOver(e, data.survey.currentPage);
    return false;
  }
  public dropOnQuestionsEditor(data, e) {
    data.survey.dragDropHelper.doDrop(e);
  }
  private createNewElement(json: any): Survey.IElement {
    var newElement = Survey.Serializer.createClass(json["type"]);
    new Survey.JsonObject().toObject(json, newElement);
    this.setNewNames(newElement);
    return newElement;
  }
  private setNewNames(element: Survey.IElement) {
    this.newQuestions = [];
    this.newPanels = [];
    this.setNewNamesCore(element);
  }
  private setNewNamesCore(element: Survey.IElement) {
    var elType = element["getType"]();
    element.name = this.getNewName(elType);
    if (element.isPanel || elType == "page") {
      if (element.isPanel) {
        this.newPanels.push(element);
      }
      var panel = <Survey.PanelModelBase>(<any>element);
      for (var i = 0; i < panel.elements.length; i++) {
        this.setNewNamesCore(panel.elements[i]);
      }
    } else {
      this.newQuestions.push(element);
    }
  }
  private generateUniqueName(el: Survey.Base, newName: string): string {
    while (!this.isNameUnique(el, newName)) {
      newName = SurveyHelper.generateNewName(newName);
    }
    return newName;
  }
  private isNameUnique(el: Survey.Base, newName: string): boolean {
    if (!this.isNameUniqueInArray(this.survey.pages, el, newName)) return false;
    if (!this.isNameUniqueInArray(this.survey.getAllPanels(), el, newName))
      return false;
    return this.isNameUniqueInArray(this.survey.getAllQuestions(), el, newName);
  }
  private isNameUniqueInArray(
    elements: Array<any>,
    el: Survey.Base,
    newName: string
  ): boolean {
    newName = newName.toLowerCase();
    for (var i = 0; i < elements.length; i++) {
      if (elements[i] != el && elements[i].name.toLowerCase() == newName)
        return false;
    }
    return true;
  }
  private getNewName(type: string): string {
    if (type == "page") return SurveyHelper.getNewPageName(this.pages);
    return type == "panel" || type == "flowpanel"
      ? this.getNewPanelName()
      : this.getNewQuestionName();
  }
  private getNewQuestionName(): string {
    return SurveyHelper.getNewQuestionName(this.getAllQuestions());
  }
  private getNewPanelName(): string {
    return SurveyHelper.getNewPanelName(this.getAllPanels());
  }
  private getAllQuestions(): Array<any> {
    var result = [];
    for (var i = 0; i < this.pages.length; i++) {
      this.addElements(this.pages[i].elements, false, result);
    }
    this.addElements(this.newPanels, false, result);
    this.addElements(this.newQuestions, false, result);
    return result;
  }
  private getAllPanels(): Array<any> {
    var result = [];
    for (var i = 0; i < this.pages.length; i++) {
      this.addElements(this.pages[i].elements, true, result);
    }
    this.addElements(this.newPanels, true, result);
    this.addElements(this.newQuestions, true, result);
    return result;
  }
  private addElements(
    elements: Array<any>,
    isPanel: boolean,
    result: Array<any>
  ) {
    for (var i = 0; i < elements.length; i++) {
      if (elements[i].isPanel === isPanel) {
        result.push(elements[i]);
      }
      this.addElements(SurveyHelper.getElements(elements[i]), isPanel, result);
    }
  }
  private doClickQuestionCore(
    element: Survey.IElement,
    modifiedType: string = "ADDED_FROM_TOOLBOX"
  ) {
    var parent = this.survey.currentPage;
    var index = -1;
    var elElement = this.survey.selectedElement;
    if (elElement && elElement.parent) {
      parent = elElement.parent;
      index = parent.elements.indexOf(this.survey.selectedElement);
      if (index > -1) index++;
    }
    parent.addElement(element, index);
    if (this.renderedElement && this.scrollToNewElement) {
      SurveyHelper.scrollIntoViewIfNeeded(
        this.renderedElement.querySelector("#" + element["id"])
      );
    }
    this.setModified({ type: modifiedType, question: element });
  }
  private deleteQuestion() {
    var question = this.getSelectedObjAsQuestion();
    if (question) {
      this.deleteCurrentObject();
    }
  }
  private selectQuestion(isUp: boolean) {
    var question = this.getSelectedObjAsQuestion();
    if (question) {
      this.surveyObjects.selectNextQuestion(isUp);
    }
  }
  private getSelectedObjAsQuestion(): Survey.Question {
    var obj = this.selectedObject.value;
    if (!obj) return null;
    return SurveyHelper.getObjectType(obj) == ObjType.Question
      ? <Survey.Question>obj
      : null;
  }
  public deleteCurrentObject() {
    this.deleteObject(this.selectedObject.value);
  }
  private editCurrentObject() {
    this.showQuestionEditor(this.selectedObject.value);
  }
  private convertCurrentObject(obj: Survey.Question, className: string) {
    var newQuestion = QuestionConverter.convertObject(obj, className);
    this.setModified({
      type: "QUESTION_CONVERTED",
      className: className,
      oldValue: obj,
      newValue: newQuestion
    });
  }

  public showElementEditor(
    element: Survey.Base,
    onClose: (isCanceled: boolean) => any
  ) {
    this.showQuestionEditor(element, onClose);
  }
  private showEditorOldName: string;
  private updateConditions(oldName: string, newName: string) {
    new SurveyLogic(this.survey).renameQuestion(oldName, newName);
  }
  public showQuestionEditor = (
    element: Survey.Base,
    onClose: (isCanceled: boolean) => any = null
  ) => {
    var self = this;
    var elWindow = this.renderedElement
      ? <HTMLElement>(
          this.renderedElement.querySelector("#surveyquestioneditorwindow")
        )
      : null;
    var isCanceled = true;
    this.showEditorOldName = element["name"];
    this.questionEditorWindow.show(
      element,
      elWindow,
      function(question) {
        self.onQuestionEditorChanged(question);
        isCanceled = false;
      },
      this,
      function() {
        if (onClose) onClose(isCanceled);
        self.onElementEditorClosed.fire(self, {
          isCanceled: isCanceled,
          element: element
        });
      }
    );
  };
  public onQuestionEditorChanged(question: Survey.Question) {
    if (!!question.name && !this.isNameUnique(question, question.name)) {
      question.name = this.generateUniqueName(question, question.name);
    }
    if (
      !!this.showEditorOldName &&
      !!question.name &&
      this.showEditorOldName != question.name
    ) {
      this.updateConditions(this.showEditorOldName, question.name);
      this.showEditorOldName = "";
    }
    this.surveyObjects.nameChanged(question);
    this.selectedObjectEditorValue.objectChanged();
    this.dirtyPageUpdate(); //TODO why this is need ? (ko problem)
    this.setModified({
      type: "QUESTION_CHANGED_BY_EDITOR",
      question: question
    });
  }

  //TODO why this is need ? (ko problem)
  private dirtyPageUpdate = () => {
    var selectedObject = this.selectedObject.value;
    if (SurveyHelper.getObjectType(selectedObject) !== ObjType.Page) {
      if (
        SurveyHelper.getObjectType(selectedObject) === ObjType.Question &&
        !!selectedObject["koElementType"]
      ) {
        selectedObject["koElementType"].notifySubscribers();
      }
      return;
    }
    this.pages.notifySubscribers();
    this.surveyObjects.selectObject(selectedObject);
  };


  public addCustomToolboxQuestion(question: Survey.Question) {
    var options = {};
    this.onCustomElementAddingIntoToolbox.fire(this, {
      element: question,
      itemOptions: options
    });
    this.toolbox.addCopiedItem(question, options);
    this.onCustomElementAddedIntoToolbox.fire(this, { element: question });
  }

  public fastCopyQuestion(question: Survey.Base) {
    var newElement = this.copyElement(question);
    this.doClickQuestionCore(newElement, "ELEMENT_COPIED");
  }

  public copyPage = (page: Survey.PageModel): Survey.PageModel => {
    var newPage = <Survey.Page>(<any>this.copyElement(page));
    var index = this.pages.indexOf(page);
    if (index > -1) {
      this.pages.splice(index + 1, 0, newPage);
    } else {
      this.pages.push(newPage);
    }
    this.addPageToUI(newPage);
    this.setModified({ type: "PAGE_ADDED", newValue: newPage });
    return newPage;
  };

  public deleteElement(element: Survey.Base) {
    this.deleteObject(element);
  }
  private deleteObject(obj: any) {
    var options = {
      element: obj,
      elementType: SurveyHelper.getObjectType(obj),
      allowing: true
    };
    this.onElementDeleting.fire(this, options);
    if (!options.allowing) return;
    this.surveyObjects.removeObject(obj);
    var objType = SurveyHelper.getObjectType(obj);
    if (objType == ObjType.Page) {
      this.survey.removePage(obj);
    } else {
      this.survey.currentPage.removeElement(obj);
      this.survey.selectedElement = null;
      this.surveyObjects.selectObject(this.survey.currentPage);
    }
    this.setModified({
      type: "OBJECT_DELETED",
      target: obj
    });
  }
  public get surveyLiveTester(): SurveyLiveTester {
    return this.surveyLive;
  }
  private showLiveSurvey() {
    var self = this;
    this.surveyLive.onSurveyCreatedCallback = function(survey: Survey.Survey) {
      self.onTestSurveyCreated.fire(self, { survey: survey });
    };
    this.surveyLive.setJSON(this.getSurveyJSON());
    var options = {
      showPagesInTestSurveyTab: this.showPagesInTestSurveyTab,
      showDefaultLanguageInTestSurveyTab: this.showDefaultLanguageInTestSurveyTab,
      showInvisibleElementsInTestSurveyTab: this.showInvisibleElementsInTestSurveyTab
    };
    this.surveyLive.onGetObjectDisplayName = function(obj): string {
      return self.getObjectDisplayName(obj);
    };
    this.surveyLive.show(options);
  }
  private showSurveyEmbeding() {
    var json = this.getSurveyJSON();
    this.surveyEmbeding.json = json;
    this.surveyEmbeding.surveyId = this.surveyId;
    this.surveyEmbeding.surveyPostId = this.surveyPostId;
    this.surveyEmbeding.generateValidJSON =
      this.options && this.options.generateValidJSON;
    this.surveyEmbeding.show();
  }
  private showSurveyTranslation() {
    this.translation.survey = this.survey;
  }
  private showSurveyLogic() {
    this.logic.update(this.survey, this);
  }
  private getSurveyJSON(): any {
    if (
      this.isShowDesigner ||
      this.viewType == "translation" ||
      this.viewType == "logic"
    )
      return new Survey.JsonObject().toJsonObject(this.survey);
    if (this.jsonisJsonCorrect)
      return new Survey.JsonObject().toJsonObject(this.jsonsurvey);
    return null;
  }
  private createAnnotations(text: string, errors: any[]): AceAjax.Annotation[] {
    var annotations = new Array<AceAjax.Annotation>();
    for (var i = 0; i < errors.length; i++) {
      var error = errors[i];
      var annotation: AceAjax.Annotation = {
        row: error.position.start.row,
        column: error.position.start.column,
        text: error.text,
        type: "error"
      };
      annotations.push(annotation);
    }
    return annotations;
  }
  public getObjectDisplayName(obj: Survey.Base): string {
    var displayName = SurveyHelper.getObjectName(obj, this.showObjectTitles);
    var options = { obj: obj, displayName: displayName };
    this.onGetObjectDisplayName.fire(this, options);
    return options.displayName;
  }
  //implements ISurveyObjectEditorOptions
  get alwaySaveTextInPropertyEditors(): boolean {
    return this.alwaySaveTextInPropertyEditorsValue;
  }
  set alwaySaveTextInPropertyEditors(value: boolean) {
    this.alwaySaveTextInPropertyEditorsValue = value;
  }
  get showApplyButtonInEditors(): boolean {
    return this.showApplyButtonValue;
  }
  set showApplyButtonInEditors(value: boolean) {
    this.showApplyButtonValue = value;
  }
  onEditorTabRenderedCallback = (
    tabName: string,
    elements: HTMLDivElement[],
    model: any,
    tabData: any
  ) => {
    this.onEditorTabRendered.fire(this, {
      tabName,
      elements,
      model,
      tabData
    });
  };
  onCanShowPropertyCallback(
    object: any,
    property: Survey.JsonObjectProperty
  ): boolean {
    return this.onCanShowObjectProperty(object, property);
  }
  onIsEditorReadOnlyCallback(
    obj: Survey.Base,
    editor: SurveyPropertyEditorBase,
    readOnly: boolean
  ): boolean {
    var proposedValue = this.readOnly || readOnly;
    if (this.onGetPropertyReadOnly.isEmpty) return proposedValue;
    var options = {
      obj: obj,
      property: property,
      readOnly: proposedValue,
      propertyName: property.name
    };
    this.onGetPropertyReadOnly.fire(this, options);
    return options.readOnly;
  }
  onItemValueAddedCallback(
    obj: Survey.Base,
    propertyName: string,
    itemValue: Survey.ItemValue,
    itemValues: Array<Survey.ItemValue>
  ) {
    var options = {
      obj: obj,
      propertyName: propertyName,
      newItem: itemValue,
      itemValues: itemValues
    };
    this.onItemValueAdded.fire(this, options);
  }
  onMatrixDropdownColumnAddedCallback(
    matrix: Survey.Question,
    column: Survey.MatrixDropdownColumn,
    columns: Array<Survey.MatrixDropdownColumn>
  ) {
    var options = { newColumn: column, matrix: matrix, columns: columns };
    this.onMatrixColumnAdded.fire(this, options);
  }
  onSetPropertyEditorOptionsCallback(
    propertyName: string,
    obj: Survey.Base,
    editorOptions: any
  ) {
    var options = {
      propertyName: propertyName,
      obj: obj,
      editorOptions: editorOptions
    };
    this.onSetPropertyEditorOptions.fire(this, options);
  }
  onGetErrorTextOnValidationCallback(
    propertyName: string,
    obj: Survey.Base,
    value: any
  ): string {
    var options = {
      propertyName: propertyName,
      obj: obj,
      value: value,
      error: ""
    };
    this.onPropertyValidationCustomError.fire(this, options);
    return options.error;
  }
  onValueChangingCallback(options: any) {
    this.onPropertyValueChanging.fire(this, options);
  }
  onPropertyEditorKeyDownCallback(
    propertyName: string,
    obj: Survey.Base,
    editor: SurveyPropertyEditorBase,
    event: KeyboardEvent
  ) {
    var options = {
      propertyName: propertyName,
      obj: obj,
      editor: editor,
      event: event
    };
    this.onPropertyEditorKeyDown.fire(this, options);
  }
  onPropertyEditorObjectSetCallback(
    propertyName: string,
    obj: Survey.Base,
    editor: SurveyPropertyEditorBase
  ) {
    var options = { propertyName: propertyName, obj: obj, editor: editor };
    this.onPropertyEditorObjectAssign.fire(this, options);
  }
  onPropertyEditorModalShowDescriptionCallback(
    propertyName: string,
    obj: Survey.Base
  ): any {
    var options = {
      obj: obj,
      propertyName: propertyName,
      htmlTop: "",
      htmlBottom: ""
    };
    this.onShowPropertyModalEditorDescription.fire(this, options);
    var res = { top: options.htmlTop, bottom: options.htmlBottom };
    return res;
  }
  onGetElementEditorTitleCallback(obj: Survey.Base, title: string): string {
    return title;
  }
  onConditionValueSurveyCreatedCallBack(
    valueQuestionName: string,
    propertyName: string,
    obj: Survey.Base,
    editor: SurveyPropertyEditorBase,
    survey: Survey.Survey
  ) {
    var options = {
      valueQuestionName: valueQuestionName,
      propertyName: propertyName,
      obj: obj,
      editor: editor,
      survey: survey
    };
    this.onConditionValueSurveyCreated.fire(this, options);
  }
  onConditionQuestionsGetListCallback(
    propertyName: string,
    obj: Survey.Base,
    editor: SurveyPropertyEditorBase,
    list: any[]
  ) {
    var options = {
      propertyName: propertyName,
      obj: obj,
      editor: editor,
      list: list
    };
    this.onConditionQuestionsGetList.fire(this, options);
  }
  onAdornerRenderedCallback(
    question: Survey.Question,
    adorner: string,
    element: HTMLElement,
    context?: any
  ) {
    var options = {
      survey: this.survey,
      question: question,
      adorner: adorner,
      element: element,
      context: context
    };
    this.onAdornerRendered.fire(this, options);
  }

  public uploadFiles(
    files: File[],
    uploadingCallback: (status: string, data: any) => any
  ) {
    if (this.onUploadFile.isEmpty) {
      let fileReader = new FileReader();
      fileReader.onload = e => {
        uploadingCallback("success", fileReader.result);
      };
      fileReader.readAsDataURL(files[0]);
    } else {
      this.onUploadFile.fire(this, {
        files: files || [],
        callback: uploadingCallback
      });
    }
  }
}

// ko.components.register("survey-widget", {
//   viewModel: function(params) {
//     this.survey = params.survey;
//   },
//   template:
//     "<!-- ko if: $data.survey --><!-- ko template: { name: 'survey-content', data: survey, afterRender: $parent.koEventAfterRender } --><!-- /ko --><!-- /ko -->"
// });

// ko.components.register("svg-icon", {
//   viewModel: {
//     createViewModel: (params, componentInfo) => {
//       ko.computed(() => {
//         var size = (ko.unwrap(params.size) || 16) + "px";
//         var svgElem: any = componentInfo.element.childNodes[0];
//         svgElem.style.width = size;
//         svgElem.style.height = size;
//         var node: any = svgElem.childNodes[0];
//         node.setAttributeNS(
//           "http://www.w3.org/1999/xlink",
//           "xlink:href",
//           "#" + ko.unwrap(params.iconName)
//         );
//       });
//     }
//   },
//   template: "<svg class='svd-svg-icon'><use></use></svg>"
// });

export class SurveyEditor extends SurveyCreator {
  constructor(renderedElement: any = null, options: any = null) {
    super(renderedElement, options);
  }
}

function addEmptyPanelElement(
  survey: SurveyForDesigner,
  root: HTMLElement,
  dragDropHelper: any,
  panel: any
): HTMLElement {
  var eDiv: HTMLDivElement = document.createElement("div");
  eDiv.className = "well card card-block";
  eDiv.ondragover = function(e) {
    dragDropHelper.doDragDropOver(e, panel);
  };
  var eSpan: HTMLSpanElement = document.createElement("span");
  eSpan.textContent = survey.getEditorLocString("survey.dropQuestion");
  eDiv.appendChild(eSpan);
  root.appendChild(eDiv);
  return eDiv;
}


Vue.component("survey-editor", SurveyCreator);
export default SurveyCreator;
</script>
