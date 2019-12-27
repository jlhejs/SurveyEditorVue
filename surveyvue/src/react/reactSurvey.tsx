import * as React from "react";
import { ReactSurveyModel } from "./reactsurveymodel";
import { SurveyPage } from "./page";
import { SurveyNavigation } from "./reactSurveyNavigation";
import { SurveyError, Base } from "../base";
import { Question } from "../question";
import { ISurveyCreator } from "./reactquestion";
import { ReactQuestionFactory } from "./reactquestionfactory";
import { surveyCss } from "../defaultCss/cssstandard";
import { SurveyProgress } from "./reactSurveyProgress";
import { SurveyTimerPanel } from "./reacttimerpanel";
import { SurveyElementBase, SurveyLocString } from "./reactquestionelement";
import { PageModel } from "../page";
import { StylesManager } from "../stylesmanager";

export class Survey extends SurveyElementBase implements ISurveyCreator {
  public static get cssType(): string {
    return surveyCss.currentType;
  }
  public static set cssType(value: string) {
    StylesManager.applyTheme(value);
  }
  protected survey: ReactSurveyModel;
  private isCurrentPageChanged: boolean = false;
  private onCurrentPageChangedHandler = (sender: any, options: any): any => {
    this.isCurrentPageChanged = true;
  };

