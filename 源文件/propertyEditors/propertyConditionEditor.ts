import * as ko from "knockout";
import * as Survey from "survey-knockout";
import { SurveyPropertyTextEditor } from "./propertyModalEditor";
import { SurveyPropertyEditorBase } from "./propertyEditorBase";
import { SurveyPropertyEditorFactory } from "./propertyEditorFactory";
import { EditableObject } from "./editableObject";
import * as editorLocalization from "../editorLocalization";

export class SurveyPropertyConditionEditor extends SurveyPropertyTextEditor {
  public availableOperators = [];
  public showHelpText: boolean = true;
  koIsValid: any;
  koCanAddCondition: any;
  koAddConditionQuestions: any;
  koAddConditionQuestion: any;
  koAddConditionOperator: any;
  koAddConditionValue: any;
  koAddConditionType: any;
  koShowAddConditionType: any;
  koAddConditionButtonText: any;
  koCanAddConditionValue: any;
  koAddContionValueEnabled: any;
  koHasValueSurvey: any;
  onConditionAddClick: any;
  koValueSurvey: any;
  private isValueChanging: boolean = false;
  private addConditionQuestionsHash = {};
  private static emptySurvey = undefined;
  constructor(
    property: Survey.JsonObjectProperty,
    private _type: string = "condition",
    public syntaxCheckMethodName: string = "createCondition"
  ) {
    super(property);
    if (!SurveyPropertyConditionEditor.emptySurvey) {
      SurveyPropertyConditionEditor.emptySurvey =
        !!this.options && this.options.createSurvey({}, "conditionEditor");
    }
    this.availableOperators = SurveyPropertyEditorFactory.getOperators();
    this.koIsValid = ko.observable(true);
    this.koAddConditionQuestions = ko.observableArray();
    this.koAddConditionQuestion = ko.observable("");
    this.koAddConditionOperator = ko.observable("");
    this.koAddConditionValue = ko.observable("");
    this.koAddConditionType = ko.observable("and");
    this.koHasValueSurvey = ko.observable(false);
    this.koValueSurvey = ko.observable(
      SurveyPropertyConditionEditor.emptySurvey
    );
    var self = this;
    this.koAddConditionQuestion.subscribe(function(newValue) {
      self.koAddConditionValue("");
      self.onValueSurveyChanged(newValue, self.koAddConditionOperator());
    });
    this.koAddConditionOperator.subscribe(function(newValue) {
      self.onValueSurveyChanged(self.koAddConditionQuestion(), newValue);
    });
    this.koAddConditionValue.subscribe(function(newValue) {
      if (self.koHasValueSurvey()) {
        var newParsedValue = !newValue ? {} : JSON.parse(newValue);
        self.isValueChanging = true;
        self.koValueSurvey().setValue("question", newParsedValue);
        self.isValueChanging = false;
      }
    });
    this.koCanAddCondition = ko.computed(function() {
      return (
        this.koAddConditionQuestion() != "" &&
        this.koAddConditionQuestion() != undefined &&
        this.koAddConditionOperator() != "" &&
        (!this.koCanAddConditionValue() || this.koAddConditionValue() != "")
      );
    }, this);
    this.koShowAddConditionType = ko.computed(function() {
      if (!this.koIsValid()) return false;
      var text = this.koTextValue();
      if (text) text = text.trim();
      return text;
    }, this);
    this.koAddConditionButtonText = ko.computed(function() {
      var name = this.koIsValid()
        ? "conditionButtonAdd"
        : "conditionButtonReplace";
      return editorLocalization.editorLocalization.getPropertyInEditor(name);
    }, this);
    this.koCanAddConditionValue = ko.computed(function() {
      return self.canShowValueByOperator(self.koAddConditionOperator());
    }, this);
    this.koAddContionValueEnabled = ko.computed(function() {
      return self.koCanAddConditionValue() && !self.koHasValueSurvey();
    }, this);
    this.onConditionAddClick = function() {
      self.addCondition();
    };
    this.resetAddConditionValues();
  }
  public beforeShow() {
    super.beforeShow();
    this.koAddConditionQuestion("");
    this.addConditionQuestionsHash = {};
    this.koAddConditionQuestions(this.allConditionQuestions);
  }
  public get editorType(): string {
    return this._type;
  }
  public get availableQuestions(): any[] {
    var survey = this.getSurvey();
    return !!survey ? survey.getAllQuestions() : [];
  }
  protected getSurvey(): Survey.SurveyModel {
    if (this.object instanceof Survey.SurveyModel) {
      return this.getOrigionalSurvey(this.object);
    }
    if (
      this.object instanceof Survey.MatrixDropdownColumn &&
      !!this.object.colOwner
    )
      return this.object.colOwner["survey"];
    if (!!this.object && !!this.object.survey)
      return this.getOrigionalSurvey(this.object.survey);
    return null;
  }
  private getOrigionalSurvey(survey: Survey.SurveyModel): Survey.SurveyModel {
    return EditableObject.getOrigionalSurvey(survey);
  }
  public get allConditionQuestions(): any[] {
    var res = this.getConditionQuetions();
    res.sort(function(a, b) {
      return a.text.localeCompare(b.text);
    });
    return res;
  }
  public get isExpressionValid(): boolean {
    var text = this.koTextValue();
    if (!text) return false;
    var runner = new Survey.ConditionRunner(text);
    return runner.canRun();
  }
  private getConditionQuetions(): any[] {
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
  private addCalculatedValues(res: Array<any>) {
    var survey = this.getSurvey();
    if (!survey) return;
    var values = survey.calculatedValues;
    for (var i = 0; i < values.length; i++) {
      var name = values[i].name;
      res.push({ name: name, text: name, question: null });
    }
  }
  private onValueSurveyChanged(questionName: string, operator: string) {
    if (
      !this.canShowValueByOperator(operator) ||
      !questionName ||
      !this.getSurvey()
    ) {
      this.koHasValueSurvey(false);
      return;
    }
    var json = this.getQuestionConditionJson(questionName, operator);
    this.koHasValueSurvey(!!json && !!json.type);
    if (this.koHasValueSurvey()) {
      this.koValueSurvey(this.createValueSurvey(json, questionName));
      var question = this.koValueSurvey().getQuestionByName("question");
      if (!!question && !question.isEmpty()) {
        this.koAddConditionValue(JSON.stringify(question.value));
      }
    }
  }
  private deleteConditionProperties(json: any) {
    delete json["visible"];
    delete json["visibleIf"];
    delete json["enable"];
    delete json["enableIf"];
  }
  private createValueSurvey(qjson: any, questionName: string): Survey.Survey {
    qjson.name = "question";
    qjson.title = editorLocalization.editorLocalization.getString(
      "pe.conditionValueQuestionTitle"
    );
    this.deleteConditionProperties(qjson);
    if (!!qjson.choices) {
      for (var i = 0; i < qjson.choices.length; i++) {
        this.deleteConditionProperties(qjson.choices[i]);
      }
    }
    var json = {
      questions: [],
      showNavigationButtons: false,
      showQuestionNumbers: "off"
    };
    json.questions.push(qjson);
    var survey = !!this.options
      ? this.options.createSurvey(json, "conditionEditor")
      : new Survey.Survey(json);
    var self = this;
    survey.onValueChanged.add(function(survey, options) {
      if (!self.isValueChanging) {
        self.koAddConditionValue(JSON.stringify(options.value));
      }
    });
    if (this.options) {
      var propName = !!this.property ? this.property.name : "";
      this.options.onConditionValueSurveyCreatedCallBack(
        questionName,
        propName,
        this.object,
        this,
        survey
      );
    }
    return survey;
  }
  private getQuestionByName(questionName: string): Survey.Question {
    if (!this.getSurvey()) return null;
    return this.addConditionQuestionsHash[questionName];
  }
  private getQuestionValueByName(questionName: string): string {
    var question = this.getQuestionByName(questionName);
    if (question && question.name != question.getValueName())
      return questionName.replace(question.name, question.getValueName());
    return questionName;
  }
  private getQuestionConditionJson(
    questionName: string,
    operator: string
  ): any {
    var path = "";
    var question = this.getQuestionByName(questionName);
    if (!question) return null;
    var path = questionName.substr(question.name.length);
    if (!!path && path[0] == ".") {
      path = path.substr(1);
    }
    var json =
      question && question.getConditionJson
        ? question.getConditionJson(operator, path)
        : null;
    return json && (json.type !== "text" || json.inputType) ? json : null;
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
  public get addConditionQuestionOptions(): string {
    return editorLocalization.editorLocalization.getString(
      "pe.conditionSelectQuestion"
    );
  }
  public addCondition() {
    if (!this.koCanAddCondition()) return;
    var text = "";
    if (this.koShowAddConditionType()) {
      text = this.koTextValue() + " " + this.koAddConditionType() + " ";
    }
    text +=
      "{" +
      this.getQuestionValueByName(this.koAddConditionQuestion()) +
      "} " +
      this.getAddConditionOperator();
    if (this.koCanAddConditionValue()) {
      text += " " + this.getAddConditionValue();
    }
    this.koTextValue(text);
    this.resetAddConditionValues();
  }
  protected onBeforeApply() {
    if (!this.koTextValue() && this.koCanAddCondition()) {
      this.addCondition();
    }
    super.onBeforeApply();
  }
  private getAddConditionOperator(): string {
    var op = this.koAddConditionOperator();
    if (op == "equal") return "=";
    if (op == "notequal") return "<>";
    if (op == "greater") return ">";
    if (op == "less") return "<";
    if (op == "greaterorequal") return ">=";
    if (op == "lessorequal") return "<=";
    return op;
  }
  private getAddConditionValue(): string {
    var val = this.koAddConditionValue();
    if (!val) return val;
    if (val == "true" || val == "false") return val;
    if (!isNaN(val)) return val;
    if (val[0] == "[") return val.replace(/(?!^)(['])(?!$)/g, "\\$1");
    if (!this.isQuote(val[0])) val = "'" + val;
    if (!this.isQuote(val[val.length - 1])) val = val + "'";
    return val.replace(/(?!^)(['"])(?!$)/g, "\\$1");
  }
  private isQuote(ch: string): boolean {
    return ch == "'" || ch == '"';
  }
  protected onkoTextValueChanged(newValue) {
    if (!newValue) {
      this.koIsValid(true);
    } else {
      var conditionParser: any = new Survey.ConditionsParser();
      conditionParser[this.syntaxCheckMethodName](newValue);
      this.koIsValid(!conditionParser.error);
    }
  }
  private resetAddConditionValues() {
    this.koAddConditionQuestion("");
    this.koAddConditionOperator("equal");
    this.koAddConditionValue("");
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
SurveyPropertyEditorFactory.registerEditor("expression", function(
  property: Survey.JsonObjectProperty
): SurveyPropertyEditorBase {
  return new SurveyPropertyConditionEditor(
    property,
    "expression",
    "parseExpression"
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
