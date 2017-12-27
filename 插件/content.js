window.onload = function() {
	function trim(s){  
		return trimRight(trimLeft(s));  
	}  
	//去掉左边的空白  
	function trimLeft(s){  
		if(s == null) {  
			return "";  
		}  
		var whitespace = new String(" \t\n\r");
		var str = new String(s);
		if (whitespace.indexOf(str.charAt(0)) != -1) {  
			var j=0, i = str.length;  
			while (j < i && whitespace.indexOf(str.charAt(j)) != -1){
				j++;  
			}  
			str = str.substring(j, i);  
		}  
		return str;  
	}  
	
	//去掉右边的空白 www.2cto.com   
	function trimRight(s){  
		if(s == null) return "";  
		var whitespace = new String(" \t\n\r");  
		var str = new String(s);  
		if (whitespace.indexOf(str.charAt(str.length-1)) != -1){  
			var i = str.length - 1;  
			while (i >= 0 && whitespace.indexOf(str.charAt(i)) != -1){  
			   i--;  
			}  
			str = str.substring(0, i+1);  
		}  
		return str;  
	}  
	var url=window.location.href;
	var title="";
	var dianpu="";
	var shangpinId="";
	if(url.indexOf("detail.tmall.com")>=0){
		title=trim($(".tb-detail-hd h1").text());
		dianpu=trim($(".slogo-shopname strong").text());
	}
	else if(url.indexOf("item.taobao.com")>=0){
		title=trim($(".tb-main-title").text());
		dianpu=trim($(".tb-shop-name a").text());
	}
	var ii=url.indexOf("&id=")+1;
	var jj=url.indexOf("&",ii);
	if(jj<0) jj=10000;
	shangpinId=url.substring(ii,jj).replace(/id=/g,"");
	console.log(shangpinId);
	if(title==""||dianpu=="")return;
	chrome.runtime.sendMessage({
		type: 1,
		title:title,
		shangpinId:shangpinId,
		dianpu:dianpu
	}, function(response) {
		if(response){
			console.log(response)
			var kdxx=response[0]["kdxx"];
			var khbz=response[0]["khbz"];
			var sjbz=response[0]["sjbz"];
			var gmbz=response[0]["gmbz"];
			var jjll=response[0]["jjll"];
			var yjll=response[0]["yjll"];
			var sjlj=response[0]["sjlj"];
			var thlj=response[0]["thlj"];
			var id=response[0]["id"];
			$("body").append('<div id="show" style="font-size:16px;cursor: pointer;position:fixed;z-index:9999999999999999;padding:0 10px;text-align:center;background-color:#000;color:#fff;right:0;top:0;">打开</div>');
			$("body").append('<div id="xinxiDialog" style="font-size:12px;position:fixed;z-index:9999999999999999999;padding:5px;text-align:center;width:200px;background-color:#000;color:#fff;right:0;top:0;">\
			<div style="text-align:right"><a href="http://39.108.55.222/thing/update?id='+id+'" target="_blank"  style="color:#fff;margin-right:30px;" id="update">修改</a><a href="javascript:void(0)" style="color:#fff" id="close">关闭</a></div>\
			<div style="font-size:12px;margin-top:10px">快递信息：</div><div>'+kdxx+'</div><div style="font-size:12px;margin-top:10px;border-top:1px solid #fff;">客户备注信息：</div><div style="max-height:200px;overflow-y: auto;">'+khbz+'</div>\
			<div style="font-size:12px;margin-top:10px;border-top:1px solid #fff;">加价利润：</div><div>'+jjll+'</div>\
			<div style="font-size:12px;margin-top:10px;border-top:1px solid #fff;">上家链接：<input  type="button" value="复制" class="copy1"  style="margin-right:10px;margin-top:5px;"/><input type="button" data-link="'+sjlj+'" style="margin-right:10px;margin-top:5px;" value="打开" class="open" /></div><div style="font-size:12px;margin-top:10px;border-top:1px solid #fff;">同行链接：<input  type="button" value="复制" class="copy2"  style="margin-right:10px;margin-top:5px;"/><input type="button" data-link="'+thlj+'" style="margin-right:10px;margin-top:5px;" value="打开" class="open" /></div>\
			</div>')
			$("body").append('<input id="linktxt1" value="'+sjlj+'">');
			$("body").append('<input id="linktxt2" value="'+thlj+'">');
			$("#close").click(function(){
				$("#xinxiDialog").hide();
			})
			$("#show").click(function(){
				$("#xinxiDialog").show();
			})
			$(".copy1").click(function(){
				var Url2=document.getElementById("linktxt1");
					Url2.select(); // 选择对象
					document.execCommand("Copy"); // 执行浏览器复制命令
					alert("已复制好，可贴粘。");
			})
			$(".copy2").click(function(){
				var Url2=document.getElementById("linktxt2");
					Url2.select(); // 选择对象
					document.execCommand("Copy"); // 执行浏览器复制命令
					alert("已复制好，可贴粘。");
			})
			$(".open").click(function() {
				var link=$(this).attr("data-link");
				window.open(link);
			})
		}
	})
	return;
	chrome.runtime.sendMessage({
		type: 3
	}, function(response) {
		if (response.gobalCompanyName != "") {
			if (!response.goFlag) return;
			if (window.location.href.indexOf("vip.58.com") >= 0) {
				setTimeout(function() {
					var list = [];
					var trList = $(window.frames["ContainerFrame"].document).find("#table2 tr");
					if (trList.length == 0)
						trList = $(document.getElementById('ContainerFrame').contentWindow.document).find("#table2 tr");
					trList.each(function(index, el) {
						var json = {};
						json["time"] = $.trim($(el).children('td').eq(1).text());
						json["address"] = $.trim($(el).children('td').eq(3).text());
						list.push(json);
					})
					if (list.length != 0) {
						chrome.runtime.sendMessage({
							list: list,
							type: 1
						}, function(response) {
							if (response.status == "success") {
								window.location.href = "https://jingzhun.58.com/new?userId";
							}
						})

					}

				}, 1000)

			}
			if (window.location.href.indexOf("https://jingzhun.58.com/new?userId") >= 0) {
				chrome.runtime.sendMessage({
					type: 2
				}, function(response) {
					console.log(response);
					var ipStr = "";
					for (var i = 0; i < response.ipArray.length; i++) {
						ipStr += response.ipArray[i] + ",";
					};
					$(".a-ipout")[0].click();

					setTimeout(function() {
						var kkg = $(".page-oldip:eq(0) a").length - 3;
						var pages = $(".page-oldip:eq(0) a").eq(kkg).html();
						var ids = [];
						clearAll(pages, ipStr, ids);
					}, 1000)
				})
			}
		}
	})
	var kkk = 1;

	function clearAll(times, ipStr, ids) {

		setTimeout(function() {
			$("input[name='ipCheckBox']").each(function(index, el) {
				console.log($(el).attr("id"));
				ids.push($(el).attr("id"));
			})
			if (kkk < times) {
				$(".page-oldip:eq(0) a").eq($(".page-oldip:eq(0) a").length - 2)[0].click();
				clearAll(times, ipStr, ids);
				kkk++;
			} else {
				kkk = 1;
				console.log(ids);
				var userId = $("#userId").val();
				chrome.runtime.sendMessage({
					type: 5,
					userId: userId,
					ids: ids
				}, function(response) {
					if (response == "success") {
						console.log(ipStr);
						chrome.runtime.sendMessage({
							type: 6,
							userId: userId,
							ips: ipStr,
							ipType: 0
						}, function(response1) {
							if (response1 == "success") {
								window.close();
							}
						})
					}
				})
			}

		}, 500)


	}
}