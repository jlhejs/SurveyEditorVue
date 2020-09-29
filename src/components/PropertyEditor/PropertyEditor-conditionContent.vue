<template>
  <div class="propertyeditor-condition">
    <div @click="sunyytest">sunyytest{{data.koAddConditionQuestion}}</div>
    <div class="form-inline form-group">
            <el-select v-model="data.koAddConditionQuestion" placeholder="请选择" size="small" value-key="name">
              <el-option
                v-for="item in koAddConditionQuestions"
                :key="item.name"
                :label="(item.text || '').substring(0, 80)"
                :value="item">
              </el-option>
            </el-select>
            <el-select v-model="koAddConditionOperator" placeholder="请选择" size="small">
              <el-option
                v-for="item in availableOperators"
                :key="item.name"
                :label="(item.text || '').substring(0, 80)"
                :value="item.name">
              </el-option>
            </el-select>
            <el-input  placeholder="请输入内容" v-model="data.koAddConditionValue" :disable="!data.koAddContionValueEnabled"  size="small" style="width:120px"></el-input>
            <el-button type="primary"  size="small" @click="data.onConditionAddClick">{{data.koAddConditionButtonText()}}<i class="el-icon-plus el-icon--right"></i></el-button>
        <!-- <input class="form-control" type="text" data-bind="textInput:koAddConditionValue, enable: koAddContionValueEnabled" style="width:120px"/> -->
        <!-- <input type="button" class="form-control btn btn-primary" data-bind="enable: koCanAddCondition() && !readOnly(), click: onConditionAddClick, value: koAddConditionButtonText"/> -->
    </div>
    <template v-if="data.hasAceEditor">
      <aceEditor v-model="data.koTextValue"
      @init="editorInit" 
      @input="aceInput" 
      @setCompletions="setCompletions"
      lang="json"
      theme="clouds" width="100%" height="200px"></aceEditor>
    </template>
    <template v-if="data.showHelpText">
      <span style="white-space:normal ">{{data.getLocString('pe.conditionHelp')}}</span>
      
      <div v-if="data.hasLocString('pe.conditionShowMoreUrl')">
          <a :href="data.getLocString('pe.conditionShowMoreUrl')"
          target="_blank">{{data.getLocString('pe.showMore')}}</a>
      </div>
    </template>
</div>
</template>
<script>
    import { SurveyPropertyConditionEditor } from '@/js/propertyEditors/propertyConditionEditor'
    import * as vueAceEditor  from "vue2-ace-editor";

  export default {
    name:"PropertyEditor-conditionContent",
    props: {
      data:{
        type:Object,
        required: false,
      }
    },
    data() {
      return {
        ...this.data,
        value:{}
      }
    },
    components:{
     aceEditor: vueAceEditor,
    },
    methods: {
      sunyytest:function(){
        console.log(this)
        console.log(this.data)
      },
      aceInput:function(){
        var errors = createAnnotations(
         editor.getValue(),
         objectEditor.syntaxCheckMethodName
       );
       isUpdating = true;
       objectEditor.koTextValue(editor.getValue());
       isUpdating = false;
       objectEditor.koHasError(errors.length > 0);
       if (errors.length > 0) {
         objectEditor.koErrorText(errors[0].text);
       }
       editor.getSession().setAnnotations(errors);
      },
      editorInit() {
            require('brace/ext/language_tools') //language extension prerequsite...
            require('brace/mode/html')                
            require('brace/mode/javascript')    //language
            require('brace/mode/json')
            require('brace/theme/clouds')
            require('brace/snippets/javascript') //snippet
      },
      setCompletions (editor, session, pos, prefix, callback) {
        var jsonEditor=this.editor.jsonEditor
        editor.getSession().setAnnotations(jsonEditor.createAnnotations(jsonEditor.text, jsonEditor.textWorker.errors))
      }
    },
    watch: {
      koAddConditionQuestion:function(){
        this.koAddConditionValue("");
        this.onValueSurveyChanged(newValue, self.koAddConditionOperator());
      },
      koAddConditionOperator:function(newValue) {
        this.data.onValueSurveyChanged(this.data.koAddConditionQuestion, newValue);
      }
    },
  }
</script>

<style scoped>

</style>