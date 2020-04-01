 <template>
  <div id="surveyjsJSONEditor" class="surveyjsJSONEditor">
  <aceEditor v-model="jsonEditor.text"
    @init="editorInit" 
    @input="jsonEditor.onJsonEditorChanged()"
    @setCompletions="setCompletions"
    lang="json"
    theme="clouds" width="100%" height="calc(100vh - 40px)"></aceEditor>
  </div>
</template>
<script>
  import * as vueAceEditor  from "vue2-ace-editor";
// https://blog.csdn.net/qq_36571506/article/details/84313159
  export default {
    name:"TemplateEditor",
    props: {
      editor: {
        type: Object,
        required: true
      }
    },
    components:{
     aceEditor: vueAceEditor,
    },
    methods:{
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
    data() {
      return {
        jsonEditor:this.editor.jsonEditor
      }
    },
    updated() {
    },
    computed: {
    }
  }
</script>
<style scoped>
  .ace_print-margin{}
</style> 