var seting = {
    apiUrl: "api.php",    // api地址
    ratio: 0.618,        // 图片宽高比
    types: '360new',     // 加载壁纸的种类
    downApi: 'http://image.baidu.com/search/down?tn=download&word=download&ie=utf8&fr=detail&url=' // 用于下载图片的api地址
};
var jigsaw = {
    count: 0,            // 已加载的总数
    halfHtml: '',
    pageno: 0,	// 最后一个加载的html
    value: '',
    loadBig: false,      // 是否已加载最大的那个
    ajaxing: false        //是否正在ajax加载
};
// 大小改变
window.onresize = function () {
    resizeHeight();
};
// 初始化
window.onload = function () {
    ajax360Tags();
    loadData(seting.types, true);   // 初始加载壁纸
    loadData(seting.types, false);
    loadData(seting.types, false);
    resizeHeight();
};

$(function () {

    // 监听滚动消息
    $(window).scroll(function () {

        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

        if (scrollTop + $(window).height() + 57 >= $(document).height() && scrollTop > 20) {

            if (seting.types === '360search') {
                loadDataSearch(seting.types, false, jigsaw.value);
                loadDataSearch(seting.types, false, jigsaw.value);
            } else {
                if (seting.types != "bing") {
                    loadData(seting.types, false);
                    loadData(seting.types, false);
                }
            }
        }
        if (seting.types != 'bing' && seting.types != 'ciba') {
            if (scrollTop >= 300) {
                $('#toolBall').fadeIn(400);
            } else {
                $('#toolBall').fadeOut(200);
            }
        }
    });

    $("#toolBall").click(function () {
        if (seting.types == 'bing' || seting.types == 'ciba') {
            return true;
        }
        $("html,body").animate({"scrollTop": top});
        return false;
    });

    // 点击关闭弹出层
    $("body").on("click", "#full-img", function () {
        $("#full-img").remove();
    });

    // 点击小图显示大图
    $("#walBox").on("click", "img", function () {
        showImg($(this).data('realurl'));
    });
});

// 加载壁纸容器中的壁纸
function loadData(types, newload) {
    if (types != seting.types || newload === true) {

        seting.types = types;
        jigsaw = {
            count: 0,            // 已加载的总数
            halfHtml: '',        // 最后一个加载的html
            pageno: 0,
            value: '',
            loadBig: false,      // 是否已加载最大的那个
            ajaxing: false        //是否正在ajax加载
        };
        $("#walBox").html('');
        $(document).unbind('mousewheel DOMMouseScroll MozMousePixelScroll');    // 解除全屏滚动的绑定
        $(".onepage-pagination").remove();
        $("body").removeClass();
        $(".jigsaw").removeAttr("style");
        $("#toolBall").attr('href', 'javascript:void(0);');
        $("#toolBall").attr('class', 'uptoTop');
        $("#toolBall").attr('title', '返回顶部');
        $("#toolBall").hide();
    }

    switch (seting.types) {
        case 'bing':    //加载必应壁纸
            ajaxBingWal(-1, 8);
            ajaxBingWal(7, 8);
            $("#toolBall").show();
            $("#toolBall").attr('class', 'downBing');
            $("#toolBall").attr('title', '下载这张图片');
            break;

        case 'ciba':    // 加载金山词霸每日一句壁纸
            if (newload === false) return;
            ajaxCiba(1);
            $("#toolBall").show();
            $("#toolBall").attr('class', 'downBing');
            $("#toolBall").attr('title', '下载这张图片');
            break;

        default:    // 加载来自360的壁纸
            ajax360Wal(seting.types, jigsaw.pageno, 10);
    }
}

// 加载壁纸容器中的壁纸
function loadDataSearch(types, newload, content) {
    if (types != seting.types || newload === true) {
        seting.types = types;
        jigsaw = {
            count: 0,            // 已加载的总数
            halfHtml: '',        // 最后一个加载的html
            pageno: 0,
            value: '',
            loadBig: false,      // 是否已加载最大的那个
            ajaxing: false        //是否正在ajax加载
        };
        $("#walBox").html('');
        $(document).unbind('mousewheel DOMMouseScroll MozMousePixelScroll');    // 解除全屏滚动的绑定
        $(".onepage-pagination").remove();
        $("body").removeClass();
        $(".jigsaw").removeAttr("style");
        $("#toolBall").attr('href', 'javascript:void(0);');
        $("#toolBall").attr('class', 'uptoTop');
        $("#toolBall").attr('title', '返回顶部');
        $("#toolBall").hide();
    }
    switch (seting.types) {
        case '360search':
            jigsaw.value = content;
            ajax360WalSearch(seting.types, jigsaw.pageno, 10, content);
            break;
    }
}

