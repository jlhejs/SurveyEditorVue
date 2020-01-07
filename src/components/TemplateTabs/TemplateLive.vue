<template>
  <el-container class="editor-container editor-test" >
    <el-header class="editor-test-header">
      <!-- <span class="editor-test-header-nav" v-if="editor.surveyLive.pages.length > 1 && editor.surveyLive.showPagesInTestSurveyTab">
        koShowPagesInTestSurveyTab editor.surveyLive.pages
      </span> -->

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

      <span class="editor-test-header-nav" v-if="editor.surveyLive.hasFrame()">
        {{editor.surveyLive.landscapeOrientationText}}
        <el-checkbox v-model="editor.surveyLive.landscapeOrientation" @change="changeShow" ></el-checkbox>
      </span>
    </el-header>

    <el-main>
        <el-row v-if="this.editor.surveyLive.hasFrame()"
        v-bind:style="{height:simulatorFrame.frameHeight,width:simulatorFrame.frameWidth}">
          <el-col :span="24"
          :class="[this.editor.surveyLive.landscapeOrientation?'xz':'','frame']" 
          >
            <img :src="this.editor.surveyLive.imgurl">
            <Survey :survey="this.editor.surveyLive.survey" class="hasFrameSurvey"  v-bind:style="simulatorFrame"></Survey>
          </el-col>
        </el-row>

        <el-row v-else>
          <el-col :span="24">
           <Survey :survey="this.editor.surveyLive.survey"></Survey> 
          </el-col>
        </el-row>
     
    </el-main>
    
  </el-container>
</template>
<script>
  import {Survey} from 'survey-vue'
  // var s=Survey
  // console.log(s)
  // debugger

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
        this.editor.surveyLive.survey.showInvisibleElements = this.editor.surveyLive.showInvisibleElements;
      }
    },
    data() {
      return {
        mobelShow:!this.editor.surveyLive.hasFrame()
      }
    },
    updated() {
      console.log(this.editor.surveyLive.survey)
    },
    computed: {
      showDialog:function(){
        return this.editor.surveyLive.hasFrame()
      },
      simulatorFrame:function(){
        var simulatorFrame= this.editor.surveyLive.simulatorFrame()
        if(!simulatorFrame){ return{}}
        // style: { width: koSimulatorFrame().width / koSimulatorFrame().scale + 'px', 
        // height: koSimulatorFrame().height / koSimulatorFrame().scale + 'px', 
        // top: koSimulatorFrame().frameY + 'px', 
        // left: koSimulatorFrame().frameX + 'px', 
        // transform: 'scale(' + koSimulatorFrame().scale + ')' }
        return {
          width:simulatorFrame.width / simulatorFrame.scale + 'px',
          height:simulatorFrame.height / simulatorFrame.scale + 'px',
          top:simulatorFrame.frameY + 'px',
          left:simulatorFrame.frameX + 'px',
          transform:'scale(' + simulatorFrame.scale + ')',
          frameHeight:simulatorFrame.frameHeight+"px",
          frameWidth:simulatorFrame.frameWidth+"px",
        }
      }

    }
  }
</script>
<style scoped>
.editor-test{
  padding: 20px 0;
}
.frame img{
  width:100%;
}
.simulator{

}
.hasFrameSurvey{
  position:absolute;
  left:0;
}
</style>