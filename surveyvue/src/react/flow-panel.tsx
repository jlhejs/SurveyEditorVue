import * as React from "react";
import { SurveyQuestion } from "./reactquestion";
import { Question } from "../question";
import { FlowPanelModel } from "../flowpanel";
import { ReactElementFactory } from "./element-factory";

import { SurveyPanel } from "./panel";

export class SurveyFlowPanel extends SurveyPanel {
  constructor(props: any) {
    super(props);
  }
  public get flowPanel(): FlowPanelModel {
    return this.panel as FlowPanelModel;
  }
  componentDidMount() {
    super.componentDidMount();
    if (!!this.flowPanel) {
      var self = this;
      this.flowPanel.onCustomHtmlProducing = function() {
        return "";
      };
      this.flowPanel.onGetHtmlForQuestion = self.renderQuestion;
    }
  }
  componentWillUnmount() {
    super.componentWillUnmount();
    if (!!this.flowPanel) {
      this.flowPanel.onCustomHtmlProducing = null;
      this.flowPanel.onGetHtmlForQuestion = null;
    }
  }
  protected getQuestion(name: string): Question {
    return this.flowPanel.getQuestionByName(name);
  }
  protected renderQuestion(question: Question): string {
    return "<question>" + question.name + "</question>";
  }
  protected renderRows(): Array<JSX.Element> {
    return [this.renderHtml()];
  }
  private renderedIndex: number;
  private getNodeIndex(): number {
    return this.renderedIndex++;
  }
  protected renderHtml(): JSX.Element {
    if (!this.flowPanel) return null;
    let html = "<span>" + this.flowPanel.produceHtml() + "</span>";
    if (!DOMParser) {
      var htmlValue = { __html: html };
      return <div dangerouslySetInnerHTML={htmlValue} />;
    }
    let doc = new DOMParser().parseFromString(html, "text/xml");
    this.renderedIndex = 0;
    return this.renderParentNode(doc);
  }
  protected renderNodes(domNodes: Array<Node>): Array<JSX.Element> {
    var nodes = [];
    for (var i = 0; i < domNodes.length; i++) {
      nodes.push(this.renderNode(domNodes[i]));
    }
    return nodes;
  }
  private getStyle(nodeType: string) {
    var style: any = {};
    if (nodeType.toLowerCase() === "b") {
      style.fontWeight = "bold";
    }
    if (nodeType.toLowerCase() === "i") {
      style.fontStyle = "italic";
    }
    if (nodeType.toLowerCase() === "u") {
      style.textDecoration = "underline";
    }
    return style;
  }
  protected renderParentNode(node: Node): JSX.Element {
    var nodeType = node.nodeName.toLowerCase();
    var children = this.renderNodes(this.getChildDomNodes(node));
    if (nodeType == "div")
      return <div key={this.getNodeIndex()}>{children}</div>;
    return (
      <span key={this.getNodeIndex()} style={this.getStyle(nodeType)}>
        {children}
      </span>
    );
  }
  protected renderNode(node: Node): JSX.Element {
    if (!this.hasTextChildNodesOnly(node)) {
      return this.renderParentNode(node);
    }
    var nodeType = node.nodeName.toLowerCase();
    if (nodeType === "question") {
      var question = this.flowPanel.getQuestionByName(node.textContent);
      if (!question) return null;
      var questionBody = (
        <SurveyQuestion
          key={question.name}
          element={question}
          creator={this.creator}
          css={this.css}
        />
      );
      return <span key={this.getNodeIndex()}>{questionBody}</span>;
    }
    if (nodeType === "div") {
      return <div key={this.getNodeIndex()}>{node.textContent}</div>;
    }
    return (
      <span key={this.getNodeIndex()} style={this.getStyle(nodeType)}>
        {node.textContent}
      </span>
    );
  }
  private getChildDomNodes(node: Node): Array<Node> {
    var domNodes = [];
    for (var i = 0; i < node.childNodes.length; i++) {
      domNodes.push(node.childNodes[i]);
    }
    return domNodes;
  }
  private hasTextChildNodesOnly(node: Node): boolean {
    var nodes = node.childNodes;
    for (var i = 0; i < nodes.length; i++) {
      if (nodes[i].nodeName.toLowerCase() !== "#text") return false;
    }
    return true;
  }
  protected renderContent(style: any, rows: JSX.Element[]): JSX.Element {
    return React.createElement("f-panel", { style: style }, rows);
  }
}

ReactElementFactory.Instance.registerElement("flowpanel", props => {
  return React.createElement(SurveyFlowPanel, props);
});
