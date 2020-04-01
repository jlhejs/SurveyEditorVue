export var surveyCss: any = {
  currentType: "",
  getCss: function() {
    var loc = this.currentType ? this[this.currentType] : defaultStandardCss;
    if (!loc) loc = defaultStandardCss;
    return loc;
  }
};

export var defaultStandardCss = {
  root: "survey-main survey-default_css",
  container: "survey-container",
  header: "survey-header",
  body: "survey-body",
  bodyEmpty: "survey-body survey-body_empty",
  footer: "survey-nav",
  title: "",
  description: "",
  navigationButton: "",
  completedPage: "survey-completed_page",
  navigation: {
    complete: "survey-complete_btn",
    prev: "survey-prev_btn",
    next: "survey-next_btn",
    start: "survey-start_btn"
  },
  progress: "survey-progress",
  progressBar: "survey-progress_bar",
  progressTextInBar: "svrvey-hidden",
  page: {
    root: "survey-page-root",
    title: "",
    description: ""
  },
  // TODO: move to the page object
  pageTitle: "survey-page_title",
  pageDescription: "",
  row: "survey-row",
  question: {
    mainRoot: "survey-q survey-qstn",
    flowRoot: "survey-q_flow survey-qstn",
    header: "",
    headerLeft: "title-left",
    content: "",
    contentLeft: "content-left",
    titleLeftRoot: "survey-qstn_left",
    requiredText: "survey-q_required_text",
    title: "survey-q_title",
    number: "survey-q_num",
    description: "survey-q_description",
    comment: "",
    required: "",
    titleRequired: "",
    hasError: "",
    indent: 20,
    footer: "survey-q_footer",
    formGroup: "form-group"
  },
  panel: {
    title: "survey-page-title",
    titleExpandable: "survey-page-title_expandable",
    icon: "survey-panel_icon",
    iconExpanded: "survey-expanded",
    description: "survey-page-description",
    container: "survey-page-container"
  },
  error: {
    root: "survey-q_erbox",
    icon: "",
    item: "",
    locationTop: "survey-qstn_error_top",
    locationBottom: "survey-qstn_error_bottom"
  },

  boolean: {
    root: "survey-qcbc survey-qbln",
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
    root: "survey-qcbc survey-qcbx",
    item: "survey-q_checkbox",
    itemChecked: "checked",
    itemInline: "survey-q_checkbox_inline",
    label: "survey-q_checkbox_label",
    labelChecked: "",
    itemControl: "survey-q_checkbox_control_item",
    itemDecorator: "svrvey-hidden",
    controlLabel: "survey-q_checkbox_control_label",
    materialDecorator: "checkbox-material",
    other: "survey-q_other survey-q_checkbox_other",
    column: "survey-q_select_column"
  },
  comment: "",
  dropdown: {
    root: "",
    control: "survey-q_dropdown_control",
    selectWrapper: "survey-select_wrapper",
    other: "survey-q_dd_other"
  },
  html: { root: "" },
  matrix: {
    root: "question-matrix",
    label: "survey-q_m_label",
    itemChecked: "checked",
    itemDecorator: "svrvey-hidden",
    cellText: "survey-q_m_cell_text",
    cellTextSelected: "survey-q_m_cell_selected",
    cellLabel: "survey-q_m_cell_label"
  },
  matrixdropdown: { root: "question-matrix-dropdown" },
  matrixdynamic: {
    root: "question-matrix-dynamic",
    button: "survey-matrix_dynamic_button",
    buttonAdd: "",
    buttonRemove: "",
    iconAdd: "",
    iconRemove: ""
  },
  paneldynamic: {
    root: "survey-panel_dynamic",
    title: "survey-page-title",
    button: "",
    buttonAdd: "svrvey-paneldynamic__add-btn",
    buttonRemove: "",
    buttonPrev: "svrvey-paneldynamic__prev-btn",
    buttonNext: "svrvey-paneldynamic__next-btn",
    progressContainer: "svrvey-paneldynamic__progress-container",
    progress: "svrvey-progress",
    progressBar: "svrvey-progress__bar",
    progressText: "svrvey-paneldynamic__progress-text"
  },
  multipletext: {
    root: "survey-q_mt",
    itemTitle: "survey-q_mt_title",
    row: "survey-q_mt_row",
    itemValue: "survey-q_mt_item_value survey-q_text_root"
  },
  radiogroup: {
    root: "survey-qcbc",
    item: "survey-q_radiogroup",
    itemChecked: "checked",
    itemInline: "survey-q_radiogroup_inline",
    itemDecorator: "svrvey-hidden",
    label: "survey-q_radiogroup_label",
    labelChecked: "",
    itemControl: "survey-q_radiogroup_control_item",
    controlLabel: "",
    materialDecorator: "circle",
    other: "survey-q_other survey-q_radiogroup_other",
    clearButton: "survey-q_radiogroup_clear",
    column: "survey-q_select_column"
  },
  imagepicker: {
    root: "svrvey-q-imagepicker",
    item: "question-imagepicker",
    itemChecked: "checked",
    label: "question-img_label",
    itemControl: "question-img_control_item",
    image: "question-img_image",
    itemInline: "survey-q_imagepicker_inline",
    itemText: "question-imagepicker-text",
    clearButton: "survey-q_radiogroup_clear"
  },
  rating: {
    root: "survey-q_rating",
    item: "survey-q_rating_item",
    selected: "active",
    minText: "survey-q_rating_min_text",
    itemText: "survey-q_rating_item_text",
    maxText: "survey-q_rating_max_text",
    disabled: ""
  },
  text: "survey-q_text_root",
  expression: "",
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
    saving: "",
    error: "",
    success: "",
    saveAgainButton: ""
  },
  window: {
    root: "survey-window",
    body: "survey-window_content",
    header: {
      root: "survey-window_title",
      title: "",
      button: "",
      buttonExpanded: "",
      buttonCollapsed: ""
    }
  }
};

surveyCss["standard"] = defaultStandardCss;
