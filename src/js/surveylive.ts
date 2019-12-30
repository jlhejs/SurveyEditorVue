import * as ko from "knockout";
import Vue from "vue";
import { SurveyHelper, ObjType } from "./surveyHelper";
import { editorLocalization } from "./editorLocalization";
import * as Survey from "survey-vue";


export class SurveyLiveTester {
  private json: any;
  isRunning = Vue.observable(true);
  selectTestClick: any;
  selectPageClick: any;
  resultText = Vue.observable("");
  resultData = Vue.observable([]);
  resultViewType = Vue.observable("table");
  survey: Survey.Model;
  // survey: any;
  pages = Vue.observable([]);
  activePage = Vue.observable(null);
  setPageDisable: any;
  languages: any;
  activeLanguage: any;
  showInvisibleElements = Vue.observable(false);
  public onGetObjectDisplayName: (obj: Survey.Base) => string = null;
  public imgurl:string = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MzAiIGhlaWdodD0iNzUxIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGRlZnM+PHJlY3QgaWQ9ImIiIHdpZHRoPSIzMzAiIGhlaWdodD0iNjUxIiB4PSIxMjAiIHk9IjQ1OCIgcng9IjIwIi8+PGZpbHRlciBpZD0iYSIgd2lkdGg9IjE0NS41JSIgaGVpZ2h0PSIxMjMlIiB4PSItMjIuNyUiIHk9Ii0xMS41JSIgZmlsdGVyVW5pdHM9Im9iamVjdEJvdW5kaW5nQm94Ij48ZmVPZmZzZXQgaW49IlNvdXJjZUFscGhhIiByZXN1bHQ9InNoYWRvd09mZnNldE91dGVyMSIvPjxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjI1IiBpbj0ic2hhZG93T2Zmc2V0T3V0ZXIxIiByZXN1bHQ9InNoYWRvd0JsdXJPdXRlcjEiLz48ZmVDb2xvck1hdHJpeCB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAuMSAwIiBpbj0ic2hhZG93Qmx1ck91dGVyMSIvPjwvZmlsdGVyPjwvZGVmcz48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC03MCAtNDA4KSI+PHVzZSBmaWxsPSIjMDAwIiBmaWx0ZXI9InVybCgjYSkiIHhsaW5rOmhyZWY9IiNiIi8+PHVzZSBmaWxsPSIjRkZGIiB4bGluazpocmVmPSIjYiIvPjxyZWN0IHdpZHRoPSI3MCIgaGVpZ2h0PSI4IiB4PSIyNDIiIHk9IjQ3MCIgZmlsbD0iI0Y0RjRGNCIgZmlsbC1ydWxlPSJub256ZXJvIiByeD0iNCIvPjxjaXJjbGUgY3g9IjMyNCIgY3k9IjQ3NCIgcj0iNCIgZmlsbD0iI0Y0RjRGNCIgZmlsbC1ydWxlPSJub256ZXJvIi8+PHBhdGggZmlsbD0iI0U3RTdFNyIgZmlsbC1ydWxlPSJub256ZXJvIiBkPSJNMTI0IDQ5MGgzMjJ2NTcwSDEyNFY0OTB6bTEgMXY1NjhoMzIwVjQ5MUgxMjV6Ii8+PHBhdGggZmlsbD0iI0Y0RjRGNCIgZmlsbC1ydWxlPSJub256ZXJvIiBkPSJNMTI1IDQ5MWgzMjB2NTY4SDEyNXoiLz48Y2lyY2xlIGN4PSIyODUiIGN5PSIxMDg0IiByPSIxNSIgZmlsbD0iI0Y0RjRGNCIvPjwvZz48L3N2Zz4=";
  showPagesInTestSurveyTab = Vue.observable(true);
  showDefaultLanguageInTestSurveyTab = Vue.observable(true);
  showInvisibleElementsInTestSurveyTab = Vue.observable(true);

  private _simulatorEnabled = Vue.observable<boolean>(true);
  public get simulatorEnabled() {
    return this._simulatorEnabled;
  }
  public set simulatorEnabled(value: boolean) {
    this._simulatorEnabled=value;
  }
  private _simulatorScaleEnabled = Vue.observable<boolean>(true);
  public get simulatorScaleEnabled() {
    return this._simulatorScaleEnabled;
  }
  public set simulatorScaleEnabled(value: boolean) {
    this._simulatorScaleEnabled=value;
  }
  private simulator;
  public simulatorOptions = {
    device: "desktop",
    orientation: "l",
    // scale: 1,
    considerDPI: true
  };
  activeDevice = Vue.observable("desktop");
  devices = Vue.observable(
    Object.keys(simulatorDevices)
      .filter(key => !!simulatorDevices[key].title)
      .map(key => {
        return {
          text: simulatorDevices[key].title,
          value: key
        };
      })
  );
  landscapeOrientation = Vue.observable(false);

