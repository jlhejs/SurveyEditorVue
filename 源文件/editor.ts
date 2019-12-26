import * as ko from "knockout";
import { editorLocalization } from "./editorLocalization";
import { SurveyObjectEditor } from "./objectEditor";
import {
  ISurveyObjectEditorOptions,
  SurveyPropertyEditorBase
} from "./propertyEditors/propertyEditorBase";
import { SurveyLiveTester } from "./surveylive";
import { SurveyEmbedingWindow } from "./surveyEmbedingWindow";
import { SurveyObjects } from "./surveyObjects";
import { QuestionConverter } from "./questionconverter";
import { SurveyPropertyEditorShowWindow } from "./questionEditors/questionEditor";
import { SurveyJSONEditor } from "./surveyJSONEditor";
import { SurveyTextWorker } from "./textWorker";
import { SurveyUndoRedo, UndoRedoItem } from "./undoredo";
import { SurveyHelper, ObjType } from "./surveyHelper";
import { DragDropHelper } from "./dragdrophelper";
import { QuestionToolbox } from "./questionToolbox";
import { SurveyJSON5 } from "./json5";
var templateEditorHtml = require("html-loader?interpolate!val-loader!./templates/entry.html");
import * as Survey from "survey-knockout";
import { SurveyForDesigner, createAfterRenderHandler } from "./surveyjsObjects";
import { StylesManager } from "./stylesmanager";
import { itemAdorner } from "./adorners/item-editor";
import { Translation } from "./translation";
import { SurveyLogic } from "./logic";

/**
 * The toolbar item description.
 */
export interface IToolbarItem {
  /**
   * Unique string id
   */
  id: string;
  /**
   * Set this property to false to make the toolbar item invisible.
   */
  visible: ko.Computed<boolean> | ko.Observable<boolean> | boolean;
  /**
   * Toolbar item title
   */
  title: ko.Computed<string> | string;
  /**
   * Set this property to false to disable the toolbar item.
   */
  enabled?: ko.Computed<boolean> | boolean;
  /**
   * Set this property to false to hide the toolbar item title.
   */
  showTitle?: ko.Computed<boolean> | boolean;
  /**
   * A callback that calls on toolbar item click.
   */
  action?: () => void;
  /**
   * Toolbar item css class
   */
  css?: ko.Computed<string> | string;
  innerCss?: ko.Computed<string> | string;
  data?: any;
  template?: string;
  /**
   * Toolbar item icon name
   */
  icon?: string;
  items?: ko.ObservableArray<IToolbarItem>;
}

/**
 * Survey Creator is WYSIWYG editor.
 */

export class SurveyCreator implements ISurveyObjectEditorOptions {
  public static defaultNewSurveyText: string = "{ pages: [ { name: 'page1'}] }";
  private _haveCommercialLicense = ko.observable(false);
  private renderedElement: HTMLElement;
  private surveyjs: HTMLElement;

  private jsonEditor: SurveyJSONEditor;
  public selectedObjectEditorValue: SurveyObjectEditor;
  private questionEditorWindow: SurveyPropertyEditorShowWindow;

  public pages: ko.ObservableArray<Survey.PageModel>;
  public selectPage: Function;

  private surveyLive: SurveyLiveTester;
  private surveyEmbeding: SurveyEmbedingWindow;
  private translationValue: Translation;
  private logicValue: SurveyLogic;
  private surveyObjects: SurveyObjects;
  private toolboxValue: QuestionToolbox;
  private undoRedo: SurveyUndoRedo;
  private surveyValue = ko.observable<SurveyForDesigner>();
  private saveSurveyFuncValue: (
    no: number,
    onSaveCallback: (no: number, isSuccess: boolean) => void
  ) => void;
  private options: any;
  private stateValue: string = "";
  private dragDropHelper: DragDropHelper = null;
  private showJSONEditorTabValue = ko.observable<boolean>(false);
  private showTestSurveyTabValue = ko.observable<boolean>(false);
  private showEmbededSurveyTabValue = ko.observable<boolean>(false);
  private showTranslationTabValue = ko.observable<boolean>(false);
  private showLogicTabValue = ko.observable<boolean>(false);
  private select2: any = null;
  private alwaySaveTextInPropertyEditorsValue: boolean = false;
  private showApplyButtonValue: boolean = true;
  private isRTLValue: boolean = false;
  /**
   * If set to true (default value) the creator scrolls to a new element. A new element can be added from Toolbox or by copying.
   */
  public scrollToNewElement: boolean = true;

  /**
   * You have right to set this property to true if you have bought the commercial licence only.
   * It will remove the text about non-commerical usage on the top of the widget.
   * Setting this property true without having a commercial licence is illegal.
   * @see haveCommercialLicense
   */
  public get haveCommercialLicense() {
    return this._haveCommercialLicense();
  }
  public set haveCommercialLicense(val) {
    this._haveCommercialLicense(val);
  }

  /**
   * You need to set this property to true if you want to inplace edit item values instead of texts.
   * @see inplaceEditForValues
   */
  public get inplaceEditForValues() {
    return itemAdorner.inplaceEditForValues;
  }
  public set inplaceEditForValues(val) {
    itemAdorner.inplaceEditForValues = val;
  }

  /**
   * You need to set this property to true if you want to use tabs instead of accordion in the popup element's editor.
   * @see useTabsInElementEditor
   */
  public useTabsInElementEditor = false;

  /**
   * You need to set this property to true if you want to show titles instead of names in pages editor and object selector.
   * @see onShowObjectDisplayName
   */
  public showObjectTitles = false;

  /**
   * You need to set this property to true if you want to show titles instead of names in expression editor.
   */
  public showTitlesInExpressions = false;

  /**
   * Set this property to false to hide the pages selector in the Test Survey Tab
   */
  public showPagesInTestSurveyTab = true;

  /**
   * Set this property to false to disable pages adding, editing and deleting
   */
  public allowModifyPages = true;

  /**
   * The default value is _"auto"_. It shows the language selector if there are more than two languages are using in the survey.
   * It shows only used languages in the survey.
   * Set this property to _false_ to hide the default language selector in the Test Survey Tab.
   * Set it to _true_ to show this selector even if there is only one language in the survey
   * Set it to _all_ to show the selector with all available languages (30+)
   */
  public showDefaultLanguageInTestSurveyTab: boolean | string = "auto";

  /**
   * Set this property to false to hide the show invisible element checkbox in the Test Survey Tab
   */
  public showInvisibleElementsInTestSurveyTab = true;

