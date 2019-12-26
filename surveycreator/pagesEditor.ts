import * as ko from "knockout";
import { SurveyHelper, ObjType } from "./surveyHelper";
import * as Survey from "survey-knockout";
import { editorLocalization } from "./editorLocalization";
import { SurveyCreator } from "./editor";
import "../vendor/knockout-sortable.js";

export class PagesEditor {
  private isNeedAutoScroll = true;
  private isDraggingPage = ko.observable(false);
  private prevPagesForSelector: any[] = [];
  private _selectedPage = ko.observable<Survey.PageModel>();
  pagesSelection: any;

  constructor(private editor: SurveyCreator, private element: any) {
    this.pagesSelection = ko.computed<Survey.PageModel[]>(() => {
      if (!this.isDraggingPage()) {
        this.prevPagesForSelector = this.editor.pages();
        if (!this.readOnly) {
          this.prevPagesForSelector = this.prevPagesForSelector.concat([
            <any>{ name: this.getLocString("ed.addNewPage") }
          ]);
        }
      }
      return this.prevPagesForSelector;
    });
    this._selectedPage(this.editor.pages()[0]);
    this.editor.koSelectedObject.subscribe(newVal => {
      if (!this.isActive()) {
        if (
          !!editor.survey.currentPage &&
          editor.survey.currentPage != this._selectedPage()
        ) {
          this._selectedPage(editor.survey.currentPage);
        }
        return;
      }
      this._selectedPage(newVal.value);

      if (this.isNeedAutoScroll) {
        this.scrollToSelectedPage();
      } else {
        this.isNeedAutoScroll = true;
      }
    });
  }

  getDisplayText = (page: Survey.PageModel) => {
    return this.editor.getObjectDisplayName(page);
  };

  pageSelection = ko.computed<Survey.PageModel>({
    read: () => this._selectedPage(),
    write: newVal => {
      if (!!newVal && typeof newVal.getType === "function") {
        this.selectedPage = newVal;
      } else {
        if (this.editor.pages().length > 0) {
          this.addPage();
        }
      }
    }
  });

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
    event.stopPropagation();
    this.updateMenuPosition();
  };

  get sortableOptions() {
    return {
      onStart: evt => {
        this.isDraggingPage(true);
      },
      onEnd: evt => {
        this.isNeedAutoScroll = false;
        this.editor.movePage(evt.oldIndex, evt.newIndex);
        this.isDraggingPage(false);
      },
      handle: ".svd-page-name",
      animation: 150
    };
  }

  get selectedPage() {
    return this._selectedPage();
  }
  set selectedPage(newPage) {
    this.editor.selectPage(newPage);
  }
  getPageClass = page => {
    var result =
      page === this.selectedPage ? "svd_selected_page svd-light-bg-color" : "";

    if (this.editor.pages().indexOf(page) !== this.editor.pages().length - 1) {
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
    return this.editor.pages().length === 1;
  }
  moveLeft(model, event) {
    var pagesElement = this.element.querySelector(".svd-pages");
    pagesElement.scrollLeft -= 50;
    this.updateMenuPosition();
  }
  moveRight(model, event) {
    var pagesElement = this.element.querySelector(".svd-pages");
    pagesElement.scrollLeft += 50;
    this.updateMenuPosition();
  }
  scrollToSelectedPage() {
    var pagesElement: any = this.element.querySelector(".svd-pages");
    if (!pagesElement) return;
    var index = this.editor.pages().indexOf(this.selectedPage);
    var pageElement = pagesElement.children[index];
    if (!pageElement) return;
    pagesElement.scrollLeft =
      pageElement.offsetLeft -
      pagesElement.offsetLeft -
      pagesElement.offsetWidth / 2;
    this.updateMenuPosition();
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
    var pagesElement = model.element.querySelector(".svd-pages");
    event = event || window.event;
    if (!!event.originalEvent) {
      event = event.originalEvent;
    }
    var delta = event.deltaY || event.detail || event.wheelDelta;
    pagesElement.scrollLeft -= delta;
    event.preventDefault ? event.preventDefault() : (event.returnValue = false);
    this.updateMenuPosition();
  }
  updateMenuPosition() {
    var pagesElement = this.element.querySelector(".svd-pages");
    var menuElements = pagesElement.getElementsByClassName("svd-page-actions");
    for (var i = 0; i < menuElements.length; i++) {
      menuElements[i].style.left =
        menuElements[i].parentElement.offsetLeft -
        pagesElement.scrollLeft +
        "px";
    }
  }
  getLocString(str: string) {
    return editorLocalization.getString(str);
  }
  isActive() {
    var selectedObject = this.editor.koSelectedObject();
    if (!selectedObject) return;
    return SurveyHelper.getObjectType(selectedObject.value) === ObjType.Page;
  }
  private _readOnly = ko.observable(false);
  /**
   * A boolean property, false by default. Set it to true to deny pages editing.
   */
  public get readOnly() {
    return (
      this.editor.readOnly || !this.editor.allowModifyPages || this._readOnly()
    );
  }
  public set readOnly(newVal) {
    this._readOnly(newVal);
  }
}

ko.components.register("pages-editor", {
  viewModel: {
    createViewModel: (params, componentInfo) => {
      return new PagesEditor(params.editor, componentInfo.element);
    }
  },
  template: { element: "svd-page-selector-template" }
});
