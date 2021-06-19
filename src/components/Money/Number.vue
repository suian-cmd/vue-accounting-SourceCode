<template>
  <Parts>
    <p slot="title" v-if="type === 'expense'">支出</p>
    <p slot="title" v-else>收入</p>
    <label slot="content">
      <a-input type="number"
               onfocus="if(value === '0'){value=''}"
               onblur="if(isNaN(value) || value.trim()===''){value='0'}"
               :value="commaAmount"
               @input="onValueChange"
               />
    </label>
  </Parts>
</template>

<script lang="ts">
import Vue from "vue";
import {Component, Prop} from "vue-property-decorator";
import Parts from "@/components/Money/Parts.vue";

@Component({
  components:{
    Parts
  }
})
export default class Number extends Vue{
  @Prop() type!: string
  @Prop() value!: number

  get commaAmount(){
    // return this.value.toString().replace(/\D/g, "")
    //     .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return this.value.toString()
  }

  onValueChange(event: InputEvent){
    const input =  (event.currentTarget as HTMLInputElement)
    const output = parseFloat(input.value) || 0;
    this.$emit('update:value', output)
  }
}
</script>

<style lang="scss" scoped>
.ant-input {
  background: #FEF0EB;
  font-weight: bold;
  font-size: large;
}
</style>