  onSurveyCreatedCallback: (survey: Survey.Model) => any;
  constructor(private surveyProvider: any) {
    var self = this;
    this.survey = this.surveyProvider.createSurvey({}, "test");
    this.selectTestClick = function() {
      self.testAgain();
    };
    this.selectPageClick = function(pageItem) {
      if (self.survey) {
        if (self.survey.state == "starting") {
          self.survey.start();
        }
        self.survey.currentPage = pageItem.page;
      }
    };
    // this.activePage.subscribe(function(newValue) {
    //   if (!!newValue) {
    //     self.survey.currentPage = newValue;
    //   }
    // });
    // this.showInvisibleElements.subscribe(function(newValue) {
    //   self.survey.showInvisibleElements = newValue;
    // });
    // this.setPageDisable = function(option, item) {
    //   Vue.applyBindingsToNode(option, { disable: item.disabled }, item);
    // };
    this.languages = Vue.observable(this.getLanguages());
    this.activeLanguage = Vue.observable("");
    // this.activeLanguage.subscribe(function(newValue) {
    //   if (self.survey.locale == newValue) return;
    //   self.survey.locale = newValue;
    //   self.survey(self.survey);
    // });
    // this.survey = Vue.observable(this.survey);
    // this.activeDevice.subscribe(newValue => {
    //   if (!!this.simulator) {
    //     this.simulatorOptions.device = newValue || "desktop";
    //     this.simulator.options(this.simulatorOptions);
    //   }
    // });
    // this.landscapeOrientation.subscribe(newValue => {
    //   if (!!this.simulator) {
    //     this.simulatorOptions.orientation = newValue ? "l" : "p";
    //     this.simulator.options(this.simulatorOptions);
    //   }
    // });
  }
  public setJSON(json: any) {
    this.json = json;
    if (json != null) {
      if (json.cookieName) {
        delete json.cookieName;
      }
    }
    this.survey = json
      ? this.surveyProvider.createSurvey(json, "test")
      : this.surveyProvider.createSurvey({}, "test");
    if (this.onSurveyCreatedCallback) this.onSurveyCreatedCallback(this.survey);
    var self = this;
    this.survey.onComplete.add((sender: Survey.Model) => {
      self.isRunning=false;
      self.resultText=JSON.stringify(self.survey.data, null, 4);
      var addCollapsed = (items: any[]) => {
        items.forEach((item: any) => {
          if (!!item && item.isNode) {
            item.collapsed = Vue.observable(true);
            item.data = addCollapsed(item.data || []);
          }
        });
        return items.filter(item => !!item);
      };
      var plainData = self.survey.getPlainData({ includeEmpty: false });
      plainData = addCollapsed(plainData);
      self.resultData=plainData;
    });
    this.survey.onStarted.add((sender: Survey.Model) => {
      self.setActivePageItem(<Survey.PageModel>self.survey.currentPage, true);
    });
    this.survey.onCurrentPageChanged.add((sender: Survey.Model, options) => {
      self.activePage=options.newCurrentPage;
      self.setActivePageItem(options.oldCurrentPage, false);
      self.setActivePageItem(options.newCurrentPage, true);
    });
    this.survey.onPageVisibleChanged.add((sender: Survey.Model, options) => {
      self.updatePageItem(options.page);
    });
  }
  private updatePageItem(page: Survey.PageModel) {
    var item = this.getPageItemByPage(page);
    if (item) {
      item.visible=page.isVisible;
      item.disabled=!page.isVisible;
    }
  }
  public show(options: any = null) {
    var pages = [];
    for (var i = 0; i < this.survey.pages.length; i++) {
      var page = this.survey.pages[i];
      pages.push({
        page: page,
        title: this.onGetObjectDisplayName
          ? this.onGetObjectDisplayName(page)
          : page.name,
        visible: Vue.observable(page.isVisible),
        disabled: Vue.observable(!page.isVisible),
        active: Vue.observable(
          this.survey.state == "running" && page === this.survey.currentPage
        )
      });
    }
    if (!!options && options.showPagesInTestSurveyTab != undefined) {
      this.showPagesInTestSurveyTab=options.showPagesInTestSurveyTab;
    }
    if (!!options && options.showDefaultLanguageInTestSurveyTab != undefined) {
      this.setDefaultLanguageOption(options.showDefaultLanguageInTestSurveyTab);
    }
    if (
      !!options &&
      options.showInvisibleElementsInTestSurveyTab != undefined
    ) {
      this.showInvisibleElementsInTestSurveyTab= options.showInvisibleElementsInTestSurveyTab;
    }
    this.showInvisibleElements=false;
    this.pages=pages;
    // this.survey=this.survey;
    this.activePage=this.survey.currentPage;
    this.activeLanguage=this.survey.locale;
    this.isRunning=true;
  }
  public get testSurveyAgainText() {
    return editorLocalization.getString("ed.testSurveyAgain");
  }
  public get surveyResultsText() {
    return editorLocalization.getString("ed.surveyResults");
  }
  public get resultsTitle() {
    return editorLocalization.getString("ed.resultsTitle");
  }
  public get resultsName() {
    return editorLocalization.getString("ed.resultsName");
  }
  public get resultsValue() {
    return editorLocalization.getString("ed.resultsValue");
  }
  public get resultsDisplayValue() {
    return editorLocalization.getString("ed.resultsDisplayValue");
  }
  public get selectPageText() {
    return editorLocalization.getString("ts.selectPage");
  }
  public get showInvisibleElementsText() {
    return editorLocalization.getString("ts.showInvisibleElements");
  }
  public selectTableClick(model: SurveyLiveTester) {
    model.resultViewType="table";
  }
  public selectJsonClick(model: SurveyLiveTester) {
    model.resultViewType="text";
  }
  public get localeText() {
    return editorLocalization.getString("pe.locale");
  }
  public get simulatorText() {
    return editorLocalization.getString("pe.simulator");
  }
  public get landscapeOrientationText() {
    return editorLocalization.getString("pe.landscapeOrientation");
  }
  private testAgain() {
    this.setJSON(this.json);
    this.show();
  }
  private setDefaultLanguageOption(opt: boolean | string) {
    var vis =
      opt === true ||
      opt === "all" ||
      (opt === "auto" && this.survey.getUsedLocales().length > 1);
    this.showDefaultLanguageInTestSurveyTab=vis;
    if (vis) {
      this.languages=this.getLanguages(opt !== "all" ? this.survey.getUsedLocales() : null);
    }
  }
  private setActivePageItem(page: Survey.PageModel, val: boolean) {
    var item = this.getPageItemByPage(page);
    if (item) {
      item.active = val;
    }
  }
  private getPageItemByPage(page: Survey.PageModel): any {
    var items = this.pages;
    for (var i = 0; i < items.length; i++) {
      if (items[i].page === page) return items[i];
    }
    return null;
  }
  private getLanguages(usedLanguages: Array<string> = null): Array<any> {
    var res = [];
    var locales =
      !!usedLanguages && usedLanguages.length > 1
        ? usedLanguages
        : Survey.surveyLocalization.getLocales();
    for (var i = 0; i < locales.length; i++) {
      var loc = locales[i];
      res.push({ value: loc, text: editorLocalization.getLocaleName(loc) });
    }
    return res;
  }
  public eventAfterRender(element: any, survey: any) {
    survey.onRendered.fire(self, {});
    survey["afterRenderSurvey"](element);
  }

