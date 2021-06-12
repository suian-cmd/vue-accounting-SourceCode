<template>
  <nav>
<!--    active-class="selected"选中链接后，class会自动添加selected-->
    <router-link to="/money" class="item" active-class="selected">
      <Icon class="icon" name="money"/>
      记账
    </router-link> |
    <router-link to="/labels" class="item" active-class="selected">
      <Icon class="icon" name="label"/>
      标签
    </router-link> |
    <router-link to="/statistics" class="item" active-class="selected">
      <Icon class="icon" name="statistics"/>
     统计
    </router-link>
  </nav>
</template>

<script lang="ts">

export default {
  name: "Nav"
}
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/helper.scss";
  nav {
    //box-shadow: 0 0 3px rgba(0, 0, 0, 0.25);  等价于
    @extend %outerShadow;
    display: flex;
    flex-direction: row;
    font-size: 12px;
    > .item {
      padding: 2px 0;
      width:  33.33333%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .icon {
        width: 32px;
        height: 32px;
      }
    }
    > .item.selected{
      color: $color-highlight;
    }
  }

</style>