import * as ko from "knockout";
import { SurveyModel } from "../survey";
import { IPage, IQuestion, Event, SurveyElement } from "../base";
import { Page } from "./kopage";
import { PageModel } from "../page";
import { surveyCss } from "../defaultCss/cssstandard";
import { koTemplate, SurveyTemplateText } from "./templateText";
import {
  QuestionCustomWidget,
  CustomWidgetCollection
} from "../questionCustomWidgets";
import { LocalizableString } from "../localizablestring";
import { ItemValue } from "../itemvalue";
import { ImplementorBase } from "./kobase";
import { StylesManager } from "../stylesmanager";

CustomWidgetCollection.Instance.onCustomWidgetAdded.add(customWidget => {
  if (customWidget.widgetJson.isDefaultRender) return;
  if (!customWidget.htmlTemplate)
    customWidget.htmlTemplate =
      "<div>'htmlTemplate' attribute is missed.</div>";
  new SurveyTemplateText().replaceText(
    customWidget.htmlTemplate,
    "widget",
    customWidget.name
  );
});

export class Survey extends SurveyModel {
  public static get cssType(): string {
    return surveyCss.currentType;
  }
  public static set cssType(value: string) {
    StylesManager.applyTheme(value);
  }
  private renderedElement: HTMLElement;
  //TODO remove it, since there is onAfterRenderSurvey
  public onRendered: Event<(sender: SurveyModel) => any, any> = new Event<
    (sender: SurveyModel) => any,
    any
  >();
  private isFirstRender: boolean = true;
  private mouseDownPage: any = null;

  koCurrentPage: any;
  koIsFirstPage: any;
  koIsLastPage: any;
  dummyObservable: any;
  koState: any;
  koProgress: any;
  koProgressText: any;
  koAfterRenderPage: any;
  koCompletedState: any;
  koCompletedStateText: any;
  koCompletedStateCss: any;
  koTimerInfoText: any;

  public getDataValueCore(valuesHash: any, key: string) {
    if (valuesHash[key] === undefined) {
      valuesHash[key] = ko.observable();
    }
    return ko.unwrap(valuesHash[key]);
  }
  public setDataValueCore(valuesHash: any, key: string, value: any) {
    if (ko.isWriteableObservable(valuesHash[key])) {
      valuesHash[key](value);
    } else {
      valuesHash[key] = ko.observable(value);
      // if (Array.isArray(value)) {
      //   valuesHash[key] = ko.observableArray(value);
      //   (<any>value)["onArrayChanged"] = () =>
      //     valuesHash[key].notifySubscribers();
      // } else {
      //   valuesHash[key] = ko.observable(value);
      // }
    }
  }
  public deleteDataValueCore(valuesHash: any, key: string) {
    if (ko.isWriteableObservable(valuesHash[key])) {
      valuesHash[key](undefined);
    } else {
      delete valuesHash[key];
    }
  }

