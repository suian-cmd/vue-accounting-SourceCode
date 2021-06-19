<template>
  <Layout>
    <Tabs slot="header" :data-source="recordTypeList"
          :value.sync="record.type"/>
    <div slot="body">
      <ChooseMonth @update:value = 'month = $event' class="top"/>
      <ul class="upper-wrapper">
        <li :class="{red: this.expense > 0}"
            @click="record.type = 'expense'">
          - {{this.expense | addComma}}
        </li>
        <li :class="{green: this.income > 0}"
            @click="record.type = 'income'">
          + {{this.income | addComma}}
        </li>
      </ul>
      <div class="down-wrapper">
          <span @click="comment"
                :class="{green: this.income > this.expense,
                red: this.expense > this.income}">
            共计： {{this.income-this.expense|addComma}}
          </span>
      </div>
      <Chart v-if="tagList.length > 0" class="chart"
             :options="chartOptions"/>
      <empty-data v-else/>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import {Component, Watch} from "vue-property-decorator";
import EmptyData from "@/components/Money/EmptyData.vue";
import ChooseMonth from "@/components/Calendar/ChooseMonth.vue";
import Tabs from "@/components/Tabs.vue";
import Chart from "@/components/Chart.vue";
import recordTypeList from "@/constants/recordTypeList";
import clone from "@/lib/clone";
import _ from 'lodash'

type HashTableValue = { title: string, item: number[]}
type hashTable = { [key: string] : HashTableValue}
type TagArray = { name: string, value: number}

@Component({
  components: {
    EmptyData, ChooseMonth, Tabs, Chart
  },
  filters:{
    addComma(amount: number){
      if(!amount){
        return '0'
      }
      return amount.toLocaleString()
    }
  }
})
export default class Reports extends Vue{
  beforeCreate(){
    this.$store.commit('fetchRecords')
    this.$store.commit('fetchTags')
  }
  month = ''
  expense = 0
  income = 0
  recordTypeList = recordTypeList
  record: RecordItem = this.initRecord()
  cloneList = clone(this.recordList).map(r =>_.pick(r,['createAt', 'amount', 'tag', 'type']) )

  initRecord(): RecordItem{
    return {
      tag: this.$store.state.tagList.filter((tag: Tag) => tag.type === 'expense')[0],
      notes: '',
      type: 'expense',
      amount: 0,
      createAt: ''
    }
  }
  get recordList() {
    return (this.$store.state as RootState).recordList;
  }
  get tagList(){
    let thisMonthList = []
    for(let i = 0; i < this.cloneList.length; i++){
      if(this.cloneList[i].createAt!.indexOf(this.month) > -1
          && this.cloneList[i].tag.type === this.record.type){
        thisMonthList.push(this.cloneList[i])
      }
    }
    const map = new Map()
    for(let i = 0; i < thisMonthList.length; i++){
      const tag: string = thisMonthList[i].tag.name
      const value: number = thisMonthList[i].amount
      if(map.has(tag)){
        const prevValue = map.get(tag)
        const currentValue = prevValue + value
        map.set(tag, currentValue)
      }else {
        map.set(tag, value)
      }
    }
    //展开后格式 [ ["饮食费", 3433],["交际费", 454] ]
    return [...map]
  }
  @Watch('month')
  updateBalance(){
    let thisMonthList = []
    for(let i = 0; i < this.cloneList.length; i++){
      if(this.cloneList[i].createAt!.indexOf(this.month) > -1){
        thisMonthList.push(this.cloneList[i])
      }
    }
    const totalMap = new Map()
    for(let i = 0; i < thisMonthList.length; i++){
      const type: string = thisMonthList[i].type
      const value: number = thisMonthList[i].amount
      if(totalMap.has(type)){
        const prevValue = totalMap.get(type)
        const currentValue = prevValue + value
        totalMap.set(type, currentValue)
      }else{
        totalMap.set(type, value)
      }
    }

    if(totalMap.get('income')){
      this.income = totalMap.get('income')
    }else{
      this.income = 0
    }
    if(totalMap.get('expense')){
      this.expense = totalMap.get('expense')
    }else{
      this.expense = 0
    }
    return this.expense & this.income
  }
  comment(){
    if(this.income - this.expense > 0){
      this.$success({
        centered: true,
        title: '富贵人家',
        content: '这个月会发财哦👏'
      })
    }else {
      this.$warning({
        centered:true,
        title: '贫穷人家',
        content: '请好好赚钱哦👏'
      })
    }
  }
  get chartOptions(){
    const tags = this.tagList.map(item => item[0])
    const  chartData = this.tagList.reduce((result, item) =>{
      result.push({ 'name': item[0] as string, 'value': item[1] as number})
      return result
    }, [] as TagArray[])
    return {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {

        top: '5%',
        left: 'center',
        data: tags
      },

      series: [
        {
          name: '金额',
          type: 'pie',
          radius: '55%',
          center: ['50%', '50%'],
          data: chartData,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]

    }
  }

}
</script>

<style lang="scss" scoped>

  @import "~@/assets/style/helper.scss";
  %amount{
    height: 50px;
    display: block;
    text-align: center;
    line-height: 50px;
    width: 120px;
    font-weight: bold;
    border: 1px solid lightgray;
    border-radius: 10px;
    box-shadow: 1px 2px 2px lightgray;
    margin: 5px;
    color: lightgray;

    &.red{
      color: $color-minus;
    }
    &.green{
      color: $color-plus;
    }
  }

  .top{
    margin-top: 15px;
  }
  .upper-wrapper{
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px 0;
    :hover{
      cursor: pointer;
    }

    li{
      @extend %amount;
    }
  }
  .down-wrapper{
    span {
      @extend %amount;
    }
    display: flex;
    justify-content: center;
  }


</style>