resizeHeight();

// 重新调整高度
function resizeHeight() {
    switch (seting.types) {
        default:
            var newHeight = $("#walBox").width() * (seting.ratio / 2);    // parseInt($(".jigsaw .half").css('width'))
            $(".jigsaw .item").css('height', newHeight);
            $(".jigsaw .Hhalf").css('height', newHeight / 2);
    }
    return true;
}

// 显示一张拼图壁纸
function addJigsaw(img, alt) {
    var newHtml;    // 新增的内容
    jigsaw.count++;    // 已加载壁纸数自加

    if (jigsaw.halfHtml !== '')    //  1/4 的壁纸，已加载完上面一半，接着加载下面那半
    {
        newHtml = '    <div class="Hhalf oneImg" onmouseover="hoverJigsawSearch(this)">'
            + '        <img data-original="' + img + '" alt="' + alt + '" title="关键字：' + alt + '" data-realurl="' + img + '">'
            + '    </div>'
            + '</div>';
        contAdd(jigsaw.halfHtml + newHtml);    //往容器中加入内容
        jigsaw.halfHtml = '';    // 另外半边加载完成
        return true;    // 函数功能已完成
    }

    if (((jigsaw.count - 1) % 5) === 0) {
        jigsaw.loadBig = false;
    }    // 新的一行，状态重置

    if ((jigsaw.loadBig === false) && ((Math.floor(Math.random() * 3) === 0) || ((jigsaw.count % 5) === 0)))    // 随机加载大张壁纸
    {
        newHtml = '<div class="item half oneImg" onmouseover="hoverJigsawSearch(this)">'
            + '    <img data-original="' + img + '" alt="' + alt + '" title="关键字：' + alt + '" data-realurl="' + img + '">'
            + '</div>';
        contAdd(newHtml);    //往容器中加入内容
        jigsaw.loadBig = true;    // 大张壁纸已被加载
        return true;    // 函数功能已完成
    }

    // 加载半张的壁纸
    jigsaw.halfHtml = '<div class="item quater">'
        + '    <div class="Hhalf oneImg" onmouseover="hoverJigsawSearch(this)">'
        + '        <img data-original="' + img + '" alt="' + alt + '" title="关键字：' + alt + '" data-realurl="' + img + '">'
        + '    </div>';
    return true;
}

// 往壁纸容器中加入内容
function contAdd(html) {
    var myBox = $("#walBox");    // 装壁纸的容器
    var $newHtml = $(html);
    myBox.append($newHtml);    // 加载到容器中
    $("img", $newHtml).lazyload({
        effect: 'fadeIn',
        threshold: 200 // 提前开始加载
    });
}
// ajax加载必应壁纸
function ajaxBingWal(start, count) {
    $.ajax({
        type: "GET",
        url: seting.apiUrl,
        data: "cid=bing&start=" + start + "&count=" + count,
        dataType: "json",
        success: function (jsonData) {
            let newHtml = "";
            if (isPC()) {
                newHtml += '<link rel="stylesheet" href="css/onepage-scroll.css">', downUrl = '';
                $("#walBox").append(newHtml);   // 全屏滚动插件css
            }
            for (var i = 0; i < jsonData.images.length; i++) {
                    downUrl = seting.downApi+'http://cn.bing.com' + jsonData.images[i].url;
                if (isPC()) {
                    newHtml += '<section data-url="' + downUrl + '" data-img="http://cn.bing.com' + jsonData.images[i].url + '"><p class="note">' + jsonData.images[i].copyright + '</p></section>';
                } else {
                    let copyright = getParenthesesStr(jsonData.images[i].copyright);
                    let title = jsonData.images[i].copyright.replace(copyright, "");
                    copyright = copyright.substring(1, copyright.length - 1);
                    newHtml += `<div class="xben-by-img"><img data-realurl="http://cn.bing.com${jsonData.images[i].url}" src="http://cn.bing.com${jsonData.images[i].url}" /> <p class="title">${title}<a href="${downUrl}" class="xben-bing-download">&nbsp|&nbsp立即下载</a></p><p class="copyright">${copyright}</p></div>`;
                    $("#toolBall").css("display", "none");
                }

            }
            $("#walBox").append(newHtml);
            if (isPC()) {
                $('#walBox').onepage_scroll({
                    // sectionContainer: '#walBox',
                    // direction: 'horizontal',  // 水平滚动
                    // pagination: false,  // 不显示右侧圆点
                    // easing: 'ease-in',
                    loop: false,    // 禁止循环滚动
                    beforeMove: function (index) {
                        $("#toolBall").attr('href', $(".section").eq(index - 1).attr('data-url'));
                        $(".section").eq(index - 1).attr('style', 'background-image: url(' + $(".section").eq(index - 1).attr('data-img') + ')');
                    },
                    afterMove: function (index) {
                        $(".section").eq(index).attr('style', 'background-image: url(' + $(".section").eq(index).attr('data-img') + ')');
                        $(".section").eq(index - 2).attr('style', 'background-image: url(' + $(".section").eq(index - 2).attr('data-img') + ')');
                        // $(".section").eq(index-1).attr('style','background-image: url('+ $(".section").eq(index-1).attr('data-img') +')');
                    }
                });
                $("#toolBall").attr('href', $(".section").eq(0).attr('data-url'));
                $(".section").eq(0).attr('style', 'background-image: url(' + $(".section").eq(0).attr('data-img') + ')');
            }
        }
    });
    return true;
}
// ajax加载金山词霸每日图片
function ajaxCiba(data) {
    $.ajax({
        type: "GET",
        url: "http://open.iciba.com/dsapi/",
        dataType: "jsonp",
        success: function (jsonData) {
            var newHtml = `<div class="xben-day-img" ><img data-realurl="${jsonData.picture2}" src="${jsonData.picture2}"  /><p class="note xben-note" title="${jsonData.translation}"><span onclick="$('audio')[0].play();" title="点击朗读" class="ciba-eng">${jsonData.content}</span><span>${jsonData.note}    <span title="${jsonData.love}人喜欢" class="ciba-love" onclick="$('.love-count').html(parseInt($('.love-count').html()) + 1)"><span class="xben-love">♥</span>&nbsp;<span class="love-count">${jsonData.love}</span></span></span></p><audio src="${jsonData.tts}" hidden></audio></div>`;
            $("#walBox").append(newHtml);
            $("#toolBall").attr('href', seting.downApi + jsonData.picture2);    // 下载链接
        }
    });
    return true;
}

