define(function () {
	var $ = require('jquery');
	require('underscore');

	function renderUserInfo() {
		var request = $.ajax({
			type: 'POST',
            url: '../test/recentUser.json',
            dataType: 'json'
            // data: data ,
		});

		request.done(function(data) {
			var parent = document.getElementById('recentUser');
			for (var i in data.userInfo) {
				// var li = document.createElement('li');
				var img = document.createElement('img');
				img.src = data.userInfo[i].userImage;
				img.title = data.userInfo[i].userName;
				img.style.height = '30px';
				img.style.width = '30px';
				img.style.margin = '3px';
				// li.appendChild(img);
				parent.appendChild(img);
			}
		});
	}

	return {
		renderUserInfo: renderUserInfo
	}
})