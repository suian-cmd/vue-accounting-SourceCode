<template>
  <div>
    <p slot="title">标签</p>
    <div class="scrollArea">
      <ul class="tagList" slot="content">
        <li v-for="(tag,index) in filteredList" :key="index">
          <div class="icon-wrapper"
               :class="{selected: tag.name === selectedTag.name}"
                @click='select(tag)'>
                <Icon :name="tag.svg"></Icon>
            {{tag.name}}
          </div>
        </li>
        <li>
          <div class="icon-wrapper" @click="edit"> 编辑 ></div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {Component, Prop, Watch} from "vue-property-decorator";


@Component
export default class Tags extends Vue{
  @Prop() selectedTag!: Tag
  @Prop() type!: string

  created(){
    this.$store.commit('fetchTags')
  }
  get filteredList(){
    return this.$store.state.tagList.filter((tag: Tag) => tag.type === this.type)
  }

  @Watch('type')
  updateCategory(){
    // if(this.type === 'income'){
    //   this.select({name: '工资', type: 'income', id: '', svg: '工资'})
    // }else{
    //   this.select({name: '饮食费', type: 'expense', id: '', svg: '饮食费'})
    // }
    this.select(this.$store.state.tagList.filter((tag: Tag) => tag.type === this.type)[0])
  }

  select(tag: Tag){
    this.$emit('update:selectedTag', tag)
  }
  edit(){
    this.$router.push('/money/edit')
  }
}
</script>

<style lang="scss" scoped>
p {
  padding: 10px 20px;
  font-weight: bold;
}

.scrollArea {
  max-height: 50vh;

  .tagList {
    padding: 0 10px;
    display: flex;
    flex-wrap: wrap;
    align-items: start;

    > li {
      width: 33.333%;
      height: 20%;
      display: flex;
      align-items: center;
      justify-content: center;

      .icon-wrapper {
        border: 1px solid lightgray;
        margin-bottom: 10px;
        border-radius: 10px;
        width: 80%;
        height: 50px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        &.selected {
          box-shadow: 1px 2px 2px lightgray;
          background: #FEF0EB;

          svg {
            animation: shake 0.3s linear;
          }
        }
      }
      svg {
        margin-top: 2px;
        height: 50px;
        width: 50px;
      }

      @keyframes shake {
        0% {
          transform: rotate(0deg);
        }
        20% {
          transform: rotate(20deg);
        }
        40% {
          transform: rotate(0deg);
        }
        80% {
          transform: rotate(-20deg);
        }
        100% {
          transform: rotate(0deg);
        }
      }
    }
  }
}
</style>