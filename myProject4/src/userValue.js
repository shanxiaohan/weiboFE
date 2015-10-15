define(function (require, exports, module) {
    require('echarts');
    exports.renderMap = function() {
         var request = $.ajax({
            type: 'POST',
            url: '../test/map.json',
            dataType: 'json',
            // data: data ,
        });

        request.done(function(data) {
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
    }               
});