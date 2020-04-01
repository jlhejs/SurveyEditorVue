// Bus.js
import Vue from 'vue'
export default function vueBus(data){
 return new Vue({ 
   data:data,
   watch: {
    vueIsDragging(val) {
     debugger
    }
  }
  })
}

