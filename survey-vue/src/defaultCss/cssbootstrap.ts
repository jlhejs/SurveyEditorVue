import { surveyCss } from "./cssstandard";

export var defaultBootstrapCss = {
  root: "survey-main survey-bootstrap_css survey-default",
  container: "survey-container svurvey-container",
  header: "survey-header",
  body: "survey-body ",
  bodyEmpty: "survey-empty",
  footer: "survey-footer",
  title: "survey-title",
  description: "survey-description",
  navigationButton: "",
  completedPage: "survey-completed-page",
  navigation: {
    complete: "survey-complete",
    prev: "survey-prev",
    next: "survey-next",
    start: "survey-start"
  },
  progress: "progress ",
  progressBar: "progress-bar",
  progressBarTop: "progress-bar-top",
  progressBarBottom: "progress-bar-bottom",
  progressTextUnderBar: "progress-text-under-bar",
  page: {
    root: "page-root",
    title: "page-title",
    description: "page-description"
  },
  pageTitle: "page-title",
  pageDescription: "page-description",
  row: "survey-row",
  question: {
    header:"question-header",
    mainRoot: "survey-qstn",
    flowRoot: "survey-q_flow survey-qstn",
    headerLeft: "title-left",
    headerTop: "title-top",
    headerBottom: "title-bottom",
    content: "",
    contentLeft: "content-left",
    titleLeftRoot: "survey-qstn_left",
    title: "",
    number: "question-num",
    description: "small",
    descriptionUnderInput: "small",
    requiredText: "survey-q_required_text",
    comment: "form-control",
    required: "",
    titleRequired: "",
    hasError: "has-error",
    indent: 20,
    root: "question",
    formGroup: "form-group",
    itemChecked: "item-checked",
    itemDisabled: "item-disabled",
    itemHover: "item-hover",
    titleOnAnswer: "question-title-answer",

  },
  panel: {
    title: "survey-page-title",
    titleExpandable: "survey-page-title_expandable",
    icon: "survey-panel_icon",
    iconExpanded: "survey-expanded",
    description: "small survey-page-description",
    container: "survey-page-container"
  },
  error: {
    root: "question-error alert alert-danger",
    icon: "error-icon el-icon-error",
    item: "error-item",
    locationTop: "survey-qstn_error_top",
    locationBottom: "survey-qstn_error_bottom"
  },
  boolean: {
    root: "question-boolean survey-qbln form-inline checkbox",
    item: "svrvey-boolean",
    control: "svrvey-visuallyhidden",
    itemChecked: "svrvey-boolean--checked checked",
    itemIndeterminate: "svrvey-boolean--indeterminate",
    itemDisabled: "svrvey-boolean--disabled",
    switch: "svrvey-boolean__switch",
    slider: "svrvey-boolean__slider",
    label: "svrvey-boolean__label ",
    disabledLabel: "svrvey-boolean__label--disabled"
  },
  checkbox: {
    root: "question-checkbox survey-qcbc survey-qcbx form-inline",
    item: "checkbox",
    itemChecked: "checked",
    itemInline: "survey-q_checkbox_inline",
    itemControl: "",
    itemDecorator: "svrvey-hidden",
    label: "",
    labelChecked: "",
    controlLabel: "",
    materialDecorator: "checkbox-material",
    other: "survey-q_checkbox_other form-control",
    column: "survey-q_select_column"
  },
  slider:{
    root:"question-slider"
  },
  comment: {
    root: "question-comment"
  },
  dropdown: {
    root: "",
    control: "form-control",
    other: "survey-q_dd_other form-control"
  },
  html: { root: "" },
  cascader: {
    root: "svrvey-cascader",
    popper: "svrvey-cascader-popper"
  },
  matrix: {
    root: "table question-matrix",
    label: "survey-q_m_label",
    itemChecked: "checked",
    itemDecorator: "svrvey-hidden",
    cellText: "survey-q_m_cell_text",
    cellTextSelected: "survey-q_m_cell_selected bg-primary",
    cellLabel: "survey-q_m_cell_label"
  },
  matrixdropdown: { root: "table question-matrix-dropdown" },
  matrixdynamic: {
    root: "table question-matrix-dynamic",
    button: "button",
    buttonAdd: "",
    buttonRemove: "",
    iconAdd: "",
    iconRemove: ""
  },
  paneldynamic: {
    root: "",
    navigation: "svrvey-paneldynamic__navigation",
    progressTop: "svrvey-paneldynamic__progress svrvey-paneldynamic__progress--top",
    progressBottom:
      "svrvey-paneldynamic__progress svrvey-paneldynamic__progress--bottom",
    title: "svrvey-title svrvey-question__title",
    button: "button",
    buttonAdd: "button svrvey-paneldynamic__add-btn",
    buttonRemove: "button svrvey-paneldynamic__remove-btn",
    buttonPrev: "svrvey-paneldynamic__prev-btn",
    buttonNext: "svrvey-paneldynamic__next-btn",
    progressContainer: "svrvey-paneldynamic__progress-container",
    progress: "svrvey-progress",
    progressBar: "svrvey-progress__bar",
    progressText: "svrvey-paneldynamic__progress-text"
  },
  multipletext: {
    root: "table",
    itemTitle: "",
    itemValue: "survey-q_mt_item_value form-control"
  },
  radiogroup: {
    root: "question-radiogroup",
    item: "radio",
    itemChecked: "checked",
    itemInline: "survey-q_radiogroup_inline",
    label: "",
    labelChecked: "",
    itemControl: "",
    itemDecorator: "svrvey-hidden",
    controlLabel: "",
    materialDecorator: "circle",
    other: "survey-q_radiogroup_other form-control",
    clearButton: "survey-q_radiogroup_clear button",
    column: "survey-q_select_column"
  },
  imagepicker: {
    root: "svrvey-q-imagepicker",
    item: "question-imagepicker",
    itemChecked: "checked",
    itemInline: "survey-q_imagepicker_inline",
    label: "question-img_label",
    itemControl: "question-img_control_item",
    image: "question-img_image",
    itemText: "question-imagepicker-text",
    clearButton: "survey-q_radiogroup_clear"
  },
  rating: {
    root: "btn-group",
    item: "btn btn-default btn-secondary",
    selected: "active",
    minText: "survey-q_rating_min_text",
    itemText: "survey-q_rating_item_text",
    maxText: "survey-q_rating_max_text",
    disabled: ""
  },
  text: "form-control",
  expression: "form-control",
  file: {
    root: "survey-q_file",
    placeholderInput: "survey-q_file_placeholder",
    preview: "survey-q_file_preview",
    removeButton: "survey-q_file_remove_button",
    fileInput: "survey-q_file_input",
    removeFile: "survey-q_file_remove",
    removeFileSvg: "svrvey-hidden",
    fileDecorator: "svrvey-hidden",
    fileSignBottom: "svrvey-hidden",
    removeButtonBottom: "svrvey-hidden"
  },
  saveData: {
    root: "",
    saving: "alert alert-info",
    error: "alert alert-danger",
    success: "alert alert-success",
    saveAgainButton: ""
  },
  window: {
    root: "modal-content",
    body: "modal-body",
    header: {
      root: "modal-header panel-title",
      title: "pull-left",
      button: "glyphicon pull-right",
      buttonExpanded: "glyphicon pull-right glyphicon-chevron-up",
      buttonCollapsed: "glyphicon pull-right glyphicon-chevron-down"
    }
  }
};
(<any>surveyCss)["bootstrap"] = defaultBootstrapCss;
