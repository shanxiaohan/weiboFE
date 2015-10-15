define(function (require, exports, module) {
	require('jquery');
    require('highcharts');
    var $ = require('jquery'); 
    function interactTrend () {
        // Create the chart
        var topic_id=location.search;
        topic_id=topic_id.slice(10);
        var request = $.ajax({
           type: 'GET',
			 //url:'../test/cloud.json',
            url:'http://10.109.247.113/server/emotionTrend.php?topic_id='+topic_id,
            dataType: 'jsonp',
			jsonp:'callback',
			async: false, //同步执行
            success:function(data){
                //alert(data.emotionTrend[0].time_point);
                //alert("success");
            },
            error: function(jqXHR){
                alert("The error response:"+jqXHR.status);
            }
        });

        request.done(function(data) {
               
            //var num=count(data.emotionTrend);
            var xDate = new Array();
            var negative = new Array();
            var neutral = new Array();
            var positive = new Array();

            for (var i = 0; i < data.emotionTrend.length; i++) {
                xDate.push(data.emotionTrend[i].time_point);
                negative.push(data.emotionTrend[i].negative);
                neutral.push(data.emotionTrend[i].neutral);
                positive.push(data.emotionTrend[i].positive);
            };

            // for (var i = 0; i < xDate.length; i++) {
            //     alert(xDate[i]);
            // };
            

			$('#userInteract').highcharts({
        title: {
            text: '情感值时间走势',
            x: -20 //center
        },
        
        //消除认证信息，不会显示highcharts商标
        credits: {
                    enabled: false
                },
        
        xAxis: {
            

            categories: xDate
            // ['2014-11-02', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            //     'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        yAxis: {
            title: {
                text: '微博数量 (条)'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#080180'
            }]
        },
        tooltip: {
            valueSuffix: '条'
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{
            name: '积极',
            data: positive
            //[7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
        }, {
            name: '消极',
            data: negative
            //[-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
        }, {
            name: '中立',
            data: neutral
            //[-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
        }]
        /*

			
            $('#userInteract').highcharts('StockChart', {
                credits: {
                    enabled: false
                },
                yAxis: [{
                    title: {
                        text: '情感值',
                        style: {
                            color: '#4572A7'
                        }
                    },
                    labels: {
                        format: '{value}条',
                        style: {
                            color: '#4572A7'
                        }
                    },
                    opposite: false
                }],
                tooltip: {
                    shared: true
                },
                legend: {
                    layout: 'vertical',
                    align: 'left',
                    x: 120,
                    verticalAlign: 'top',
                    y: 100,
                    floating: true,
                    backgroundColor: '#FFFFFF'
                },
                series: [{
                    name: '情感值时间趋势',
                    color: '#4572A7',
                    type: 'line',
                    data: data.EmotionTrend,
                    tooltip: {
                        valueSuffix: ' 条'
                    },
                    lineWidth: 1
                }]*/
            });   
        });
    }

    return {
        interactTrend: interactTrend
    } 
});

    