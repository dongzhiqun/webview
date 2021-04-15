<template>
  <div class="view-model-box">
    <div class="view-model-header">
      <p>核心指标<span>截止至当日{{viewData.stopTime}}数据</span></p>
    </div>
    <div class="view-model-stics">
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="model-applation-num">
            <div>
              <p>累计应用数（个）<img src="@/assets/question-icon-fff.png"
                     alt="创建应用总数"
                     title="创建应用总数"></p>
              <span>{{viewData.clientCount.clientCount}}</span>
              <p></p>
            </div>
            <img src="@/assets/card01.png"
                 alt="这是个啥啊">
          </div>
        </el-col>
        <el-col :span="8">
          <div class="model-sub-basic">
            <div>
              <p>累计订阅能力数（个）<img src="@/assets/question-icon-fff.png"
                     alt="能力被订阅成功的总数"
                     title="能力被订阅成功的总数"></p>
              <span>{{viewData.capInfoCount.subscribeNums}}</span>
              <p><span>当日<i> {{viewData.capInfoCount.toDay}}</i></span><span>较昨日<i>{{viewData.capInfoCount.increase}}</i></span><span>同比<i :class="[parseFloat(viewData.capInfoCount.percent) >= 0 ? 'el-icon-top' : 'el-icon-bottom']">{{viewData.capInfoCount.percent}}</i></span></p>
            </div>
            <img src="@/assets/card02.png"
                 alt="">
          </div>
        </el-col>
        <el-col :span="8">
          <div class="model-cum-basic">
            <div>
              <p>累计能力调用数（个）<img src="@/assets/question-icon-fff.png"
                     alt="能力调用成功/失败总次数"
                     title="能力调用成功/失败总次数"></p>
              <span>{{viewData.callCount.totalCapInvokeNum}}</span>
              <p><span>当日<i>{{viewData.callCount.todayCapInvokeNum}}</i></span><span>较昨日<i>{{viewData.callCount.increase}}</i></span><span>同比<i :class="[parseFloat(viewData.callCount.capInvokeYoy) >= 0 ? 'el-icon-top' : 'el-icon-bottom']">{{viewData.callCount.capInvokeYoy}}</i></span></p>
            </div>
            <img src="@/assets/card03.png"
                 alt="">
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="view-model-check">
    </div>
    <div>
      <div class="canvas-title">
        <p>应用活跃趋势图<img src="@/assets/question-icon.png"
               alt="提供查询的时间范围内，应用调用情况，反应应用使用活跃度趋势"
               title="提供查询的时间范围内，应用调用情况，反应应用使用活跃度趋势"></p>
      </div>
      <div id="myCharts"
           ref="myCharts"
           style="width: 100%; height: 450px;"></div>
    </div>
    <div class="view-model-table">
      <div class="view-model-title">
        <p>应用情况统计<img src="@/assets/question-icon.png"
               alt="查询时间范围内，应用创建、订阅、调用情况等整体情况；"
               title="查询时间范围内，应用创建、订阅、调用情况等整体情况；"></p>
      </div>
      <div>
        <el-table :data="viewData.clientList"
                  show-summary
                  :summary-method="getSummaries"
                  style="width: 100%">
          <el-table-column label="应用名称"
                           prop="clientName"
                           min-width="14%">
          </el-table-column>
          <el-table-column label="接入方式"
                           :formatter="accessFoematter"
                           prop="clientAccessType"
                           min-width="14%">
          </el-table-column>
          <el-table-column prop="subscribeSuccessNum"
                           label="订阅成功次数"
                           min-width="14%">
          </el-table-column>
          <el-table-column prop="subscribeNum"
                           label="订阅能力个数"
                           min-width="14%">
          </el-table-column>
          <el-table-column prop="callNum"
                           label="能力调用次数"
                           min-width="14%">
          </el-table-column>
          <el-table-column label="能力调用分布">
            <el-table-column prop="callSuccessNum"
                             label="能力调用成功次数"
                             min-width="15%">
            </el-table-column>
            <el-table-column prop="callFailNum"
                             label="能力调用失败次数"
                             min-width="15%">
            </el-table-column>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
