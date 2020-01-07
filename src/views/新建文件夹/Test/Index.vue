<template>
  <div id="test">
    {{simpleWeather}}
  </div>
</template>
<script>
  import { Component, Vue } from 'vue-property-decorator';
  @Component({
    components: {

    }
  })
  export default class App extends Vue {
    created() {
      var THIS=this
      this.$axios({
        method: 'get',
        url: 'http://pv.sohu.com/cityjson',
      }).then(function (response) {
        // debugger
        THIS.$set(THIS, "simpleWeather", response);
      }).catch(function(response){
        // debugger
      })
      this.$axios({
        method: 'get',
        url: '/apijuhe/simpleWeather/query',
        params: {
          key:"59d284b7457f6375370b179635c95544",
          city:"北京"
        }
      }).then(function (response) {
        THIS.$set(THIS, "simpleWeather", response.data);

      }).catch(function(){
      })
    }
    data() {
      return {
        simpleWeather:{}
      }
    }
  }
</script>
<style>
</style>