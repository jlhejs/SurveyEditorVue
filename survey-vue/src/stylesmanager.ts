import { surveyCss } from "./defaultCss/cssstandard";
export class StylesManager {
  private static SurveyJSStylesSheetId = "surveyjs";

  public static Styles: { [key: string]: string } = {
    // ".survey-bootstrap_css":
    //   "position: relative; width: 100%; background-color: #f4f4f4",
    // ".survey-bootstrap_css .survey-custom_header":
    //   "position: absolute; width: 100%; height: 275px; background-color: #e7e7e7;",
    // ".survey-bootstrap_css .survey-container":
    //   "max-width: 80%; margin: auto; position: relative; color: #6d7072; padding: 0 1em;",
    // ".survey-bootstrap_css .panel-body":
    //   "background-color: white; padding: 1em 1em 5em 1em; border-top: 2px solid lightgray;",

    ".survey-main span": "word-break: break-word;",

    ".survey-main legend": "border: none; margin: 0;",

    // ".survey-bootstrap_css .survey-qstn": "padding: 0.5em 1em 1.5em 1em;",
    ".survey-bootstrap_css .survey-qcbc input[type=checkbox], .survey-bootstrap_css .survey-qcbc input[type=radio]":
      "vertical-align: middle; margin-top: -1px",
    ".survey-bootstrap_css .survey-qstn fieldset": "display: block;",
    ".survey-bootstrap_css .survey-qstn  .survey-q_checkbox_inline, .survey-bootstrap_css .survey-qstn .survey-q_radiogroup_inline":
      "display: inline-block;",

    ".survey-bootstrap_css .svrvey-paneldynamic__progress-container ":
      "position: relative; margin-right: 250px; margin-left: 40px; margin-top: 10px;",

    ".survey-main.survey-bootstrapmaterial_css .survey-q_radiogroup_control_label":
      "display: inline; position: static;",
    ".survey-main.survey-bootstrapmaterial_css .checkbox":
      "margin-top:10px;margin-bottom:10px;",

    ".survey-row": "clear: both;",
    ".survey-row .survey-qstn": "float: left",
    ".survey-row .survey-qstn:last-child": "float: none",
    // ".survey-qstn": "display: inline-block; vertical-align: top; overflow: auto;",
    // ".progress": "width: 60%;",
    ".progress-bar": "width: auto; margin-left: 2px; margin-right: 2px;",
    ".survey-page-container": "display: inline-block; vertical-align: top;",
    ".survey-qbln .checkbox-material": "margin-right: 3px;",
    ".survey-qcbx .checkbox-material": "margin-right: 5px;",
    ".survey-qcbx .checkbox label": "justify-content: left; display: inline-block;",
    ".survey-qstn .radio label": "justify-content: left; display: inline-block;",
    ".survey-qstn .question-imagepicker > label img": "pointer-events: none;",
    // ".survey-qstn .question-imagepicker.survey-q_imagepicker_inline": "display: inline-block;",
    ".survey-qstn label.survey-q_m_label":
      "position: absolute; margin: 0; display: block; width: 100%;",
    ".survey-qstn td": "position: relative;",
    ".survey-q_mt_item_value": "float: left;",
    "[dir=\"rtl\"] .survey-q_mt_item_value": "float: right;",
    ".survey-qstn.survey-qstn_left": "margin-top: 0.75em;",
    ".survey-qstn .title-left": "float: left; margin-right: 1em;",
    "[dir=\"rtl\"] .survey-qstn .title-left": "float: right; margin-left: 1em;",
    ".survey-qstn .content-left": "overflow: hidden",
    ".survey-q_radiogroup_inline .survey-q_radiogroup_other": "display: inline-block;",
    ".survey-q_checkbox_inline .survey-q_checkbox_other": "display: inline-block;",
    ".form-inline .survey-q_checkbox_inline:not(:last-child)": "margin-right: 1em;",
    ".form-inline .survey-q_radiogroup_inline:not(:last-child)":
      "margin-right: 1em;",
    // ".svrvey-q-imagepicker .survey-q_imagepicker_inline:not(:last-child)":
    //   "margin-right: 1em;",
    ".survey-qstn fieldset": "border: none; margin: 0; padding: 0;",
    ".survey-qstn .survey-q_file_placeholder": "display:none",

    ".survey-page-title": "padding-left: 1em; padding-bottom: 0.3em;",
    ".survey-page-title_expandable": "cursor: pointer;",
    ".survey-page-title .survey-panel_icon": "float: right; margin-right: 1em;",
    ".survey-page-title .survey-panel_icon::before":
      "content: ''; background-repeat: no-repeat; background-position: center; padding: 0.5em; display: inline-block; background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyMi4wLjEsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHZpZXdCb3g9IjAgMCAxMCAxMCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTAgMTA7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+DQoJLnN0MHtmaWxsOiM2RDcwNzI7fQ0KPC9zdHlsZT4NCjxwb2x5Z29uIGNsYXNzPSJzdDAiIHBvaW50cz0iMiwyIDAsNCA1LDkgMTAsNCA4LDIgNSw1ICIvPg0KPC9zdmc+DQo=);",
    ".survey-page-title .survey-panel_icon.survey-expanded::before":
      "transform: rotate(180deg);",

    ".survey-q_file > input[type=file], .survey-q_file > button":
      "display: inline-block;",
    ".survey-q_file_preview":
      "display: inline-block; vertical-align: top; border: 1px solid lightgray; padding: 5px; margin-top: 10px;",
    ".survey-q_file_preview > a":
      "display: block; overflow: hidden; vertical-align: top; white-space: nowrap; text-overflow: ellipsis;",
    ".survey-q_file_remove_button": "line-height: normal;",
    ".survey-q_file_remove": "display: block; cursor: pointer;",

    ".survey-q_m_cell_text": "cursor: pointer;",

    ".survey-q_dd_other": "margin-top: 1em;",
    ".survey-q_dd_other input": "width: 100%;",

    ".survey-qstn .svrvey-q-col-1, .svrvey-question .svrvey-q-col-1":
      "width: 100%; display: inline-block; padding-right: 1em; box-sizing: border-box; word-break: break-word;",
    ".survey-qstn .svrvey-q-col-2, .svrvey-question .svrvey-q-col-2":
      "width: 50%; display: inline-block; padding-right: 1em; box-sizing: border-box; word-break: break-word;",
    ".survey-qstn .svrvey-q-col-3, .svrvey-question .svrvey-q-col-3":
      "width: 33.33333%; display: inline-block; padding-right: 1em; box-sizing: border-box; word-break: break-word;",
    ".survey-qstn .svrvey-q-col-4, .svrvey-question .svrvey-q-col-4":
      "width: 25%; display: inline-block; padding-right: 1em; box-sizing: border-box; word-break: break-word;",
    ".survey-qstn .svrvey-q-col-5, .svrvey-question .svrvey-q-col-5":
      "width: 20%; display: inline-block; padding-right: 1em; box-sizing: border-box; word-break: break-word;",

    ".survey-qstn .svrvey-q-column-1, .svrvey-question .svrvey-q-column-1":
      "width: 100%; max-width: 100%; display: inline-block; padding-right: 1em; box-sizing: border-box; word-break: break-word;",
    ".survey-qstn .svrvey-q-column-2, .svrvey-question .svrvey-q-column-2":
      "max-width: 50%; display: inline-block; padding-right: 1em; box-sizing: border-box; word-break: break-word;",
    ".survey-qstn .svrvey-q-column-3, .svrvey-question .svrvey-q-column-3":
      "max-width: 33.33333%; display: inline-block; padding-right: 1em; box-sizing: border-box; word-break: break-word;",
    ".survey-qstn .svrvey-q-column-4, .svrvey-question .svrvey-q-column-4":
      "max-width: 25%; display: inline-block; padding-right: 1em; box-sizing: border-box; word-break: break-word;",
    ".survey-qstn .svrvey-q-column-5, .svrvey-question .svrvey-q-column-5":
      "max-width: 20%; display: inline-block; padding-right: 1em; box-sizing: border-box; word-break: break-word;",

    ".survey-qstn .survey-q_file_input": "color: transparent;",

    ".survey-qstn .question-imagepicker label > div":
      "overflow: hidden; white-space: nowrap; text-overflow: ellipsis; padding: 4px; border: 1px solid lightgray; border-radius: 4px;",
    ".survey-qstn .question-imagepicker label > div > img, .survey-qstn .question-img label > div > embed":
      "display: block;",

    ".survey-qstn table tr td .survey-q_m_cell_label":
      "position: absolute; left: 0; right: 0; top: 0; bottom: 0;",

    "f-panel": "padding: 0.5em 1em; display: inline-block; line-height: 2em;",

    ".survey-progress_bar > span": "white-space: nowrap;",

    ".survey-qstn .survey-q_select_column":
      "display: inline-block; vertical-align: top; min-width: 10%;",

    ".survey-qstn .survey-q_select_column > *:not(.survey-technical)": "display: block;",

    ".survey-main .survey-container .survey-body .survey-page-root .survey-qstn .survey-q_select_column textarea":
      "margin-left: 0; padding-left: 0; line-height: initial;",
    ".survey-main .svrvey-hidden": "display: none !important;",
    ".survey-main .svrvey-visuallyhidden":
      "position: absolute; height: 1px; width: 1px; overflow: hidden; clip: rect(1px 1px 1px 1px); clip: rect(1px, 1px, 1px, 1px);",

    // paneldynamic progress
    ".survey-main .svrvey-progress":
      "height: 0.19em; background-color: $header-background-color;",
    ".survey-main .svrvey-progress__bar":
      "background-color: $main-color; height: 100%; position: relative;",
    // EO paneldynamic progress

    // paneldynamic
    ".survey-main .svrvey-paneldynamic__progress-container":
      "position: relative; margin-right: 250px; margin-top: 20px;",
    ".survey-main .svrvey-paneldynamic__add-btn": "float: right; margin-top: -18px;",
    ".survey-main .svrvey-paneldynamic__add-btn--list-mode":
      "  float: none; margin-top: 1em;",
    ".survey-main .svrvey-paneldynamic__remove-btn ": "margin-top: 1.25em;",
    ".survey-main .svrvey-paneldynamic__prev-btn, .survey-main .svrvey-paneldynamic__next-btn":
      "box-sizing: border-box; display: inline-block; cursor: pointer; width: 0.7em; top: -0.28em; position: absolute;",
    ".survey-main .svrvey-paneldynamic__prev-btn":
      "left: -1.3em; transform: rotate(90deg);",
    ".survey-main .svrvey-paneldynamic__next-btn ":
      "right: -1.3em; transform: rotate(270deg);",
    ".survey-main .svrvey-paneldynamic__prev-btn.svrvey-paneldynamic__prev-btn--disabled, .survey-main .svrvey-paneldynamic__next-btn.svrvey-paneldynamic__next-btn--disabled":
      "cursor: auto;",
    ".survey-main .svrvey-paneldynamic__progress-text":
      "font-weight: bold; font-size: 0.87em; margin-top: 0.69em; margin-left: 4em",
    // EO paneldynamic
    //boolean
    ".survey-main .svrvey-boolean__switch":
      "display: inline-block; box-sizing: border-box; width: 63px; height: 24px; margin-right: 17px; margin-left: 21px; padding: 2px 3px; vertical-align: middle; border-radius: 12px; cursor: pointer;",
    ".survey-main .svrvey-boolean__slider":
      "display: inline-block; width: 20px; height: 20px; transition-duration: .4s; transition-property: margin-left; border: none; border-radius: 100%;",
    ".survey-main svrvey-boolean__label": "vertical-align: middle",
    ".survey-main .svrvey-boolean--indeterminate  .svrvey-boolean__slider":
      "margin-left: calc(50% - 10px);",
    ".survey-main .svrvey-boolean--checked  .svrvey-boolean__slider":
      "margin-left: calc(100% - 20px);"
    // EO boolean
  };

