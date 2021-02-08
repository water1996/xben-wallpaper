<!--********************************
小笨分享站，有你更精彩！！！小老弟，欢迎F12
◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇
◇◇◇◇◇◇◆◇◇◇◇◇◇◇◆◆◆◆◆◆◆◆◆◆◇◇◇◇◆◆◇◆◆◇◇◇◇◆◆◆◆◆◆◆◆◆◆◆◇◇◆◆◇◇◇◆◇◇◇◇
◇◇◇◆◇◇◆◇◇◆◇◇◇◆◆◇◆◇◆◆◆◆◇◇◇◇◇◆◆◇◇◆◆◆◇◇◇◇◇◆◆◆◆◆◆◆◆◇◇◆◆◆◆◆◇◆◆◆◆◆
◇◇◇◆◇◇◆◇◇◆◇◇◇◇◇◇◆◇◆◇◆◆◇◇◇◇◆◆◆◇◇◇◆◆◆◇◇◇◇◆◇◇◇◇◇◆◆◇◇◆◇◇◆◆◇◆◇◇◇◇
◇◇◆◆◇◇◆◇◇◆◆◇◇◆◆◆◆◆◆◆◆◆◆◆◇◆◆◆◆◆◆◆◆◆◆◆◇◇◇◆◆◆◆◆◆◆◆◇◇◆◆◇◆◇◆◆◆◆◆◇
◇◇◆◆◇◇◆◇◇◆◆◇◇◇◇◇◇◆◆◆◇◇◇◇◇◆◆◇◇◆◇◇◇◆◆◆◇◇◆◆◆◆◆◆◆◆◆◇◇◆◆◇◆◇◆◇◇◆◆◇
◇◇◆◇◇◇◆◇◇◇◆◇◇◇◇◇◆◆◆◆◆◇◇◇◇◇◇◇◆◆◇◇◇◆◇◇◇◇◇◇◇◇◇◆◆◆◆◇◇◆◆◇◆◇◆◇◇◇◆◇
◇◆◆◇◇◇◆◇◇◇◆◆◇◇◆◆◆◇◆◇◆◆◆◇◇◇◇◇◆◆◇◇◇◆◇◇◇◇◇◇◇◇◆◆◆◇◇◇◇◇◆◆◆◇◆◇◇◇◆◇
◇◆◇◇◇◇◆◇◇◇◆◆◇◆◆◆◆◆◆◆◆◆◆◆◇◇◇◆◆◇◇◇◇◆◇◇◇◆◆◆◆◆◆◆◆◆◆◆◇◇◆◆◆◆◆◇◇◇◆◇
◇◇◇◆◆◆◆◇◇◇◇◇◇◇◇◇◇◇◆◇◇◇◇◇◇◇◆◆◆◇◆◆◆◆◇◇◇◇◇◇◇◇◇◆◆◇◇◇◇◇◆◆◆◆◆◇◇◆◆◇
◇◇◇◆◆◆◆◇◇◇◇◇◇◇◇◇◇◇◆◇◇◇◇◇◇◆◆◆◇◇◆◆◆◆◇◇◇◇◇◇◆◆◆◆◆◇◇◇◇◆◆◆◇◇◆◆◆◆◆◇
◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇
基于孟坤壁纸二次修改制作修改，并添加壁纸搜索功能！　　　　　
 ********************************-->
<?php
/**
 * @author 小笨
 * @GitHub:https://github.com/water1996/xben-wallpaper
 */
function is_https() {
    if ( !empty($_SERVER['HTTPS']) && strtolower($_SERVER['HTTPS']) !== 'off') {
        return true;
    } elseif ( isset($_SERVER['HTTP_X_FORWARDED_PROTO']) && $_SERVER['HTTP_X_FORWARDED_PROTO'] === 'https' ) {
        return true;
    } elseif ( !empty($_SERVER['HTTP_FRONT_END_HTTPS']) && strtolower($_SERVER['HTTP_FRONT_END_HTTPS']) !== 'off') {
        return true;
    }
    return false;
}
?>

<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>小笨电脑壁纸</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <?php
    if(is_https()){
        echo "<meta http-equiv=\"Content-Security-Policy\" content=\"upgrade-insecure-requests\">";
    }
    ?>
    <meta name="robots" content="index,follow"/>
    <meta name="referrer" content="no-referrer" />
    <link rel="shortcut icon" href="https://zhouxiaoben.info/src/wp-content/uploads/2018/07/xiaobiaoti.png">
    <link rel="stylesheet" href="css/wallpaper.css">
    <link rel="stylesheet" href="https://cdn.staticfile.org/twitter-bootstrap/4.3.1/css/bootstrap.min.css">
</head>
<body>

<nav class="navbar navbar-expand-sm xben-nav  navbar-light fixed-top">
    <a class="navbar-brand xben-title" href="http://wallpaper.zhouxiaoben.info" >小笨在线壁纸</a>
    <button class="navbar-toggler xben-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse " id="collapsibleNavbar">
        <ul class="navbar-nav">
            <form class="form-inline xben-from">
                <input class="form-control text-360" id="360text" type="text" placeholder="请输入关键字">
                <button class="btn btn-primary " id="xbenSearchBtn" type="button"
                        onclick="loadData360Search();changeTitle(this)">壁纸一下
                </button>
            </form>
            <li class="nav-item">
                <a class="nav-link" href="javascript:void(0)"
                   onclick="loadData('360new', true);changeTitle(this)">最新壁纸</a>
            </li>
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
                    分类壁纸
                </a>
                <div class="dropdown-menu xben-dropdown-menu" id="xbenTags">

                </div>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="javascript:void(0)"
                   onclick="loadData('bing', true);changeTitle(this)">必应美图</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="javascript:void(0)" onclick="loadData('ciba', true);changeTitle(this);"
                   title="金山词霸每日一句壁纸">每日英语</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="https://zhouxiaoben.info" target="_blank">小笨博客</a>
            </li>

        </ul>

    </div>
</nav>
<div class="xben-container">

    <div class="jigsaw" id="walBox"></div>  <!-- id="walBox" -->

    <a id="toolBall" target="_blank" href="javascript:void(0);" class="uptoTop"></a>

    <div id="loadmore">小笨壁纸加载中……</div>
	<div class="xben-full-img"><img
            src="http://cdn-ali-img-staticbz.shanhutech.cn/bizhi/staticwp/202003/9bd0be8ab5506a7902f36eb4da95ebc1--3977944025.jpg"/>
    <button class="horizontal-btn btn btn-primary">横屏显示</button>
</div>
</div>
<!-- jQuery文件 -->
<script src="https://cdn.bootcss.com/jquery/1.11.3/jquery.min.js"></script>
<!--滚动加载插件-->
<script type="text/javascript" src="js/jquery.lazyload.min.js"></script>
<!--全屏滚动插件-->
<script type="text/javascript" src="js/jquery.onepage-scroll.min.js"></script>
<!--页面核心js文件-->
<script type="text/javascript" src="js/wallpaper.js"></script>
<script src="https://cdn.staticfile.org/twitter-bootstrap/4.3.1/js/bootstrap.min.js"></script>
</body>
