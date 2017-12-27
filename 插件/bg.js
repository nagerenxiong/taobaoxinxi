chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	if (request.type == 1) {
		var title = request.title;
		var dianpu=request.dianpu;
		var shangpinId=request.shangpinId;
		$.ajax({
				url: 'http://39.108.55.222/xinxi/getXinxi',
				type: 'post',
				async: false,
				data: {
					"title":title,
					"dianpu":dianpu,
					"shangpinId":shangpinId
				}
			})
			.done(function (data) {
				if(data.length>0){
					sendResponse(data);
				}
			})
			.fail(function (msg) {
				console.log(msg);
			})

	}
})