  public static Media: { [key: string]: { media: string; style: string } } = {
    ".survey-qstn fieldset .svrvey-q-col-1": {
      style: "width: 100%;",
      media: "@media only screen and (max-width: 480px)"
    },
    ".survey-qstn fieldset .svrvey-q-col-2": {
      style: "width: 100%;",
      media: "@media only screen and (max-width: 480px)"
    },
    ".survey-qstn fieldset .svrvey-q-col-3": {
      style: "width: 100%;",
      media: "@media only screen and (max-width: 480px)"
    },
    ".survey-qstn fieldset .svrvey-q-col-4": {
      style: "width: 100%;",
      media: "@media only screen and (max-width: 480px)"
    },
    ".survey-qstn fieldset .svrvey-q-col-5": {
      style: "width: 100%;",
      media: "@media only screen and (max-width: 480px)"
    },

    ".survey-main .survey-container .panel-body.card-block .survey-row .survey-qstn": {
      style: "display: block; width: 100% !important;",
      media: "@media (max-width: 600px)"
    },
    ".survey-main .survey-container .panel-body.card-block .survey-row .survey-qstn .title-left": {
      style: "float: none;",
      media: "@media (max-width: 600px)"
    },
    ".survey-main .survey-container .panel-body.card-block .survey-row .survey-qstn .survey-q_radiogroup_inline, .survey-main .survey-container .panel-body.card-block .survey-row .survey-qstn .survey-q_checkbox_inline, .survey-main .survey-container .panel-body.card-block .survey-row .survey-qstn .survey-q_imagepicker_inline": {
      style: "display: block;",
      media: "@media (max-width: 600px)"
    },
    ".survey-main .survey-container .panel-body.card-block .survey-row .survey-qstn table.table": {
      style: "display: block;",
      media: "@media (max-width: 600px)"
    },
    ".survey-main .survey-container .panel-body.card-block .survey-row .survey-qstn table.table thead": {
      style: "display: none;",
      media: "@media (max-width: 600px)"
    },
    ".survey-main .survey-container .panel-body.card-block .survey-row .survey-qstn table.table tbody, .survey-main .survey-container .panel-body.card-block .survey-row .survey-qstn table.table tr, .survey-main .survey-container .panel-body.card-block .survey-row .survey-qstn table.table td": {
      style: "display: block;",
      media: "@media (max-width: 600px)"
    },
    ".survey-main .survey-container .panel-body.card-block .survey-row .survey-qstn table.table:not(.question-matrix) td:before": {
      style: "content: attr(headers);",
      media: "@media (max-width: 600px)"
    },
    ".survey-main .survey-container .panel-body.card-block .survey-row .survey-qstn table.question-matrix td:after": {
      style: "content: attr(headers); padding-left: 1em",
      media: "@media (max-width: 600px)"
    },
    ".survey-main .survey-container .panel-body.card-block .survey-row .survey-qstn .radio label, .survey-main .survey-container .panel-body.card-block .survey-row .survey-qstn .checkbox label": {
      style: "line-height: 12px; vertical-align: top;",
      media: "@media (max-width: 600px)"
    },
    ".survey-qstn label.survey-q_m_label": {
      style: "display: inline;",
      media: "@media (max-width: 600px)"
    },
    ".survey-main .survey-custom_header": {
      style: "display: none;",
      media: "@media (max-width: 1300px)"
    },
    ".survey-main .survey-container .survey-header h3": {
      style: "font-size: 1.5em;",
      media: "@media (max-width: 1300px)"
    },
    ".survey-main .survey-container .survey-header h3 span": {
      style: "font-size: 0.75em;",
      media: "@media (max-width: 700px)"
    },

    ".survey-main.survey-bootstrap_css .svrvey-progress__text": {
      style: "margin-left: 8em;",
      media: "@media (min-width: 768px)"
    }
  };