  /**
   * This property is assign to the survey.surveyId property on showing in the "Embed Survey" tab.
   * @see showEmbededSurveyTab
   */
  public surveyId: string = null;
  /**
   * This property is assign to the survey.surveyPostId property on showing in the "Embed Survey" tab.
   * @see showEmbededSurveyTab
   */
  public surveyPostId: string = null;
  /**
   * This callback is called on changing "Generate Valid JSON" option.
   */
  public generateValidJSONChangedCallback: (generateValidJSON: boolean) => void;
  /**
   * The event is called before undo happens.
   * <br/> options.canUndo a boolean value. It is true by default. Set it false to hide prevent undo operation.
   */
  public onBeforeUndo: Survey.Event<
    (sender: SurveyCreator, options: any) => any,
    any
  > = new Survey.Event<(sender: SurveyCreator, options: any) => any, any>();
  /**
   * The event is called before redo happens.
   * <br/> options.canRedo a boolean value. It is true by default. Set it false to hide prevent redo operation.
   */
  public onBeforeRedo: Survey.Event<
    (sender: SurveyCreator, options: any) => any,
    any
  > = new Survey.Event<(sender: SurveyCreator, options: any) => any, any>();
  /**
   * The event is called after undo happens.
   * <br/> options.state is an undo/redo item.
   */
  public onAfterUndo: Survey.Event<
    (sender: SurveyCreator, options: any) => any,
    any
  > = new Survey.Event<(sender: SurveyCreator, options: any) => any, any>();
  /**
   * The event is called after redo happens.
   * <br/> options.state is an undo/redo item.
   */
  public onAfterRedo: Survey.Event<
    (sender: SurveyCreator, options: any) => any,
    any
  > = new Survey.Event<(sender: SurveyCreator, options: any) => any, any>();
  /**
   * The event is called on changing the selected element. You may change the new selected element by changing the property options.newSelectedElement to your own
   * <br/> options.newSelectedElement the element that is going to be selected in the survey desiger: question, panel, page or survey.
   */
  public onSelectedElementChanging: Survey.Event<
    (sender: SurveyCreator, options: any) => any,
    any
  > = new Survey.Event<(sender: SurveyCreator, options: any) => any, any>();
  /**
   * The event is called after the selected element is changed.
   * <br/> options.newSelectedElement the new selected element in the survey desiger: question, panel, page or survey.
   */
  public onSelectedElementChanged: Survey.Event<
    (sender: SurveyCreator, options: any) => any,
    any
  > = new Survey.Event<(sender: SurveyCreator, options: any) => any, any>();
  /**
   * The event is called before showing a property in the Property Grid or in Question Editor.
   * <br/> sender the survey creator object that fires the event
   * <br/> options.obj the survey object, Survey, Page, Panel or Question
   * <br/> options.property the object property (Survey.JsonObjectProperty object). It has name, className, type, visible, readOnly and other properties.
   * <br/> options.canShow a boolean value. It is true by default. Set it false to hide the property from the Property Grid and in Question Editor.
   */
  public onShowingProperty: Survey.Event<
    (sender: SurveyCreator, options: any) => any,
    any
  > = new Survey.Event<(sender: SurveyCreator, options: any) => any, any>();
  /**
   * Obsolete, please use onShowingProperty event.
   * The event is called before showing a property in the Property Grid or in Question Editor.
   * <br/> sender the survey creator object that fires the event
   * <br/> options.obj the survey object, Survey, Page, Panel or Question
   * <br/> options.property the object property (Survey.JsonObjectProperty object). It has name, className, type, visible, readOnly and other properties.
   * <br/> options.canShow a boolean value. It is true by default. Set it false to hide the property from the Property Grid or in Question Editor
   * @see onShowingProperty
   */
  public onCanShowProperty: Survey.Event<
    (sender: SurveyCreator, options: any) => any,
    any
  > = this.onShowingProperty;
  /**
   * The event is called when creator tab has been rendered.
   * <br/> sender the survey creator object that fires the event
   * <br/> options.tabName the name of the rendered tab
   * <br/> options.elements the rendered elements
   * <br/> options.model current context model
   * <br/> options.tabData the data of the rendered tab
   */
  public onEditorTabRendered: Survey.Event<
    (sender: SurveyCreator, options: any) => any,
    any
  > = new Survey.Event<(sender: SurveyCreator, options: any) => any, any>();
  /**
   * The event is called when creator active tab is changed.
   * <br/> sender the survey creator object that fires the event
   * <br/> options.tabName the name of new active tab
   */
  public onActiveTabChanged: Survey.Event<
    (sender: SurveyCreator, options: any) => any,
    any
  > = new Survey.Event<(sender: SurveyCreator, options: any) => any, any>();
  /**
   * The event is called on setting a readOnly property of the property editor. By default the property.readOnly property is used.
   * You may changed it and make the property editor read only or enabled for a particular object.
   * <br/> sender the survey creator object that fires the event
   * <br/> options.obj the survey object, Survey, Page, Panel or Question
   * <br/> options.property the object property (Survey.JsonObjectProperty object). It has name, className, type, visible, readOnly and other properties.
   * <br/> options.readOnly a boolean value. It has value equals to options.readOnly property by default. You may change it.
   */
  public onGetPropertyReadOnly: Survey.Event<
    (sender: SurveyCreator, options: any) => any,
    any
  > = new Survey.Event<(sender: SurveyCreator, options: any) => any, any>();
  /**
   * The event allows you to custom sort properties in the Property Grid. It is a compare function. You should set options.result to -1 or 1 by comparing options.property1 and options.property2.
   * <br/> sender the survey creator object that fires the event
   * <br/> options.obj the survey object, Survey, Page, Panel or Question
   * <br/> options.property1 the left object property (Survey.JsonObjectProperty object).
   * <br/> options.property2 the right object property (Survey.JsonObjectProperty object).
   * <br/> options.result the result of comparing. It can be 0 (use default behavior),  -1 options.property1 is less than options.property2 or 1 options.property1 is more than options.property2
   */
  public onCustomSortProperty: Survey.Event<
    (sender: SurveyCreator, options: any) => any,
    any
  > = new Survey.Event<(sender: SurveyCreator, options: any) => any, any>();
  /**
   * The event allows to display the custom name for objects: questions, pages and panels. By default the object name is using. You may show object title by setting showObjectTitles property to true.
   * Use this event, if you want custom display name for objects.
   * <br/> sender the survey creator object that fires the event
   * <br/> options.obj the survey object, Survey, Page, Panel or Question
   * <br/> options.displayName change this property to show your custom display name for the object
   * @see showObjectTitles
   */
  public onGetObjectDisplayName: Survey.Event<
    (sender: SurveyCreator, options: any) => any,
    any
  > = new Survey.Event<(sender: SurveyCreator, options: any) => any, any>();
  /**
   * The event allows you modify DOM element for a property in the Property Grid. For example, you may change it's styles.
   * <br/> sender the survey creator object that fires the event
   * <br/> options.obj the survey object, Survey, Page, Panel or Question
   * <br/> options.htmlElement the html element (html table row in our case) that renders the property display name and it's editor.
   * <br/> options.property object property (Survey.JsonObjectProperty object).
   * <br/> options.propertyEditor the property Editor.
   */
  public onPropertyAfterRender: Survey.Event<
    (sender: SurveyCreator, options: any) => any,
    any
  > = new Survey.Event<(sender: SurveyCreator, options: any) => any, any>();
  /**
   * The event is called on deleting an element (question/panel/page) from the survey. Typically, when a user click the delete from the element menu.
   * <br/> sender the survey creator object that fires the event
   * <br/> options.element an instance of the deleting element
   * <br/> options.elementType the type of the element: 'question', 'panel' or 'page'.
   * <br/> options.allowing set it to false to cancel the element deleting
   */
  public onElementDeleting: Survey.Event<
    (sender: SurveyCreator, options: any) => any,
    any
  > = new Survey.Event<(sender: SurveyCreator, options: any) => any, any>();
  /**
   * The event is called on adding a new question into the survey. Typically, when a user dropped a Question from the Question Toolbox into designer Survey area.
   * <br/> sender the survey creator object that fires the event
   * <br/> options.question a new added survey question. Survey.Question object
   * <br/> options.page the survey Page object where question has been added.
   */
  public onQuestionAdded: Survey.Event<
    (sender: SurveyCreator, options: any) => any,
    any
  > = new Survey.Event<(sender: SurveyCreator, options: any) => any, any>();
  /**
   * The event is called when an end-user double click on an element (question/panel).
   * <br/> sender the survey creator object that fires the event
   * <br/> options.element an instance of the element
   */
  public onElementDoubleClick: Survey.Event<
    (sender: SurveyCreator, options: any) => any,
    any
  > = new Survey.Event<(sender: SurveyCreator, options: any) => any, any>();
  /**
   * The event is called on adding a new Survey.ItemValue object. It uses as an element in choices array in Radiogroup, checkbox and dropdown questions or Matrix columns and rows properties.
   * Use this event, to set ItemValue.value and ItemValue.text properties by default or set a value to the custom property.
   * <br/> sender the survey creator object that fires the event
   * <br /> options.obj the object that contains the itemsValues array, for example selector, rating and single choice matrix questions.
   * <br/> options.propertyName  the object property Name. It can be "choices" for selector questions or rateValues for rating question or columns/rows for single choice matrix.
   * <br/> options.newItem a new created Survey.ItemValue object.
   * <br/> options.itemValues an editing Survey.ItemValue array. newItem object is not added yet into this array.
   */
  public onItemValueAdded: Survey.Event<
    (sender: SurveyCreator, options: any) => any,
    any
  > = new Survey.Event<(sender: SurveyCreator, options: any) => any, any>();
  /**
   * The event is called when a user adds a new column into MatrixDropdown or MatrixDynamic questions. Use it to set some properties of Survey.MatrixDropdownColumn by default, for example name or a custom property.
   * <br/> sender the survey creator object that fires the event
   * <br/> options.matrix a matrix question where column is located, matrix.columns.
   * <br/> options.newColumn a new created Survey.MatrixDropdownColumn object.
   * <br/> options.columns editable columns objects. They can be different from options.matrix.columns. options.columns and options.matrix.columns are equal after user press Apply or Cancel and options.columns will be set to options.matrix.columns or reset to initial state.
   */
  public onMatrixColumnAdded: Survey.Event<
    (sender: SurveyCreator, options: any) => any,
    any
  > = new Survey.Event<(sender: SurveyCreator, options: any) => any, any>();
  /**
   * The event is called on adding a new panel into the survey.  Typically, when a user dropped a Panel from the Question Toolbox into designer Survey area.
   * <br/> sender the survey creator object that fires the event
   * <br/> options.panel a new added survey panel. Survey.Panel object
   * <br/> options.page the survey Page object where question has been added.
   */
  public onPanelAdded: Survey.Event<
    (sender: SurveyCreator, options: any) => any,
    any
  > = new Survey.Event<(sender: SurveyCreator, options: any) => any, any>();
  /**
   * The event is called on adding a new page into the survey.
   * <br/> sender the survey creator object that fires the event
   * <br/> options.page the new survey Page object.
   */
  public onPageAdded: Survey.Event<
    (sender: SurveyCreator, options: any) => any,
    any
  > = new Survey.Event<(sender: SurveyCreator, options: any) => any, any>();
  /**
   * The event is called when a survey is changed in the designer. A new page/question/page is added or existing is removed, a property is changed and so on.
   * <br/> sender the survey creator object that fires the event
   * <br/> options object contains the information about certain modifications
   * <br/> options.type contains string constant describing certain modification
   * <br/> Available values:
   * <br/>
   * <br/> options.type: "ADDED_FROM_TOOLBOX"
   * <br/> options.question: newly added question
   * <br/>
   * <br/> options.type: "PAGE_ADDED"
   * <br/> options.newValue: newly created page
   * <br/>
   * <br/> options.type: "PAGE_MOVED"
   * <br/> options.page: page has been moved
   * <br/> options.indexFrom: pevious index
   * <br/> options.indexTo: new index
   * <br/>
   * <br/> options.type: "QUESTION_CONVERTED"
   * <br/> options.className: the converted class name
   * <br/> options.oldValue: pevious object
   * <br/> options.newValue: the new object, converted from oldVale to the given class name
   * <br/>
   * <br/> options.type: "QUESTION_CHANGED_BY_EDITOR"
   * <br/> options.question: question has been edited in the popup question editor
   * <br/>
   * <br/> options.type: "PROPERTY_CHANGED"
   * <br/> options.name: the name of the property has been changed
   * <br/> options.target: the object containing the changed property
   * <br/> options.oldValue: the previous value of the changed property
   * <br/> options.newValue: the new value of the changed property
   * <br/>
   * <br/> options.type: "OBJECT_DELETED"
   * <br/> options.target: deleted object
   * <br/>
   * <br/> options.type: "VIEW_TYPE_CHANGED"
   * <br/> options.newType: new type of the creator view: editor or designer
   * <br/>
   * <br/> options.type: "DO_DROP"
   * <br/> options.page: the page of the drap/drop operation
   * <br/> options.source: the source dragged object
   * <br/> options.target: the drop target
   * <br/> options.newElement: a new element. It is defined if a user drops question or panel from the toolbox
   * <br/>
   * <br/> options.type: "TRANSLATIONS_CHANGED"
   * <br/>
   * <br/> options.type: "LOGIC_CHANGED"
   * <br/> options.item: the survey logic item. It has expression and operations (list of operations) properties
   * <br/> options.changeType: There are three possible values: "new", "modify" and "delete"
   */
  public onModified: Survey.Event<
    (sender: SurveyCreator, options: any) => any,
    any
  > = new Survey.Event<(sender: SurveyCreator, options: any) => any, any>();
  /**
   * The event is fired on changing question, panel or page name.
   * <br/> sender the survey creator object that fires the event
   * <br/> options.obj the object (question, panel or page)
   * <br/> options.oldName the previous name of the element
   * <br/> options.newName the new name of the element
   */
  public onElementNameChanged: Survey.Event<
    (sender: SurveyCreator, options: any) => any,
    any
  > = new Survey.Event<(sender: SurveyCreator, options: any) => any, any>();
  /**
   * The event is fired when the survey creator creates a survey object (Survey.Survey).
   * <br/> sender the survey creator object that fires the event
   * <br/> options.survey the survey object showing in the creator.
   * <br/> options.reason indicates what component of the creator requests the survey.
   */
  public onSurveyInstanceCreated: Survey.Event<
    (sender: SurveyCreator, options: any) => any,
    any
  > = new Survey.Event<(sender: SurveyCreator, options: any) => any, any>();
  /**
   * The event is fired when the survey creator is initialized and a survey object (Survey.Survey) is created.
   * <br/> sender the survey creator object that fires the event
   * <br/> options.survey  the survey object showing in the creator.
   */
  public onDesignerSurveyCreated: Survey.Event<
    (sender: SurveyCreator, options: any) => any,
    any
  > = new Survey.Event<(sender: SurveyCreator, options: any) => any, any>();
  /**
   * The event is fired when the survey creator runs the survey in the test mode.
   * <br/> sender the survey creator object that fires the event
   * <br/> options.survey  the survey object showing in the "Test survey" tab.
   */
  public onTestSurveyCreated: Survey.Event<
    (sender: SurveyCreator, options: any) => any,
    any
  > = new Survey.Event<(sender: SurveyCreator, options: any) => any, any>();
  /**
   * Use this event to control Property Editors UI.
   * <br/> sender the survey creator object that fires the event
   * <br/> options.obj  the survey object which property is edited in the Property Editor.
   * <br/> options.propertyName  the name of the edited property.
   * <br/> options.editorOptions  options that can be changed.
   * <br/> options.editorOptions.allowAddRemoveItems a boolean property, true by default. Set it false to disable add/remove items in array properties. For example 'choices', 'columns', 'rows'.
   * <br/> options.editorOptions.showTextView a boolean property, true by default. Set it false to disable "Fast Entry" tab for "choices" property.
   * <br/> options.editorOptions.itemsEntryType a string property, 'form' by default. Set it 'fast' to show "Fast Entry" tab for "choices" property by default.
   */
  public onSetPropertyEditorOptions: Survey.Event<
    (sender: SurveyCreator, options: any) => any,
    any
  > = new Survey.Event<(sender: SurveyCreator, options: any) => any, any>();
  /**
   * Use this event to show a custom error in the Question Editor on pressing Apply or OK buttons, if the values are not set correctly. The error will be displayed under the property editor.
   * <br/> sender the survey creator object that fires the event
   * <br/> options.obj  the survey object which property is edited in the Property Editor.
   * <br/> options.propertyName  the name of the edited property.
   * <br/> options.value the property value.
   * <br/> options.error the error you want to display. Set the empty string (the default value) or null if there is no errors.
   * @see onPropertyValueChanging
   */
  public onPropertyValidationCustomError: Survey.Event<
    (sender: SurveyCreator, options: any) => any,
    any
  > = new Survey.Event<(sender: SurveyCreator, options: any) => any, any>();
  /**
   * Use this event to change the value entered in the property editor. You may call a validation, so an end user sees the error immediately
   * <br/> sender the survey creator object that fires the event
   * <br/> options.obj  the survey object which property is edited in the Property Editor.
   * <br/> options.propertyName  the name of the edited property.
   * <br/> options.value the property value.
   * <br/> options.newValue set the corrected value into this property. Leave it null if you are ok with the entered value.
   * <br/> options.doValidation set the value to true to call the property validation. If there is an error, the user sees it immediately.
   * @see onPropertyValidationCustomError
   */
  public onPropertyValueChanging: Survey.Event<
    (sender: SurveyCreator, options: any) => any,
    any
  > = new Survey.Event<(sender: SurveyCreator, options: any) => any, any>();
  /**
   * Use this event to change the value entered in the property editor. You may call a validation, so an end user sees the error immediately
   * <br/> sender the survey creator object that fires the event
   * <br/> options.obj  the survey object which property is edited in the Property Editor.
   * <br/> options.propertyName  the name of the edited property.
   * <br/> options.editor the instance of Property Editor.
   * @see onPropertyValueChanging
   */
  public onPropertyEditorObjectAssign: Survey.Event<
    (sender: SurveyCreator, options: any) => any,
    any
  > = new Survey.Event<(sender: SurveyCreator, options: any) => any, any>();
  /**
   * Use this event to modify the survey that used on setting value for condition/expression properties, like visibleIf, enableIf and so on.
   * <br/> sender the survey creator object that fires the event
   * <br/> options.obj  the survey object which property is edited in the Property Editor.
   * <br/> options.propertyName  the name of the edited property.
   * <br/> options.editor the instance of Property Editor.
   * <br/> options.valueQuestionName the name of the question that shows in the survey for choosing the value
   * <br/> options.survey the instance of the survey that allows to choose the value. You may modify it before it shows to the end-user
   */
  public onConditionValueSurveyCreated: Survey.Event<
    (sender: SurveyCreator, options: any) => any,
    any
  > = new Survey.Event<(sender: SurveyCreator, options: any) => any, any>();
  /**
   * Use this event to modify the list (name and titles) od the questions available in a condition editor.
   * <br/> sender the survey creator object that fires the event
   * <br/> options.obj  the survey object which property is edited in the Property Editor.
   * <br/> options.propertyName  the name of the edited property.
   * <br/> options.editor the instance of Property Editor.
   * <br/> options.list the the list of the questions available for condition
   */
  public onConditionQuestionsGetList: Survey.Event<
    (sender: SurveyCreator, options: any) => any,
    any
  > = new Survey.Event<(sender: SurveyCreator, options: any) => any, any>();
  /**
   * Use this event to process key down event in a property editor
   * <br/> sender the survey creator object that fires the event
   * <br/> options.obj  the survey object which property is edited in the Property Editor.
   * <br/> options.propertyName  the name of the edited property.
   * <br/> options.editor the instance of Property Editor.
   * <br/> options.event the instance of mouse event.
   */
  public onPropertyEditorKeyDown: Survey.Event<
    (sender: SurveyCreator, options: any) => any,
    any
  > = new Survey.Event<(sender: SurveyCreator, options: any) => any, any>();
  /**
   * Use this event to disable some operations for an element (question/panel).
   * <br/> sender the survey creator object that fires the event
   * <br/> options.obj  the survey object question/panel
   * <br/> options.allowDelete set it to false to disable deleting the object
   * <br/> options.allowEdit set it to false to disable calling the modal Editor
   * <br/> options.allowCopy set it to false to disable copying the object
   * <br/> options.allowAddToToolbox set it to false to disable adding element to Toolbox
   * <br/> options.allowDragging set it to false to disable adding element to Toolbox
   * <br/> options.allowChangeType set it to false to disable changing element type
   */
  public onElementAllowOperations: Survey.Event<
    (sender: SurveyCreator, options: any) => any,
    any
  > = new Survey.Event<(sender: SurveyCreator, options: any) => any, any>();
  /**
   * Use this event to add/remove/modify the element (question/panel) menu items.
   * <br/> sender the survey creator object that fires the event
   * <br/> options.obj  the survey object which property is edited in the Property Editor.
   * <br/> options.items the list of menu items. It has two requried fields: text and onClick: function(obj: Survey.Base) {} and optional name field.
   * @see onElementAllowOperations
   */
  public onDefineElementMenuItems: Survey.Event<
    (sender: SurveyCreator, options: any) => any,
    any
  > = new Survey.Event<(sender: SurveyCreator, options: any) => any, any>();
  /**
   * Use this event to show the description on the top or/and bottom of the property modal editor.
   * <br/> sender the survey creator object that fires the event
   * <br/> options.obj  the survey object which property is edited in the Property Editor.
   * <br/> options.propertyName the property name
   * <br/> options.htmlTop the html  that you want to see on the top of the modal window
   * <br/> options.htmlBottom the html that you want to see on the bottom of the modal window
   */
  public onShowPropertyModalEditorDescription: Survey.Event<
    (sender: SurveyCreator, options: any) => any,
    any
  > = new Survey.Event<(sender: SurveyCreator, options: any) => any, any>();
  /**
   * Use this event to change the text showing in the dropdown of the property grid.
   * <br/> sender the survey creator object that fires the event
   * <br/> options.obj  the survey object.
   * <br/> options.text the current object text, commonly it is a name. You must change this attribute
   */
  public onGetObjectTextInPropertyGrid: Survey.Event<
    (sender: SurveyCreator, options: any) => any,
    any
  > = new Survey.Event<(sender: SurveyCreator, options: any) => any, any>();
  koAutoSave = ko.observable(false);
  /**
   * The event is called when end-user addes new element (question or panel) into the survey toolbox.
   * It calls before adding the element into toolbox and it allows to change the toolbox item attributes using options.itemOptions parameter
   * <br/> sender the survey creator object that fires the event
   * <br/> options.element is a new added element
   * <br/> options.itemOptions a json object that allows you to override question properties. Attributes are: name, title, isCopied, iconName, json and category.
   * @see onCustomElementAddedIntoToolbox
   */
  public onCustomElementAddingIntoToolbox: Survey.Event<
    (sender: SurveyCreator, options: any) => any,
    any
  > = new Survey.Event<(sender: SurveyCreator, options: any) => any, any>();
  /**
   * The event is called when end-user addes new element (question or panel) into the survey toolbox.
   * <br/> sender the survey creator object that fires the event
   * <br/> options.element is a new added element
   * @see onCustomElementAddingIntoToolbox
   */
  public onCustomElementAddedIntoToolbox: Survey.Event<
    (sender: SurveyCreator, options: any) => any,
    any
  > = new Survey.Event<(sender: SurveyCreator, options: any) => any, any>();
  /**
   * The event is fired on uploading the file. There are two properties in options: options.name options.callback.
   * <br/> sender the survey creator object that fires the event
   * <br/>  name: name, file: file, accept: accept
   * <br/> file the Javascript File object
   * <br/> callback called on upload complete
   * @see uploadFile
   */
  public onUploadFile: Survey.Event<
    (sender: SurveyCreator, options: any) => any,
    any
  > = new Survey.Event<(sender: SurveyCreator, options: any) => any, any>();
  /**
   * The method is called when the translation from csv file is imported.
   * @see translation
   * @see showTranslationTab
   */
  public onTranslationImported: Survey.Event<
    (sender: SurveyCreator, options: any) => any,
    any
  > = new Survey.Event<(sender: SurveyCreator, options: any) => any, any>();
  /**
   * Use this event to control drag&drop operations.
   * <br/> sender the survey creator object that fires the event.
   * <br/> options.survey the editing survey object.
   * <br/> options.allow set it to false to disable dragging.
   * <br/> options.target a target element that is dragging.
   * <br/> options.source a source element. It can be null, if it is a new element, dragging from toolbox.
   * <br/> options.parent a page or panel where target element is dragging.
   * <br/> options.insertBefore an element before the target element is dragging. It can be null if parent container (page or panel) is empty or dragging an element under the last element of the container.
   * <br/> options.insertAfter an element after the target element is dragging. It can be null if parent container (page or panel) is empty or dragging element to the top of the parent container.
   */
  public onDragDropAllow: Survey.Event<
    (sender: SurveyCreator, options: any) => any,
    any
  > = new Survey.Event<(sender: SurveyCreator, options: any) => any, any>();
  /**
   * Use this event to get access rendered adorder.
   * <br/> sender the survey creator object that fires the event.
   * <br/> options.survey the editing survey object.
   * <br/> options.question the survey element of the adorner.
   * <br/> options.adorner the adorner id.
   * <br/> options.element a root adorner element.
   * <br/> options.context a context for adorner element, e.g. current item of a select base question.
   */
  public onAdornerRendered: Survey.Event<
    (sender: SurveyCreator, options: any) => any,
    any
  > = new Survey.Event<(sender: SurveyCreator, options: any) => any, any>();
  /**
   * The event is called after user closes the popup element editor.
   * <br/> options.element the edited element.
   * <br/> options.isCanceled indicated user clicked Cancel.
   */
  public onElementEditorClosed: Survey.Event<
    (sender: SurveyCreator, options: any) => any,
    any
  > = new Survey.Event<(sender: SurveyCreator, options: any) => any, any>();

