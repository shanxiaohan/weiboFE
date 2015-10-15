define(function () {
    var $ = require('jquery');  
    require('highcharts');
    function renderEmotionAny () {
        // Create the chart
        var request = $.ajax({
            type: 'POST',
            url: '../test/emotionAnalysis.json',
            dataType: 'json'
            // data: data ,
        });

        request.done(function(data) {
            $('#emotionAny').highcharts('StockChart', {
                chart: {
                    zoomType: 'xy'
                },
                credits: {
                    enabled: false
                },
                // title: {
                //     text: 'Average Monthly Temperature and Rainfall in Tokyo'
                // },
                // subtitle: {
                //     text: 'Source: WorldClimate.com'
                // },
                yAxis: [{ // Primary yAxis
                    labels: {
                        format: '{value}',
                        style: {
                            color: '#89A54E'
                        }
                    },
                    title: {
                        text: '情感值',
                        style: {
                            color: '#89A54E'
                        }
                    },
                    max:100,
                    min:0
                }, { // Secondary yAxis
                    title: {
                        text: '话题量',
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
                    name: '情感值',
                    color: '#89A54E',
                    type: 'line',
                    // yAxis: 1,
                    data: data.emotionValue,
                    tooltip: {
                        valueSuffix: ''
                    }
                },
                {
                    name: '话题量',
                    color: '#4572A7',
                    type: 'area',
                    yAxis: 1,
                    data: data.TopicNumber,
                    tooltip: {
                        valueSuffix: '条'
                    }

                }],
                 plotOptions: {
                    area: {
                        fillColor: {
                            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1},
                            stops: [
                                [0, Highcharts.getOptions().colors[0]],
                                [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                            ]
                        },
                        marker: {
                            radius: 2
                        },
                        lineWidth: 1,
                        states: {
                            hover: {
                                lineWidth: 1
                            }
                        },
                        threshold: null
                    }
                }
            });   
        });
    }
    return {
        renderEmotionAny: renderEmotionAny
    }
});