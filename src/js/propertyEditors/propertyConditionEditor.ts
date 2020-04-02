import * as ko from "knockout";
import Vue from "vue";
import * as Survey from "survey-vue";
import { SurveyPropertyTextEditor } from "./propertyModalEditor";
import {
  SurveyPropertyEditorBase,
  ISurveyObjectEditorOptions
} from "./propertyEditorBase";
import { SurveyPropertyEditorFactory } from "./propertyEditorFactory";
import { EditableObject } from "./editableObject";
import { ExpressionToDisplayText } from "../expressionToDisplayText";
import { SurveyPropertyDefaultValueEditor } from "./propertyDefaultValueEditor";
import * as editorLocalization from "../editorLocalization";

interface MyWindow extends Window {
  AceAjax: any;
  ace: any;
}

declare var window: MyWindow;

export class SurveyPropertyConditionEditor extends SurveyPropertyTextEditor {
  public availableOperators = [];
  public showHelpText: boolean = true;
  public koTextValue: any;
  public onRemoveConditionClick: any;
  public onChangeViewClick: any;
  public onShowHideEditor: any;
  public koShowTabs: any;
  public koActiveView: any;
  koEditorItems: ko.ObservableArray<ConditionEditorItem>;
  koCanParseExpression: any;
  koConditionDisplayText: any;
  koIsTextConditionValid: any;
  koIsEditorShowing: any;
  koIsWideMode: any;
  koIsEditorHidingDisabled: any;
  private addConditionQuestionsHash = {};
  constructor(
    property: Survey.JsonObjectProperty,
    private _type: string = "condition",
    public syntaxCheckMethodName: string = "createCondition"
  ) {
    super(property);
    this.koShowTabs = ko.observable(true);
    this.koActiveView = ko.observable("form");
    this.koTextValue = ko.observable();
    this.koEditorItems = ko.observableArray<ConditionEditorItem>([]);
    this.koCanParseExpression = ko.observable(true);
    this.koConditionDisplayText = ko.computed(function() {
      if (!!this.value) return this.getConditionDisplayText();
      return this.getLocString("pe.expressionIsEmpty");
    }, this);
    this.koIsWideMode = ko.observable(false);
    this.koIsEditorShowing = ko.observable(false);
    this.koIsEditorHidingDisabled = ko.observable(false);
    this.onShowHideEditor = () => {
      if (this.koIsEditorHidingDisabled()) return;
      this.koIsEditorShowing(!this.koIsEditorShowing());
    };
    this.koIsTextConditionValid = ko.observable(true);
    var self = this;
    this.koCanParseExpression.subscribe(function(newValue) {
      if (newValue === false) {
        self.koActiveView("text");
      }
    });
    this.koIsEditorShowing.subscribe(function(newValue) {
      if (newValue === true) {
        self.buildEditorsItemsOnShowing();
      }
    });
    self.onRemoveConditionClick = function(item) {
      self.removeCondition(item);
    };
    self.onChangeViewClick = function(newView) {
      self.koActiveView(newView);
    };
    this.koTextValue.subscribe(function(newValue) {
      self.onkoTextValueChanged(newValue);
    });
  }
  public addCondition() {
    this.koEditorItems.push(new ConditionEditorItem(this));
    this.updateEditorItemsVisibilities();
  }
  public removeCondition(item: ConditionEditorItem) {
    this.koEditorItems.remove(item);
    if (this.koEditorItems().length == 0) {
      this.addCondition();
    }
    this.updateEditorItemsVisibilities();
    this.onConditionItemChanged();
  }
  public get addConditionText(): string {
    return this.getLocString("pe.addCondition");
  }
  public get removeConditionText(): string {
    return this.getLocString("pe.remove");
  }
  public beforeShowCore() {
    super.beforeShowCore();
    this.resetAllConditionQuestions();
    this.onkoTextValueChanged(this.value);
    if (!!this.options) {
      this.koShowTabs(this.options.allowEditExpressionsInTextEditor);
    }
  }
  protected beforeShowModal() {
    super.beforeShowModal();
    this.isEditorShowing = true;
    this.isEditorHidingDisabled = true;
  }
  public get isEditorShowing(): boolean {
    return this.koIsEditorShowing();
  }
  public set isEditorShowing(val: boolean) {
    this.koIsEditorShowing(val);
  }
  public get isEditorHidingDisabled(): boolean {
    return this.koIsEditorHidingDisabled();
  }
  public set isEditorHidingDisabled(val: boolean) {
    this.koIsEditorHidingDisabled(val);
  }
  public get isWideMode(): boolean {
    return this.koIsWideMode();
  }
  public set isWideMode(val: boolean) {
    this.koIsWideMode(val);
  }
  public get editorType(): string {
    return this._type;
  }
  public get availableQuestions(): any[] {
    var survey = this.getSurvey();
    return !!survey ? survey.getAllQuestions() : [];
  }
  protected getSurvey(): Survey.SurveyModel {
    return EditableObject.getSurvey(this.object);
  }
  private allConditionQuestionsValue: any[];
  private resetAllConditionQuestions() {
    this.addConditionQuestionsHash = {};
    this.allConditionQuestionsValue = this.getConditionQuestions();
    this.allConditionQuestionsValue.sort(function(a, b) {
      return a.text.localeCompare(b.text);
    });
  }
  public get allConditionQuestions(): any[] {
    if (!!this.allConditionQuestionsValue)
      return this.allConditionQuestionsValue;
    this.resetAllConditionQuestions();
    return this.allConditionQuestionsValue;
  }
  public get isExpressionValid(): boolean {
    return this.koIsTextConditionValid() && !!this.koTextValue();
  }
  protected onValueChanged() {
    this.koTextValue(this.value);
  }
  private getConditionQuestions(): any[] {
    if (!this.object) return [];
    var res = [];
    var questions = this.availableQuestions;
    if (questions.length > 0) {
      for (var i = 0; i < questions.length; i++) {
        if (this.object == questions[i]) continue;
        questions[i].addConditionObjectsByContext(res, this.object);
      }
      this.addConditionQuestionsHash = {};
      for (var i = 0; i < res.length; i++) {
        if (!this.options || !this.options.showTitlesInExpressions) {
          res[i].text = res[i].name;
        }
        this.addConditionQuestionsHash[res[i].name] = res[i].question;
      }
    }
    this.addCalculatedValues(res);
    !!this.options &&
      this.options.onConditionQuestionsGetListCallback(
        this.editablePropertyName,
        this.object,
        this,
        res
      );
    return res;
  }
  public isClassContains(
    qType: string,
    contains: Array<string>,
    notContains: Array<string>
  ): boolean {
    var classInfo = Survey.Serializer.findClass(qType);
    while (!!classInfo) {
      if (contains.indexOf(classInfo.name) > -1) return true;
      if (notContains.indexOf(classInfo.name) > -1) return false;
      classInfo = !!classInfo.parentName
        ? Survey.Serializer.findClass(classInfo.parentName)
        : null;
    }
    return contains.length == 0;
  }
  private addCalculatedValues(res: Array<any>) {
    var survey = this.getSurvey();
    if (!survey) return;
    var values = survey.calculatedValues;
    for (var i = 0; i < values.length; i++) {
      var name = values[i].name;
      res.push({ name: name, text: name, question: null });
    }
  }
  public getQuestionByName(questionName: string): Survey.Question {
    if (!this.getSurvey()) return null;
    return this.addConditionQuestionsHash[questionName];
  }
  public getQuestionValueJSON(questionName: string, operator: string): any {
    return this.getQuestionConditionJson(questionName, operator, true);
  }
  private getQuestionConditionJson(
    questionName: string,
    operator: string,
    convertOnAnyOf: boolean = false
  ): any {
    var path = "";
    var question = this.getQuestionByName(questionName);
    if (!question) return null;
    if (questionName.indexOf(question.name) == 0) {
      path = questionName.substr(question.name.length);
    }
    if (questionName.indexOf("row.") == 0) {
      path = questionName.substr("row.".length);
    }
    if (!!path && path[0] == ".") {
      path = path.substr(1);
    }
    var json =
      question && question.getConditionJson
        ? question.getConditionJson(operator, path)
        : null;
    if (!!json && json.type == "radiogroup") {
      json.type = "dropdown";
    }
    if (!!json && operator == "anyof" && convertOnAnyOf) {
      if (!this.isClassContains(json.type, ["checkbox"], [])) {
        json.type = "checkbox";
      }
    }
    return !!json ? json : null;
  }
  private canShowValueByOperator(operator: string) {
    return operator != "empty" && operator != "notempty";
  }
  public get hasAceEditor(): boolean {
    return (
      typeof ace !== "undefined" &&
      typeof ace.require("ace/ext/language_tools") !== "undefined"
    );
  }
  protected onkoTextValueChanged(newValue) {
    if (!this.isBeforeShowCalled || this.isConditionItemsBuilding) return;
    var isValid = true;
    var operand = null;
    if (!!newValue) {
      var conditionParser = new Survey.ConditionsParser();
      operand = conditionParser.parseExpression(newValue);
      isValid = !!operand;
    }
    this.koIsTextConditionValid(isValid);
    if (isValid) {
      this.value=newValue;
    }
    this.rebuildEditorItems(operand, isValid);
  }
  private buildEditorsItemsOnShowing() {
    var operand = null;
    var conditionText = this.value  ;
    if (!!conditionText) {
      var conditionParser = new Survey.ConditionsParser();
      operand = conditionParser.parseExpression(conditionText);
    }
    this.rebuildEditorItems(operand, true);
  }
  private isConditionItemsBuilding: boolean = false;
  public onConditionItemChanged() {
    if (this.isConditionItemsBuilding) return;
    var text = "";
    var items = this.koEditorItems();
    for (var i = 0; i < items.length; i++) {
      var itemText = items[i].toString();
      if (!itemText) continue;
      if (!!text) {
        text += " " + items[i].conjunction + " ";
      }
      text += itemText;
    }
    this.isConditionItemsBuilding = true;
    this.koValue(text);
    this.isConditionItemsBuilding = false;
  }
  private rebuildEditorItems(operand: Survey.Operand, isValid: boolean) {
    if (!this.isEditorShowing) return;
    if (this.isConditionItemsBuilding) return;
    if (!isValid) {
      this.koEditorItems([]);
      this.koCanParseExpression(false);
      return;
    }
    if (!operand) {
      this.koEditorItems([]);
    } else {
      this.isConditionItemsBuilding = true;
      var items = this.buildEditorItems(operand);
      this.isConditionItemsBuilding = false;
      this.koEditorItems(items);
    }
    this.koCanParseExpression(this.koEditorItems().length > 0 || !operand);
    if (this.koEditorItems().length == 0 && !operand) {
      this.koEditorItems([new ConditionEditorItem(this)]);
    }
    this.updateEditorItemsVisibilities();
  }
  private updateEditorItemsVisibilities() {
    var items = this.koEditorItems();
    for (var i = 0; i < items.length; i++) {
      items[i].isFirst = i == 0;
    }
  }
  private buildEditorItems(
    operand: Survey.Operand
  ): Array<ConditionEditorItem> {
    var res = [];
    if (!this.buildEditorItemsCore(operand, res, "")) {
      res = [];
    }
    return res;
  }
  private buildEditorItemsCore(
    operand: Survey.Operand,
    res: Array<ConditionEditorItem>,
    parentConjunction: string
  ): boolean {
    if (operand.getType() == "unary")
      return this.buildEditorItemsAddUnaryOperand(
        <Survey.UnaryOperand>operand,
        res
      );
    if (operand.getType() !== "binary") return false;
    var op = <Survey.BinaryOperand>operand;
    if (op.isArithmetic && !op.isConjunction) return false;
    if (op.isConjunction)
      return this.buildEditorItemsAddConjunction(op, res, parentConjunction);
    return this.buildEditorItemsAddBinaryOperand(op, res);
  }
  private buildEditorItemsAddConjunction(
    op: Survey.BinaryOperand,
    res: Array<ConditionEditorItem>,
    parentConjunction: string
  ): boolean {
    var conjunction = op.conjunction;
    if (
      conjunction == "or" &&
      !!parentConjunction &&
      parentConjunction != conjunction
    )
      return false;
    if (!this.buildEditorItemsCore(op.leftOperand, res, conjunction))
      return false;
    var conjunctionIndex = res.length;
    if (!this.buildEditorItemsCore(op.rightOperand, res, conjunction))
      return false;
    res[conjunctionIndex].conjunction = op.conjunction;
    return true;
  }
  private buildEditorItemsAddBinaryOperand(
    op: Survey.BinaryOperand,
    res: Array<ConditionEditorItem>
  ): boolean {
    var variableOperand = <Survey.Variable>(
      this.getOperandByType(op, "variable")
    );
    var arrayValue = this.getArrayValueFromOperand(op);
    var constOperand = !arrayValue
      ? <Survey.Const>this.getOperandByType(op, "const")
      : null;
    if (
      !variableOperand ||
      (!constOperand && !arrayValue && this.canShowValueByOperator(op.operator))
    )
      return false;
    if (!this.getQuestionByName(variableOperand.variable)) return false;
    var item = new ConditionEditorItem(this);
    item.questionName = variableOperand.variable;
    item.operator =
      op.leftOperand !== variableOperand
        ? this.getOppositeOperator(op.operator)
        : op.operator;
    if (!!arrayValue) {
      item.value = arrayValue;
    }
    if (!!constOperand) {
      item.value = constOperand.correctValue;
    }
    res.push(item);
    return true;
  }
  private getArrayValueFromOperand(op: Survey.BinaryOperand): Array<any> {
    var arrayOperand = <Survey.ArrayOperand>this.getOperandByType(op, "array");
    //TODO
    if (!arrayOperand || !arrayOperand["values"]) return null;
    var valuesOperand = arrayOperand["values"];
    if (!Array.isArray(valuesOperand) || valuesOperand.length == 0) return null;
    var res = [];
    for (var i = 0; i < valuesOperand.length; i++) {
      var opConst = valuesOperand[i];
      if (!opConst) continue;
      if (opConst.getType() != "const") return null;
      res.push((<Survey.Const>opConst).correctValue);
    }
    if (res.length == 0) return null;
    return res;
  }
  private buildEditorItemsAddUnaryOperand(
    op: Survey.UnaryOperand,
    res: Array<ConditionEditorItem>
  ): boolean {
    var operator = op.operator;
    if (operator !== "empty" && operator != "notempty") return false;
    var operand = op.expression;
    if (operand == null || operand.getType() != "variable") return false;
    var questionName = (<Survey.Variable>operand).variable;
    if (!this.getQuestionByName(questionName)) return false;
    var item = new ConditionEditorItem(this);
    item.questionName = questionName;
    item.operator = operator;
    res.push(item);
    return true;
  }
  private getOppositeOperator(operator: string): string {
    if (operator == "less") return "greater";
    if (operator == "greater") return "less";
    if (operator == "lessorequal") return "greaterorequal";
    if (operator == "greaterorequal") return "lessorequal";
    return operator;
  }
  private getOperandByType(
    op: Survey.BinaryOperand,
    opType: string
  ): Survey.Operand {
    if (
      op.leftOperand.getType() !== opType &&
      op.rightOperand.getType() !== opType
    )
      return null;
    if (
      op.leftOperand.getType() == opType &&
      op.rightOperand.getType() == opType
    )
      return null;
    return op.leftOperand.getType() == opType
      ? op.leftOperand
      : op.rightOperand;
  }
  private getConditionDisplayText(): string {
    var value = this.koIsTextConditionValid()
      ? this.koTextValue()
      : this.koValue();
    return new ExpressionToDisplayText(
      this.getSurvey(),
      this.options
    ).toDisplayText(value);
  }
}

