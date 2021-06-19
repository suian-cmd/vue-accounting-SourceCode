<template>
  <Parts>
    <p slot="title">日期</p>
    <div slot="content">
      <a-date-picker placeholder="选择日期" :allowClear="false"
                     :defaultValue="moment(getCurrentDate(),
                     'YYYY-MM-DD')"
                     @change="selectDate"/>
    </div>
  </Parts>
</template>

<script lang="ts">
import Vue from "vue";
import {Component} from "vue-property-decorator";
import Parts from "@/components/Money/Parts.vue";
import moment, { Moment } from "moment";

@Component({
  components: {
    Parts
  }
})
export default class DatePicker extends Vue{
  moment = moment

  getCurrentDate(){
    this.$emit('update:value',moment(new Date()).format('YYYY-MM-DD'))
    return moment(new Date()).format('YYYY-MM-DD')
  }
  //系统会自动传入两个参数
  selectDate(day:Moment,dateString:string){
    // console.log(dateString)
    const selectedDate = day.format().substring(0,10);
    this.$emit('update:value',selectedDate)
  }
}
</script>

<style lang="scss" scoped>
.ant-input{
  background: #FEF0EB;
  font-weight: bold;
  font-size: large;
}
</style>