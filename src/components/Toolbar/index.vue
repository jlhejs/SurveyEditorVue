<template>
  <div id="editor-toolbar">
    <template v-for="(item,key) in editor.toolbarItems">
      <template v-if="!item.template">
        <el-button  size="mini"  type="primary" plain 
        :key="key"
        class="action"
        :disabled="!item.enabled"
        :icon="item.icon"
        @click="item.action"
        >{{item.title}}</el-button>
      </template>

      <template v-else-if="item.template=='dropdown'">
        <el-dropdown  :key="key"   class="action">
          <el-button  size="mini" type="primary" plain>
            {{item.title}}<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          
          <el-dropdown-menu slot="dropdown">
            <template v-for="(menuitem,key) in item.items">
               <el-dropdown-item :key="key">{{menuitem.title}}</el-dropdown-item>
            </template>
          </el-dropdown-menu>
        </el-dropdown>
      </template>

      <template v-else-if="item.template=='roundButton'">
          <el-button  :key="key"  size="mini" type="success" icon="el-icon-search" circle   class="action"></el-button>

      </template>
     
    </template>
    
  </div>
</template>
<script>
  export default {
    name:"Toolbar",
    props: {
       editor: {
        required: true,
        type: Object,
      },
      
    },
    updated() {
    }
  }
</script>
<style scoped>
.action{
  margin-left: 10px;
}
</style>