import { surveyCss } from "./cssstandard";
export var modernCss = {
  root: "svrvey-root-modern",
  container: "svrvey-container-modern",
  header: "svrvey-title svrvey-container-modern__title",
  body: "svrvey-body",
  bodyEmpty: "svrvey-body svrvey-body--empty",
  footer: "svrvey-footer svrvey-body__footer svrvey-clearfix",
  title: "",
  description: "",
  navigationButton: "",
  completedPage: "svrvey-completedpage",
  navigation: {
    complete: "svrvey-btn svrvey-footer__complete-btn",
    prev: "svrvey-btn svrvey-footer__prev-btn",
    next: "svrvey-btn svrvey-footer__next-btn",
    start: "svrvey-btn svrvey-footer__start-btn"
  },
  panel: {
    title: "svrvey-title svrvey-panel__title",
    titleExpandable: "svrvey-panel__title--expandable",
    description: "svrvey-description svrvey-panel__description",
    container: "svrvey-panel svrvey-row__panel",
    content: "svrvey-panel__content",
    icon: "svrvey-panel__icon",
    iconExpanded: "svrvey-panel__icon--expanded"
  },
  paneldynamic: {
    root: "svrvey-paneldynamic",
    navigation: "svrvey-paneldynamic__navigation",
    title: "svrvey-title svrvey-question__title",
    button: "svrvey-btn",
    buttonRemove: "svrvey-paneldynamic__remove-btn",
    buttonAdd: "svrvey-paneldynamic__add-btn",
    progressTop: "svrvey-paneldynamic__progress svrvey-paneldynamic__progress--top",
    progressBottom:
      "svrvey-paneldynamic__progress svrvey-paneldynamic__progress--bottom",
    buttonPrev: "svrvey-paneldynamic__prev-btn",
    buttonNext: "svrvey-paneldynamic__next-btn",
    progressContainer: "svrvey-paneldynamic__progress-container",
    progress: "svrvey-progress",
    progressBar: "svrvey-progress__bar",
    progressText: "svrvey-paneldynamic__progress-text",
    separator: "svrvey-paneldynamic__separator"
  },
  progress: "svrvey-progress svrvey-body__progress",
  progressBar: "svrvey-progress__bar",
  progressText: "svrvey-progress__text",
  progressTextInBar: "svrvey-hidden",
  page: {
    root: "svrvey-page svrvey-body__page",
    title: "svrvey-page__title",
    description: "svrvey-description svrvey-page__description"
  },
  pageTitle: "svrvey-title svrvey-page__title",
  pageDescription: "svrvey-description svrvey-page__description",
  row: "svrvey-row svrvey-clearfix",
  question: {
    mainRoot: "svrvey-question svrvey-row__question",
    flowRoot: "svrvey-question svrvey-row__question svrvey-row__question--flow",
    asCell: "svrvey-table__cell",
    header: "svrvey-question__header",
    headerLeft: "svrvey-question__header--location--left",
    headerTop: "svrvey-question__header--location--top",
    headerBottom: "svrvey-question__header--location--bottom",
    content: "svrvey-question__content",
    contentLeft: "svrvey-question__content--left",
    titleLeftRoot: "",
    titleOnAnswer: "svrvey-question__title--answer",
    titleOnError: "svrvey-question__title--error",
    title: "svrvey-title svrvey-question__title",
    requiredText: "svrvey-question__required-text",
    number: "svrvey-question__num",
    description: "svrvey-description svrvey-question__description",
    descriptionUnderInput: "svrvey-description svrvey-question__description",
    comment: "svrvey-comment",
    required: "svrvey-question--required",
    titleRequired: "svrvey-question__title--required",
    indent: 20,
    footer: "svrvey-question__footer",
    formGroup: "svrvey-question__form-group",
    hasError: ""
  },
  error: {
    root: "svrvey-question__erbox",
    icon: "",
    item: "",
    locationTop: "svrvey-question__erbox--location--top",
    locationBottom: "svrvey-question__erbox--location--bottom"
  },
  checkbox: {
    root: "svrvey-selectbase",
    item: "svrvey-item svrvey-checkbox svrvey-selectbase__item",
    itemDisabled: "svrvey-item--disabled svrvey-checkbox--disabled",
    itemChecked: "svrvey-checkbox--checked",
    itemHover: "svrvey-checkbox--allowhover",
    itemInline: "svrvey-selectbase__item--inline",
    label: "svrvey-selectbase__label",
    labelChecked: "",
    itemControl: "svrvey-visuallyhidden svrvey-item__control",
    itemDecorator: "svrvey-item__svg svrvey-checkbox__svg",
    controlLabel: "svrvey-item__control-label",
    materialDecorator: "svrvey-item__decorator svrvey-checkbox__decorator",
    other: "svrvey-comment svrvey-question__other",
    column: "svrvey-selectbase__column"
  },
  radiogroup: {
    root: "svrvey-selectbase",
    item: "svrvey-item svrvey-radio svrvey-selectbase__item",
    itemInline: "svrvey-selectbase__item--inline",
    label: "svrvey-selectbase__label",
    labelChecked: "",
    itemDisabled: "svrvey-item--disabled svrvey-radio--disabled",
    itemChecked: "svrvey-radio--checked",
    itemHover: "svrvey-radio--allowhover",
    itemControl: "svrvey-visuallyhidden svrvey-item__control",
    itemDecorator: "svrvey-item__svg svrvey-radio__svg",
    controlLabel: "svrvey-item__control-label",
    materialDecorator: "svrvey-item__decorator svrvey-radio__decorator",
    other: "svrvey-comment svrvey-question__other",
    clearButton: "svrvey-btn svrvey-selectbase__clear-btn",
    column: "svrvey-selectbase__column"
  },
  boolean: {
    root: "",
    item: "svrvey-boolean svrvey-item",
    control: "svrvey-visuallyhidden",
    itemChecked: "svrvey-boolean--checked",
    itemIndeterminate: "svrvey-boolean--indeterminate",
    itemDisabled: "svrvey-item--disabled svrvey-boolean--disabled",
    switch: "svrvey-boolean__switch",
    slider: "svrvey-boolean__slider",
    label: "svrvey-boolean__label ",
    disabledLabel: "svrvey-boolean__label--disabled"
  },
  text: {
    root: "svrvey-text",
    small: "svrvey-row__question--small",
    onError: "svrvey-text--error"
  },
  cascader: {
    root: "svrvey-cascader",
    popper: "svrvey-cascader-popper"
  },
  multipletext: {
    root: "svrvey-multipletext",
    item: "svrvey-multipletext__item",
    itemTitle: "svrvey-multipletext__item-title",
    row: "svrvey-multipletext__row",
    cell: "svrvey-multipletext__cell"
  },
  dropdown: {
    root: "",
    small: "svrvey-row__question--small",
    control: "svrvey-dropdown",
    selectWrapper: "",
    other: "svrvey-comment svrvey-question__other",
    onError: "svrvey-dropdown--error"
  },
  imagepicker: {
    root: "svrvey-imagepicker",
    item: "svrvey-imagepicker__item",
    itemInline: "svrvey-imagepicker__item--inline",
    itemChecked: "svrvey-imagepicker__item--checked",
    itemDisabled: "svrvey-imagepicker__item--disabled",
    itemHover: "svrvey-imagepicker__item--allowhover",
    label: "svrvey-imagepicker__label",
    itemControl: "svrvey-imagepicker__control",
    image: "svrvey-imagepicker__image",
    itemText: "svrvey-imagepicker__text",
    clearButton: "svrvey-btn",
    other: "svrvey-comment svrvey-question__other"
  },
  matrix: {
    tableWrapper: "svrvey-matrix",
    root: "svrvey-table",
    cell: "svrvey-table__cell svrvey-matrix__cell",
    headerCell: "svrvey-table__cell svrvey-table__cell--header",
    label: "svrvey-item svrvey-radio svrvey-matrix__label",
    itemValue: "svrvey-visuallyhidden svrvey-item__control svrvey-radio__control",
    itemChecked: "svrvey-radio--checked",
    itemDisabled: "svrvey-item--disabled svrvey-radio--disabled",
    itemHover: "svrvey-radio--allowhover",
    materialDecorator: "svrvey-item__decorator svrvey-radio__decorator",
    itemDecorator: "svrvey-item__svg svrvey-radio__svg",
    cellText: "svrvey-matrix__text",
    cellTextSelected: "svrvey-matrix__text--сhecked",
    cellTextDisabled: "svrvey-matrix__text--disabled"
  },
  matrixdropdown: {
    root: "svrvey-table",
    cell: "svrvey-table__cell",
    headerCell: "svrvey-table__cell svrvey-table__cell--header"
  },
  matrixdynamic: {
    root: "svrvey-table svrvey-matrixdynamic",
    cell: "svrvey-table__cell",
    headerCell: "svrvey-table__cell svrvey-table__cell--header",
    button: "svrvey-btn",
    buttonAdd: "svrvey-matrixdynamic__add-btn",
    buttonRemove: "svrvey-matrixdynamic__remove-btn",
    iconAdd: "",
    iconRemove: ""
  },
  rating: {
    root: "svrvey-rating",
    item: "svrvey-rating__item",
    selected: "svrvey-rating__item--selected",
    minText: "svrvey-rating__min-text",
    itemText: "svrvey-rating__item-text",
    maxText: "svrvey-rating__max-text",
    disabled: "svrvey-rating--disabled"
  },
  comment: {
    root: "svrvey-comment",
    small: "svrvey-row__question--small"
  },
  expression: "",
  file: {
    root: "svrvey-file",
    placeholderInput: "svrvey-visuallyhidden",
    preview: "svrvey-file__preview",
    fileSign: "svrvey-hidden",
    fileSignBottom: "svrvey-file__sign",
    fileDecorator: "svrvey-file__decorator",
    fileInput: "svrvey-visuallyhidden",
    noFileChosen: "svrvey-description svrvey-file__no-file-chosen",
    chooseFile: "svrvey-btn svrvey-file__choose-btn",
    disabled: "svrvey-file__choose-btn--disabled",
    removeButton: "svrvey-hidden",
    removeButtonBottom: "svrvey-btn svrvey-file__clean-btn",
    removeFile: "svrvey-hidden",
    removeFileSvg: "svrvey-file__remove-svg",
    wrapper: "svrvey-file__wrapper"
  },
  saveData: {
    root: "",
    saving: "",
    error: "",
    success: "",
    saveAgainButton: ""
  },
  window: {
    root: "",
    body: "",
    header: {
      root: "",
      title: "",
      button: "",
      buttonExpanded: "",
      buttonCollapsed: ""
    }
  }
};

surveyCss["modern"] = modernCss;
