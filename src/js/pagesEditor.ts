import * as ko from "knockout";
import Vue from "vue";
import { SurveyHelper, ObjType } from "./surveyHelper";
import * as Survey from "survey-vue";
import { editorLocalization } from "./editorLocalization";
import { SurveyEditor } from "./editor";
// import "../vendor/knockout-sortable.js";
import draggable from 'vuedraggable'

export class PagesEditor {
  private isNeedAutoScroll = true;
  private isDraggingPage = Vue.observable(false);
  private prevPagesForSelector: any[] = [];
  private _selectedPage = Vue.observable({});
  pagesSelection: any;
  public draggable=draggable
  constructor(private editor: SurveyEditor, private element: any) {
    // this.pagesSelection = ko.computed<Survey.PageModel[]>(() => {
    //   if (!this.isDraggingPage()) {
    //     this.prevPagesForSelector = this.editor.pages;
    //     if (!this.readOnly) {
    //       this.prevPagesForSelector = this.prevPagesForSelector.concat([
    //         <any>{ name: this.getLocString("ed.addNewPage") }
    //       ]);
    //     }
    //   }
    //   return this.prevPagesForSelector;
    // });
    this._selectedPage=this.editor.pages[0];

  }
  computedPagesEditorPagesSelection(){
    if (!this.isDraggingPage) {
      this.prevPagesForSelector = this.editor.pages;
      if (!this.readOnly) {
        this.prevPagesForSelector = this.prevPagesForSelector.concat([
          <any>{ name: this.getLocString("ed.addNewPage") }
        ]);
      }
    }
    return this.prevPagesForSelector;
  }

  watchEditorSelectedObject(newVal,oldValue){
      if (!this.isActive()) {
        if (
          !!this.editor.survey.currentPage &&
          this.editor.survey.currentPage != this._selectedPage
        ) {
          this._selectedPage=this.editor.survey.currentPage;
        }
        return;
      }
      this._selectedPage=newVal.value;

      // if (this.isNeedAutoScroll) {
      //   this.scrollToSelectedPage();
      // } else {
      //   this.isNeedAutoScroll = true;
      // }
  };
  getDisplayText = (page: Survey.PageModel) => {
    return this.editor.getObjectDisplayName(page);
  };

  // pageSelection = ko.computed<Survey.PageModel>({
  //   read: this._selectedPage,
  //   write: newVal => {
  //     if (!!newVal && typeof newVal.getType === "function") {
  //       this.selectedPage = newVal;
  //     } else {
  //       if (this.editor.pages.length > 0) {
  //         this.addPage();
  //       }
  //     }
  //   }
  // });

  addPage() {
    this.editor.addPage();
  }

  copyPage(page: Survey.PageModel) {
    this.editor.copyPage(page);
  }

  deletePage() {
    
    this.editor.deletePage();
  }

  showPageSettings(page: Survey.PageModel) {
    this.editor.showQuestionEditor(page);
  }

  onPageClick = (model, event) => {
    this.isNeedAutoScroll = false;
    this.editor.selectPage(model);
    // event.stopPropagation();
    this.updateMenuPosition();
  };
 
  get sortableOptions() {
    return {
      onStart: evt => {
        this.isDraggingPage=true;
      },
      onEnd: evt => {
        this.isNeedAutoScroll = false;
        this.editor.movePage(evt.oldIndex, evt.newIndex);
        this.isDraggingPage=false;
      },
      filter: ".el-tabs__active-bar",
      animation: 150
    };
  }

