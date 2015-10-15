
define(function (require, exports, module) {
    
    var $ = require('jquery');
    require('highcharts');

    exports.forwordTrend = function() {
        // Create the chart
        var request = $.ajax({
            type: 'POST',
            url: '../test/emotionAnalysis.json',
            dataType: 'json',
            // data: data ,
        });

        request.done(function(data) {
            $('#forwardTimeTrendChart').highcharts('StockChart', {
                credits: {
                    enabled: false
                },
                yAxis: [{
                    title: {
                        text: '转发量',
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
                    name: '转发量',
                    color: '#4572A7',
                    type: 'line',
                    data: data.TopicNumber,
                    tooltip: {
                        valueSuffix: ' 条'
                    },
                    lineWidth: 1
                }]
            });   
        });
    }   
});
