<template>
  <div class="layout-wrapper" :class="classPrefix && `${classPrefix}-wrapper`">
    <div class="content" :class="classPrefix && `${classPrefix}-content`">
      <slot/>
    </div>
    <Nav/>
  </div>
</template>

<script lang="ts">
export default {
  name: "Layout",
  props: ['classPrefix']
}
</script>

<style lang="scss" scoped>
  .layout-wrapper{
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
  .layout-content {
    display: flex;
    //让内容往下边挤
    flex-direction: column-reverse;
  }
  .content{
    flex-grow: 1;
    overflow: auto;
  }
</style>