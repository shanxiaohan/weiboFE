define(function () {
    require('underscore');
    var $ = require('jquery'); 
    function createRandomItemStyle() {
        return {
            normal: {
                color: 'rgb(' + [
                    Math.round(Math.random() * 160),
                    Math.round(Math.random() * 160),
                    Math.round(Math.random() * 160)
                ].join(',') + ')'
            }
        };
    }
    function renderCloud() {

        var topic_id=location.search;
            topic_id=topic_id.slice(10);
        var request = $.ajax({
            type: 'GET',
			// url:'http://127.0.0.1/server/topicCloud.php',
            url:'http://10.109.247.113/server/topicCloud.php?topic_id='+topic_id,
           //url: '../test/cloud.json',
            dataType: 'jsonp',
			jsonp:'callback',
			async: false, //Í¬²½Ö´ÐÐ
            // data: data ,
			
        });
        request.done(function(data) {
            require(
            [
                'echarts',
                'echarts/chart/wordCloud'
            ],
            function (echarts) {
                var myChart = echarts.init(document.getElementById('keyWords'));
                $.each(data.cloud, function(key, value) {
                    value.itemStyle = createRandomItemStyle();
                });
                var option = {
                    // title: {
                    //     text: 'Google Trends',
                    //     link: 'http://www.google.com/trends/hottrends'
                    // },
                    tooltip: {
                        show: true
                    },
                    series: [{
                        // name: 'Google Trends',
                        type: 'wordCloud',
                        size: ['80%', '80%'],
                        textRotation : [0, 45, 90, -45],
                        textPadding: 0,
                        autoSize: {
                            enable: true,
                            minSize: 14
                        },
                        data: data.cloud
                    }]
                };
                myChart.setOption(option);
            });
        });
    }

    return {
        renderCloud: renderCloud
    }             
});

