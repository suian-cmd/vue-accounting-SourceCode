<template>
  <div>
    <ul class="types">
      <li :class="value === '-' && 'selected'" @click="selectType('-')">支出</li>
      <li :class="value === '+' && 'selected'" @click="selectType('+')">收入</li>
    </ul>
  </div>
</template>

<script lang="ts">

import Vue from "vue";
import {Component, Prop} from "vue-property-decorator";

@Component
export default class Types extends Vue{
  @Prop() readonly value!: string
  selectType(type: string){
    if(type !== '-' && type !== '+'){
      throw new Error('type is unknown')
    }
    this.$emit('update:value', type)
  }


 // @Prop(String) test: string | undefined;
  // string | undefined 为编译时数据类型，
  // 如果编译时发生报错，则不会运行，直接跳过这段代码，会在终端提示错误，不会在console提示错误
  // String 为运行时数据类型，如果运行时发生错误，会执行该代码，并在终端和console报错


}


// export default {
//   name: "Types",
//   data() {
//     return {
//       type : '-'   // '-' 为支出， '+' 为收入
//     }
//   },
//   props : [ 'test' ],
//   methods : {
//     selectType(type) {
//       console.log(this.test)
//       if (type !== '-' && type !== '+'){
//         throw new Error('type is unknown')
//       }
//       this.type = type
//     }
//   }
// }
</script>

<style lang="scss" scoped>
.types {
  background: #c4c4c4;
  display: flex;
  text-align: center;
  font-size: 24px;
  > li {
    width: 50%;
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    &.selected::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: #333;
    }
  }
}
</style>