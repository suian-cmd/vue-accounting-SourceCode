<template>
<!--  class-prefix = 'layout 配合 Layout组件设置样式-->
    <Layout class-prefix = 'layout'>
      <NumberPad :value.sync="record.amount" @submit="saveRecord" />
      <Types :value.sync="record.type" />
      <div class="notes">
        <FormItem
            field-name="备注"
            placeholder="在这里输入备注"
            @update:value="onUpdateNotes" />
      </div>
      <Tags :data-source="tags" @update:value="onUpdateTags" />
      {{recordList}}
    </Layout>
</template>

<script lang="ts">

import NumberPad from "@/components/Money/NumberPad.vue";
import Types from "@/components/Money/Types.vue";
import Tags from "@/components/Money/Tags.vue";
import Vue from "vue";
import {Component, Watch} from "vue-property-decorator";
import recordListModel from "@/models/recordListModel";
import FormItem from "@/components/Money/FormItem.vue";
import tagListModel from "@/models/tagListModel";

// 通过 window.localStorage 获取所有支出支入数据
const recordList: RecordItem[] = recordListModel.fetch()
tagListModel.fetch()

@Component({
  components: {FormItem, Tags,  Types, NumberPad}
})
export default class Money extends Vue{
  tags = tagListModel.data
  recordList: RecordItem[] = recordList
  record: RecordItem = {
    tags: [],
    notes: '',
    type: '-',
    amount: 0
  }

  onUpdateTags(value: string[]){
    this.record.tags = value
  }

  onUpdateNotes(value: string){
    this.record.notes = value
  }

  saveRecord(){
    // 深拷贝，如果直接赋值，会导致record2 和 this.record 引用的是同一对象
    const  record2: RecordItem = recordListModel.clone(this.record)
    record2.createAt = new Date()
    // console.log(record2.createAt.toLocaleDateString() + '--' + record2.createAt.toLocaleTimeString())
    // console.log(record2.createAt.toString())
    this.recordList.push(record2)
  }

  @Watch('recordList')
  onRecordListChange(){
    recordListModel.save(this.recordList)
  }

}
</script>

<style lang="scss" scoped>
.notes {
  padding: 12px 0;
  background: #e6e6e6
}
</style>