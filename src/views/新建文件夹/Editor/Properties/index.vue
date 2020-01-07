<template>
    <div class="svd_properties svd-light-border-color svd-light-bg-color">
        <div class="svd_object_selector svd-light-border-color">
            <div class="objectSelector">
              <input type="text" v-model="sunyy">
                <el-select v-model="sunyy" placeholder="请选择">
                    <el-option
                      v-for="item in koObjects"
                      :label="item.text()"
                      :value="item.id">
                    </el-option>
                </el-select>
                <el-button round :title="editor.getLocString('ed.editSelObject')" icon="el-icon-edit" circle  size="mini" @click="editor.editCurrentObject()"></el-button>

            </div>
        </div>
        {{editor.showPropertyGrid}} 
    </div>
</template>
<script>
    import { Component, Vue } from 'vue-property-decorator';
    console.log(this)

    @Component({
      props: {
        editor: {
          required: true,
          type: Object,
        },
      },
      data() {
        return {
          value: "test",
          activeNames: "test"
        }
      },
      methods: {
        
      },
      components: {
  
      },
      computed: {
        
      },
      created () {
        console.log("properties/index")
        // debugger
      } 
    })
    export default class properties extends Vue {
      get koObjects() {
        let koObjects = this.editor.koObjects();
        koObjects.map(function(item){
          item.id=Math.random().toString(36).substr(-9)
        })
        return koObjects;
      }
      get koSelectedObject() {
        // debugger
        return "sunyinyu";
      }
      set koSelectedObject(value){
        koObjects.map(function(item){
          if(item.id==value){
            
          }
        })
      }
    }
    Vue.component("editor_properties", properties);

  </script>