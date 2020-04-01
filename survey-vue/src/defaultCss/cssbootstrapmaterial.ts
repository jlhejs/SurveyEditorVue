import { surveyCss } from "./cssstandard";

export var defaultBootstrapMaterialCss = {
  root: "survey-main survey-bootstrapmaterial_css",
  container: "survey-container",
  header: "panel-heading",
  body: "panel-body",
  bodyEmpty: "panel-body survey-body_empty",
  footer: "panel-footer",
  title: "",
  description: "",
  navigationButton: "",
  completedPage: "",
  navigation: {
    complete: "btn survey-complete_btn btn-primary",
    prev: "btn survey-prev_btn btn-primary",
    next: "btn survey-next_btn btn-primary",
    start: "btn survey-start_btn btn-primary"
  },
  progress: "progress center-block mx-auto mb-4",
  progressBar: "progress-bar",
  progressTextUnderBar: "svrvey-hidden",
  page: {
    root: "",
    title: "",
    description: ""
  },
  pageTitle: "",
  pageDescription: "small",
  row: "survey-row",
  question: {
    mainRoot: "survey-qstn form-group",
    flowRoot: "survey-q_flow form-group",
    header: "",
    headerLeft: "title-left",
    content: "",
    contentLeft: "content-left",
    titleLeftRoot: "survey-qstn_left",
    requiredText: "survey-q_required_text",
    title: "",
    number: "survey-q_num",
    description: "small",
    descriptionUnderInput: "small",
    comment: "form-control",
    required: "",
    titleRequired: "",
    hasError: "has-error",
    indent: 20,
    formGroup: "form-group"
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
    root: "alert alert-danger",
    icon: "glyphicon glyphicon-exclamation-sign",
    item: "",
    locationTop: "survey-qstn_error_top",
    locationBottom: "survey-qstn_error_bottom"
  },

  boolean: {
    root: "survey-qbln form-inline checkbox",
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
    root: "survey-qcbx form-inline",
    item: "checkbox",
    itemChecked: "checked",
    itemInline: "survey-q_checkbox_inline",
    itemDecorator: "svrvey-hidden",
    itemControl: "",
    label: "",
    labelChecked: "",
    controlLabel: "",
    materialDecorator: "checkbox-material",
    other: "survey-q_checkbox_other form-control",
    column: "survey-q_select_column"
  },
  comment: "form-control",
  dropdown: {
    root: "",
    control: "form-control",
    other: "survey-q_dd_other form-control"
  },
  html: { root: "" },
  matrix: {
    root: "table question-matrix",
    row: "form-group",
    label: "survey-q_m_label radio-inline",
    cellText: "survey-q_m_cell_text",
    cellTextSelected: "survey-q_m_cell_selected bg-primary",
    cellLabel: "survey-q_m_cell_label",
    itemValue: "form-control",
    itemChecked: "checked",
    itemDecorator: "svrvey-hidden"
  },
  matrixdropdown: { root: "table", itemValue: "form-group" },
  matrixdynamic: {
    root: "table",
    button: "btn btn-primary",
    itemValue: "form-group",
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
    row: "form-group",
    itemValue: "survey-q_mt_item_value form-control"
  },
  radiogroup: {
    root: "",
    item: "radio",
    itemChecked: "checked",
    itemInline: "survey-q_radiogroup_inline",
    itemDecorator: "svrvey-hidden",
    label: "",
    labelChecked: "",
    itemControl: "",
    controlLabel: "survey-q_radiogroup_control_label",
    materialDecorator: "circle",
    other: "survey-q_radiogroup_other form-control",
    clearButton: "survey-q_radiogroup_clear button btn btn-primary",
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
    root: "form-group is-fileinput survey-q_file",
    placeholderInput: "",
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
(<any>surveyCss)["bootstrapmaterial"] = defaultBootstrapMaterialCss;
