<template>
  <el-container class="editor-container editor-test" >
    <el-header class="editor-test-header">
      <span class="editor-test-header-nav" v-if="editor.surveyLive.pages.length > 1 && editor.surveyLive.showPagesInTestSurveyTab">
        koShowPagesInTestSurveyTab editor.surveyLive.pages.
      </span>

      <span class="editor-test-header-nav" v-if="editor.surveyLive.showDefaultLanguageInTestSurveyTab">
        {{editor.surveyLive.showInvisibleElementsText}}
        <el-checkbox v-model="editor.surveyLive.showInvisibleElements" @change="changeShow"></el-checkbox>
      </span>

      <span class="editor-test-header-nav" v-if="editor.surveyLive.showDefaultLanguageInTestSurveyTab">
        {{editor.surveyLive.localeText}}
        <el-select v-model="editor.surveyLive.activeLanguage" :placeholder="editor.surveyLive.simulatorText" size="mini" >
          <template v-for="item in editor.surveyLive.languages">
            <el-option :label="item.text" :value="item.value" ></el-option>
          </template>
        </el-select>
      </span>

      <span class="editor-test-header-nav" v-if="editor.surveyLive.simulatorEnabled">
        {{editor.surveyLive.simulatorText}}
        <el-select v-model="editor.surveyLive.activeDevice" :placeholder="editor.surveyLive.simulatorText" size="mini" >
          <template v-for="item in editor.surveyLive.devices">
            <el-option :label="item.text" :value="item.value" ></el-option>
          </template>
        </el-select>
      </span>
    </el-header>
    <el-main>
      <Survey :survey="this.editor.surveyLive.survey"></Survey>
      {{editor.surveyLive.json}}
    </el-main>
    
  </el-container>
</template>
<script>
  import {Survey} from 'survey-vue'
  export default {
    name:"TemplateLive",
    props: {
      editor: {
        type: Object,
        required: true
      }
    },
    components:{
      Survey
    },
    methods:{
      changeShow:function(){
        this.editor.surveyLive.survey.showInvisibleElements = this.editor.surveyLive.koShowInvisibleElements;
      }
    },
    data() {
      return {
      }
    },
    updated() {
      console.log(this.editor.surveyLive)
    },
    computed: {

    }
  }
</script>
<style scope>
.editor-container{
  padding: 20px;
} 
</style>