define(function () {
	var $ = require('jquery');

	function renderContent() {
		var topic_id=location.search;
            topic_id=topic_id.slice(10);
		var request = $.ajax({
			type: 'GET',
            url: 'http://10.109.247.113/server/weiboContent.php?topic_id='+topic_id,
            dataType: 'jsonp',
            async: false, //同步执行
            success:function(data){
                //alert("success");
                //alert("success");
            },
            error: function(jqXHR){
                alert("The error response:"+jqXHR.status);
            }
            // data: data ,
		});
		request.done(function(data) {
			$('#content').text(data.content);
		});	
	}

	return {
		renderContent: renderContent
	}
})