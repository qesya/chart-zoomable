import React, { Component } from 'react';
import axios from 'axios';
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

am4core.useTheme(am4themes_animated);

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'React',
            date:[],
            price:[]
        };



        axios.get(`https://api.tokenanalyst.io/analytics/last?job=zrx_volume_30day_v5&format=json`)
            .then((res)=>{
               // console.log(res.data)

                for(var i=0;i<res.data.length;i++){
                    this.SetData(res,i);
                }
                //console.log(this.state.date[0])
            })
            .catch((err)=>{
                console.log(err)
            })

    }
    SetData = (res,i) => {
        this.setState(state => {
            return {
                ...state,
                date: [
                    ...state.date,
                    {
                        date: res.data[i].date,
                    }],
                price: [
                    ...state.price,
                    {
                        price: res.data[i].price_usd,
                    }]
            }
        })
    }

    componentDidMount() {

        let chart = am4core.create("chartdiv", am4charts.XYChart);


        am4core.ready(()=> {

// Themes begin
            am4core.useTheme(am4themes_animated);
// Themes end

// Create chart instance
            var chart = am4core.create("chartdiv", am4charts.XYChart);

            setTimeout(()=>{
                var data = [];
                var value = 50;
                let date = new Date();
                for(let i = 0; i < this.state.price.length; i++){
                    date = this.state.date[i].date
                    value = this.state.price[i].price*100
                    // console.log(date)
                    data.push({date:date, value: value});
                }
                chart.data = data;
            },2000)


// Create axes
            var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
            dateAxis.renderer.minGridDistance = 60;



            chart.yAxes.push(new am4charts.ValueAxis());

// Create series
            var series = chart.series.push(new am4charts.LineSeries());
            series.dataFields.valueY = "value";
            series.dataFields.dateX = "date";
            series.tooltipText = "{value}"

            series.tooltip.pointerOrientation = "vertical";

            var bullet = series.bullets.push(new am4charts.CircleBullet());
            bullet.circle.strokeWidth = 2;
            bullet.circle.radius = 4;
            bullet.circle.fill = am4core.color("#fff");

            var bullethover = bullet.states.create("hover");
            bullethover.properties.scale = 1.3;

            chart.cursor = new am4charts.XYCursor();
            chart.cursor.snapToSeries = series;
            chart.cursor.xAxis = dateAxis;

//chart.scrollbarY = new am4core.Scrollbar();
            chart.scrollbarX = new am4core.Scrollbar();

        }); // end am4core.ready()

        this.chart = chart;
    }

    componentWillUnmount() {
        if (this.chart) {
            this.chart.dispose();
        }
    }

    render() {
        return (
            <div>
                <div id="chartdiv" style={{ width: "100%", height: "500px" }}>
                </div>
            </div>
        );
    }
}


export default App;