  public hasFrame = () => {
    var device = simulatorDevices[this.activeDevice];
    return this.simulatorEnabled && device.deviceType !== "desktop";
  };

  public simulatorFrame = () => {
    if (!this.hasFrame()) {
      return undefined;
    }
    var device = simulatorDevices[this.activeDevice];
    var scale = DEFAULT_MONITOR_DPI / (device.ppi / device.cssPixelRatio);
    var width =
      ((this.landscapeOrientation ? device.height : device.width) /
        device.cssPixelRatio) *
      scale;
    var height =
      ((this.landscapeOrientation ? device.width : device.height) /
        device.cssPixelRatio) *
      scale;
    var offsetRatioX = this.landscapeOrientation ? 0.15 : 0.165;
    var offsetRatioY = this.landscapeOrientation ? 0.17 : 0.155;
    return {
      scale: this.simulatorScaleEnabled ? scale * 2 : 1,
      width: width,
      height: height,
      frameWidth: width * 1.33,
      frameHeight: height * 1.34,
      frameX: width * offsetRatioX,
      frameY: height * offsetRatioY
    };
  };
}

export var DEFAULT_MONITOR_DPI = 102.69;
export var simulatorDevices = {
  desktop: {
    deviceType: "desktop",
    title: "Desktop"
  },
  // desktop_1280x720: {
  //   cssPixelRatio: 1,
  //   ppi: DEFAULT_MONITOR_DPI,
  //   width: 720,
  //   height: 1280,
  //   deviceType: "desktop",
  //   title: "Desktop 1280x720"
  // },
  // desktop_1440x900: {
  //   cssPixelRatio: 1,
  //   ppi: DEFAULT_MONITOR_DPI,
  //   width: 900,
  //   height: 1440,
  //   deviceType: "desktop",
  //   title: "Desktop 1440x900"
  // },
  // desktop_1920x1080: {
  //   cssPixelRatio: 1,
  //   ppi: DEFAULT_MONITOR_DPI,
  //   width: 1080,
  //   height: 1920,
  //   deviceType: "desktop",
  //   title: "Desktop 1920x1080"
  // },
  iPhone: {
    cssPixelRatio: 2,
    ppi: 326,
    width: 640,
    height: 960,
    deviceType: "phone",
    title: "iPhone"
  },
  iPhone5: {
    cssPixelRatio: 2,
    ppi: 326,
    width: 640,
    height: 1136,
    deviceType: "phone",
    title: "iPhone 5"
  },
  iPhone6: {
    cssPixelRatio: 2,
    ppi: 326,
    width: 750,
    height: 1334,
    deviceType: "phone",
    title: "iPhone 6"
  },
  iPhone6plus: {
    cssPixelRatio: 2,
    ppi: 401,
    width: 1080,
    height: 1920,
    deviceType: "phone",
    title: "iPhone 6 Plus"
  },
  iPhone8: {
    cssPixelRatio: 2,
    ppi: 326,
    width: 750,
    height: 1334,
    deviceType: "phone",
    title: "iPhone 8"
  },
  iPhone8plus: {
    cssPixelRatio: 2,
    ppi: 401,
    width: 1080,
    height: 1920,
    deviceType: "phone",
    title: "iPhone 8 Plus"
  },
  iPhoneX: {
    cssPixelRatio: 2,
    ppi: 458,
    width: 1125,
    height: 2436,
    deviceType: "phone",
    title: "iPhone X"
  },
  iPhoneXmax: {
    cssPixelRatio: 2,
    ppi: 458,
    width: 1242,
    height: 2688,
    deviceType: "phone",
    title: "iPhone X Max"
  },
  iPad: {
    cssPixelRatio: 2,
    ppi: 264,
    width: 1536,
    height: 2048,
    deviceType: "tablet",
    title: "iPad"
  },
  iPadMini: {
    cssPixelRatio: 1,
    ppi: 163,
    width: 768,
    height: 1024,
    deviceType: "tablet",
    title: "iPad Mini"
  },
  iPadPro: {
    cssPixelRatio: 1,
    ppi: 264,
    width: 1688,
    height: 2388,
    deviceType: "tablet",
    title: 'iPad Pro 11"'
  },
  iPadPro13: {
    cssPixelRatio: 1,
    ppi: 264,
    width: 2048,
    height: 2732,
    deviceType: "tablet",
    title: 'iPad Pro 12,9"'
  },
  androidPhone: {
    cssPixelRatio: 2,
    ppi: 316,
    width: 720,
    height: 1280,
    deviceType: "phone",
    title: "Android Phone"
  },
  androidTablet: {
    cssPixelRatio: 1.5,
    ppi: 149,
    width: 800,
    height: 1280,
    deviceType: "tablet",
    title: "Android Tablet"
  },
  win10Phone: {
    cssPixelRatio: 1,
    ppi: 152,
    width: 330,
    height: 568,
    deviceType: "phone",
    title: "Windows 10 Phone"
  },
  msSurface: {
    cssPixelRatio: 1,
    ppi: 148,
    width: 768,
    height: 1366,
    deviceType: "tablet",
    title: "MS Surface"
  },
  genericPhone: {
    cssPixelRatio: 1,
    deviceType: "phone",
    title: ""
  }
};