  public static ThemeColors: { [key: string]: { [key: string]: string } } = {
    default: {
      "$header-background-color": "#e7e7e7",
      "$body-container-background-color": "#f4f4f4",

      "$main-color": "#1ab394",
      "$main-hover-color": "#0aa384",
      "$body-background-color": "white",
      "$inputs-background-color": "white",
      "$text-color": "#6d7072",
      "$header-color": "#6d7072",
      "$border-color": "#e7e7e7",

      "$error-color": "#ed5565",
      "$error-background-color": "#fd6575",

      "$progress-text-color": "#9d9d9d",
      "$disable-color": "#dbdbdb",
      "$disabled-label-color": "rgba(64, 64, 64, 0.5)",
      "$slider-color": "white",
      "$disabled-switch-color": "#9f9f9f",
      "$disabled-slider-color": "#cfcfcf"
    },
    orange: {
      "$header-background-color": "#4a4a4a",
      "$body-container-background-color": "#f8f8f8",

      "$main-color": "#f78119",
      "$main-hover-color": "#e77109",
      "$body-background-color": "white",
      "$inputs-background-color": "white",
      "$text-color": "#4a4a4a",
      "$header-color": "#f78119",
      "$border-color": "#e7e7e7",

      "$error-color": "#ed5565",
      "$error-background-color": "#fd6575",

      "$progress-text-color": "#9d9d9d",
      "$disable-color": "#dbdbdb",
      "$disabled-label-color": "rgba(64, 64, 64, 0.5)",
      "$slider-color": "white",
      "$disabled-switch-color": "#9f9f9f",
      "$disabled-slider-color": "#cfcfcf"
    },
    darkblue: {
      "$header-background-color": "#d9d8dd",
      "$body-container-background-color": "#f6f7f2",

      "$main-color": "#3c4f6d",
      "$main-hover-color": "#2c3f5d",
      "$body-background-color": "white",
      "$inputs-background-color": "white",
      "$text-color": "#4a4a4a",
      "$header-color": "#6d7072",
      "$border-color": "#e7e7e7",

      "$error-color": "#ed5565",
      "$error-background-color": "#fd6575",

      "$progress-text-color": "#9d9d9d",
      "$disable-color": "#dbdbdb",
      "$disabled-label-color": "rgba(64, 64, 64, 0.5)",
      "$slider-color": "white",
      "$disabled-switch-color": "#9f9f9f",
      "$disabled-slider-color": "#cfcfcf"
    },
    darkrose: {
      "$header-background-color": "#ddd2ce",
      "$body-container-background-color": "#f7efed",

      "$main-color": "#68656e",
      "$main-hover-color": "#58555e",
      "$body-background-color": "white",
      "$inputs-background-color": "white",
      "$text-color": "#4a4a4a",
      "$header-color": "#6d7072",
      "$border-color": "#e7e7e7",

      "$error-color": "#ed5565",
      "$error-background-color": "#fd6575",

      "$progress-text-color": "#9d9d9d",
      "$disable-color": "#dbdbdb",
      "$disabled-label-color": "rgba(64, 64, 64, 0.5)",
      "$slider-color": "white",
      "$disabled-switch-color": "#9f9f9f",
      "$disabled-slider-color": "#cfcfcf"
    },
    stone: {
      "$header-background-color": "#cdccd2",
      "$body-container-background-color": "#efedf4",

      "$main-color": "#0f0f33",
      "$main-hover-color": "#191955",
      "$body-background-color": "white",
      "$inputs-background-color": "white",
      "$text-color": "#0f0f33",
      "$header-color": "#0f0f33",
      "$border-color": "#e7e7e7",

      "$error-color": "#ed5565",
      "$error-background-color": "#fd6575",

      "$progress-text-color": "#9d9d9d",
      "$disable-color": "#dbdbdb",
      "$disabled-label-color": "rgba(64, 64, 64, 0.5)",
      "$slider-color": "white",
      "$disabled-switch-color": "#9f9f9f",
      "$disabled-slider-color": "#cfcfcf"
    },
    winter: {
      "$header-background-color": "#82b8da",
      "$body-container-background-color": "#dae1e7",

      "$main-color": "#3c3b40",
      "$main-hover-color": "#1e1d20",
      "$body-background-color": "white",
      "$inputs-background-color": "white",
      "$text-color": "#000",
      "$header-color": "#000",
      "$border-color": "#e7e7e7",

      "$error-color": "#ed5565",
      "$error-background-color": "#fd6575",

      "$disable-color": "#dbdbdb",
      "$progress-text-color": "#9d9d9d",
      "$disabled-label-color": "rgba(64, 64, 64, 0.5)",
      "$slider-color": "white",
      "$disabled-switch-color": "#9f9f9f",
      "$disabled-slider-color": "#cfcfcf"
    },
    winterstone: {
      "$header-background-color": "#323232",
      "$body-container-background-color": "#f8f8f8",

      "$main-color": "#5ac8fa",
      "$main-hover-color": "#06a1e7",
      "$body-background-color": "white",
      "$inputs-background-color": "white",
      "$text-color": "#000",
      "$header-color": "#fff",
      "$border-color": "#e7e7e7",

      "$error-color": "#ed5565",
      "$error-background-color": "#fd6575",

      "$disable-color": "#dbdbdb",
      "$progress-text-color": "#9d9d9d",
      "$disabled-label-color": "rgba(64, 64, 64, 0.5)",
      "$slider-color": "white",
      "$disabled-switch-color": "#9f9f9f",
      "$disabled-slider-color": "#cfcfcf"
    },
    modern: {
      "$main-color": "#1ab394",
      "$add-button-color": "#1948b3",
      "$remove-button-color": "#ff1800",
      "$disable-color": "#dbdbdb",
      "$progress-text-color": "#9d9d9d",
      "$disabled-label-color": "rgba(64, 64, 64, 0.5)",
      "$slider-color": "white",
      "$disabled-switch-color": "#9f9f9f",
      "$disabled-slider-color": "#cfcfcf"
    },
    bootstrap: {
      "$main-color": "#18a689",
      "$text-color": "#404040;",
      "$progress-text-color": "#9d9d9d",
      "$disable-color": "#dbdbdb",
      "$header-background-color": "#e7e7e7",
      "$disabled-label-color": "rgba(64, 64, 64, 0.5)",
      "$slider-color": "white",
      "$disabled-switch-color": "#9f9f9f",
      "$disabled-slider-color": "#cfcfcf"
    },
    bootstrapmaterial: {
      "$main-color": "#18a689",
      "$text-color": "#404040;",
      "$progress-text-color": "#9d9d9d",
      "$disable-color": "#dbdbdb",
      "$header-background-color": "#e7e7e7",

      "$disabled-label-color": "rgba(64, 64, 64, 0.5)",
      "$slider-color": "white",
      "$disabled-switch-color": "#9f9f9f",
      "$disabled-slider-color": "#cfcfcf"
    }
  };
  public static ThemeCss: { [key: string]: string } = {
    ".survey-default_css": "background-color: $body-container-background-color;",

    ".survey-default_css hr": "border-color: $border-color;",

    ".survey-default_css input[type='button'], .survey-default_css button":
      "color: $body-background-color; background-color: $main-color;",
    ".survey-default_css input[type='button']:hover, .survey-default_css button:hover":
      "background-color: $main-hover-color;",

    ".survey-default_css .survey-header": "color: $header-color;",
    ".survey-default_css .survey-custom_header":
      "background-color: $header-background-color;",
    ".survey-default_css .survey-container": "color: $text-color;",
    ".survey-default_css .survey-body":
      "background-color: $body-background-color; border-color: $main-color;",
    ".survey-default_css .survey-progress": "background-color: $border-color;",
    ".survey-default_css .survey-progress_bar": "background-color: $main-color;",

    ".survey-default_css .survey-page-root > .survey-row": "border-color: $border-color;",
    ".survey-default_css .survey-page-root > .survey-row:nth-child(odd)":
      "background-color: $body-background-color;",
    ".survey-default_css .survey-page-root > .survey-row:nth-child(even)":
      "background-color: $body-container-background-color;",

    ".survey-default_css .survey-q_other input":
      "color: $text-color; border-color: $border-color; background-color: $inputs-background-color;",
    ".survey-default_css .survey-q_text_root":
      "color: $text-color; border-color: $border-color; background-color: $inputs-background-color;",
    ".survey-default_css .survey-q_dropdown_control":
      "color: $text-color; border-color: $border-color; background-color: $inputs-background-color;",
    ".survey-default_css input[type='text']":
      "color: $text-color; border-color: $border-color; background-color: $inputs-background-color;",
    ".survey-default_css select":
      "color: $text-color; border-color: $border-color; background-color: $inputs-background-color;",
    ".survey-default_css textarea":
      "color: $text-color; border-color: $border-color; background-color: $inputs-background-color;",
    ".survey-default_css input:not([type='button']):not([type='reset']):not([type='submit']):not([type='image']):not([type='checkbox']):not([type='radio'])":
      "border: 1px solid $border-color; background-color: $inputs-background-color;color: $text-color;",
    ".survey-default_css input:not([type='button']):not([type='reset']):not([type='submit']):not([type='image']):not([type='checkbox']):not([type='radio']):focus":
      "border: 1px solid $main-color;",
    ".survey-default_css .survey-container .survey-body .survey-page-root .survey-q .survey-select_wrapper .survey-q_dropdown_control ":
      "background-color: $inputs-background-color;",
    ".survey-default_css .survey-q_other input:focus": "border-color: $main-color;",
    ".survey-default_css .survey-q_text_root:focus": "border-color: $main-color;",
    ".survey-default_css .survey-q_dropdown_control:focus":
      "border-color: $main-color;",
    ".survey-default_css input[type='text']:focus": "border-color: $main-color;",
    '.survey-default_css .survey-container .survey-body .survey-page-root .survey-q input[type="radio"]:focus, .survey-default_css .survey-container .survey-body .survey-page-root .survey-q input[type="checkbox"]:focus':
      "outline: 1px dotted $main-color;",
    ".survey-default_css select:focus": "border-color: $main-color;",
    ".survey-default_css textarea:focus": "border-color: $main-color;",

    ".survey-default_css .survey-select_wrapper":
      "background-color: $body-background-color;",
    ".survey-default_css .survey-select_wrapper::before":
      "background-color: $main-color;",

    ".survey-default_css .survey-q_rating_item.active .survey-q_rating_item_text":
      "background-color: $main-hover-color; border-color: $main-hover-color; color: $body-background-color;",
    ".survey-default_css .survey-q_rating_item .survey-q_rating_item_text":
      "border-color: $border-color;",
    ".survey-default_css .survey-q_rating_item .survey-q_rating_item_text:hover":
      "border-color: $main-hover-color;",

    ".survey-default_css table.question-matrix tr": "border-color: $border-color;",
    ".survey-default_css table.question-matrix-dropdown tr":
      "border-color: $border-color;",
    ".survey-default_css table.question-matrix-dynamic tr":
      "border-color: $border-color;",

    ".survey-default_css .survey-q_m_cell_selected":
      "color: $body-background-color; background-color: $main-hover-color;",

    ".survey-main .survey-q_file_remove:hover": "color: $main-color;",
    ".survey-default_css .survey-page-description": "padding-left: 1.29em;",
    //progress bar
    ".survey-main .svrvey-progress": "background-color: $header-background-color;",
    ".survey-main .svrvey-progress__bar": "background-color: $main-color;",

    //paneldynamic
    ".survey-main .svrvey-paneldynamic__prev-btn.svrvey-paneldynamic__prev-btn--disabled, .survey-main .svrvey-paneldynamic__next-btn.svrvey-paneldynamic__next-btn--disabled":
      "fill: $disable-color;",
    ".survey-main .svrvey-paneldynamic__progress-text": "color: $progress-text-color;",
    ".survey-main .svrvey-paneldynamic__prev-btn, .survey-main .svrvey-paneldynamic__next-btn":
      "fill: $text-color",

    //boolean
    ".survey-main .svrvey-boolean__switch": "background-color: $main-color;",
    ".survey-main .svrvey-boolean__slider": "background-color: $slider-color;",
    ".survey-main .svrvey-boolean__label--disabled": "color: $disabled-label-color;",
    ".survey-main .svrvey-boolean--disabled .svrvey-boolean__switch":
      "background-color: $disabled-switch-color;",
    ".survey-main .svrvey-boolean--disabled .svrvey-boolean__slider":
      "background-color: $disabled-slider-color;"
    //eo boolean
  };
  public static modernThemeCss: { [key: string]: string } = {
    ".svrvey-paneldynamic__add-btn": "background-color: $add-button-color;",
    ".svrvey-paneldynamic__remove-btn": "background-color: $remove-button-color;",
    ".svrvey-boolean__switch": "background-color: $main-color;",
    ".svrvey-boolean__slider": "background-color: $slider-color;",
    ".svrvey-boolean__label--disabled": "color: $disabled-label-color;",
    ".svrvey-boolean--disabled .svrvey-boolean__switch":
      "background-color: $disabled-switch-color;",
    ".svrvey-boolean--disabled .svrvey-boolean__slider":
      "background-color: $disabled-slider-color;"
  };
  public static bootstrapThemeCss: { [key: string]: string } = {
    // ".survey-main .question-imagepicker.checked label>div": "background-color: $main-color",
    ".survey-main .survey-page-description": "padding-left: 1.66em;",
    ".survey-main .survey-qstn_error_bottom": "margin-top: 20px; margin-bottom: 0;",
    // ".survey-main .progress": "width: 60%;",
    // ".survey-main .progress-bar":
    //   "width: auto; margin-left: 2px; margin-right: 2px;",
    ".survey-main .table>tbody>tr>td": "min-width: 90px;",
    ".survey-main f-panel .survey-qstn": "padding: 0; vertical-align: middle;",

    //progress bar
    ".survey-main .svrvey-progress": "background-color: $header-background-color;",
    ".survey-main .svrvey-progress__bar": "background-color: $main-color;",

    //paneldynamic
    ".survey-main .svrvey-paneldynamic__prev-btn.svrvey-paneldynamic__prev-btn--disabled, .survey-main .svrvey-paneldynamic__next-btn.svrvey-paneldynamic__next-btn--disabled":
      "fill: $disable-color;",
    ".survey-main .svrvey-paneldynamic__progress-text": "color: $progress-text-color;",
    ".survey-main .svrvey-paneldynamic__prev-btn, .survey-main .svrvey-paneldynamic__next-btn":
      "fill: $text-color",

    //boolean
    ".survey-main .svrvey-boolean__switch": "background-color: $main-color;",
    ".survey-main .svrvey-boolean__slider": "background-color: $slider-color;",
    ".survey-main .svrvey-boolean__label--disabled": "color: $disabled-label-color;",
    ".survey-main .svrvey-boolean--disabled .svrvey-boolean__switch":
      "background-color: $disabled-switch-color;",
    ".survey-main .svrvey-boolean--disabled  .svrvey-boolean__slider":
      "background-color: $disabled-slider-color;"
    //eo boolean
  };

