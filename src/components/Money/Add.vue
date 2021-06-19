<template>
  <Layout>
    <div slot="header" class="mainTitle">
      <Icon class="leftIcon" name="left" @click="goBack"/>
      <span class="title">{{moneyType}}新标签</span>
      <span class="rightIcon"></span>
    </div>
    <div slot="body">
      <TagInfo v-model="categoryName"/>
      <icon-list v-model="categoryIcon"/>
      <div class="-button-wrapper">
        <a-button @click="save">确定</a-button>
      </div>
    </div>

  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import customTagList from "@/constants/customTagList";
import {Component} from "vue-property-decorator";
import IconList from "@/components/Money/IconList.vue";
import TagInfo from "@/components/Money/TagInfo.vue";

@Component({
  components: {
    TagInfo,IconList
  }
})
export default class Add extends Vue{

  categoryIcon = customTagList[0]
  categoryName = ''

  get moneyType(){
    const map = {
      'expense': '支出',
      'income' : '收入'
    }
    return map[this.$route.params.type as moneyType]
  }
  save(){
    this.$store.commit('fetchTags')
    const names = this.$store.state.tagList.map((tag: {name: any}) => tag.name)
    if(this.categoryName.length === 0){
      this.$warning({
        centered: true,
        title: '标签名不能为空',
        content: '请输入标签名'
      })
    }else if(names.indexOf(this.categoryName) >= 0){
      this.$warning({
        centered: true,
        title: '标签名重复了',
        content: '请重新输入'
      })
      this.categoryName = ''
    }else {
      this.$store.commit('createTag',{
        svg: this.categoryIcon,
        type: this.$route.params.type as moneyType,
        name: this.categoryName.trim()
      })
      this.$message.success({
        content: '已保存',
        duration: 1
      })
      this.categoryName = ''
      this.$router.push('/money')
    }
  }
  goBack(){
    this.$router.back()
  }

}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.mainTitle {
  font-weight: bold;
  font-size: larger;
  height: 50px;
  background: #F8F8F8;
  display: flex;
  align-items: center;
  justify-content: space-between;
  > .leftIcon{
    width: 24px;
    height: 24px;
  }
  > .rightIcon{
    width: 24px;
    height: 24px;
  }
}

//.scrollArea {
//  height: 30vh;
//  overflow: auto;
//}

.-button-wrapper {
  height: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;

  button {
    height: 40px;
    cursor: pointer;
    width: 80%;
    background: $color-highlight;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 0;
    color: white;
    font-weight: bold;
    border-radius: 20px;
  }
}
</style>