  constructor(
    jsonObj: any = null,
    renderedElement: any = null,
    css: any = null
  ) {
    super(jsonObj);
    new ImplementorBase(this);
    if (typeof ko === "undefined")
      throw new Error("knockoutjs library is not loaded.");
    var self = this;
    // this.iterateDataValuesHash((hash: any, key: string) => {
    //   var val = hash[key];
    //   if (!ko.isWriteableObservable(val)) {
    //     hash[key] = ko.observable(val);
    //   }
    // });
    if (css) {
      this.css = css;
    }
    if (renderedElement) {
      this.renderedElement = renderedElement;
    }
    this.render(renderedElement);
  }
  public nextPageUIClick() {
    if (!!this.mouseDownPage && this.mouseDownPage !== this.currentPage) return;
    this.mouseDownPage = null;
    this.nextPage();
  }
  public nextPageMouseDown() {
    this.mouseDownPage = this.currentPage;
    var el = <any>document.activeElement;
    if (!!el && !!el.blur) el.blur();
  }
  public get cssNavigationComplete() {
    return this.getNavigationCss(
      this.css.navigationButton,
      this.css.navigation.complete
    );
  }
  public get cssNavigationPrev() {
    return this.getNavigationCss(
      this.css.navigationButton,
      this.css.navigation.prev
    );
  }
  public get cssNavigationStart() {
    return this.getNavigationCss(
      this.css.navigationButton,
      this.css.navigation.start
    );
  }
  public get cssNavigationNext() {
    return this.getNavigationCss(
      this.css.navigationButton,
      this.css.navigation.next
    );
  }
  public get completedCss() {
    var css = surveyCss.getCss();
    return css.body + " " + css.completedPage;
  }
  private getNavigationCss(main: string, btn: string) {
    var res = "";
    if (main) res = main;
    if (btn) res += " " + btn;
    return res;
  }
  public get css(): any {
    return surveyCss.getCss();
  }
  public set css(value: any) {
    this.mergeValues(value, this.css);
  }
  public render(element: any = null) {
    this.updateKoCurrentPage();
    this.updateCustomWidgets(this.currentPage);
    var self = this;
    if (element && typeof element == "string") {
      element = document.getElementById(element);
    }
    if (element) {
      this.renderedElement = element;
    }
    element = this.renderedElement;
    if (!element) return;
    self.startTimerFromUI();
    self.applyBinding();
  }
  public clear(clearData: boolean = true, gotoFirstPage: boolean = true) {
    super.clear(clearData, gotoFirstPage);
    this.render();
  }
  protected onLocaleChanged() {
    this.render();
  }
  public koEventAfterRender(element: any, survey: any) {
    survey.onRendered.fire(this, {});
    survey.afterRenderSurvey(element);
  }
  public loadSurveyFromService(
    surveyId: string = null,
    clientId: string = null,
    renderedElement: any = null
  ) {
    if (renderedElement) {
      this.renderedElement = renderedElement;
    }
    super.loadSurveyFromService(surveyId, clientId);
  }
  public setCompleted() {
    super.setCompleted();
    this.updateKoCurrentPage();
  }
  public start() {
    super.start();
    this.updateKoCurrentPage();
  }
  protected createNewPage(name: string) {
    return new Page(name);
  }
  protected getHtmlTemplate(): string {
    return koTemplate;
  }
  protected onBeforeCreating() {
    var self = this;
    this.dummyObservable = ko.observable(0);
    this.koCurrentPage = ko.observable(this.currentPage);
    this.koIsFirstPage = ko.computed(() => {
      this.dummyObservable();
      return this.isFirstPage;
    });
    this.koIsLastPage = ko.computed(() => {
      this.dummyObservable();
      return this.isLastPage;
    });
    this.koProgressText = ko.computed(() => {
      this.dummyObservable();
      return this.progressText;
    });
    this.koProgress = ko.computed(() => {
      this.dummyObservable();
      return this.getProgress();
    });
    this.koState = ko.observable(this.state);
    this.koCompletedState = ko.observable("");
    this.koCompletedStateText = ko.observable("");
    this.koCompletedStateCss = ko.observable("");
    this.koTimerInfoText = ko.observable(this.timerInfoText);
    this.koAfterRenderPage = function(elements: any, con: any) {
      var el = SurveyElement.GetFirstNonTextElement(elements);
      if (el) self.afterRenderPage(el);
    };
  }
  protected currentPageChanged(newValue: PageModel, oldValue: PageModel) {
    this.updateKoCurrentPage();
    super.currentPageChanged(newValue, oldValue);
    if (!this.isDesignMode) this.scrollToTopOnPageChange();
  }
  pageVisibilityChanged(page: IPage, newValue: boolean) {
    super.pageVisibilityChanged(page, newValue);
    this.updateKoCurrentPage();
  }
  protected onLoadSurveyFromService() {
    this.render();
  }
  protected onLoadingSurveyFromService() {
    this.render();
  }
  protected setCompletedState(value: string, text: string) {
    super.setCompletedState(value, text);
    this.koCompletedState(this.completedState);
    this.koCompletedStateText(this.completedStateText);
    this.koCompletedStateCss(
      this.completedState !== "" ? this.css.saveData[this.completedState] : ""
    );
  }
  protected doTimer() {
    super.doTimer();
    this.koTimerInfoText(this.timerInfoText);
  }
  private applyBinding() {
    if (!this.renderedElement) return;
    this.updateKoCurrentPage();
    ko.cleanNode(this.renderedElement);
    if (!this.isFirstRender) {
      this.updateCurrentPageQuestions();
    }
    this.isFirstRender = false;
    ko.renderTemplate(
      "survey-content",
      this,
      { afterRender: this.koEventAfterRender },
      this.renderedElement
    );
  }
  private updateKoCurrentPage() {
    if (this.isLoadingFromJson) return;
    this.dummyObservable(this.dummyObservable() + 1);
    if (this.currentPage !== this.koCurrentPage()) {
      this.koCurrentPage(this.currentPage);
    }
    this.koState(this.state);
  }
  private updateCurrentPageQuestions() {
    var questions = this.currentPage ? this.currentPage.questions : [];
    for (var i = 0; i < questions.length; i++) {
      var q = questions[i];
      if (q.visible) q["updateQuestion"]();
    }
  }
}

