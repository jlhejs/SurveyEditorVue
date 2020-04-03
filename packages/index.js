/* Automatically generated by './build/bin/build-entry.js' */
import Jsoneditor from './JsonEditor/index.js';
import QuestionEditor from './QuestionEditor/index.js';
import QuestionEditorTab from './QuestionEditorTab/index.js';
import SurveyEmbeding from './SurveyEmbeding/index.js';
import SurveyEmpty from './SurveyEmpty/index.js';
import SurveyLive from './SurveyLive/index.js';
import SurveyLiveTab from './SurveyLiveTab/index.js';
import SurveyResultTableRow from './SurveyLiveResultTableRow/index.js';

const components = [
  Jsoneditor,
  QuestionEditor,
  QuestionEditorTab,
  SurveyEmbeding,
  SurveyEmpty,
  SurveyLive,
  SurveyLiveTab,
  SurveyResultTableRow,
];


const install = function(Vue, opts = {}) {
  components.forEach(component => {
    Vue.component(component.name, component);
  });
};
/* istanbul ignore if */
debugger
if (typeof window !== 'undefined' && window.Vue) {
  debugger
  install(window.Vue);
}
export default {
  version: '2.13.0',
  install,
  Jsoneditor,
  QuestionEditor,
  QuestionEditorTab,
  SurveyEmbeding,
  SurveyEmpty,
  SurveyLive,
  SurveyLiveTab,
  SurveyResultTableRow,

};
