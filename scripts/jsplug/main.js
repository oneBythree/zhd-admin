$(document).ready(function() {

    //加载公用头部
    // $('#sideBar').load('sideBar.html');
    // $('#topBar').load('topBar.html');

    var level = sessionStorage.getItem('silderLevel');
    var thisEl = $("[data-level=" + level + "]");
    $('.sub1').hide();
    $('#list a').removeClass('active');
    thisEl.addClass('active');
    $("[data-level=" + level + "]").parents('.sub1,.sub2').slideDown();
    if (thisEl.next().hasClass('sub2') || thisEl.next().hasClass('sub1')) {
        thisEl.next().slideDown();
    }

    $('body').on('click', '.iframeLink', function() {
        var url = $(this).attr('data-url');
        window.parent.window.frames['iFrame1'].frameElement.src = url;
    })


    $('#sideBar').on('click', 'a.item', function(event) {
        $('#listshow a.item').removeClass('active');
        $(this).addClass('active');
        var curele = $(this).nextAll('ul');
        var thisList1 = $(this).parents('.sub1');
        $('.sub1').not(thisList1).slideUp();
        if (curele !== null) {
            if (curele.is(':hidden')) {
                curele.slideDown();
            } else {
                curele.slideUp();
            };
        };
        sessionStorage.removeItem("silderLevel");
        var level = $(this).attr('data-level');
        console.log(level);
        sessionStorage.setItem('silderLevel', level);
    });


})


//获取哈希值
function localParam(search) {
    var search = search || window.location.search;
    var fn = function(str, reg) {
        if (str) {
            var data = {};
            str.replace(reg, function($0, $1, $2, $3) {
                data[$1] = $3;
            });
            return data;
        }
    }
    return (fn(search, new RegExp("([^?=&]+)(=([^&]*))?", "g")));
}



/**
 *  e追溯封装ajax
 * @type {Object}
 */
var myAjax = {
    'formAjax': function(el, successFuc) {//提交表单
        $(el).submit(function(event) {
            var form = $(this);
            $.ajax({
                url: form.attr('action'),
                type: form.attr('method'),
                data: form.serialize(),
                success: function(data) {
                    successFuc(data)
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    sweetAlert("请求服务错误,错误码" + textStatus, "", "error");
                }
            });
        });
    }
}
