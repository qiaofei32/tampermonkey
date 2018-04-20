// ==UserScript==
// @name         QQ音乐下载-HOOK
// @namespace    http://www.infosec-wiki.com/
// @version      1.1
// @description  qq music downloader
// @author       http://www.infosec-wiki.com/
// @match        https://y.qq.com/*
// @run-at       document-start
// @grant        unsafeWindow
// @grant        GM_download
// @noframes
// ==/UserScript==

(function() {
	'use strict';

	document.addEventListener ("DOMContentLoaded", DOM_ContentReady);
	window.addEventListener ("load", function(){
		setTimeout(pageFullyLoaded, 3000);
	});

	function DOM_ContentReady () {
		// 2ND PART OF SCRIPT RUN GOES HERE.
		// This is the equivalent of @run-at document-end
		//console.log ("==> 2nd part of script run.", new Date() );
	};

	function getCookie(name) {
		var reg = new RegExp("(^| )"+name+"=([^;]*)(;|$)");
		var arr = document.cookie.match(reg);
		if(arr){
			return unescape(arr[2]);
		}
		else{
			return null;
		}
	};

	function pageFullyLoaded () {
		//console.log("==> Page is fully loaded, including images.", new Date());
		//console.log("====================================================================================");
		//console.log("HOOK");
		//console.log(MUSIC);
		//console.log("====================================================================================");

        var url = null;
        var file_name = null;

		$("a.btn_big_down.js_btn_down").click(function () {
            var url = $(this).attr("href");
            var file_name = $(this).attr("download");
            GM_download(url, file_name);
            console.log(url);
            console.log(file_name);
            return false;
		});


		var MUSIC_jQueryAjax_jsonp = MUSIC.jQueryAjax.jsonp;

		MUSIC.jQueryAjax.jsonp = function (e) {
			//console.log("====================================================================================");
			//console.log("HOOK");
			//console.log(e);

			if(e.url && e.url.indexOf("fcg_music_express_mobile3.fcg") > -1){
				console.log("====================================================================================");
				//console.log(e);
				//console.log(e.url);
				console.log("cid="+ e.data.cid);
				console.log("uin="+ e.data.uin);
				console.log("guid="+ e.data.guid);
				console.log("songmid="+ e.data.songmid);
				console.log("filename="+ e.data.filename);

				var uin = e.data.uin;
				var guid = getCookie("pgv_pvid");
				var jsonpCallback = e.jsonpCallback;
				unsafeWindow[jsonpCallback] = function(data){
					//console.log(data);
					var url = "http://dl.stream.qqmusic.qq.com/";
					url += data.data.items[0]["filename"] + "?vkey=";
					url += data.data.items[0]["vkey"] + "&guid=";
					url += guid + "&uin=";
					url += uin + "&fromtag=66";
					console.log(url);


					var title = $("div.songlist__item--playing span.songlist__songname_txt").text();
					console.log(title);
                    var file_name = title+".mp3";
					$("a.btn_big_down.js_btn_down").attr("href", url).attr("target", "_blank").attr("download", file_name);
                    GM_download(url, title+".mp3");

					$.ajax({
						url: "http://127.0.0.1:8888/?url=" + escape(url) + "&title=" + title ,
						type: 'GET'
					});

				};

				$.ajax({
					url: e.url,
					type: 'GET',
					data: e.data,
					dataType: "jsonp",
					success: function (data) {}
				 });

			}
			//console.log("====================================================================================");
			//MUSIC_jQueryAjax_jsonp(e); // ERROR
			MUSIC_jQueryAjax_jsonp.call(this, e);
		};
	};
})();