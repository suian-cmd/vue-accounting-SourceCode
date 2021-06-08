<template>
  <svg class="icon">
    <use :xlink:href="'#' + this.name"/>
  </svg>
</template>

<script lang="ts">
// import  x from '@/assets/icons/money.svg'
// console.log(x)

try {
  let importAll = (requireContext: __WebpackModuleApi.RequireContext) =>
      requireContext.keys().forEach(requireContext); //这里ts语言不认识requireContext，需要明确其类型
  importAll(require.context("../assets/icons", true, /\.svg$/));
} catch (err) {
  console.log(err);
}

export default {
  name: "Icon",
  props: ['name']
}
</script>

<style lang="scss" scoped>
.icon {
  width: 1em; height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>