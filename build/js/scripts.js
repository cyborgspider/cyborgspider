$(function(){var a;return $(".visit").attr("target","_blank"),a=function(a){var b;return a.preventDefault(),b=$(this).data("filter"),$(this).siblings().removeClass("active"),$(this).addClass("active"),$("#work-list li").filter(b).show(),$("#work-list li").not(b).hide()},$("#filter-nav").on("click","a",a)});