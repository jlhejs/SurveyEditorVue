export interface Options {
  generateValidJSON: boolean;
  showJSONEditorTab: boolean;
  showTestSurveyTab: boolean;
  showEmbededSurveyTab: boolean;
  showTranslationTab: boolean;
  showLogicTab: boolean;
  showElementEditorAsPropertyGrid: boolean;
  showPropertyGrid: boolean;
  questionTypes: Array<string>;
  isAutoSave: boolean;
  isRTL: boolean;
  designerHeight: string;
  showPagesToolbox: boolean;
  useTabsInElementEditor: boolean;
  showState: boolean;
  showPagesInTestSurveyTab: boolean;
  showDefaultLanguageInTestSurveyTab: string;
  showInvisibleElementsInTestSurveyTab: boolean;
  showTitlesInExpressions: boolean;
  hideExpressionHeaderInLogicTab: boolean;
  allowControlSurveyTitleVisibility: boolean;
  showSurveyTitle: string;
}

export let options: Options = {
  generateValidJSON: false,
  showJSONEditorTab: false,
  showTestSurveyTab: false,
  showEmbededSurveyTab: true,
  showTranslationTab: true,
  showLogicTab: true,
  showElementEditorAsPropertyGrid: true,
  showPropertyGrid: false,
  questionTypes: [],
  isAutoSave: true,
  isRTL: true,
  designerHeight: '1200px',
  showPagesToolbox: false,
  useTabsInElementEditor: true,
  showState: false,
  showPagesInTestSurveyTab: false,
  showDefaultLanguageInTestSurveyTab: "auto",
  showInvisibleElementsInTestSurveyTab: false,
  showTitlesInExpressions: false,
  hideExpressionHeaderInLogicTab: true,
  allowControlSurveyTitleVisibility: false,
  showSurveyTitle: "never",
}