// ==UserScript==
// @name         52破解网页净化
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  52破解网页净化
// @author       NULL
// @match        https://www.52pojie.cn/*
// @grant        none
// @run-at       document-end
// @require      http://cdn.bootcss.com/jquery/1.8.3/jquery.min.js
// ==/UserScript==

(function() {
    'use strict';

    $("div.bm.bml.pbn").hide();
    $("td.plc.plm").hide();
    $("div.plc.dnch_eo_pt").hide();
    $("div.dnch_eo_pt").hide();
    $("dl.rate").hide();
})();