<template>
    <div class="overlay" @click="onClick" v-show="show">
      <slot></slot>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import {Component, Prop} from "vue-property-decorator";

@Component
export default class Overlay extends Vue{
  @Prop({default:false, type: Boolean}) readonly show!: boolean
  @Prop({default:'body',type:String}) readonly  container!: string

  onClick(e: Event){
    this.$emit('click',e)
  }
}
</script>

<style lang="scss" scoped>
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
  transform: translateZ(0);
}
</style>