  public static bootstrapmaterialThemeCss: { [key: string]: string } = {
    ".survey-main.survey-bootstrapmaterial_css .form-group.is-focused .form-control":
      "background-image: linear-gradient($main-color, $main-color), linear-gradient(#D2D2D2, #D2D2D2);",
    ".survey-main.survey-bootstrapmaterial_css .form-group.is-focused label":
      "color:$main-color;",

    ".survey-main.survey-bootstrapmaterial_css .survey-qstn label.survey-q_m_label":
      "height: 100%;",

    ".survey-main.survey-bootstrapmaterial_css .checkbox input[type=checkbox]:checked + .checkbox-material .check":
      "border-color: $main-color;",
    ".survey-main.survey-bootstrapmaterial_css label.checkbox-inline input[type=checkbox]:checked + .checkbox-material .check":
      "border-color: $main-color;",
    ".survey-main.survey-bootstrapmaterial_css .checkbox input[type=checkbox]:checked + .checkbox-material .check:before":
      "color: $main-color;",
    ".survey-main.survey-bootstrapmaterial_css label.checkbox-inline input[type=checkbox]:checked + .checkbox-material .check:before":
      "color: $main-color;",

    ".survey-main.survey-bootstrapmaterial_css .radio input[type=radio]:checked ~ .circle":
      "border-color: $main-color;",
    ".survey-main.survey-bootstrapmaterial_css label.radio-inline input[type=radio]:checked ~ .circle":
      "border-color: $main-color;",
    ".survey-main.survey-bootstrapmaterial_css .radio input[type=radio]:checked ~ .check":
      "background-color: $main-color;",
    ".survey-main.survey-bootstrapmaterial_css label.radio-inline input[type=radio]:checked ~ .check":
      "background-color: $main-color;",
    ".survey-main.survey-bootstrapmaterial_css .btn-default.active":
      "background-color: $main-color; color: $body-background-color;",
    ".survey-main.survey-bootstrapmaterial_css .btn-default:active":
      "background-color: $main-color; color: $body-background-color;",
    ".survey-main.survey-bootstrapmaterial_css .btn-secondary.active":
      "background-color: $main-color; color: $body-background-color;",
    ".survey-main.survey-bootstrapmaterial_css .btn-secondary:active":
      "background-color: $main-color; color: $body-background-color;",
    ".survey-main.survey-bootstrapmaterial_css .open>.dropdown-toggle.btn-default":
      "background-color: $main-color; color: $body-background-color;",
    ".survey-main.survey-bootstrapmaterial_css input[type='button'].btn-primary, .survey-main.survey-bootstrapmaterial_css button.btn-primary":
      "color: $body-background-color; background-color: $main-color;",
    ".survey-main.survey-bootstrapmaterial_css input[type='button'].btn-primary:hover, .survey-main.survey-bootstrapmaterial_css button.btn-primary:hover":
      "background-color: $main-hover-color;",
    // ".survey-main .question-imagepicker.checked label>div": "background-color: $main-color;",

    ".survey-main.survey-bootstrapmaterial_css .survey-q_file_remove:hover":
      "color: $main-color;",

    ".survey-main.survey-bootstrapmaterial_css .form-group input[type=file]":
      "position: relative; opacity: 1;",
    // ".survey-main.survey-bootstrapmaterial_css .progress": "width: 60%;",
    ".survey-main.survey-bootstrapmaterial_css .progress-bar":
      "width: auto; margin-left: 2px; margin-right: 2px;",

    //progress bar
    ".survey-main .svrvey-progress": "background-color: $header-background-color;",
    ".survey-main .svrvey-progress__bar": "background-color: $main-color;",

    //paneldynamic
    ".survey-main .svrvey-paneldynamic__prev-btn.svrvey-paneldynamic__prev-btn--disabled, .survey-main .svrvey-paneldynamic__next-btn.svrvey-paneldynamic__next-btn--disabled":
      "fill: $disable-color;",
    ".survey-main .svrvey-paneldynamic__progress-text": "color: $progress-text-color;",
    ".survey-main .svrvey-paneldynamic__prev-btn, .survey-main .svrvey-paneldynamic__next-btn":
      "fill: $text-color",

    //boolean
    ".survey-main .svrvey-boolean__switch": "background-color: $main-color;",
    ".survey-main .svrvey-boolean__slider": "background-color: $slider-color;",
    ".survey-main .svrvey-boolean__label--disabled": "color: $disabled-label-color;",
    ".survey-main .svrvey-boolean--disabled .svrvey-boolean__switch":
      "background-color: $disabled-switch-color;",
    ".survey-main .svrvey-boolean--disabled  .svrvey-boolean__slider":
      "background-color: $disabled-slider-color;"
    //eo boolean
  };