SurveyPropertyEditorFactory.registerEditor("condition", function(
  property: Survey.JsonObjectProperty
): SurveyPropertyEditorBase {
  return new SurveyPropertyConditionEditor(
    property,
    "condition",
    "createCondition"
  );
});

var operations = [
  {
    value: "and",
    title: "logical 'and' operator"
  },
  {
    value: "&&",
    title: "logical 'and' operator"
  },
  {
    value: "or",
    title: "logical 'or' operator"
  },
  {
    value: "||",
    title: "logical 'or' operator"
  },
  {
    value: "empty",
    title: "returns true if the left operand is empty	{questionName} empty"
  },
  {
    value: "notempty",
    title:
      "returns true if the left operand is not empty	{questionName} notempty"
  },
  {
    value: "=",
    title:
      "returns true if two values are equal	{questionName} = 5, {questionName} == 'abc', {questionName} equal 124"
  },
  {
    value: "==",
    title:
      "returns true if two values are equal	{questionName} = 5, {questionName} == 'abc', {questionName} equal 124"
  },
  {
    value: "equal",
    title:
      "returns true if two values are equal	{questionName} = 5, {questionName} == 'abc', {questionName} equal 124"
  },
  {
    value: "<>",
    title:
      "returns true if two values are not equal	{questionName} <> 5, {questionName} != 'abc', {questionName} notequal 124"
  },
  {
    value: "!=",
    title:
      "returns true if two values are not equal	{questionName} <> 5, {questionName} != 'abc', {questionName} notequal 124"
  },
  {
    value: "notequal",
    title:
      "returns true if two values are not equal	{questionName} <> 5, {questionName} != 'abc', {questionName} notequal 124"
  },
  {
    value: ">",
    title:
      "returns true if the left operand greater then the second operand	{questionName} > 2, {questionName} greater 'a'"
  },
  {
    value: "greater",
    title:
      "returns true if the left operand greater then the second operand	{questionName} > 2, {questionName} greater 'a'"
  },
  {
    value: "<",
    title:
      "returns true if the left operand less then the second operand	{questionName} < 2, {questionName} less 'a'"
  },
  {
    value: "less",
    title:
      "returns true if the left operand less then the second operand	{questionName} < 2, {questionName} less 'a'"
  },
  {
    value: ">=",
    title:
      "returns true if the left operand equal or greater then the second operand	{questionName} >= 2, {questionName} greaterorequal 'a'"
  },
  {
    value: "greaterorequal",
    title:
      "returns true if the left operand equal or greater then the second operand	{questionName} >= 2, {questionName} greaterorequal 'a'"
  },
  {
    value: "<=",
    title:
      "returns true if the left operand equal or less then the second operand	{questionName} <= 2, {questionName} lessorequal 'a'"
  },
  {
    value: "lessorequal",
    title:
      "returns true if the left operand equal or less then the second operand	{questionName} <= 2, {questionName} lessorequal 'a'"
  },
  {
    value: "contains",
    title:
      "return true if the left operand is an array and it contains a value of the second operand	{questionName} contains 'a'"
  },
  {
    value: "notcontains",
    title:
      "return true if the left operand is an array and it does not contain a value of the second operand"
  },
  {
    value: "anyof",
    title:
      "return true if the left operand is an array and it contains any value of the second array operand"
  },
  {
    value: "allof",
    title:
      "return true if the left operand is an array and it contains all values of the second array operand"
  }
];

