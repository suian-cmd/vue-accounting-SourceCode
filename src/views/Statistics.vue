<template>
  <Layout>
    <Tabs class-prefix = 'type'
          :data-source = 'recordTypeList' :value.sync = 'type'/>
    <Tabs class-prefix="interval"
          :data-source='intervalList' :value.sync = 'interval' />
    <ol v-if="groupedList.length > 0">
      <li v-for="(group, index) in groupedList" :key="index">
        <h3 class="title">
          {{beautify(group.title)}}
          <span>￥ {{group.total}}</span>
        </h3>
        <ol>
          <li class="record" v-for="(item,index) in group.items" :key="index">
            <span>{{tagString(item.tags)}}</span>
            <span class="notes">{{item.notes}}</span>
            <span>￥ {{item.amount}}</span>
          </li>
        </ol>
      </li>
    </ol>
    <div v-else class="noResult">
      目前没有相关记录
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import {Component} from "vue-property-decorator";
import dayjs from "dayjs";
import clone from "@/lib/clone";
import recordTypeList from "@/constants/recordTypeList";
import intervalList from "@/constants/intervalList";
import Tabs from "@/components/Tabs.vue";
@Component({
  components: {Tabs}
})
export default class Statistics extends Vue{

  beforeCreate(){
    this.$store.commit('fetchRecords')
  }
  type = '-'
  recordTypeList = recordTypeList
  interval = 'day'
  intervalList = intervalList

  tagString(tags: Tag[]){
    return tags.length === 0 ? '无' : tags.map(item => item.name).join(',')
  }

  beautify(string: string){
    const day = dayjs(string)
    const now = dayjs()
    if(day.isSame(now, 'day')){
      return '今天'
    }else if(day.isSame(now.subtract(1, 'day'), 'day')){
      return '昨天'
    }else if(day.isSame(now.subtract(2,'day'), 'day')){
      return '前天'
    }else if(day.isSame(now, 'year')){
      return day.format('M月D日')
    }else {
      return day.format('YYYY年M月D日')
    }
  }

  get recordList(){
    return (this.$store.state as RootState).recordList
  }

  get groupedList(){
    type Result = {
      title: string,
      total?: number,
      items: RecordItem[]
    }[]
    const {recordList} = this
    if(recordList.length === 0) {
      return [] as Result
    }
    const newList = clone(recordList).filter(r => r.type === this.type)
        .sort((a,b) => dayjs(b.createAt).valueOf() - dayjs(a.createAt).valueOf())
    const result: Result = [{title:dayjs(newList[0].createAt)
          .format('YYYY-MM-DD'), items: [newList[0]]}]
    for (let i = 1; i < newList.length; i++){
      const current = newList[i]
      const last = result[result.length - 1]
      if(dayjs(last.title).isSame(dayjs(current.createAt), 'day')){
        last.items.push(current)
      }else{
        result.push({title: dayjs(current.createAt)
              .format('YYYY-MM-DD'), items: [current]})
      }
    }
    result.map(group => {
      group.total = group.items.reduce((sum, item) => {
        return sum + item.amount
      },0)
    })
    //console.log(result)
    return result
  }

}
</script>

<style lang="scss" scoped>
//  ::v-deep深入到组件内部设置样式
  ::v-deep {
    .type-tabs-item{
      background: #c4c4c4;
      &.selected {
        background: white;
        &::after{
          display: none;
        }
      }
    }
    .interval-tabs-item {
      height: 48px;
    }
  }
  %item {
    padding: 8px 16px;
    line-height: 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .title{
    @extend %item
  }
  .record{
    background: white;
    @extend %item
  }
  .notes {
    //因为 justify-content: space-between; ，notes会居中
    //加上 margin-right: auto; 后会自动靠左
    margin-right: auto;
    margin-left: 16px;
    color: #999;
  }
  .noResult{
    padding: 16px;
    text-align: center;
  }
</style>