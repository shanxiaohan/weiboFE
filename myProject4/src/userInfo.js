define(function (require, exports, module) {
	var echarts = require('echarts');
	var $ = require('jquery'); 
	function renderSex() {
		var topic_id=location.search;
		topic_id=topic_id.slice(10);

		var request = $.ajax({
            type: 'GET',
            //url: '../test/cloud.json',
			url:'http://10.109.247.113/server/userInfo.php?topic_id='+topic_id,
           //dataType: 'json',
			dataType: 'jsonp',
			jsonp:'callback',
			async: false, //同步执行
            //data: data ,
			success:function(data){
				//alert(data.sex.female);
				//alert("success");
			},
			error: function(jqXHR){
				alert("The error response:"+jqXHR.status);
			}
			
        });
		
		
		

        request.done(function(data) {
			
			var sexArr=new Array(3);
			sexArr[0]=new Array('男',parseInt(data.sex.male));
			sexArr[1]=new Array('女',parseInt(data.sex.female));
			sexArr[2]=new Array('未知',parseInt(data.sex.unknown));
			//alert(sexArr[1]);

        	$('#sexPie').highcharts({
		        chart: {
		            plotBackgroundColor: null,
		            plotBorderWidth: null,
		            plotShadow: false
		        },
		        credits: {
                    enabled: false
                },
		        title: {
		            text: '用户性别比例'
		        },
		        tooltip: {
		    	    pointFormat: '<b>{point.percentage:.1f}%</b>'
		        },
		        plotOptions: {
		            pie: {
		                allowPointSelect: true,
		                cursor: 'pointer',
		                dataLabels: {
		                    enabled: true,
		                    color: '#000000',
		                    connectorColor: '#000000',
		                    format: '{point.percentage:.1f} %'
		                }
		            }
		        },
		        series: [{
		            type: 'pie',
		            data:sexArr
					/*	
					[
		                ['男', 60],
		                ['女', 26.8],
		                ['未知', 8]
						]
					*/
					/*下面是echarts的data格式
					[
					{value:50,name:'男'},	
					{value:30,name:'女'},
					{value:20.0,name:'未知'}
					]
					*/
						
		        }]
		    });
        });
    }

    function renderVip() {
    	var topic_id=location.search;
		topic_id=topic_id.slice(10);
		var request = $.ajax({
            type: 'GET',
				//url:'../test/cloud.json',
			url:'http://10.109.247.113/server/userInfo.php?topic_id='+topic_id,
			dataType: 'jsonp',
			jsonp:'callback',
			async: false, //同步执行
            //data: data ,
			
        });

        request.done(function(data) {
        	$('#vipPie').highcharts({
		        chart: {
		            plotBackgroundColor: null,
		            plotBorderWidth: null,
		            plotShadow: false
		        },
		        credits: {
                    enabled: false
                },
		        title: {
		            text: '用户认证比例'
		        },
		        tooltip: {
		    	    pointFormat: '<b>{point.percentage:.1f}%</b>'
		        },
		        plotOptions: {
		            pie: {
		                allowPointSelect: true,
		                cursor: 'pointer',
		                dataLabels: {
		                    enabled: true,
		                    color: '#000000',
		                    connectorColor: '#000000',
		                    format: '<b>{point.name}</b>: {point.percentage:.1f} %'
		                }
		            }
		        },
		        series: [{
		            type: 'pie',
		            data: [
		                ['VIP用户', parseInt(data.vip.vip)],
		                ['认证用户', parseInt(data.vip.credit)],
						['普通用户',parseInt(data.vip.ordinary)]
		            ]
		        }]
		    });
        });
    }

    function renderTerminal() {
    	var topic_id=location.search;
		topic_id=topic_id.slice(10);
		var request = $.ajax({
            type: 'GET',
            //url: '../test/cloud.json',
			url:'http://10.109.247.113server/userInfo.php?topic_id='+topic_id,
            dataType: 'jsonp',
			jsonp:'callback',
			async: false, //同步执行
            // data: data ,
        });

        request.done(function(data) {
        	$('#terminalPie').highcharts({
		        chart: {
		            plotBackgroundColor: null,
		            plotBorderWidth: null,
		            plotShadow: false
		        },
		        credits: {
                    enabled: false
                },
		        title: {
		            text: '用户终端比例'
		        },
		        tooltip: {
		    	    pointFormat: '<b>{point.percentage:.1f}%</b>'
		        },
		        plotOptions: {
		            pie: {
		                allowPointSelect: true,
		                cursor: 'pointer',
		                dataLabels: {
		                    enabled: true,
		                    color: '#000000',
		                    connectorColor: '#000000',
		                    format: '<b>{point.name}</b>: {point.percentage:.1f} %'
		                }
		            }
		        },
		        series: [{
		            type: 'pie',
		            data: [
		                [data.terminal[0].source, parseInt(data.terminal[0].count)],
		                [data.terminal[1].source, parseInt(data.terminal[1].count)],
		                [data.terminal[2].source, parseInt(data.terminal[2].count)],
		                [data.terminal[3].source, parseInt(data.terminal[3].count)]
		            ]
		        }]
		    });
		});
    }

    function renderAge() {
    	var topic_id=location.search;
		topic_id=topic_id.slice(10);
		var request = $.ajax({
            type: 'GET',
            url:'http://10.109.247.113/server/userInfo.php?topic_id='+topic_id,
            dataType: 'jsonp',
			jsonp:'callback',
			async: false, //同步执行
        });

        request.done(function(data) {
        	$('#agePie').highcharts({
		        chart: {
		            plotBackgroundColor: null,
		            plotBorderWidth: null,
		            plotShadow: false
		        },
		        credits: {
                    enabled: false
                },
		        title: {
		            text: '用户年龄比例'
		        },
		        tooltip: {
		    	    pointFormat: '<b>{point.percentage:.1f}%</b>'
		        },
		        plotOptions: {
		            pie: {
		                allowPointSelect: true,
		                cursor: 'pointer',
		                dataLabels: {
		                    enabled: true,
		                    color: '#000000',
		                    connectorColor: '#000000',
		                    format: '<b>{point.name}</b>: {point.percentage:.1f} %'
		                }
		            }
		        },
		        series: [{
		            type: 'pie',
		            data: [
		                ['70前', parseInt(data.age.before_70)],
		                ['70后', parseInt(data.age.after_70)],
		                ['80后', parseInt(data.age.after_80)],
		                ['90后', parseInt(data.age.after_90)],
		                ['未知', parseInt(data.age.unknown)],
		                
		            ]
		        }]
		    });
		});
    }

    exports.init = function () {
    	renderSex();
		renderVip();
		renderTerminal();
		renderAge();
    }

});