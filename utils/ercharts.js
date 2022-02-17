
module.exports = {
  // 体温表
  getOption1(chart1, xdata, xValue) {
    console.log(xdata,xValue)
    xdata = xdata.map((item) => {
      return item.split("\n")[0];
    });
    let option1 = {
      backgroundColor: "#FFF",
      title: {
        padding: [20, 0, 30,20],
        text: "体温数据展板",
        textStyle: {
          Color: "#333333",
          fontSize: "16px",
        },
      },
      dataZoom: [
        {
          type: "inside",
          throttle: "50",
          minValueSpan: 2,
          start: 1,
          end: 50,
          zoomLock: true,
        },
      ],
      grid: {
        left: 40,
        right: 8,
        top:75,
        height:"80%"
      },
      tooltip: {
        textStyle: {
          color: "#FFF",
        },
        trigger: "axis",
        backgroundColor: "#377CFF",
        axisPointer: {
          type: "line",
        },
        formatter: function (params, ticket, callback) {
          
          let value = params[0].data.date;
          return (
            value.split("\n")[0]+'/'+value.split("\n")[1] + "  体温是" + params[0].data.value + "°C"
          );
        },
      },
      xAxis: {
        boundaryGap: false,
        type: "category",
        axisLine: {
          lineStyle: {
            color: "#E5E5E5",
          },
        },
        axisLabel: {
          show: true,
          
          color: "#333333"
        },
        axisTick: {
          show: true,
          color: "#333333",
        },
        data: xdata,
      },
      yAxis: {
        splitLine: {
          show: true,
          color: "#FFF",
        },
        max: 41,
        min: 35,
        minInterval: 0.5,
        name: "温度℃",
        type: "value", //'value' 数值轴，适用于连续数据。
        // 坐标轴轴线相关设置
        axisLine: {
          show: true, //y轴线消失
          lineStyle: {
            color: "#707070", // y轴的颜色
            width: 1, //y轴线的宽度
          },
        },
        // 坐标轴刻度标签(类目,简单说就是x轴上的内容)的相关设置
        axisLabel: {
          show: true,
          color: "#333333",
        },
        axisTick: {
          show: true,
        },

        splitNumber: 10,
      },
      series: [
        {
          type: "line",
          data: xValue,
          markArea: {
            data: [
              [
                {
                  yAxis: "34",
                  itemStyle: {
                    color: "#97DE97",
                  },
                },
                {
                  yAxis: "37",
                },
              ],
              [
                {
                  yAxis: "37",
                  itemStyle: {
                    color: "#F28D7B",
                  },
                },
                {
                  yAxis: "38.5",
                },
              ],
              [
                {
                  yAxis: "38.5",
                  itemStyle: {
                    color: "#CE4E37",
                  },
                },
                {
                  yAxis: "45",
                },
              ],
            ],
          },
          // smooth: true,
          // 折线条的样式
          lineStyle: {
            color: "#386CE2",
            width: 1,
          },
          // 折线拐点的样式
          itemStyle: {
            normal: {
              // 静止时：
              color: "#377CFF",
            },
            emphasis: {
              // 鼠标经过时：
              color: "#FFF",
            },
           
          },
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "#386CE2", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "rgb(255, 255, 255,0.1)", // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            }
          },
          
          symbol: "circle", //拐点样式
          symbolSize: 5, //拐点大小
        },
      ],
    };

    chart1.setOption(option1);
  },
  // 血压表
  getOption2(chart2, xdata, xValue) {
    let option2 = {
      legend: {
        type: "plain",
        right: "20",
        top: "20",
        data: ["收缩压", "舒张压"],
      },
      backgroundColor: "#FFF",

      title: {
        padding: [15, 0, 30,18],
        text: "血压数据展板",
        textStyle: {
          Color: "#333333",
          fontSize: "16px",
        },
      },
      dataZoom: [
        {
          type: "inside",
          throttle: "50",
          minValueSpan: 6,
          start: 1,
          end: 50,
          zoomLock: true,
        },
      ],
      grid: {
        width:'80%',
        height:'80%',
        left: 50,
        right: 8,
        top: 70,
      },
      tooltip: {
        textStyle: {
          color: "#FFF",
        },
        trigger: "axis",
        backgroundColor: "#377CFF",
        axisPointer: {
          type: "line",
        },
        formatter: function (params, ticket, callback) {
          var text =
            "收缩压" +
            " : " +
            params[0].data.value +
            "mmHg \n" +
            "舒张压" +
            " : " +
            params[1].data.value +
            "mmHg ";
          return text;
        },
      },
      xAxis: {
        boundaryGap: false,
        type: "category",
        axisLine: {
          lineStyle: {
            color: "#E5E5E5",
          },
        },
        axisLabel: {
          show: true,
          color: "#333333",
          fontSyle: "12",
          margin: 16,
        },
        axisTick: {
          show: true,
          color: "#333333",
        },
        data: xdata,
      },
      yAxis: {
        splitLine: {
          show: true,
          color: "#FFF",
        },
        max: 180,
        min: 10,
        // minInterval: 0,
        name: "血压mmHg",
        type: "value", //'value' 数值轴，适用于连续数据。
        // 坐标轴轴线相关设置
        axisLine: {
          show: true, //y轴线消失
          lineStyle: {
            color: "#707070", // y轴的颜色
            width: 1, //y轴线的宽度
          },
        },
        // 坐标轴刻度标签(类目,简单说就是x轴上的内容)的相关设置
        axisLabel: {
          show: true,
          // 标签文字的颜色
          color: "#333333",
          // 类目样式设置(文档中没有这个属性了,但是设置了也有效)
          // textStyle: {
          //     color: '#999'
          // }
        },
        //y轴刻度线设置
        axisTick: {
          show: true,
        },
        splitNumber: 20, //坐标轴的分割段数，需要注意的是这个分割段数只是个预估值，最后实际显示的段数会在这个基础上根据分割后坐标轴刻度显示的易读程度作调整.在类目轴中无效。
      },
      series: [
        {
          name: "收缩压",
          type: "line", //折线图是用折线将各个数据点标志连接起来的图表，用于展现数据的变化趋势。和全局设置type效果一样,表示折线图

          // 系列中的数据内容数组。数组项通常为具体的数据项。
          data: xValue.high,

          // smooth: true,
          // 折线条的样式
          lineStyle: {
            color: "#FD800E",
            width: 1,
          },
          // 折线拐点的样式
          itemStyle: {
            normal: {
              // 静止时：
              color: "#FD800E",
            },
            emphasis: {
              // 鼠标经过时：
              color: "#fFF",
            },
          },
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "#FD800E", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "rgb(255, 255, 255,0.1)", // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            }
          },
          symbol: "circle", //拐点样式
          symbolSize: 5, //拐点大小
        },
        {
          name: "舒张压",
          type: "line", //折线图是用折线将各个数据点标志连接起来的图表，用于展现数据的变化趋势。和全局设置type效果一样,表示折线图

          // 系列中的数据内容数组。数组项通常为具体的数据项。
          data: xValue.low,

          // smooth: true,
          // 折线条的样式
          lineStyle: {
            color: "#386CE2",
            width: 1,
          },
          // 折线拐点的样式
          itemStyle: {
            normal: {
              // 静止时：
              color: "#386CE2",
            },
            emphasis: {
              // 鼠标经过时：
              color: "#fFF",
            },
          },
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "#93B0FF", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "rgb(255, 255, 255,0.1)", // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            }
          },
          symbol: "circle", //拐点样式
          symbolSize: 5, //拐点大小
        },
      ],
    };
    chart2.setOption(option2);
  },
  // 心率表
  getOption3(chart3, xdata, xValue) {
    let option3 = {
      backgroundColor: "#FFF",
      title: {
        padding: [15, 0, 30,14],
        text: "心率数据展板",
        textStyle: {
          Color: "#333333",
          fontSize: "16px",
        },
      },
      dataZoom: [
        {
          type: "inside",
          throttle: "50",
          minValueSpan: 6,
          start: 0,
          end: 50,
          zoomLock: true,
        },
      ],
      grid: {
        height:'80%',
        left: 40,
        right: 16,
        top: 70,
      },
      tooltip: {
        textStyle: {
          color: "#FFF",
        },
        trigger: "axis",
        backgroundColor: "#377CFF",
        axisPointer: {
          type: "line",
        },
        formatter: function (params, ticket, callback) {
          var text = "血压" + " : " + params[0].data.value + "mmHg";
          return text;
        },
      },
      xAxis: {
       boundaryGap: false,
        type: "category",
        axisLine: {
          lineStyle: {
            color: "#E5E5E5",
          },
        },
        axisLabel: {
          show: true,
          color: "#333333",
          fontSyle: "12",
          margin: 16,
         
          margin: 5, //刻度标签与轴线之间的距离
        },
        axisTick: {
          show: true,
          color: "#333333",
        },
        data: xdata,
      },
      yAxis: {
        splitLine: {
          show: true,
          color: "#FFF",
        },
        max: 140,
        min: 0,
        name: "心率BPM",
        type: "value", //'value' 数值轴，适用于连续数据。
        // 坐标轴轴线相关设置
        axisLine: {
          show: true, //y轴线消失
          lineStyle: {
            color: "#707070", // y轴的颜色
            width: 1, //y轴线的宽度
          },
        },
        // 坐标轴刻度标签(类目,简单说就是x轴上的内容)的相关设置
        axisLabel: {
          show: true,
          // 标签文字的颜色
          color: "#333333",
          // 类目样式设置(文档中没有这个属性了,但是设置了也有效)
          // textStyle: {
          //     color: '#999'
          // }
        },
        //y轴刻度线设置
        axisTick: {
          show: true,
        },
        splitNumber: 20, //坐标轴的分割段数，需要注意的是这个分割段数只是个预估值，最后实际显示的段数会在这个基础上根据分割后坐标轴刻度显示的易读程度作调整.在类目轴中无效。
      },
      series: [
        {
          type: "line", //折线图是用折线将各个数据点标志连接起来的图表，用于展现数据的变化趋势。和全局设置type效果一样,表示折线图

          // 系列中的数据内容数组。数组项通常为具体的数据项。
          data: xValue,

          // smooth: true,
          // 折线条的样式
          lineStyle: {
            color: "#386CE2",
            width: 1,
          },
          // 折线拐点的样式
          itemStyle: {
            normal: {
              // 静止时：
              color: "#377CFF",
            },
            emphasis: {
              // 鼠标经过时：
              color: "#fFF",
            },
          },
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "#93B0FF", // 0% 处的颜色
              },
              {
                offset: 1,
                color: "#3D73EF", // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
          areaStyle:{
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "#3074E6", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "rgb(255, 255, 255,0.1)", // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            }
          },
          symbol: "circle", //拐点样式
          symbolSize:5, //拐点大小
        },
      ],
    };
    chart3.setOption(option3);
  },
  // 体重表
  getOption4(chart4, xdata, xValue) {
    let option4 = {
      backgroundColor: "#FFF",
      title: {
        padding: [20, 0, 30,20],
        text: "体重数据展板",
        textStyle: {
          Color: "#333333",
          fontSize: "16px",
        },
      },
      dataZoom: [
        {
          type: "inside",
          throttle: "50",
          start: 1,
          end: 30,
          zoomLock: true,
        },
      ],
      grid: {
        left: 40,
        right: 8,
        top: 80,
        height:'80%'
      },
      xAxis: {
        type: "category",
        axisLine: {
          show: true,
          lineStyle: {
            color: "#707070",
            // width: 1,
          },
        },
        axisLabel: {
          show: true,
          color: "#333333",
          fontSyle: "12",
          margin: 16,
 
          margin: 10, //刻度标签与轴线之间的距离
        },
        axisTick: {
          show: true,
          color: "#333333",
        },
        data: xdata,
      },
      yAxis: {
        // splitNumber: 10,
        // max: 90,
        // min: 0,
        name: "体重KG",
        type: "value", //'value' 数值轴，适用于连续数据。
        axisLabel: {
          show: true,
          color: "#333333",
        },
        axisLine: {
          show: true, //y轴线消失
          lineStyle: {
            color: "#707070", // y轴的颜色
            width: 1, //y轴线的宽度
          },
        },
      },

      series: [
        {
          type: "bar",
          // barWidth: 16,
          label: {
            show: true,
            color: "black",
            fontSize: "10px",
            position: "top", //柱子上方显示 数值
            formatter: "{c}",
          },
          data: xValue,
          itemStyle: {
            barBorderRadius: [7, 7, 0, 0],
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "#3D73EF", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#93B0FF", // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
          },
        },
      ],
    };
    chart4.setOption(option4);
  },
  // 睡眠表
  getOption5(chart5, xdata, xValue) {
    xValue = xValue.map((item) => {
      return {
        date: item.date,
        value: parseInt(item.value),
      };
    });
    let option5 = {
      backgroundColor: "#FFF",
      title: {
        padding: [20, 0, 30,20],
        text: "睡眠时间展板",
        textStyle: {
          Color: "#333333",
          fontSize: "16px",
        },
      },
      dataZoom: [
        {
          type: "inside",
          throttle: "50",
          minValueSpan: 6,
          start: 1,
          end: 30,
          zoomLock: true,
        },
      ],
      grid: {
        left: 40,
        right: 8,
        top: 80,
        height:'80%'
      },
      xAxis: {
        axisLine: {
          show: true,
          lineStyle: {
            color: "#707070",
            width: 1,
          },
        },
        type: "category",
        axisLabel: {
          show: true,
          color: "#333333",
          fontSyle: "12",
          // margin: 16,
          // margin: 10, //刻度标签与轴线之间的距离
        },
        axisTick: {
          show: true,
          color: "#333333",
        },
        data: xdata,
      },
      yAxis: {
        splitNumber:12,
        max: 12,
        min: 1,
        name: "小时h",
        type: "value", //'value' 数值轴，适用于连续数据。
        axisLabel: {
          show: true,
          color: "#333333",
        },
        axisLine: {
          show: true, //y轴线消失
          lineStyle: {
            color: "#707070", // y轴的颜色
            width: 1, //y轴线的宽度
          },
        },
      },
      series: [
        {
          type: "bar",
          // barWidth: 16,
          label: {
            show: true,
            color: "black",
            fontSize: "10px",
            position: "top", //柱子上方显示 数值
            formatter: "{c}h",
          },
          data: xValue,
          itemStyle: {
            barBorderRadius: [7, 7, 0, 0],
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "#7B3DEF", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#B893FF", // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
          },
        },
      ],
    };
    chart5.setOption(option5);
  },
  // 月经表
  getOption6(chart6, xdata) {

    console.log(xdata)
    if(!xdata){
      return
    }
    const day = [];
    for (let i = 1; i <= 31; i++) {
      day.push(i);
    }
    const month = [
      "1月",
      "2月",
      "3月",
      "4月",
      "5月",
      "6月",
      "7月",
      "8月",
      "9月",
      "10月",
      "11月",
      "12月",
    ];
    // 拿到真实的数据之后 -1
    let data  = [] ;
    for(let i =0 ; i<= xdata.length-1; i++){
      data.push([xdata[i][1]-1,xdata[i][0]-1,1]);
      
    }
    data=data.map(function (item) {
      return [item[1], item[0], item[2] || "-"];
    });
    let option6 = {
      title: {
        padding: [20, 0, 30,25],
        text: "月经周期展板",
        textStyle: {
          Color: "#333333",
          fontSize: "16px",
        },
      },
      dataZoom: [
        {
          type: "inside",
          throttle: "50",
          minValueSpan: 6,
          start: 1,
          end: 50,
          zoomLock: true,
        },
      ],
      backgroundColor: "#FFF",
      tooltip: {
        position: "top",
        formatter: function (params, ticket, callback) {
          console.log(params.data);
          return  (params.data[0]+1) + "月" + (params.data[1]+1) + "日";
        },
      },
      grid: {
        width: "85%",
        left: "40px",
        height: "80%",
        top: "13%",
      },
      yAxis: {

        name: "天数",
        type: "category",
        data: day,
        splitArea: {
          show: true,
        },
        axisLabel: {
          interval: 0,
        },
      },
      xAxis: {
        type: "category",
        data: month,
        splitArea: {
          show: true,
        },
      },
      series: [
        {
          type: "heatmap",
          data: data,
          label: {
            show: false,
          },
          itemStyle: {
            color:{
              type: "linear",
              x: 1,
              y: 1,
              x2: 0,
              y2: 0,
              colorStops: [
                {
                  offset: 0,
                  color: "#EF4B3D", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#FFCD93", // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    };

    chart6.setOption(option6);
  },
};