  /**
   * A boolean property, false by default. Set it to true to call protected doSave method automatically on survey changing.
   */
  public get isAutoSave() {
    return this.koAutoSave();
  }
  public set isAutoSave(newVal) {
    this.koAutoSave(newVal);
  }
  /**
   * Set it to false to suppress an alert message about error on saving the survey into database.
   */
  public showErrorOnFailedSave: boolean = true;
  koShowState = ko.observable(false);
  /**
   * A boolean property, false by default. Set it to true to show the state in the toolbar (saving/saved).
   */
  public get showState() {
    return this.koShowState();
  }
  public set showState(newVal) {
    this.koShowState(newVal);
  }
  koReadOnly = ko.observable(false);
  /**
   * A boolean property, false by default. Set it to true to deny editing.
   */
  public get readOnly() {
    return this.koReadOnly();
  }
  public set readOnly(newVal) {
    this.koReadOnly(newVal);
  }

  koIsShowDesigner: any;
  koViewType: any;
  koCanDeleteObject: any;
  koObjects: any;
  koSelectedObject: ko.Observable<any>;
  koShowSaveButton: any;
  koGenerateValidJSON: any;
  koShowOptions: any;
  koShowPropertyGrid = ko.observable(true);
  koShowToolbox = ko.observable(true);
  koHideAdvancedSettings = ko.observable(false);
  koTestSurveyWidth: any;
  koDesignerHeight: any;
  koShowPagesToolbox: any;
  generateValidJSONClick: any;
  generateReadableJSONClick: any;
  doUndoClick: any;
  doRedoClick: any;
  deleteObjectClick: any;
  koState = ko.observable("");
  runSurveyClick: any;