// import { getViewModel } from '@/api/applation.js'
import { getDictionaryText } from '@/utils/common'
export default {
  name: 'view-model',
  data () {
    return {
      getDictionaryText: getDictionaryText,
      dataForm: {
        endTime: '',
        searchKey: '',
        startTime: '',
        timeType: 'day'
      },
      calder01: '',
      calder02: '',
      viewData: {
        clientCount: {
          clientCount: '0'
        },
        capInfoCount: {
          subscribeNums: '0',
          toDay: '0',
          increase: '0',
          percent: '0'
        },
        callCount: {
          totalCapInvokeNum: '0',
          todayCapInvokeNum: '0',
          increase: '0',
          capInvokeYoy: '0'

        }
      },
      tableData: []
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.getAllData()
    },
    getAllData () {
      // getViewModel(this.dataForm).then((res) => {
      //   if (res.code === '0') {
      //     this.viewData = res.data
      //     this.myEcharts(res.data)
      //   }
      // })
    },
    checkval () {
      this.dataForm.startTime = this.calder01
      this.getAllData()
    },
    checkvalT () {
      this.dataForm.endTime = this.calder02
      this.getAllData()
    },
    accessFoematter (row) {
      return getDictionaryText('clientAccessType', row.clientAccessType === null ? row.clientAccessType : parseInt(row.clientAccessType))
    },
    viewModelMouth () {
      this.dataForm.startTime = ''
      this.dataForm.endTime = ''
      this.dataForm.timeType = 'month'
      this.getAllData()
    },
    viewModelWeek () {
      this.dataForm.startTime = ''
      this.dataForm.endTime = ''
      this.dataForm.timeType = 'week'
      this.getAllData()
    },
    viewModelDay () {
      this.dataForm.startTime = ''
      this.dataForm.endTime = ''
      this.dataForm.timeType = 'day'
      this.getAllData()
    },
    serchViewModel () {
      this.getAllData()
    },
    getSummaries (param) {
      // this.$nextTick(() => {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总计'
        } else if (index === 1) {
          sums[index] = data.length
        } else {
          const values = data.map(item => Number(item[column.property]))
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr)
              if (!isNaN(value)) {
                return prev + curr
              } else {
                return prev
              }
            }, 0)
            sums[index] += ''
          } else {
            sums[index] = 'N/A'
          }
        }
      })
      return sums
      // })
    },
    myEcharts (myChartData) {
      const myCharts = echarts.init(this.$refs.myCharts)
      const dataArr = []
      myChartData.chartData.data.map((item, index) => {
        const object = {
          name: item.clientName,
          type: 'line',
          areaStyle: {},
          smooth: true,
          data: item.totalNum
        }
        dataArr.push(object)
      })
      const legendArr = []
      dataArr.map((item, index) => {
        legendArr.push(item.name)
      })
      const option = {
        tooltip: {
          trigger: 'axis',
          borderColor: 'rgba(0,0,0,0.6)', // 设置边框颜色
          backgroundColor: 'rgba(0,0,0,0.6)',
          textStyle: {
            color: '#ffffff' // 设置文字颜色
          },
          formatter: function (params) {
            let str = ''
            params.forEach(function (item, index) {
              str += '<span style="display:inline-block;margin-right:5px;border-radius:50%;width:5px;height:5px;left:5px;background-color:' + item.color + '"></span>' + item.seriesName + ' : ' + item.value + '<br />'
            })
            return str
          }
        },
        legend: {
          data: legendArr,
          icon: 'line',
          right: 10,
          left: '10%'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            name: '时间',
            axisLine: {
              lineStyle: {
                color: '#BFBFBF'// 左边线的颜色
              }
            },
            nameGap: 20,
            boundaryGap: true,
            axisTick: {
              alignWithLabel: true
            },
            data: myChartData.chartData.period,
            // 网格
            splitLine: {
              show: false
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLine: {
              show: true,
              lineStyle: {
                type: 'solid',
                color: '#BFBFBF', // 左边线的颜色
                width: 1// 坐标线的宽度
              }
            },
            name: '调用数(次)',
            nameGap: 20,
            // 网格
            splitLine: {
              show: true,
              lineStyle: {
                color: ['#ececec'],
                width: 1,
                type: 'dashed'
              }
            }
            // boundaryGap: true,
          }
        ],
        series: dataArr
      }
      myCharts.setOption(option, true)
    }
  }
}
</script>

<style lang='scss' scoped>
.view-model-box {
  padding: 0 20px;
  p {
    margin: 0;
    padding: 0;
  }
  .view-model-header {
    font-weight: 600;
    span {
      font-weight: 500;
      font-size: 12px;
      margin: 0 0 0 10px;
      color: #797979;
    }
  }
  .view-model-stics {
    margin: 20px 0 0 0;
    .model-applation-num,
    .model-sub-basic,
    .model-cum-basic {
      border-radius: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      div {
        display: flex;
        color: white;
        flex-direction: column;
        white-space: nowrap;
        p {
          font-size: 12px;
        }
        p:nth-child(1) {
          display: flex;
          justify-content: flex-start;
          align-items: center;
        }
        :last-child {
          span {
            margin: 0 0 0 10px;
            i {
              font-style: inherit;
              margin: 0 0 0 3px;
            }
          }
          span:nth-child(1) {
            margin: 0;
          }
        }
        > span {
          font-size: 40px;
          margin: 15px 0;
        }
      }
      > img {
        width: 178px;
        height: 64px;
        position: absolute;
        right: 20px;
      }
    }
    .model-applation-num {
      width: calc(100% - 90px);
      height: 86px;
      background: linear-gradient(90deg, #4dae96 0%, #66b4d9 100%);
      box-shadow: 0px 4px 9px 0px rgba(100, 169, 152, 0.42);
      padding: 30px 40px 50px 50px;
    }
    .model-sub-basic {
      width: calc(100% - 90px);
      height: 106px;
      background: linear-gradient(90deg, #6396ca 0%, #a264d9 100%);
      box-shadow: 0px 4px 9px 0px rgba(99, 149, 202, 0.42);
      padding: 30px 40px 30px 50px;
    }
    .model-cum-basic {
      width: calc(100% - 90px);
      height: 106px;
      background: linear-gradient(90deg, #e0a773 0%, #e87878 100%);
      box-shadow: 0px 4px 9px 0px rgba(134, 114, 221, 0.42);
      padding: 30px 40px 30px 50px;
    }
  }
  .view-model-check {
    display: flex;
    justify-content: flex-end;
    margin: 20px 0 0 0;
    align-items: center;
    > span {
      color: #979797;
      margin: 0 5px;
    }
  }
  .canvas-title {
    font-weight: 600;
    margin: 20px 0;
    p {
      display: flex;
      align-items: center;
      img {
        margin: 0 0 0 10px;
      }
    }
  }
  .view-model-table {
    .view-model-title {
      font-weight: 600;
      margin: 20px 0;
      display: flex;
      justify-content: space-between;
      p {
        display: flex;
        align-items: center;
        img {
          margin: 0 0 0 10px;
        }
      }
    }
  }
}
</style>
