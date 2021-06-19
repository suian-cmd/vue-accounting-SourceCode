<template>
  <div class="month-wrapper">
    <a-month-picker placeholder="请选择月份" :allowClear="false"
                    @change="onChange"
                    :defaultValue="moment(getCurrentDate(),'YYYY-MM')"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {Component} from "vue-property-decorator";
import moment from "moment";

@Component
export default class ChooseMonth extends Vue{
  moment = moment

  onChange(date: object, dateString:string){
    this.$emit('update:value', dateString)
  }

  getCurrentDate(){
    const nowDay = moment(new Date()).format('YYYY-MM')
    this.$emit('update:value', nowDay)
    return nowDay
  }
}
</script>

<style lang="scss" scoped>
.month-wrapper{
  margin: 5px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  .ant-calendar-picker,.ant-input{
    width: 250px;
  }
}
</style>