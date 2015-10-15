define(function () {
	var $ = require('jquery');
    require('highcharts');
    
	/**
	* 平均情感值
	*/
	function renderEmotionAve () {
        var topic_id=location.search;
            topic_id=topic_id.slice(10);
        var request = $.ajax({

            type: 'GET',
            url:'http://10.109.247.113/server/emotionAve.php?topic_id='+topic_id,
            dataType: 'jsonp',
			jsonp:'callback',
			async: false, //同步执行
        });
        
        request.done(function (data) {
            var gaugeOptions = {

                chart: {
                    type: 'gauge'
                },

                title: null,

                pane: {
                    center: ['50%', '85%'],
                    size: '140%',
                    startAngle: -90,
                    endAngle: 90,
                    background: {
                        backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || '#EEE',
                        innerRadius: '60%',
                        outerRadius: '100%',
                        shape: 'arc'
                    }
                },

                tooltip: {
                    enabled: false
                },

                // the value axis
                yAxis: {
                    

                    plotBands: [{
                from: 0,
                to: 4,
                color: '#55BF3B',// green
                thickness: '20%'
            }, {
                from: 4,
                to: 7,
                color: '#DDDF0D',// yellow
                thickness: '20%'
            }, {
                from: 7,
                to: 10,
                color: '#DF5353', // red
                thickness: '20%'
            }],       

            //设置仪表盘刻度线
            minorTickInterval: 'auto',
            minorTickWidth: 1,
            minorTickLength: 10,
            minorTickPosition: 'inside',
            minorTickColor: '#666',
    
            tickPixelInterval: 30,
            tickWidth: 2,
            tickPosition: 'inside',
            tickLength: 20,
            tickColor: '#666', 
            // labels: {
            //     step: 4,
            //     rotation: 'auto'
            // },

                    // stops: [
                    //     [0.1, '#55BF3B'], // green
                    //     [0.5, '#DDDF0D'], // yellow
                    //     [0.9, '#DF5353'] // red
                    // ],
                    // lineWidth: 0,
                    // minorTickInterval: null,
                    // tickPixelInterval: 400,
                    // tickWidth: 0,
                    title: {

                        y: -70
                    },
                    labels: {
                        y: 16
                    }
                },

                plotOptions: {
                    solidgauge: {
                        dataLabels: {
                            y: 5,
                            borderWidth: 0,
                            useHTML: true
                        }
                    }
                }
            };

            $('#emotionAve').highcharts(Highcharts.merge(gaugeOptions, {
                yAxis: {
                    min: 0,
                    max: 10,
                    title: {
                        text: '情感平均值'
                    }
                },

                credits: {
                    enabled: false
                },

                series: [{
                    name: '情感平均值',
                    data: [parseInt(data.emo_ave)],
                    tooltip: {
                valueSuffix: '情感值'
            },
                    dataLabels: {
                        format: '<br/>'+'<div style="text-align:center"><span style="font-size:25px;color:' +
                            ((Highcharts.theme && Highcharts.theme.contrastTextColor) || '#721d83') + '">{y}</span>' 
                            // +
                            //    '<span style="font-size:12px;color:purple">平均值</span></div>'
                    }
                }]    
            }));
        });
    }

    return {
    	renderEmotionAve: renderEmotionAve
    }
});