LocalizableString.prototype["onCreating"] = function() {
  var self = this;
  this.koReRender = ko.observable(0);
  Object.defineProperty(self, "koHasHtml", {
    get: () => {
      self.koReRender();
      return self.hasHtml;
    }
  });
  this.koRenderedHtml = ko.pureComputed(function() {
    self.koReRender();
    return self.renderedHtml;
  });
};

ItemValue.prototype["onCreating"] = function() {
  new ImplementorBase(this);
};

LocalizableString.prototype["onChanged"] = function() {
  this.koReRender(this.koReRender() + 1);
};

ko.components.register("survey", {
  viewModel: {
    createViewModel: function(params: any, componentInfo: any) {
      var survey: Survey = ko.unwrap(params.survey);
      survey.render();
      return params.survey;
    }
  },
  template: koTemplate
});

ko.bindingHandlers["surveyProp"] = {
  update: function(element: any, valueAccessor: any, allBindingsAccessor: any) {
    var value = ko.utils.unwrapObservable(valueAccessor()) || {};
    for (var propName in value) {
      if (typeof propName == "string") {
        var propValue = ko.utils.unwrapObservable(value[propName]);
        element[propName] = propValue;
      }
    }
  }
};
SurveyModel.platform = "knockout";

export var registerTemplateEngine = (ko: any, platform: string) => {
  (<any>ko).surveyTemplateEngine = function() {};

  (<any>ko).surveyTemplateEngine.prototype = new ko.nativeTemplateEngine();

  (<any>ko).surveyTemplateEngine.prototype.makeTemplateSource = function(
    template: any,
    templateDocument: any
  ) {
    if (typeof template === "string") {
      templateDocument = templateDocument || document;
      var templateElementRoot = templateDocument.getElementById(
        "survey-content-" + platform
      );
      if (!templateElementRoot) {
        templateElementRoot = document.createElement("div");
        templateElementRoot.id = "survey-content-" + SurveyModel.platform;
        templateElementRoot.style.display = "none";
        templateElementRoot.innerHTML = koTemplate;
        document.body.appendChild(templateElementRoot);
      }
      var elem;
      for (var i = 0; i < templateElementRoot.children.length; i++) {
        if (templateElementRoot.children[i].id === template) {
          elem = templateElementRoot.children[i];
          break;
        }
      }
      if (!elem) {
        elem = templateDocument.getElementById(template);
      }
      if (!elem) {
        return new ko.nativeTemplateEngine().makeTemplateSource(
          template,
          templateDocument
        );
      }
      return new ko.templateSources.domElement(elem);
    } else if (template.nodeType === 1 || template.nodeType === 8) {
      return new ko.templateSources.anonymousTemplate(template);
    } else {
      throw new Error("Unknown template type: " + template);
    }
  };

  // (<any>ko).surveyTemplateEngine.prototype.renderTemplateSource = function (templateSource: any, bindingContext: any, options: any, templateDocument: any) {
  //   var useNodesIfAvailable = !((<any>ko.utils).ieVersion < 9),
  //     templateNodesFunc = useNodesIfAvailable ? templateSource["nodes"] : null,
  //     templateNodes = templateNodesFunc ? templateSource["nodes"]() : null;
  //   if (templateNodes) {
  //     return (<any>ko.utils).makeArray(templateNodes.cloneNode(true).childNodes);
  //   } else {
  //     var templateText = templateSource["text"]();
  //     return (<any>ko.utils).parseHtmlFragment(templateText, templateDocument);
  //   }
  // };

  var surveyTemplateEngineInstance = new (<any>ko).surveyTemplateEngine();
  ko.setTemplateEngine(surveyTemplateEngineInstance);
};