  private sheet: CSSStyleSheet = null;

  static findSheet(styleSheetId: string) {
    for (let i = 0; i < document.styleSheets.length; i++) {
      if (
        !!document.styleSheets[i].ownerNode &&
        (<any>document).styleSheets[i].ownerNode["id"] === styleSheetId
      ) {
        return <CSSStyleSheet>document.styleSheets[i];
      }
    }
    return null;
  }

  static createSheet(styleSheetId: string) {
    let style = document.createElement("style");
    style.id = styleSheetId;
    // Add a media (and/or media query) here if you'd like!
    // style.setAttribute("media", "screen")
    // style.setAttribute("media", "only screen and (max-width : 1024px)")
    style.appendChild(document.createTextNode(""));
    document.head.appendChild(style);
    return <CSSStyleSheet>style.sheet;
  }

  public static applyTheme(
    themeName: string = "default",
    themeSelector: string = ".survey-main"
  ) {
    let ThemeCss: any;

    if (themeName === "modern") themeSelector = ".svrvey-root-modern ";

    if (
      ["bootstrap", "bootstrapmaterial", "modern"].indexOf(themeName) !== -1
    ) {
      ThemeCss = (<any>StylesManager)[themeName + "ThemeCss"];
      surveyCss.currentType = themeName;
    } else {
      ThemeCss = StylesManager.ThemeCss;
      surveyCss.currentType = "standard";
    }

    if (StylesManager.Enabled) {
      let sheet = StylesManager.findSheet(themeName + themeSelector);
      if (!sheet) {
        sheet = StylesManager.createSheet(themeName + themeSelector);
        let theme =
          StylesManager.ThemeColors[themeName] ||
          StylesManager.ThemeColors["default"];

        Object.keys(ThemeCss).forEach(selector => {
          let cssRuleText = ThemeCss[selector];
          Object.keys(theme).forEach(
            colorVariableName =>
              (cssRuleText = cssRuleText.replace(
                new RegExp("\\" + colorVariableName, "g"),
                theme[colorVariableName]
              ))
          );
          sheet.insertRule(
            themeSelector + selector + " { " + cssRuleText + " }",
            0
          );
        });
      }
    }
  }

  public static Enabled = true;

  constructor() {
    if (StylesManager.Enabled) {
      this.sheet = StylesManager.findSheet(StylesManager.SurveyJSStylesSheetId);
      if (!this.sheet) {
        this.sheet = StylesManager.createSheet(
          StylesManager.SurveyJSStylesSheetId
        );
        this.initializeStyles(this.sheet);
      }
    }
  }

  public initializeStyles(sheet: CSSStyleSheet) {
    if (StylesManager.Enabled) {
      Object.keys(StylesManager.Styles).forEach(selector =>
        sheet.insertRule(
          selector + " { " + StylesManager.Styles[selector] + " }",
          0
        )
      );
      Object.keys(StylesManager.Media).forEach(selector => {
        sheet.insertRule(
          StylesManager.Media[selector].media +
            " { " +
            selector +
            " { " +
            StylesManager.Media[selector].style +
            " } }",
          0
        );
      });
    }
  }
}