  get selectedPage() {
    return this._selectedPage;
  }
  set selectedPage(newPage) {
    this.editor.selectPage(newPage);
  }
  get selectedPageIndex() {
    for(var i=0;i<this.editor.pages.length;i++){
      if(this.selectedPage==this.editor.pages[i]){
        return i+""
      }
    }
    return "0";
  }
  set selectedPageIndex(value :any) {
    value=value-0
    this.editor.selectPage(this.editor.pages[value]);
  }
  getPageClass = page => {
    var result =
      page === this.selectedPage ? "svd_selected_page svd-light-bg-color" : "";

    if (this.editor.pages.indexOf(page) !== this.editor.pages.length - 1) {
      result += " svd-border-right-none";
    }

    return result;
  };
  getPageMenuIconClass = page => {
    return page === this.selectedPage && this.isActive()
      ? "icon-gearactive"
      : "icon-gear";
  };
  showActions = page => {
    return page === this.selectedPage && this.isActive();
  };
  isLastPage() {
    return this.editor.pages.length === 1;
  }
  moveLeft(model, event) {
    // var pagesElement = this.element.querySelector(".svd-pages");
    // pagesElement.scrollLeft -= 50;
    // this.updateMenuPosition();
  }
  moveRight(model, event) {
    // var pagesElement = this.element.querySelector(".svd-pages");
    // pagesElement.scrollLeft += 50;
    // this.updateMenuPosition();
  }
  scrollToSelectedPage() {
    // var pagesElement: any = this.element.querySelector(".svd-pages");
    // if (!pagesElement) return;
    // var index = this.editor.pages.indexOf(this.selectedPage);
    // var pageElement = pagesElement.children[index];
    // if (!pageElement) return;
    // pagesElement.scrollLeft =
    //   pageElement.offsetLeft -
    //   pagesElement.offsetLeft -
    //   pagesElement.offsetWidth / 2;
    // this.updateMenuPosition();
  }
  // onKeyDown(el: any, e: KeyboardEvent) {
  //   if (this.koPages().length <= 1) return;
  //   var pages = this.koPages();
  //   var pageIndex = -1;
  //   for (var i = 0; i < pages.length; i++) {
  //     if (pages[i].page && pages[i].koSelected()) {
  //       pageIndex = i;
  //     }
  //   }
  //   if (pageIndex < 0) return;
  //   if (e.keyCode == 46 && this.onDeletePageCallback)
  //     this.onDeletePageCallback(el.page);
  //   if ((e.keyCode == 37 || e.keyCode == 39) && this.onSelectPageCallback) {
  //     pageIndex += e.keyCode == 37 ? -1 : 1;
  //     if (pageIndex < 0) pageIndex = pages.length - 1;
  //     if (pageIndex >= pages.length) pageIndex = 0;
  //     var page = pages[pageIndex].page;
  //     this.onSelectPageCallback(page);
  //     this.setSelectedPage(page);
  //   }
  // }

  onWheel(model, event) {
    // var pagesElement = model.element.querySelector(".svd-pages");
    // event = event || window.event;
    // if (!!event.originalEvent) {
    //   event = event.originalEvent;
    // }
    // var delta = event.deltaY || event.detail || event.wheelDelta;
    // pagesElement.scrollLeft -= delta;
    // event.preventDefault ? event.preventDefault() : (event.returnValue = false);
    // this.updateMenuPosition();
  }
  updateMenuPosition() {
    // var pagesElement = this.element.querySelector(".svd-pages");
    // var menuElements = pagesElement.getElementsByClassName("svd-page-actions");
    // for (var i = 0; i < menuElements.length; i++) {
    //   menuElements[i].style.left =
    //     menuElements[i].parentElement.offsetLeft -
    //     pagesElement.scrollLeft +
    //     "px";
    // }
  }
  getLocString(str: string) {
    return editorLocalization.getString(str);
  }
  isActive() {
    var selectedObject = this.editor.selectedObject;
    if (!selectedObject) return;
    return SurveyHelper.getObjectType(selectedObject.value) === ObjType.Page;
  }
  private _readOnly = Vue.observable(false);
  /**
   * A boolean property, false by default. Set it to true to deny pages editing.
   */
  public get readOnly() {
    return (this.editor.readOnly || !this.editor.allowModifyPages || this._readOnly);
  }
  public set readOnly(newVal) {
    this._readOnly=newVal;
  }
}


// ko.components.register("pages-editor", {
//   viewModel: {
//     createViewModel: (params, componentInfo) => {
//       return new PagesEditor(params.editor, componentInfo.element);
//     }
//   },
//   template: { element: "svd-page-selector-template" }
// });
