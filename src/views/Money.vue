<template>
<!--  class-prefix = 'layout 配合 Layout组件设置样式-->
    <Layout class-prefix = 'layout'>
      <NumberPad :value.sync="record.amount" @submit="saveRecord" />
<!--      <Types :value.sync="record.type" />-->
      <tabs :data-source="recordTypeList" :value.sync="record.type"/>
      <div class="notes">
        <FormItem
            field-name="备注"
            placeholder="在这里输入备注"
            :value="record.notes"
            @update:value="onUpdateNotes" />
      </div>
      <Tags @update:value="onUpdateTags" />
      {{this.recordList}}
    </Layout>
</template>

<script lang="ts">

import NumberPad from "@/components/Money/NumberPad.vue";
import Tags from "@/components/Money/Tags.vue";
import Vue from "vue";
import {Component, Watch} from "vue-property-decorator";
import FormItem from "@/components/Money/FormItem.vue";
import Tabs from "@/components/Tabs.vue";
import recordTypeList from "@/constants/recordTypeList";

@Component({
  components: {Tabs, FormItem, Tags, NumberPad}
})
export default class Money extends Vue{
  get recordList(){
    return this.$store.state.recordList
  }

  recordTypeList = recordTypeList

  record: RecordItem = {
    tags: [],
    notes: '',
    type: '-',
    amount: 0
  }

  created(){
    this.$store.commit('fetchRecords')
  }

  onUpdateTags(value: Tag[]){
    this.record.tags = value
  }

  onUpdateNotes(value: string){
    this.record.notes = value
  }

  saveRecord(){
    this.$store.commit('createRecord',this.record)
    this.record.tags = []
    this.record.notes = ''
  }

}
</script>

<style lang="scss" scoped>
.notes {
  padding: 12px 0;
  background: #e6e6e6
}
</style>