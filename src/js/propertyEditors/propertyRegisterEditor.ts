
import * as Survey from "survey-vue";
import { SurveyPropertyEditorBase } from "./propertyEditorBase";
import { 
  SurveyPropertyEditorFactory, 
  SurveyStringPropertyEditor, 
  SurveyDropdownPropertyEditor, 
  SurveyColorPropertyEditor, 
  SurveyArrayPropertyEditor,
  SurveyBooleanPropertyEditor, 
  SurveyNumberPropertyEditor
} from "./propertyEditorFactory";
import { SurveyPropertyCalculatedValueEditor } from "./propertyCalculatedValues";
import { SurveyPropertyCellsEditor } from "./propertyCellsEditor";
import { SurveyPropertyConditionEditor } from "./propertyConditionEditor";
import { SurveyPropertyDefaultValueEditor, SurveyPropertyDefaultRowValueEditor, SurveyPropertyDefaultPanelValueEditor, SurveyPropertySetEditor } from "./propertyDefaultValueEditor";
import { SurveyPropertyHtmlConditionEditor } from "./propertyHtmlConditionEditor";
import { SurveyPropertyItemValuesEditor } from "./propertyItemValuesEditor";
import { SurveyPropertyDropdownColumnsEditor } from './propertyMatrixDropdownColumnsEditor';
import { SurveyPropertyTextEditor } from './propertyModalEditor';
import { SurveyPropertyMultipleValuesEditor } from './propertyMultipleValuesEditor';
import { SurveyPropertyResultfullEditor } from './propertyRestfullEditor';
import { SurveyPropertyTextItemsEditor } from './propertyTextItemsEditor';
import { SurveyPropertyValidatorsEditor } from './propertyValidatorsEditor';
import { SurveyPropertyHtmlEditor } from './propertyModalEditor';
import { SurveyPropertyTriggersEditor } from './propertyTriggersEditor';







SurveyPropertyEditorFactory.registerEditor("string", function (
  property: Survey.JsonObjectProperty
): SurveyPropertyEditorBase {
  return new SurveyStringPropertyEditor(property);
});
SurveyPropertyEditorFactory.registerEditor("dropdown", function (
  property: Survey.JsonObjectProperty
): SurveyPropertyEditorBase {
  return new SurveyDropdownPropertyEditor(property);
});
SurveyPropertyEditorFactory.registerEditor("color", function (
  property: Survey.JsonObjectProperty
): SurveyPropertyEditorBase {
  return new SurveyColorPropertyEditor(property);
});

SurveyPropertyEditorFactory.registerEditor("array", function (
  property: Survey.JsonObjectProperty
): SurveyPropertyEditorBase {
  return new SurveyArrayPropertyEditor(property);
});
SurveyPropertyEditorFactory.registerEditor("boolean", function (
  property: Survey.JsonObjectProperty
): SurveyPropertyEditorBase {
  return new SurveyBooleanPropertyEditor(property);
});
SurveyPropertyEditorFactory.registerEditor("number", function (
  property: Survey.JsonObjectProperty
): SurveyPropertyEditorBase {
  return new SurveyNumberPropertyEditor(property);
});
SurveyPropertyEditorFactory.registerEditor("calculatedvalues", function (
  property: Survey.JsonObjectProperty
): SurveyPropertyEditorBase {
  return new SurveyPropertyCalculatedValueEditor(property);
});
SurveyPropertyEditorFactory.registerEditor("cells", function (
  property: Survey.JsonObjectProperty
): SurveyPropertyEditorBase {
  return new SurveyPropertyCellsEditor(property);
});
SurveyPropertyEditorFactory.registerEditor("condition", function (
  property: Survey.JsonObjectProperty
): SurveyPropertyEditorBase {
  return new SurveyPropertyConditionEditor(
    property,
    "condition",
    "createCondition"
  );
});
SurveyPropertyEditorFactory.registerEditor("expression", function (
  property: Survey.JsonObjectProperty
): SurveyPropertyEditorBase {
  return new SurveyPropertyConditionEditor(
    property,
    "expression",
    "parseExpression"
  );
});

