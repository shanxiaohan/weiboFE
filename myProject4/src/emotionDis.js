define(function() {
	var $ = require('jquery');
	require('highcharts');

	function renderEmotionDis () {
        var request = $.ajax({
            type: 'POST',
            url: '../test/emotionAnalysis.json',
            dataType: 'json',
            // data:
        });
        request.done(function (data) {
            $('#emotionDis').highcharts({
	        chart: {
	            type: 'column'
	        },
	        credits: {
                enabled: false
            },
	        title: {
	            text: '地域情感值'
	        },
	        xAxis: {
	            categories: [
	                '北京',
	                '上海',
	                '山东',
	                '山西',
	                '黑龙江',
	                '香港',
	                '陕西',
	                '台湾',
	                '四川',
	                '湖南',
	                '湖北',
	                '河南'
	            ]
	        },
	        yAxis: {
	            min: 0
	            // title: {
	            //     text: 'Rainfall (mm)'
	            // }
	        },
	        tooltip: {
	            // headerFormat: '<span style="font-size:10px">{point.key}</span>',
	            // pointFormat: '' +
	            //     '',
	            // footerFormat: '<table><tbody><tr><td style="color:{series.color};padding:0">{series.name}: </td><td style="padding:0"><b>{point.y:.1f} mm</b></td></tr></tbody></table>',
	            shared: true,
	            // useHTML: true
	        },
	        plotOptions: {
	            column: {
	                pointPadding: 0.2,
	                borderWidth: 0
	            }
	        },
	        series: [{
	            name: '积极',
	            data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]

	        }, {
	            name: '中立',
	            data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]

	        }, {
	            name: '消极',
	            data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]

	        }]
	    	});	
		});
	}

	return {
		renderEmotionDis: renderEmotionDis
	}
})