  constructor(props: any) {
    super(props);
    this.handleTryAgainClick = this.handleTryAgainClick.bind(this);
    this.createSurvey(props);
    this.updateSurvey(props, {});
    //set the first page
    var dummy = this.survey.currentPage;
  }
  protected getStateElement(): Base {
    return this.survey;
  }
  componentDidUpdate(prevProps: any, prevState: any) {
    super.componentDidUpdate(prevProps, prevState);
    if (this.isCurrentPageChanged) {
      this.isCurrentPageChanged = false;
      this.survey.scrollToTopOnPageChange();
    }
    this.updateSurvey(this.props, prevProps);
  }
  componentDidMount() {
    super.componentDidMount();
    var el = this.refs["root"];
    if (el && this.survey) this.survey.doAfterRenderSurvey(el);
    if (this.survey) {
      this.survey.startTimerFromUI();
    }
  }
  componentWillUnmount() {
    super.componentWillUnmount();
    if (this.survey) {
      this.survey.stopTimer();
      this.survey.onCurrentPageChanged.remove(this.onCurrentPageChangedHandler);
    }
  }
  doRender(): JSX.Element {
    var renderResult;
    if (this.survey.state == "completed") {
      renderResult = this.renderCompleted();
    } else if (this.survey.state == "completedbefore") {
      renderResult = this.renderCompletedBefore();
    } else if (this.survey.state == "loading") {
      renderResult = this.renderLoading();
    } else if (this.survey.state == "starting") {
      renderResult = this.renderStartPage();
    } else {
      renderResult = this.renderSurvey();
    }
    var title = this.renderTitle();
    var onSubmit = function(event: React.FormEvent<HTMLFormElement>) {
      event.preventDefault();
    };
    return (
      <div ref="root" className={this.css.root}>
        <form onSubmit={onSubmit}>
          <div className="sv_custom_header" />
          <div className={this.css.container}>
            {title}
            {renderResult}
          </div>
        </form>
      </div>
    );
  }
  render(): JSX.Element {
    return this.doRender();
  }
  public get css(): any {
    return surveyCss.getCss();
  }
  public set css(value: any) {
    this.survey.mergeCss(value, this.css);
  }
  handleTryAgainClick(event: any) {
    this.survey.doComplete();
  }
  protected renderCompleted(): JSX.Element {
    if (!this.survey.showCompletedPage) return null;
    var completedState = null;
    if (this.survey.completedState) {
      var tryAgainButton = null;
      if (this.survey.completedState == "error") {
        var btnText = this.survey.getLocString("saveAgainButton");
        tryAgainButton = (
          <input
            type={"button"}
            value={btnText}
            className={this.css.saveData.saveAgainButton}
            onClick={this.handleTryAgainClick}
          />
        );
      }
      var css = this.css.saveData[this.survey.completedState];
      completedState = (
        <div className={this.css.saveData.root}>
          <div className={css}>
            <span>{this.survey.completedStateText}</span>
            {tryAgainButton}
          </div>
        </div>
      );
    }
    var htmlValue = { __html: this.survey.processedCompletedHtml };
    return (
      <div>
        <div
          dangerouslySetInnerHTML={htmlValue}
          className={[this.css.body, this.css.completedPage].join(" ")}
        />
        {completedState}
      </div>
    );
  }
  protected renderCompletedBefore(): JSX.Element {
    var htmlValue = { __html: this.survey.processedCompletedBeforeHtml };
    return (
      <div dangerouslySetInnerHTML={htmlValue} className={this.css.body} />
    );
  }
  protected renderLoading(): JSX.Element {
    var htmlValue = { __html: this.survey.processedLoadingHtml };
    return (
      <div dangerouslySetInnerHTML={htmlValue} className={this.css.body} />
    );
  }
  protected renderStartPage(): JSX.Element {
    var startedPage = this.survey.startedPage
      ? this.renderPage(this.survey.startedPage)
      : null;
    var pageId = this.survey.startedPage ? this.survey.startedPage.id : "";
    return (
      <div>
        <div id={pageId} className={this.css.body}>
          {this.renderNavigation("top")}
          {startedPage}
          {this.renderNavigation("bottom")}
        </div>
      </div>
    );
  }
  protected renderSurvey(): JSX.Element {
    var currentPage = this.survey.currentPage
      ? this.renderPage(this.survey.currentPage)
      : null;
    var pageId = this.survey.currentPage ? this.survey.currentPage.id : "";
    var topProgress = this.survey.isShowProgressBarOnTop
      ? this.renderProgress(true)
      : null;
    var bottomProgress = this.survey.isShowProgressBarOnBottom
      ? this.renderProgress(false)
      : null;
    if (!currentPage) {
      currentPage = this.renderEmptySurvey();
    }
    return (
      <div
        id={pageId}
        className={!currentPage ? this.css.bodyEmpty : this.css.body}
      >
        {topProgress}
        {this.renderTimerPanel("top")}
        {this.renderNavigation("top")}
        {currentPage}
        {this.renderTimerPanel("bottom")}
        {bottomProgress}
        {this.renderNavigation("bottom")}
      </div>
    );
  }
  protected renderTitle(): JSX.Element {
    let title = null;
    let description = null;
    if (this.survey.title && this.survey.showTitle) {
      title = SurveyElementBase.renderLocString(this.survey.locTitle);
      description = SurveyElementBase.renderLocString(
        this.survey.locDescription
      );
    }
    return title ? (
      <div className={this.css.header}>
        <h3 className={this.css.title}>{title}</h3>
        <h5 className={this.css.description}>{description}</h5>
      </div>
    ) : null;
  }
  protected renderTimerPanel(location: string) {
    if (this.survey.showTimerPanel != location) return null;
    return <SurveyTimerPanel survey={this.survey} />;
  }
  protected renderPage(page: PageModel): JSX.Element {
    return (
      <SurveyPage
        survey={this.survey}
        page={page}
        css={this.css}
        creator={this}
      />
    );
  }
  protected renderProgress(isTop: boolean): JSX.Element {
    return <SurveyProgress survey={this.survey} css={this.css} isTop={isTop} />;
  }
  protected renderNavigation(navPosition: string): JSX.Element {
    if (
      this.survey.isNavigationButtonsShowing !== "both" &&
      (this.survey.isNavigationButtonsShowing === "none" ||
        this.survey.isNavigationButtonsShowing !== navPosition)
    ) {
      return null;
    }
    return <SurveyNavigation survey={this.survey} css={this.css} />;
  }
  protected renderEmptySurvey(): JSX.Element {
    return <span>{this.survey.emptySurveyText}</span>;
  }
  protected createSurvey(newProps: any) {
    if (!newProps) newProps = {};
    if (newProps) {
      if (newProps.model) {
        this.survey = newProps.model;
      } else {
        if (newProps.json) {
          this.survey = new ReactSurveyModel(newProps.json);
        }
      }
    } else {
      this.survey = new ReactSurveyModel();
    }
    if (!!newProps.css) {
      this.survey.mergeCss(newProps.css, this.css);
    }
    this.setSurveyEvents();
  }
  protected updateSurvey(newProps: any, oldProps: any) {
    if (!newProps) return;
    oldProps = oldProps || {};
    for (var key in newProps) {
      if (key == "model" || key == "children" || key == "css" || key == "json")
        continue;
      if (newProps[key] === oldProps[key]) continue;

      if (key.indexOf("on") == 0 && this.survey[key] && this.survey[key].add) {
        if (!!oldProps[key]) {
          this.survey[key].remove(oldProps[key]);
        }
        this.survey[key].add(newProps[key]);
      } else {
        this.survey[key] = newProps[key];
      }
    }
  }
  protected setSurveyEvents() {
    var self = this;

    this.survey.renderCallback = function() {
      var counter =
        !!self.state && !!self.state.modelChanged ? self.state.modelChanged : 0;
      self.setState({ modelChanged: counter + 1 });
    };
    this.survey.onPartialSend.add(sender => {
      self.setState(self.state);
    });
    this.survey.onCurrentPageChanged.add(this.onCurrentPageChangedHandler);
  }

  //ISurveyCreator
  public createQuestionElement(question: Question): JSX.Element {
    return ReactQuestionFactory.Instance.createQuestion(
      question.getTemplate(),
      {
        question: question,
        isDisplayMode: question.isReadOnly,
        creator: this
      }
    );
  }
  public renderError(
    key: string,
    error: SurveyError,
    cssClasses: any
  ): JSX.Element {
    return (
      <div key={key}>
        <span className={cssClasses.error.icon} aria-hidden="true" />
        <span className={cssClasses.error.item}>
          <SurveyLocString locStr={error.locText} />
        </span>
      </div>
    );
  }
  public questionTitleLocation(): string {
    return this.survey.questionTitleLocation;
  }
  public questionErrorLocation(): string {
    return this.survey.questionErrorLocation;
  }
}