const createAnnotations = (
  condition: string,
  syntaxCheckMethodName: string
): AceAjax.Annotation[] => {
  condition = condition || "";
  var annotations = new Array<AceAjax.Annotation>();
  var conditionParser: any = new Survey.ConditionsParser();
  conditionParser[syntaxCheckMethodName](condition);
  if (!!condition && conditionParser.error) {
    var toErrorSubstring = condition.substring(0, conditionParser.error.at);
    var column = toErrorSubstring.length - toErrorSubstring.lastIndexOf("\n");
    var annotation: AceAjax.Annotation = {
      row: condition.match(/\n/g) ? condition.match(/\n/g).length : 0,
      column: column,
      text: conditionParser.error.code + " (" + column + ")",
      type: "error"
    };
    annotations.push(annotation);
  }
  return annotations;
};

var ID_REGEXP = /[a-zA-Z_0-9{\*\/\<\>\=\!\$\.\-\u00A2-\uFFFF]/;

export function doGetCompletions(
  prevIdentifier: string,
  prefix: string,
  config: { question: Survey.Question; questions: Survey.Question[] },
  completer = null
) {
  var completions = [];
  var currentQuestion: Survey.Question = config.question;
  var usableQuestions = (config.questions || []).filter(
    q => q !== currentQuestion
  );
  if (
    !!usableQuestions ||
    currentQuestion instanceof Survey.MatrixDropdownColumn ||
    currentQuestion.data instanceof Survey.QuestionPanelDynamicItem
  ) {
    if (
      prevIdentifier === "row" &&
      currentQuestion instanceof Survey.MatrixDropdownColumn
    ) {
      completions = currentQuestion.colOwner["columns"]
        .filter(e => e.name !== currentQuestion.name)
        .map(column => {
          return {
            name: "",
            value: "{row." + column.name + "}",
            some: "",
            meta: column.title,
            identifierRegex: ID_REGEXP
          };
        });
    } else if (
      prevIdentifier === "panel" &&
      currentQuestion.data instanceof Survey.QuestionPanelDynamicItem
    ) {
      var panel: Survey.PanelModel = currentQuestion.data.panel;
      completions = panel.elements
        .filter(e => e.name !== currentQuestion.name)
        .map(element => {
          return {
            name: "",
            value: "{panel." + element.name + "}",
            some: "",
            meta: element.name,
            identifierRegex: ID_REGEXP
          };
        });
    } else {
      var operationsFiltered = operations.filter(
        op => !prefix || op.value.indexOf(prefix) !== -1
      );
      var questionsFiltered = usableQuestions.filter(
        op => !prefix || op.name.indexOf(prefix) !== -1
      );
      if (currentQuestion instanceof Survey.MatrixDropdownColumn) {
        completions.push({
          name: "",
          value: "{row.",
          some: "",
          meta: editorLocalization.editorLocalization.getString(
            editorLocalization.defaultStrings.pe.aceEditorRowTitle
          ),
          identifierRegex: ID_REGEXP
        });
      } else if (
        !!currentQuestion &&
        currentQuestion.data instanceof Survey.QuestionPanelDynamicItem
      ) {
        completions.push({
          name: "",
          value: "{panel.",
          some: "",
          meta: editorLocalization.editorLocalization.getString(
            editorLocalization.defaultStrings.pe.aceEditorPanelTitle
          ),
          identifierRegex: ID_REGEXP
        });
      }
      completions = completions
        .concat(
          questionsFiltered.map(q => {
            return {
              completer: completer,
              name: "",
              value: "{" + q.name + "}",
              some: "",
              meta: q.title,
              identifierRegex: ID_REGEXP
            };
          })
        )
        .concat(
          operationsFiltered.map(op => {
            return {
              name: "",
              value: op.value,
              some: "",
              meta: op.title,
              identifierRegex: ID_REGEXP
            };
          })
        );
    }
  }
  return completions;
}

export function insertMatch(editor, data) {
  if (editor.completer.completions.filterText) {
    var allRanges = editor.selection.getAllRanges();
    for (
      var rangeIndex = 0, range;
      (range = allRanges[rangeIndex]);
      rangeIndex++
    ) {
      range.start.column -= editor.completer.completions.filterText.length;
      var rangeText = editor.session.getTextRange(range);
      if (rangeText.indexOf("{") !== 0) {
        var extRange = range.clone();
        extRange.start.column--;
        if (editor.session.getTextRange(extRange).indexOf("{") === 0) {
          range = extRange;
        }
      }
      editor.session.remove(range);
    }
  }
  editor.execCommand("insertstring", data.value || data);
}

ko.bindingHandlers.aceEditor = {
  init: function(element, options) {
    var configs = options();
    var langTools = ace.require("ace/ext/language_tools");
    var langUtils = ace.require("ace/autocomplete/util");
    var editor = ace.edit(element);
    var objectEditor: SurveyPropertyConditionEditor = configs.editor;
    var isUpdating = false;

    editor.setOption("useWorker", false);

    editor.getSession().on("change", function() {
      var errors = createAnnotations(
        editor.getValue(),
        objectEditor.syntaxCheckMethodName
      );
      isUpdating = true;
      objectEditor.koTextValue(editor.getValue());
      isUpdating = false;
      //   objectEditor.koHasError(errors.length > 0);
      //   if (errors.length > 0) {
      //     objectEditor.koErrorText(errors[0].text);
      //   }
      editor.getSession().setAnnotations(errors);
    });
    editor.on("focus", function() {
      editor.setReadOnly(objectEditor.readOnly());
    });
    var updateCallback = () => {
      if (!isUpdating) {
        editor.setValue(objectEditor.koTextValue() || "");
      }
    };
    var valueSubscription = objectEditor.koTextValue.subscribe(updateCallback);
    updateCallback();

    var completer = {
      identifierRegexps: [ID_REGEXP],
      insertMatch: insertMatch,
      getCompletions: (editor, session, pos, prefix, callback) => {
        var prevIdentifier = langUtils.retrievePrecedingIdentifier(
          session.getLine(pos.row),
          pos.column - 1
        );
        var completions = doGetCompletions(
          prevIdentifier,
          prefix,
          configs,
          completer
        );
        callback(null, completions);
      },
      getDocTooltip: function(item) {
        item.docHTML =
          "<div style='max-width: 300px; white-space: normal;'>" +
          item.meta +
          "</div>";
      }
    };
    langTools.setCompleters([completer]);
    editor.setOptions({
      enableBasicAutocompletion: true,
      enableLiveAutocompletion: true
    });

    ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
      editor.destroy();
      valueSubscription.dispose();
    });

    editor.focus();
  }
};
