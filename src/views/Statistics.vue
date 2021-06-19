<template>
  <Layout>
    <Tabs class-prefix = 'type'
          :data-source = 'recordTypeList' :value.sync = 'type'/>
    <Tabs class-prefix="interval"
          :data-source='intervalList' :value.sync = 'interval' />
    <div class="chart-wrapper" ref="chartWrapper">
      <Chart class="chart" :options="chartOptions"></Chart>
    </div>
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
import Chart from "@/components/Chart.vue";
import _ from 'lodash';
@Component({
  components: {Tabs, Chart}
})
export default class Statistics extends Vue{

  beforeCreate(){
    this.$store.commit('fetchRecords')
  }
  mounted(){
    const div = (this.$refs.chartWrapper as HTMLDivElement)
    div.scrollLeft = div.scrollWidth
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
    if(newList.length === 0) {
      return [] as Result
    }
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
    return result
  }

  get keyValueList(){
    const today = new Date()
    const array = []
    for(let i = 0; i <= 29; i++){
      const dateString = dayjs(today).subtract(i, "day").format('YYYY-MM-DD')
      const found = _.find(this.groupedList, {
        title: dateString
      })
      array.push({
        key: dateString, value: found ? found.total : 0
      })
    }
    array.sort((a,b) => {
      if(a.key > b.key){
        return 1
      }else if(a.key === b.key){
        return 0
      }else{
        return -1
      }
    })
    return array
  }

  get chartOptions(){
    const keys = this.keyValueList.map(item => item.key)
    const values = this.keyValueList.map(item => item.value)
    return {
      grid: {
        left: 0,
        right: 0
      },
      xAxis: {
        type: 'category',
        data: keys,
        axisTick: {alignWithLabel: true},
        axisLine: {linkStyle: {color: '#666'}},
        axisLabel: {
          formatter: function (value: string, index:string){
            return value.substr(5)
          }
        }
      },
      yAxis: {
        type: 'value',
        show: false
      },
      series: [{
        symbol: 'circle',
        symbolSize: 12,
        itemStyle: {borderWidth: 1, color: '#666', borderColor: '#666'},
        data: values,
        type: 'line'
      }],
      tooltip: {
        show: true,
        triggerOn: 'click',
        position: 'top',
        formatter: '{c}'
      }
    }
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
  .chart {
    // 每屏显示七个数据
    width: 430%;
    &-wrapper {
      overflow: auto;
      &::-webkit-scrollbar{
        display: none;
      }
    }
  }
</style>