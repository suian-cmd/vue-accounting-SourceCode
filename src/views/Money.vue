<template>
    <Layout>
      <Tabs slot="header" :data-source="recordTypeList" :value.sync="record.type"/>
      <div slot="body" class="body">
        <div class="parts-wrapper">
          <DatePicker @update:value = 'record.createAt = $event'/>
          <Notes placeholder="请在这里输入备注" :value.sync="record.notes"/>
          <Number :value.sync="record.amount" :type="record.type"/>
          <Tags :type="record.type" :selectedTag.sync="record.tag" />
        </div>
        <div class="-button-wrapper">
          <a-button @click='saveRecord'>确定</a-button>
        </div>
      </div>
    </Layout>
</template>

<script lang="ts">

import Tags from "@/components/Money/Tags.vue";
import Vue from "vue";
import {Component, Watch} from "vue-property-decorator";
import FormItem from "@/components/Money/FormItem.vue";
import Tabs from "@/components/Tabs.vue";
import Number from "@/components/Money/Number.vue";
import recordTypeList from "@/constants/recordTypeList";
import Notes from "@/components/Money/Notes.vue";
import DatePicker from "@/components/Money/DatePicker.vue";

@Component({
  components: {Tabs, FormItem, Tags, Notes, Number, DatePicker}
})
export default class Money extends Vue{
  beforeCreate(){
    this.$store.commit('fetchRecords')
    this.$store.commit('fetchTags')
  }
  // get recordList(){
  //   return this.$store.state.recordList
  // }

  recordTypeList = recordTypeList

  record: RecordItem = this.initRecord()
  initRecord() : RecordItem {
    return {
      tag: this.$store.state.tagList.filter((tag: Tag) => tag.type === 'expense')[0],
      notes:'',
      type: 'expense',
      amount: 0,
      createAt:""
    }
  }

  saveRecord(){
    const _this = this
    if(this.record.amount === 0) {
      this.$confirm({
        content: '金额为 0， 确定吗？',
        okText: '确定',
        cancelText: '取消',
        centered: true,
        onOk(){
          _this.$store.commit('createRecord',_this.record)
          _this.$message.success({content: '已保存',duration:1});
        }
      })
    } else{
      _this.$store.commit('createRecord',_this.record)
      _this.$message.success({content: '已保存',duration:1});
    }
    this.record.amount = 0
    this.record.notes = ''
  }

}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.body {
  height: 100%;
  //::-webkit-scrollbar{
  //  display: none;
  //}
  .parts-wrapper {
    //min-height: 70%;
    //max-height: 90%;
    height: 85%;
    overflow: auto;
  }

  .-button-wrapper {
    height: 15%;
    display: flex;
    justify-content: center;
    align-items: center;


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
}
</style>