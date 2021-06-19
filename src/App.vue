<template>
  <div id='app'>
    <router-view class="router-view"/>
  </div>
</template>

<style lang="scss">
@import "~@/assets/style/helper.scss";
@import "~@/assets/style/reset.scss";
html{
  //height: 100vh; 会导致移动端上部被浏览器地址栏占住
  height: 100%;
}
body {
  margin: 0 auto;
  height: 100%;
}

#app {
  max-width: 500px;
  position: relative;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}
@media screen and (min-width: 500px){
  #app {
    margin-left: auto;
    margin-right: auto;
  }
}

.router-view {
  //position: absolute;
  //top: 0;
  //left: 0;
  width: 100%;
  height: 100%;
}

</style>