SurveyPropertyEditorFactory.registerEditor("value", function (
  property: Survey.JsonObjectProperty
): SurveyPropertyEditorBase {
  return new SurveyPropertyDefaultValueEditor(property);
});

SurveyPropertyEditorFactory.registerEditor("rowvalue", function (
  property: Survey.JsonObjectProperty
): SurveyPropertyEditorBase {
  return new SurveyPropertyDefaultRowValueEditor(property);
});

SurveyPropertyEditorFactory.registerEditor("panelvalue", function (
  property: Survey.JsonObjectProperty
): SurveyPropertyEditorBase {
  return new SurveyPropertyDefaultPanelValueEditor(property);
});

SurveyPropertyEditorFactory.registerEditor("set", function (
  property: Survey.JsonObjectProperty
): SurveyPropertyEditorBase {
  return new SurveyPropertySetEditor(property);
});

SurveyPropertyEditorFactory.registerEditor("value", function (
  property: Survey.JsonObjectProperty
): SurveyPropertyEditorBase {
  return new SurveyPropertyDefaultValueEditor(property);
});

SurveyPropertyEditorFactory.registerEditor("rowvalue", function (
  property: Survey.JsonObjectProperty
): SurveyPropertyEditorBase {
  return new SurveyPropertyDefaultRowValueEditor(property);
});

SurveyPropertyEditorFactory.registerEditor("panelvalue", function (
  property: Survey.JsonObjectProperty
): SurveyPropertyEditorBase {
  return new SurveyPropertyDefaultPanelValueEditor(property);
});

SurveyPropertyEditorFactory.registerEditor("set", function (
  property: Survey.JsonObjectProperty
): SurveyPropertyEditorBase {
  return new SurveyPropertySetEditor(property);
});

SurveyPropertyEditorFactory.registerEditor("htmlconditions", function (
  property: Survey.JsonObjectProperty
): SurveyPropertyEditorBase {
  return new SurveyPropertyHtmlConditionEditor(property);
});
SurveyPropertyEditorFactory.registerEditor("itemvalue[]",
  function(property: Survey.JsonObjectProperty): SurveyPropertyEditorBase {
    return new SurveyPropertyItemValuesEditor(property);
  },
  "itemvalue"
);

SurveyPropertyEditorFactory.registerEditor("matrixdropdowncolumns", function(
  property: Survey.JsonObjectProperty
): SurveyPropertyEditorBase {
  return new SurveyPropertyDropdownColumnsEditor(property);
});
SurveyPropertyEditorFactory.registerEditor("text", function(
  property: Survey.JsonObjectProperty
): SurveyPropertyEditorBase {
  return new SurveyPropertyTextEditor(property);
});
SurveyPropertyEditorFactory.registerEditor("html", function(
  property: Survey.JsonObjectProperty
): SurveyPropertyEditorBase {
  return new SurveyPropertyHtmlEditor(property);
});

SurveyPropertyEditorFactory.registerEditor("multiplevalues", function(
  property: Survey.JsonObjectProperty
): SurveyPropertyEditorBase {
  return new SurveyPropertyMultipleValuesEditor(property);
});

SurveyPropertyEditorFactory.registerEditor("restfull", function (
  property: Survey.JsonObjectProperty
): SurveyPropertyEditorBase {
  return new SurveyPropertyResultfullEditor(property);
});
SurveyPropertyEditorFactory.registerEditor("textitems", function(
  property: Survey.JsonObjectProperty
): SurveyPropertyEditorBase {
  return new SurveyPropertyTextItemsEditor(property);
});
SurveyPropertyEditorFactory.registerEditor("validators", function(
  property: Survey.JsonObjectProperty
): SurveyPropertyEditorBase {
  return new SurveyPropertyValidatorsEditor(property);
});
SurveyPropertyEditorFactory.registerEditor("triggers", function(
  property: Survey.JsonObjectProperty
): SurveyPropertyEditorBase {
  return new SurveyPropertyTriggersEditor(property);
});

export  { SurveyPropertyEditorFactory}