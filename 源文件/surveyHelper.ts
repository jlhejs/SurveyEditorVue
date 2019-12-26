import { editorLocalization } from "./editorLocalization";
import * as Survey from "survey-knockout";
import { ISurveyObjectEditorOptions } from "./propertyEditors/propertyEditorBase";

export enum ObjType {
  Unknown,
  Survey,
  Page,
  Panel,
  Question
}
export class SurveyHelper {
  public static getNewPageName(objs: Array<any>) {
    return SurveyHelper.getNewName(
      objs,
      editorLocalization.getString("ed.newPageName")
    );
  }
  public static getNewQuestionName(objs: Array<any>) {
    return SurveyHelper.getNewName(
      objs,
      editorLocalization.getString("ed.newQuestionName")
    );
  }
  public static getNewPanelName(objs: Array<any>) {
    return SurveyHelper.getNewName(
      objs,
      editorLocalization.getString("ed.newPanelName")
    );
  }
  public static generateNewName(name: string): string {
    var pos = name.length;
    while (pos > 0 && name[pos - 1] >= "0" && name[pos - 1] <= "9") {
      pos--;
    }
    var base = name.substr(0, pos);
    var num = 0;
    if (pos < name.length) {
      num = parseInt(name.substr(pos));
    }
    num++;
    return base + num;
  }
  public static getNewName(objs: Array<any>, baseName: string): string {
    var hash = {};
    for (var i = 0; i < objs.length; i++) {
      hash[objs[i].name] = true;
    }
    var num = 1;
    while (true) {
      if (!hash[baseName + num.toString()]) break;
      num++;
    }
    return baseName + num.toString();
  }
  public static getObjectType(obj: any): ObjType {
    if (!obj || !obj["getType"]) return ObjType.Unknown;
    if (obj.getType() == "page") return ObjType.Page;
    if (obj.getType() == "panel") return ObjType.Panel;
    if (obj.getType() == "survey") return ObjType.Survey;
    if (obj["name"]) return ObjType.Question;
    return ObjType.Unknown;
  }
  public static getObjectTypeStr(obj: any): string {
    var objType = SurveyHelper.getObjectType(obj);
    if (objType === ObjType.Survey) return "survey";
    if (objType === ObjType.Page) return "page";
    if (objType === ObjType.Panel) return "panel";
    if (objType === ObjType.Question) return "question";
    return "unknown";
  }
  public static getObjectName(obj: any, showObjectTitle = false): string {
    if (showObjectTitle && obj["title"]) return obj["title"];
    if (obj["name"]) return obj["name"];
    var objType = SurveyHelper.getObjectType(obj);
    if (objType != ObjType.Page) return "";
    var data = <Survey.Survey>(<Survey.Page>obj)["data"];
    if (!data) data = <Survey.Survey>(<Survey.Page>obj)["survey"]; //TODO
    var index = data.pages.indexOf(<Survey.Page>obj);
    return "[Page " + (index + 1) + "]";
  }
  public static getElements(
    element: any,
    includeHidden: boolean = false
  ): Array<any> {
    if (!element) return [];
    if (element.getElementsInDesign)
      return element.getElementsInDesign(includeHidden);
    if (element.elements) return element.elements;
    return [];
  }
  public static isPropertyVisible(
    obj: any,
    property: Survey.JsonObjectProperty,
    options: ISurveyObjectEditorOptions = null
  ): boolean {
    if (!property || !property.visible) return false;
    if (
      !!property.isVisible &&
      !!obj.getLayoutType &&
      !(<any>property["isVisible"])(obj.getLayoutType(), null)
    )
      return false;
    var canShow = !!options
      ? (object: any, property: Survey.JsonObjectProperty) => {
          return options.onCanShowPropertyCallback(object, property);
        }
      : null;
    if (!!canShow && !canShow(obj, property)) return false;
    return true;
  }
  public static scrollIntoViewIfNeeded(el: HTMLElement) {
    if (!el || !el.scrollIntoView) return;
    var rect = el.getBoundingClientRect();
    var scrollableDiv = SurveyHelper.getScrollableDiv(el);
    if (!scrollableDiv) return;
    var height = scrollableDiv.clientHeight;
    if (rect.top < scrollableDiv.offsetTop) {
      el.scrollIntoView();
    } else {
      let offsetTop = height + scrollableDiv.offsetTop;
      if (rect.bottom > offsetTop && rect.height < height) {
        el.scrollIntoView(false);
      }
    }
  }
  public static getScrollableDiv(el: HTMLElement): HTMLElement {
    while (!!el) {
      if (!!el.id && el.id.indexOf("scrollableDiv") > -1) return el;
      if (!el.offsetParent) return null;
      el = <HTMLElement>el.offsetParent;
    }
    return null;
  }
}
