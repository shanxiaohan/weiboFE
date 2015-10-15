define(function () {
    var $ = require('jquery'); 
    function renderMap () {
        var topic_id=location.search;
            topic_id=topic_id.slice(10);
         var request = $.ajax({
            type: 'GET',
            //url: '../test/mapTest.json',
			url:'http://10.109.247.113/server/userMap.php?topic_id='+topic_id,
            dataType: 'jsonp',
			jsonp:'callback',
			async:false
            // data: data ,
        });

        request.done(function(data) {
            require(
            [
                'echarts',
                'echarts/chart/map' // 使用柱状图就加载bar模块，按需加载
            ],
            function (echarts) {
                var myChart = echarts.init(document.getElementById('userMap')); 
            
                var option = {
                    tooltip : {
                        trigger: 'item'
                    },
                    dataRange: {
                        min: 0,
                        max: 2500,
                        x: 'left',
                        y: 'bottom',
                        text:['高','低'],           // 文本，默认为数值文本
                        calculable : true
                    },
                    series : [
                        {   
                            name: '人口分布',
                            type: 'map',
                            mapType: 'china',
                            roam: false,
                            itemStyle:{
                                normal:{label:{show:true}},
                                emphasis:{label:{show:true}}
                            },
                            data:data.mapdata
                        },
                    ]
                };
                myChart.setOption(option);
            });
        });
    }
    return {
        renderMap: renderMap
    }               
});