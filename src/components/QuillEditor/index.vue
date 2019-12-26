<template>
  <div class="editor-quill-editor">
    <quillEditor 
    v-model="content"
    :ref="refRandom"
    :options="editorOption"
    @change="onEditorChange($event)" 
    @blur="onEditorBlur($event)" 
    @focus="onEditorFocus($event)"></quillEditor>
  </div>
</template>
<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
  export default {
    name:"QuillEditor",
    components: {
      quillEditor
    },
    props: {
      options:{
        type: Object,
        required: false
      }
 
    },
    data() {
      return {
        content:"",
        refRandom:this._.randomStrNum(10)
      }
    },
    computed: {
      quillEditorModel:function() {
        return this.$refs[this.refRandom].quill
      },
      editorOption:function(){
        var self=this;
        var defalueOption={
          theme:'snow',
          modules: {
            toolbar:  [
              [{ 'color': [] }, { 'background': [] },'bold', 'italic', 'underline', 'strike'],
              ['blockquote', 'code-block'],
              [{ 'list': 'ordered' }, { 'list': 'bullet' }],
              [{ 'script': 'sub' }, { 'script': 'super' }],
              [{ 'indent': '-1' }, { 'indent': '+1' }],
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
              [{ 'align': [] }],
              ['clean'],
              ['link', 'image', 'video']
            ],
          }
        }
        return this._.extend(defalueOption,self.options)
      }
    },
    methods:{
      onEditorBlur(value){
        // 失去焦点事件
        this.$emit('blur', this.content)
        console.log(value)
      }, 
      onEditorFocus(){
        // 获得焦点事件
        this.$emit('foucs', this.content)
        console.log(this)
      }, 
      onEditorChange(){
        // 内容改变事件
        this.$emit('change', this.content)
        console.log(this)
      }, 
    }
    
  }
</script>