// ajax加载360壁纸标签
function ajax360Tags() {
    $.ajax({
        type: "GET",
        url: seting.apiUrl,
        data: "cid=360tags",
        dataType: "json",
        success: function (jsonData) {
            var newHtml = '';
            for (var i = 0; i < jsonData.data.length; i++) {

                newHtml += '<a class="dropdown-item" href="javascript:void(0)" data-id=' + jsonData.data[i].old_id + ' onclick="loadData(' + jsonData.data[i].old_id + ', true);changeTitle(this)">' + jsonData.data[i].category + '</a>';
            }
            $("#xbenTags").append(newHtml);
        }
    });
    return true;
}

//ajax搜索360壁纸
function ajax360WalSearch(cid, start, count, content) {
    if (jigsaw.ajaxing === true) return false;
    $("#loadmore").html('努力加载中……');
    $("#loadmore").show();
    jigsaw.ajaxing = true;
    jigsaw.pageno++;
    $.ajax({
        type: "GET",
        url: seting.apiUrl,
        data: "cid=" + cid + "&start=" + start + "&count=" + count + "&content=" + encodeURIComponent(content),
        dataType: "json",
        success: function (jsonData) {
            for (var i = 0; i < jsonData.data.list.length; i++) {
                addJigsawSearch(jsonData.data.list[i].url, jsonData.data.list[i].tag);
            }
            resizeHeight();
            jigsaw.ajaxing = false;
            if (jsonData.data.list.length === 0) {
                $("#loadmore").html('所有的壁纸都已经加载完啦！');
            } else {
                $("#loadmore").hide();
            }
        }
    });
    return true;
}