  saveButtonClick: any;
  draggingToolboxItem: any;
  clickToolboxItem: any;
  dragEnd: any;
  /**
   * The Survey Creator constructor.
   * @param renderedElement HtmlElement or html element id where survey creator will be rendered
   * @param options survey creator options. The following options are available: showJSONEditorTab,
   * showTestSurveyTab, showEmbededSurveyTab, showTranslationTab, inplaceEditForValues, useTabsInElementEditor,
   * showPropertyGrid, showToolbox, allowModifyPages
   * questionTypes, showOptions, generateValidJSON, isAutoSave, designerHeight, showErrorOnFailedSave, showObjectTitles, showTitlesInExpressions,
   * showPagesInTestSurveyTab, showDefaultLanguageInTestSurveyTab, showInvisibleElementsInTestSurveyTab
   */
  constructor(renderedElement: any = null, options: any = null) {
    this.koShowOptions = ko.observable();
    this.koGenerateValidJSON = ko.observable(true);
    this.koDesignerHeight = ko.observable();
    this.koShowPagesToolbox = ko.observable(true);
    this.setOptions(options);
    this.koCanDeleteObject = ko.observable(false);

    var self = this;

    StylesManager.applyTheme(StylesManager.currentTheme());

    this.pages = ko.observableArray<Survey.Page>();

    this.koShowSaveButton = ko.observable(false);
    this.koTestSurveyWidth = ko.observable("100%");
    this.saveButtonClick = function() {
      self.doSave();
    };
    this.koObjects = ko.observableArray();
    window["sel"] = this.koSelectedObject;
    this.koSelectedObject = ko.observable();
    this.koSelectedObject.subscribe(function(newValue) {
      self.selectedObjectChanged(newValue != null ? newValue.value : null);
    });
    this.koGenerateValidJSON.subscribe(function(newValue) {
      if (!self.options) self.options = {};
      self.options.generateValidJSON = newValue;
      if (self.generateValidJSONChangedCallback)
        self.generateValidJSONChangedCallback(newValue);
    });
    this.surveyObjects = new SurveyObjects(
      this.koObjects,
      this.koSelectedObject,
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

    this.koViewType = ko.observable("designer");
    this.koViewType.subscribe(function(newValue) {
      self.onActiveTabChanged.fire(self, { tabName: newValue });
    });
    this.koIsShowDesigner = ko.computed(function() {
      return self.koViewType() == "designer";
    });
    this.generateValidJSONClick = function() {
      self.koGenerateValidJSON(true);
    };
    this.generateReadableJSONClick = function() {
      self.koGenerateValidJSON(false);
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
    ko.computed(() => {
      this.jsonEditor.readOnly = this.readOnly;
    });

    ko.computed(() => {
      this.tabs([]);
      this.tabs.push({
        name: "designer",
        title: this.getLocString("ed.designer"),
        template: "se-tab-designer",
        data: this,
        action: () => this.showDesigner()
      });
      if (this.showTestSurveyTab) {
        this.tabs.push({
          name: "test",
          title: this.getLocString("ed.testSurvey"),
          template: "se-tab-test",
          data: this,
          action: () => this.showTestSurvey()
        });
      }
      if (this.showLogicTab) {
        this.tabs.push({
          name: "logic",
          title: this.getLocString("ed.logic"),
          template: "surveylogic",
          data: this.logic,
          action: () => this.showLogicEditor()
        });
      }
      if (this.showJSONEditorTab) {
        this.tabs.push({
          name: "editor",
          title: this.getLocString("ed.jsonEditor"),
          template: "jsoneditor",
          data: this.jsonEditor,
          action: () => this.showJsonEditor()
        });
      }
      if (this.showEmbededSurveyTab) {
        this.tabs.push({
          name: "embed",
          title: this.getLocString("ed.embedSurvey"),
          template: "surveyembeding",
          data: this.surveyEmbeding,
          action: () => this.showEmbedEditor()
        });
      }
      if (this.showTranslationTab) {
        this.tabs.push({
          name: "translation",
          title: this.getLocString("ed.translation"),
          template: "translation",
          data: this.translation,
          action: () => this.showTranslationEditor()
        });
      }
    });

    if (renderedElement) {
      this.render(renderedElement);
    }

    this.text = "";

    this.addToolbarItems();
  }

  tabs = ko.observableArray();

  themeCss = ko.computed(() => {
    return ["bootstrap", "bootstrapmaterial"].indexOf(
      StylesManager.currentTheme()
    ) === -1
      ? "sv_default_css"
      : "sv_" + StylesManager.currentTheme() + "_css";
  });

  protected addToolbarItems() {
    this.toolbarItems.push({
      id: "svd-undo",
      icon: "icon-actionundo",
      visible: this.koIsShowDesigner,
      enabled: this.undoRedo.koCanUndo,
      action: this.doUndoClick,
      title: this.getLocString("ed.undo")
    });
    this.toolbarItems.push({
      id: "svd-redo",
      icon: "icon-actionredo",
      visible: this.koIsShowDesigner,
      enabled: this.undoRedo.koCanRedo,
      action: this.doRedoClick,
      title: this.getLocString("ed.redo")
    });
    this.toolbarItems.push({
      id: "svd-survey-settings",
      icon: "icon-actionsettings",
      visible: this.koIsShowDesigner,
      enabled: false,
      action: () => {
        this.surveyObjects.selectObject(this.survey);
        this.showQuestionEditor(this.survey);
      },
      title: this.getLocString("ed.settings")
    });
    this.toolbarItems.push({
      id: "svd-options",
      visible: ko.computed(
        () => this.koIsShowDesigner() && this.koShowOptions()
      ),
      title: this.getLocString("ed.options"),
      template: "svd-toolbar-options",
      items: ko.observableArray([
        {
          id: "svd-valid-json",
          visible: true,
          css: ko.computed(() => (this.koGenerateValidJSON() ? "active" : "")),
          action: this.generateValidJSONClick,
          title: this.getLocString("ed.generateValidJSON")
        },
        {
          id: "svd-readable-json",
          visible: true,
          css: ko.computed(() => (!this.koGenerateValidJSON() ? "active" : "")),
          action: this.generateReadableJSONClick,
          title: this.getLocString("ed.generateReadableJSON")
        }
      ])
    });
    this.toolbarItems.push({
      id: "svd-test",
      visible: ko.computed(() => this.koViewType() === "test"),
      title: ko.computed(
        () =>
          this.getLocString("ed.testSurveyWidth") +
          " " +
          this.koTestSurveyWidth()
      ),
      template: "svd-toolbar-options",
      items: ko.observableArray([
        {
          id: "svd-100-json",
          visible: true,
          action: () => this.koTestSurveyWidth("100%"),
          title: "100%"
        },
        {
          id: "svd-1200px-json",
          visible: true,
          action: () => this.koTestSurveyWidth("1200px"),
          title: "1200px"
        },
        {
          id: "svd-1000px-json",
          visible: true,
          action: () => this.koTestSurveyWidth("1000px"),
          title: "1000px"
        },
        {
          id: "svd-800px-json",
          visible: true,
          action: () => this.koTestSurveyWidth("800px"),
          title: "800px"
        },
        {
          id: "svd-600px-json",
          visible: true,
          action: () => this.koTestSurveyWidth("600px"),
          title: "600px"
        },
        {
          id: "svd-400px-json",
          visible: true,
          action: () => this.koTestSurveyWidth("400px"),
          title: "400px"
        }
      ])
    });
    this.toolbarItems.push({
      id: "svd-save",
      visible: this.koShowSaveButton,
      action: this.saveButtonClick,
      innerCss: "svd_save_btn",
      title: this.getLocString("ed.saveSurvey")
    });
    this.toolbarItems.push({
      id: "svd-state",
      visible: this.koShowState,
      css: "svd_state",
      innerCss: ko.computed(() => "icon-" + this.koState()),
      title: ko.computed(() => this.getLocString("ed." + this.koState())),
      template: "svd-toolbar-state"
    });
  }

  protected setOptions(options: any) {
    if (!options) options = {};
    if (!options.hasOwnProperty("generateValidJSON"))
      options.generateValidJSON = true;
    this.options = options;
    this.showLogicTabValue(
      typeof options.showLogicTab !== "undefined" ? options.showLogicTab : false
    );
    this.showJSONEditorTabValue(
      typeof options.showJSONEditorTab !== "undefined"
        ? options.showJSONEditorTab
        : true
    );
    this.showTestSurveyTabValue(
      typeof options.showTestSurveyTab !== "undefined"
        ? options.showTestSurveyTab
        : true
    );
    this.showEmbededSurveyTabValue(
      typeof options.showEmbededSurveyTab !== "undefined"
        ? options.showEmbededSurveyTab
        : false
    );
    this.showTranslationTabValue(
      typeof options.showTranslationTab !== "undefined"
        ? options.showTranslationTab
        : false
    );
    this.showLogicTabValue(
      typeof options.showLogicTab !== "undefined" ? options.showLogicTab : false
    );
    this.haveCommercialLicense =
      typeof options.haveCommercialLicense !== "undefined"
        ? options.haveCommercialLicense
        : false;
    this.inplaceEditForValues =
      typeof options.inplaceEditForValues !== "undefined"
        ? options.inplaceEditForValues
        : false;
    this.showObjectTitles =
      typeof options.showObjectTitles !== "undefined"
        ? options.showObjectTitles
        : false;
    this.showTitlesInExpressions =
      typeof options.showTitlesInExpressions !== "undefined"
        ? options.showTitlesInExpressions
        : false;
    this.useTabsInElementEditor =
      typeof options.useTabsInElementEditor !== "undefined"
        ? options.useTabsInElementEditor
        : false;
    this.showState =
      typeof options.showState !== "undefined" ? options.showState : false;
    this.koShowOptions(
      typeof options.showOptions !== "undefined" ? options.showOptions : false
    );
    this.showPropertyGrid =
      typeof options.showPropertyGrid !== "undefined"
        ? options.showPropertyGrid
        : true;
    this.showToolbox =
      typeof options.showToolbox !== "undefined" ? options.showToolbox : true;
    this.koGenerateValidJSON(this.options.generateValidJSON);
    this.isAutoSave =
      typeof options.isAutoSave !== "undefined" ? options.isAutoSave : false;
    this.showErrorOnFailedSave =
      typeof options.showErrorOnFailedSave !== "undefined"
        ? options.showErrorOnFailedSave
        : true;
    this.isRTLValue =
      typeof options.isRTL !== "undefined" ? options.isRTL : false;
    this.scrollToNewElement =
      typeof options.scrollToNewElement !== "undefined"
        ? options.scrollToNewElement
        : true;
    if (options.designerHeight) {
      this.koDesignerHeight(options.designerHeight);
    }
    if (options.objectsIntend) {
      SurveyObjects.intend = options.objectsIntend;
    }
    if (typeof options.showPagesToolbox !== "undefined") {
      this.koShowPagesToolbox(options.showPagesToolbox);
    }
    if (typeof options.readOnly !== "undefined") {
      this.koReadOnly(options.readOnly);
    }
    if (typeof options.showPagesInTestSurveyTab !== "undefined") {
      this.showPagesInTestSurveyTab = options.showPagesInTestSurveyTab;
    }
    if (typeof options.showDefaultLanguageInTestSurveyTab !== "undefined") {
      this.showDefaultLanguageInTestSurveyTab =
        options.showDefaultLanguageInTestSurveyTab;
    }
    if (typeof options.showInvisibleElementsInTestSurveyTab !== "undefined") {
      this.showInvisibleElementsInTestSurveyTab =
        options.showInvisibleElementsInTestSurveyTab;
    }
    if (typeof options.allowModifyPages !== "undefined") {
      this.allowModifyPages = options.allowModifyPages;
    }
  }
  /**
   * The editing survey object (Survey.Survey)
   */
  public get survey(): SurveyForDesigner {
    return this.surveyValue();
  }
  public get selectedObjectEditor(): SurveyObjectEditor {
    return this.selectedObjectEditorValue;
  }
  /**
   * Use this method to force update this element in editor.
   * @param element Survey.Question is element to update
   */
  public update(element: Survey.Question) {
    element["koElementType"].notifySubscribers();
  }
  /**
   * Call this method to render the Survey Creator.
   * @param element HtmlElement or html element id where survey creator will be rendered
   * @param options survey creator options. The following options are available: showJSONEditorTab, showTestSurveyTab, showEmbededSurveyTab,
   * showTranslationTab, showLogicTab, showOptions, generateValidJSON, isAutoSave, designerHeight.
   */
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
    if (!element) return;
    element.innerHTML = templateEditorHtml;
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
  /**
   * The Survey JSON as a text. Use it to get Survey JSON or change it.
   * @see JSON
   */
  public get text(): string {
    if (this.koViewType() == "editor") return this.jsonEditor.text;
    return this.getSurveyTextFromDesigner();
  }
  public set text(value: string) {
    this.changeText(value, true);
  }
  /**
   * The Survey JSON. Use it to get Survey JSON or change it.
   * @see text
   */
  public get JSON(): any {
    return this.survey.toJSON();
  }
  public set JSON(val: any) {
    if (this.koViewType() == "editor") {
      this.setTextValue(JSON.stringify(val));
    } else {
      this.initSurveyWithJSON(val, true);
    }
  }
  /**
   * Set JSON as text  into survey. Clear undo/redo states optionally.
   * @param value JSON as text
   * @param clearState default false. Set this parameter to true to clear undo/redo states.
   */
  public changeText(value: string, clearState = false) {
    var textWorker = new SurveyTextWorker(value);
    if (textWorker.isJsonCorrect) {
      this.initSurveyWithJSON(textWorker.survey.toJSON(), clearState);
    } else {
      this.setTextValue(value);
      this.koViewType("editor");
    }
  }
  private initSurveyWithJSON(json: any, clearState: boolean) {
    this.initSurvey(json);
    this.showDesigner();
    this.setUndoRedoCurrentState(clearState);
  }
  /**
   * Toolbox object. Contains information about Question toolbox items.
   * @see QuestionToolbox
   */
  public get toolbox(): QuestionToolbox {
    return this.toolboxValue;
  }
  /**
   * Return the translation mode object.
   * @see showTranslationTab
   */
  public get translation(): Translation {
    return this.translationValue;
  }
  /**
   * Return the logic mode object.
   * @see showLogicTab
   */
  public get logic(): SurveyLogic {
    return this.logicValue;
  }
  /**
   * The list of toolbar items. You may add/remove/replace them.
   * @see IToolbarItem
   */
  public toolbarItems = ko.observableArray<IToolbarItem>();
  /**
   * Get and set the maximum of copied questions/panels in the toolbox. The default value is 3
   */
  public get customToolboxQuestionMaxCount(): number {
    return this.toolbox.copiedItemMaxCount;
  }
  public set customToolboxQuestionMaxCount(value: number) {
    this.toolbox.copiedItemMaxCount = value;
  }
  /**
   * Returns the creator state. It may return empty string or "saving" and "saved".
   */
  public get state(): string {
    return this.stateValue;
  }
  protected setState(value: string) {
    this.stateValue = value;
    this.koState(this.state);
  }
  /**
   * The delay on saving survey JSON on autoSave in ms. It is 500 ms by default.
   * If during this period of time an end-user modify survey, then the last version will be saved only. Set to 0 to save immediately.
   * @see isAutoSave
   */
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
  /**
   * Undo the latest user operation. Returns true if it performes successful.
   */
  public undo(): boolean {
    if (!this.undoRedo.koCanUndo()) return false;
    this.doUndoRedo(this.undoRedo.undo());
    return true;
  }
  /**
   * Redo the latest undo operation. Returns true if it performes successful.
   */
  public redo(): boolean {
    if (!this.undoRedo.koCanRedo()) return false;
    this.doUndoRedo(this.undoRedo.redo());
    return true;
  }
  private setUndoRedoCurrentState(clearState: boolean = false) {
    if (clearState) {
      this.undoRedo.clear();
    }
    var selObj = this.koSelectedObject() ? this.koSelectedObject().value : null;
    this.undoRedo.setCurrent(this.surveyValue(), selObj ? selObj.name : null);
  }
  /**
   * Assign to this property a function that will be called on clicking the 'Save' button or on any change if isAutoSave equals true.
   * @see isAutoSave
   */
  public get saveSurveyFunc() {
    return this.saveSurveyFuncValue;
  }
  public set saveSurveyFunc(value: any) {
    this.saveSurveyFuncValue = value;
    this.koShowSaveButton(value != null && !this.isAutoSave);
  }
  /**
   * Set it to true to show "Options" menu and to false to hide the menu
   */
  public get showOptions() {
    return this.koShowOptions();
  }
  public set showOptions(value: boolean) {
    this.koShowOptions(value);
  }
  /**
   * Set it to false to completely hide the Property Grid on the right. It allows to edit the properties of the selected object (question/panel/page/survey).
   */
  public get showPropertyGrid() {
    return this.koShowPropertyGrid();
  }
  public set showPropertyGrid(value: boolean) {
    this.koShowPropertyGrid(value);
    this.koHideAdvancedSettings(!value);
  }
  /**
   * Set it to false to  hide the question toolbox on the left.
   */
  public get showToolbox() {
    return this.koShowToolbox();
  }
  public set showToolbox(value: boolean) {
    this.koShowToolbox(value);
  }
  /**
   * Set it to false to temporary hide the Property Grid on the right side of the creator. User will be able to show the Property Grid again via the click on the 'Advanced' label. It allows to edit the properties of the selected object (question/panel/page/survey).
   */
  public get hideAdvancedSettings() {
    return this.koHideAdvancedSettings();
  }
  public set hideAdvancedSettings(value: boolean) {
    this.koHideAdvancedSettings(value);
  }
  /**
   * Set it to true to show "JSON Editor" tab and to false to hide the tab
   */
  public get showJSONEditorTab() {
    return this.showJSONEditorTabValue();
  }
  public set showJSONEditorTab(value: boolean) {
    this.showJSONEditorTabValue(value);
  }
  /**
   * Set it to true to show "Test Survey" tab and to false to hide the tab
   */
  public get showTestSurveyTab() {
    return this.showTestSurveyTabValue();
  }
  public set showTestSurveyTab(value: boolean) {
    this.showTestSurveyTabValue(value);
  }
  /**
   * Set it to true to show "Embed Survey" tab and to false to hide the tab
   */
  public get showEmbededSurveyTab() {
    return this.showEmbededSurveyTabValue();
  }
  public set showEmbededSurveyTab(value: boolean) {
    this.showEmbededSurveyTabValue(value);
  }
  showExternalHelpLink = ko.observable(false);
  /**
   * Set it to true to show "Translation" tab and to false to hide the tab
   */
  public get showTranslationTab() {
    return this.showTranslationTabValue();
  }
  public set showTranslationTab(value: boolean) {
    this.showTranslationTabValue(value);
  }
  /**
   * Set it to true to show "Logic" tab and to false to hide the tab
   */
  public get showLogicTab() {
    return this.showLogicTabValue();
  }
  public set showLogicTab(value: boolean) {
    this.showLogicTabValue(value);
  }
  /**
   * Set it to true to activate RTL support
   */
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
    this.jsonEditor.text = value;
  }
  /**
   * Add a new page into the editing survey.
   */
  public addPage = () => {
    var name = SurveyHelper.getNewPageName(this.pages());
    var page = <Survey.Page>this.survey.addNewPage(name);
    this.pages.valueHasMutated(); //TODO why this is need ? (ko problem)
    this.addPageToUI(page);
    this.setModified({ type: "PAGE_ADDED", newValue: page });
  };
  public deletePage = () => {
    this.deleteCurrentObject();
    this.pages.valueHasMutated(); //TODO why this is need ? (ko problem)
  };
  /**
   * Returns the localized string by it's id
   * @param str the string id.
   */
  public getLocString(str: string) {
    return editorLocalization.getString(str);
  }
  public movePage = (indexFrom: number, indexTo: number) => {
    var page = <Survey.Page>this.pages()[indexTo];
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
    if (newType && this.koViewType() == newType) return false;
    if (this.koViewType() == "designer") {
      this.jsonEditor.text = this.getSurveyTextFromDesigner();
    }
    if (
      (this.koViewType() == "translation" || this.koViewType() == "logic") &&
      newType == "designer"
    ) {
      this.survey.render();
    }
    if (this.koViewType() != "editor") return true;
    if (!this.jsonEditor.isJsonCorrect) {
      alert(this.getLocString("ed.correctJSON"));
      return false;
    }
    if (!this.readOnly) {
      this.initSurvey(
        new Survey.JsonObject().toJsonObject(this.jsonEditor.survey)
      );
      this.setModified({ type: "VIEW_TYPE_CHANGED", newType: newType });
    }
    return true;
  }
  /**
   * Returns the current show view name. The possible returns values are:
   * "designer", "editor", "test", "embed", "logic" and "translation".
   * @see showDesigner
   * @see showTestSurvey
   * @see showJsonEditor
   * @see showLogicEditor
   * @see showTranslationEditor
   * @see showEmbedEditor
   */
  public get showingViewName(): string {
    return this.koViewType();
  }
  /**
   * Change the active view/tab. It will return false if it can't change the current tab.
   * @param viewName name of new active view (tab). The following values are available: "designer", "editor", "test", "embed" and "translation".
   */
  public makeNewViewActive(viewName: string): boolean {
    if (!this.canSwitchViewType(viewName)) return false;
    if (viewName == "editor") {
      this.jsonEditor.show(this.getSurveyTextFromDesigner());
    }
    if (viewName == "test") {
      this.showLiveSurvey();
    }
    if (viewName == "embed") {
      this.showSurveyEmbeding();
    }
    if (viewName == "translation") {
      this.showSurveyTranslation();
    }
    this.koViewType(viewName);
    return true;
  }
  /**
   * Make a "Survey Designer" tab active.
   */
  public showDesigner() {
    this.makeNewViewActive("designer");
  }
  /**
   * Make a "JSON Editor" tab active.
   */
  public showJsonEditor() {
    this.makeNewViewActive("editor");
  }
  /**
   * Make a "Test Survey" tab active.
   */
  public showTestSurvey() {
    this.makeNewViewActive("test");
  }
  /**
   * Make a "Embed Survey" tab active.
   */
  public showEmbedEditor() {
    this.makeNewViewActive("embed");
  }
  /**
   * Make a "Translation" tab active.
   */
  public showTranslationEditor() {
    this.makeNewViewActive("translation");
  }
  /**
   * Make a "Logic" tab active.
   */
  public showLogicEditor() {
    if (!this.canSwitchViewType("logic")) return;
    this.showSurveyLogic();
    this.koViewType("logic");
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
  /**
   * Get or set the current selected object in the Creator. It can be a question, panel, page or survey itself.
   */
  public get selectedElement(): any {
    return !!this.koSelectedObject() ? this.koSelectedObject().value : null;
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
      canDeleteObject = this.pages().length > 1;
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
    this.koCanDeleteObject(canDeleteObject);
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
    if (this.renderedElement == null) return;
    ko.cleanNode(this.renderedElement);
    ko.applyBindings(this, this.renderedElement);
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
    if (typeof jQuery !== "undefined" && jQuery()["select2"]) {
      var options: any = {
        width: "100%"
      };
      if (this.isRTLValue) {
        options.dir = "rtl";
      }
      var $objectSelector = jQuery("#objectSelector");
      this.select2 = $objectSelector["select2"](options);
      $objectSelector.on("select2:select", (sel_evt: any) => {
        this.koSelectedObject(sel_evt.target.value);
      });
    }
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
    surveyType = Survey.Survey
  ) {
    var survey = new surveyType(json);
    this.onSurveyInstanceCreated.fire(this, { survey: survey, reason: reason });
    return survey;
  }
  private initSurvey(json: any) {
    var self = this;
    this.surveyValue(<SurveyForDesigner>(
      this.createSurvey({}, "designer", SurveyForDesigner)
    ));
    this.dragDropHelper = new DragDropHelper(
      <Survey.ISurvey>this.survey,
      function(options) {
        self.setModified(options);
      },
      this.renderedElement
    );
    this.dragDropHelper.readOnly = this.readOnly;
    this.surveyValue().getEditor = () => self;
    this.surveyValue().setJsonObject(json);
    if (this.surveyValue().isEmpty) {
      this.surveyValue().setJsonObject(this.getDefaultSurveyJson());
    }
    Survey.surveyLocalization.currentLocale = this.surveyValue()["locale"];
    this.surveyValue().dragDropHelper = this.dragDropHelper;
    this.surveyValue().onUpdateElementAllowingOptions = function(options) {
      self.onElementAllowOperations.fire(self, options);
    };
    var afterRenderElementHandler = createAfterRenderHandler(
      this,
      this.surveyValue()
    );
    this.surveyValue().onAfterRenderQuestion.add((sender, options) => {
      afterRenderElementHandler(
        options.htmlElement,
        options.question,
        false,
        true
      );
    });
    this.surveyValue().onAfterRenderPanel.add((sender, options) => {
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
            this.surveyValue(),
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
    this.surveyValue().onDragDropAllow.add(function(sender, options) {
      options.survey = sender;
      self.onDragDropAllow.fire(self, options);
    });
    this.surveyValue().onGetMenuItems.add((sender, options) => {
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

    this.onDesignerSurveyCreated.fire(this, { survey: this.surveyValue() });
    this.survey.render(this.surveyjs);
    this.surveyObjects.survey = this.survey;
    this.pages(this.survey.pages);
    this.surveyValue().onSelectedElementChanged.add(
      (sender: Survey.Survey, options) => {
        self.surveyObjects.selectObject(sender["selectedElement"]);
      }
    );
    this.surveyValue().onEditButtonClick.add((sender: Survey.Survey) => {
      self.showQuestionEditor(self.koSelectedObject().value);
    });
    this.surveyValue().onElementDoubleClick.add(
      (sender: Survey.Survey, options) => {
        self.onElementDoubleClick.fire(self, options);
      }
    );
    this.surveyValue().onProcessHtml.add((sender: Survey.Survey, options) => {
      options.html = self.processHtml(options.html);
    });
    this.surveyValue().onQuestionAdded.add((sender: Survey.Survey, options) => {
      self.doOnQuestionAdded(options.question, options.parentPanel);
    });
    this.surveyValue().onQuestionRemoved.add(
      (sender: Survey.Survey, options) => {
        self.doOnElementRemoved(options.question);
      }
    );
    this.surveyValue().onPanelAdded.add((sender: Survey.Survey, options) => {
      self.doOnPanelAdded(options.panel, options.parentPanel);
    });
    this.surveyValue().onPanelRemoved.add((sender: Survey.Survey, options) => {
      self.doOnElementRemoved(options.panel);
    });
    var pAdded = <any>this.surveyValue()["onPageAdded"];
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
  public isCurrentPageEmpty = ko.computed(
    () =>
      !!this.surveyValue() &&
      !!this.surveyValue().koCurrentPage() &&
      this.getRows(this.surveyValue().koCurrentPage()).length === 0
  );
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
    if (type == "page") return SurveyHelper.getNewPageName(this.pages());
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
    for (var i = 0; i < this.pages().length; i++) {
      this.addElements(this.pages()[i].elements, false, result);
    }
    this.addElements(this.newPanels, false, result);
    this.addElements(this.newQuestions, false, result);
    return result;
  }
  private getAllPanels(): Array<any> {
    var result = [];
    for (var i = 0; i < this.pages().length; i++) {
      this.addElements(this.pages()[i].elements, true, result);
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
    var obj = this.koSelectedObject().value;
    if (!obj) return null;
    return SurveyHelper.getObjectType(obj) == ObjType.Question
      ? <Survey.Question>obj
      : null;
  }
  public deleteCurrentObject() {
    this.deleteObject(this.koSelectedObject().value);
  }
  private editCurrentObject() {
    this.showQuestionEditor(this.koSelectedObject().value);
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
  /**
   * Show the creator dialog. The element can be a question, panel, page or survey
   * @param element The survey element
   */
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
    var selectedObject = this.koSelectedObject().value;
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

  /**
   * Add a question into Toolbox object
   * @param question an added Survey.Question
   * @see toolbox
   */
  public addCustomToolboxQuestion(question: Survey.Question) {
    var options = {};
    this.onCustomElementAddingIntoToolbox.fire(this, {
      element: question,
      itemOptions: options
    });
    this.toolbox.addCopiedItem(question, options);
    this.onCustomElementAddedIntoToolbox.fire(this, { element: question });
  }
  /**
   * Copy a question to the active page
   * @param question A copied Survey.Question
   */
  public fastCopyQuestion(question: Survey.Base) {
    var newElement = this.copyElement(question);
    this.doClickQuestionCore(newElement, "ELEMENT_COPIED");
  }
  /**
   * Create a new page with the same elements and place it next to the current one. It returns the new created Survey.Page
   * @param page A copied Survey.Page
   */
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
  /**
   * Delete an element in the survey. It can be a question, a panel or a page.
   * @param element a survey element.
   */
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
      showDefaultLanguageInTestSurveyTab: this
        .showDefaultLanguageInTestSurveyTab,
      showInvisibleElementsInTestSurveyTab: this
        .showInvisibleElementsInTestSurveyTab
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
      this.koIsShowDesigner() ||
      this.koViewType() == "translation" ||
      this.koViewType() == "logic"
    )
      return new Survey.JsonObject().toJsonObject(this.survey);
    if (this.jsonEditor.isJsonCorrect)
      return new Survey.JsonObject().toJsonObject(this.jsonEditor.survey);
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
      property: editor.property,
      readOnly: proposedValue,
      propertyName: editor.property.name
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
  /**
   * Upload the files on a server
   * @param files files to upload
   * @param uploadingCallback a call back function to get the status on uploading the file and operation result - URI of the uploaded file
   */
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

ko.components.register("survey-widget", {
  viewModel: function(params) {
    this.survey = params.survey;
  },
  template:
    "<!-- ko if: $data.survey --><!-- ko template: { name: 'survey-content', data: survey, afterRender: $parent.koEventAfterRender } --><!-- /ko --><!-- /ko -->"
});

ko.components.register("svg-icon", {
  viewModel: {
    createViewModel: (params, componentInfo) => {
      ko.computed(() => {
        var size = (ko.unwrap(params.size) || 16) + "px";
        var svgElem: any = componentInfo.element.childNodes[0];
        svgElem.style.width = size;
        svgElem.style.height = size;
        var node: any = svgElem.childNodes[0];
        node.setAttributeNS(
          "http://www.w3.org/1999/xlink",
          "xlink:href",
          "#" + ko.unwrap(params.iconName)
        );
      });
    }
  },
  template: "<svg class='svd-svg-icon'><use></use></svg>"
});

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
