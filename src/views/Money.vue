<template>
    <Layout>
        <p>Money</p>
    </Layout>
</template>

<script lang="ts">
// 已经全局引入，不需要再局部引入，直接使用即可
// import Nav from "@/components/Nav.vue";
export default {
  name: "Money",
  // components: {Nav}
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
p{
  color: $red;
}

</style>