// 显示一张拼图壁纸（360搜索）
function addJigsawSearch(img, alt) {
    var newHtml;    // 新增的内容
    jigsaw.count++;    // 已加载壁纸数自加

    if (jigsaw.halfHtml !== '')    //  1/4 的壁纸，已加载完上面一半，接着加载下面那半
    {

        newHtml = '    <div class="Hhalf oneImg" onmouseover="hoverJigsawSearch(this)">'
            + '        <img data-original="' + img + '" alt="' + alt + '" title="关键字：' + alt + '" data-realurl="' + img + '">'
            + '    </div>'
            + '</div>';
        contAdd(jigsaw.halfHtml + newHtml);    //往容器中加入内容
        jigsaw.halfHtml = '';    // 另外半边加载完成
        return true;    // 函数功能已完成
    }

    if (((jigsaw.count - 1) % 5) === 0) {
        jigsaw.loadBig = false;
    }    // 新的一行，状态重置

    if ((jigsaw.loadBig === false) && ((Math.floor(Math.random() * 3) === 0) || ((jigsaw.count % 5) === 0)))    // 随机加载大张壁纸
    {


        newHtml = '<div class="item half oneImg" onmouseover="hoverJigsawSearch(this)">'
            + '    <img data-original="' + img + '" alt="' + alt + '" title="关键字：' + alt + '" data-realurl="' + img + '">'
            + '</div>';
        contAdd(newHtml);    //往容器中加入内容
        jigsaw.loadBig = true;    // 大张壁纸已被加载
        return true;    // 函数功能已完成
    }

    // 加载半张的壁纸
    jigsaw.halfHtml = '<div class="item quater">'
        + '    <div class="Hhalf oneImg" onmouseover="hoverJigsawSearch(this)">'
        + '        <img data-original="' + img + '" alt="' + alt + '" title="关键字：' + alt + '" data-realurl="' + img + '">'
        + '    </div>';
    return true;
}

// ajax加载来自360的壁纸
function ajax360Wal(cid, start, count) {
    if (jigsaw.ajaxing === true) return false;

    $("#loadmore").html('努力加载中……');
    $("#loadmore").show();
    jigsaw.ajaxing = true;
    jigsaw.pageno++;
    $.ajax({
        type: "GET",
        url: seting.apiUrl,
        data: "cid=" + cid + "&start=" + start + "&count=" + count,
        dataType: "json",
        success: function (jsonData) {
            for (var i = 0; i < jsonData.data.list.length; i++) {
                addJigsaw(jsonData.data.list[i].url, jsonData.data.list[i].tag);
            }
            resizeHeight();
            jigsaw.ajaxing = false;
            if (jsonData.data.list.length === 0) {
                $("#loadmore").html('所有的壁纸都已经加载完啦！');
            } else {
                $("#loadmore").hide();
            }
        }
    });
    return true;
}



// 解码360图片的链接，获得指定尺寸图片
function decode360Url(oldUrl, width, height, quality) {
    return oldUrl.replace("r\/__85", "m\/" + parseInt(width) + "_" + parseInt(height) + "_" + quality);
}

function hoverJigsawSearch(obj) {
    if ($(obj).find('.down').length > 0) return true;

    var realUrl = $(obj).find('img').attr("data-realurl");
    var downBox = '';
    downBox = '<ul class="down" title="下载壁纸">'
        + '<li><a href="' + seting.downApi + realUrl + '" target="_blank" title="下载原始尺寸图片">原始尺寸</a></li></ul>'
    $(obj).append(downBox);
}

// 同步改变浏览器标题
function changeTitle(obj) {
    if ($(obj).html() == '') {
        $('title').html('小笨电脑壁纸-小笨在线壁纸-在线搜索');
    } else {
        $('title').html($(obj).html() + ' - 在线壁纸');
    }
}

var imgDom;
// 全屏展示图片
// 参数：图片链接
function showImg(img) {
    if(isPC()){
        imgDom = $('<img>').attr('id', 'full-img').attr('src', img).appendTo('body');
        return;
    }
    if($(".xben-full-img").is(":hidden")){
        $(".xben-full-img").css("display","flex");
        $(".xben-full-img>img").attr("src",img);
        $(".xben-full-img>img").removeClass("horizontal");
        $(".horizontal-btn").show();
    }

}
//横屏显示
$(".horizontal-btn").click(function(){
    $(".xben-full-img>img").addClass("horizontal");
    $(this).hide();
})

$(".xben-full-img").click(function(){
    $(this).hide();
});
$(".xben-full-img .horizontal-btn").click((e)=>{
    e.stopPropagation();
})

function loadData360Search() {
    var text = document.getElementById("360text").value;
    if (text === "") {
        text = '中国';
    }
    loadDataSearch('360search', true, text);
}

function isPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
        "SymbianOS", "Windows Phone",
        "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}
function getParenthesesStr(text) {
    let result = ''
    if ($.isEmptyObject(text))
        return result
    let regex = /\((.+?)\)/g;
    let options = text.match(regex)
    if (!$.isEmptyObject(options)) {
        let option = options[0]
        if (!$.isEmptyObject(option)) {
            result = option.substring(0, option.length)
        }
    }
    return result
}

console.info('小笨壁纸来源于：360壁纸库、必应首页壁纸以及金山词霸开放平台\n小笨分享站：https://zhouxiaoben.info\n基于孟坤壁纸二次开发\nGithub：https://github.com/water1996/xben-wallpaper');
