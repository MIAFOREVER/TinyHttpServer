$(document).ready(function(){

//搜索提交按钮切换
$("#index-search").hover(function(){
	$(this).attr("src","http://zixuephp.gz01.bdysite.com/static/images/searchh.png");
},function(){
	$(this).attr("src","http://zixuephp.gz01.bdysite.com/static/images/search.png");
});

//搜索下拉
$("#index-input").bind("input propertychange", function(){
    var getkey = $("#index-input").val();
    $.ajax({
        type: "post",
        url: "search.html",
        data: { key: getkey },
        dataType: "json",
        success:function(data){
            if(data.length > 0){
                if(data){
                    var ajax_res = '';
                    var atit = '';
                    $.each(data,function(index){
                        atit = data[index].title;
                        atit = atit.replace(new RegExp(getkey,'ig'),"<code>"+getkey+"</code>");
                        ajax_res+="<a href=\"./article-"+data[index].id+".html\" target='_blank' class=\"res_search\">"+atit+"<span>浏览"+data[index].click+"次</span></a>";
                    });
                    $('.ajax_search').html(ajax_res);
                    $('.ajax_search').fadeIn();
                }
            }else{
                $('.ajax_search').html('<div class="res_search">没有相关信息</div>');
                $('.ajax_search').fadeIn();
            }
        }
    });
});

/*
//搜索时区焦点隐藏
$("#index-input").blur(function(){
    $('.ajax_search').slideUp();
    $('.ajax_search').html('');
});
*/

	
$(".discussion .discu ul li").each(function(index){
	$(this).click(function(){
		$(this).addClass("disculihover").siblings().removeClass("disculihover");
		$(".discussion .discuco .discucon").eq(index).fadeIn(500).siblings(this).hide();
	});
});


$('.post').each(function(){
    var pseer = $(window).width();
    if(pseer<=720){
        return false;
    }
    $(this).hover(function(){
        var toph = $(this).offset().top;
        var leftw = $(this).offset().left;
        $(this).mousemove(function(e){
            var top = e.pageY-toph+10;
            var left = e.pageX-leftw+15;
            $(this).find('.sketch').css({
                'display':'block',
                'left':left+'px',
                'top':top+'px'
            });
        });
        $(this).addClass('active_s');
    },function(){
        $(this).find('.sketch').hide();
        $(this).removeClass('active_s');
    });
});


$(window).scroll(function(){
	if($(window).scrollTop()>300){
		$(".rnlist").fadeIn(700);
	}else{
		$(".rnlist").fadeOut(500);
	}
});

$(".rnlist").click(function(){
	$("html,body").animate({scrollTop:0},500);
});
	
	
	var pnamenum1 = 31;
	$('#p1').keyup(function(){
		var pnn1 = $(this).val().length;
		if(pnn1 < pnamenum1){
			$('#pn1').text(pnamenum1 - (pnn1+1));
		}
	});

	$('.recommhot .rhu .rhl').each(function(rhdl){
        $(this).hover(function(){
            $(this).css('border-bottom','1px solid #fff').siblings('.rhl').css('border-bottom','1px solid green');
            $('.recommhot .rhdl').eq(rhdl).show().siblings('.rhdl').hide();
        });
    });


	var pnamenum2 = 51;
	$('#p2').keyup(function(){
		var pnn2 = $(this).val().length;
		if(pnn2 < pnamenum2){
			$('#pn2').text(pnamenum2 - (pnn2+1));
		}
	});

	var pnamenum3 = 101;
	$('#p3').keyup(function(){
		var pnn3 = $(this).val().length;
		if(pnn3 < pnamenum3){
			$('#pn3').text(pnamenum3 - (pnn3+1));
		}
	});

	var pnamenum4 = 13;
	$('#p4').keyup(function(){
		var pnn4 = $(this).val().length;
		if(pnn4 < pnamenum4){
			$('#pn4').text(pnamenum4 - (pnn4+1));
		}
	});

	$('.pname').each(function(){
		$(this).focus(function(){
			$(this).addClass('sel');
		});
		$(this).blur(function(){
			$(this).removeClass('sel');
		});
	});
	

	var wuf;
	function wufeng(){
		wuf = setInterval(function(){
			$('.brecomcon').animate({marginTop:'-30px'},800,function(){
				$(this).children('a').eq(0).appendTo('.brecomcon');
				$(this).css('margin-top','0px');
			});
		},3500);
		
	}
	
	$('.brecomcon a').hover(function(){
			clearInterval(wuf);
	},function(){
			wufeng();
	});
	
	wufeng();


	$('#caidr').click(function(){
		if($(this).attr('class')=='glyphicon glyphicon-menu-hamburger'){
			$(this).attr('class','glyphicon glyphicon-remove');
			$('#caidrz').slideDown();
		}else{
			$(this).attr('class','glyphicon glyphicon-menu-hamburger');
			$('#caidrz').slideUp();
		}
	});

	$('.pcdetails img').each(function(){
		
		$(this).click(function(){
			if($(this).attr('scale')=='1'){
				$(this).attr('scale','0');
				$(this).attr('style','');
				$(this).css('cursor','url("http://zixuephp.gz01.bdysite.com/static/images/big.ico"),pointer');
			}else{
				$(this).attr('scale','1');
				$(this).css('width','100%').css('height','auto').css('cursor','url("http://zixuephp.gz01.bdysite.com/static/images/small.ico"),pointer');
			
			}
		});
	});

    $('.rnlist').each(function(){
        $(this).hover(function(){
            $(this).find('.rimg').hide();
            $(this).find('.rntit').show();
        },function(){
            $(this).find('.rntit').hide();
            $(this).find('.rimg').show();
        });
    });

    
    $('#qq').click(function(){
        var qqs ='';
        for(var i =0;i<=134;i++){
            qqs+='<img src="http://zixuephp.gz01.bdysite.com/static/images/qq/'+i+'.gif" onclick="writes($(this))" width="25" height="25" val="[qq_'+i+']"/>';
        }
        $('.qqs').html(qqs);
        $('.qqs').slideDown();
        $('.emos,.wangwang').hide();
    });

    $('#qq1').click(function(){
        var qqs1 ='';
        for(var i =0;i<=134;i++){
            qqs1+='<img src="http://zixuephp.gz01.bdysite.com/static/images/qq/'+i+'.gif" onclick="writes1($(this))" width="25" height="25" val="[qq_'+i+']"/>';
        }
        $('.qqs1').html(qqs1);
        $('.qqs1').slideDown();
        $('.emos1,.wangwang1').hide();
    });

    $('#emo').click(function(){
        var emos ='';
        for(var i =1;i<=40;i++){
            emos+='<img src="http://zixuephp.gz01.bdysite.com/static/images/emote/'+i+'.gif" onclick="writes($(this))" width="25" height="25" val="[emote_'+i+']"/>';
        }
        $('.emos').html(emos);
        $('.emos').slideDown();
        $('.qqs,.wangwang').hide();
    });

    $('#emo1').click(function(){
        var emos1 ='';
        for(var i =1;i<=40;i++){
            emos1+='<img src="http://zixuephp.gz01.bdysite.com/static/images/emote/'+i+'.gif" onclick="writes1($(this))" width="25" height="25" val="[emote_'+i+']"/>';
        }
        $('.emos1').html(emos1);
        $('.emos1').slideDown();
        $('.qqs1,.wangwang').hide();
    });

    $('#wangwang').click(function(){
        var wangwang ='';
        for(var i =1;i<=27;i++){
            wangwang+='<img src="http://zixuephp.gz01.bdysite.com/static/images/wangwang/'+i+'.gif" onclick="writes($(this))" width="30" height="30" val="[wangwang_'+i+']"/>';
        }
        $('.wangwang').html(wangwang);
        $('.wangwang').slideDown();
        $('.qqs,.emos').hide();
    });
    $('#wangwang1').click(function(){
        var wangwang1 ='';
        for(var i =1;i<=37;i++){
            wangwang1+='<img src="http://zixuephp.gz01.bdysite.com/static/images/wangwang/'+i+'.gif" onclick="writes1($(this))" width="30" height="30" val="[wangwang_'+i+']"/>';
        }
        $('.wangwang1').html(wangwang1);
        $('.wangwang1').slideDown();
        $('.qqs1,.emos1').hide();
    });

    $('.replysub').click(function(){
        var onereplycon = $('.article_reply').val();
        var thepostid = $('.replysub').attr('postid')
        if(onereplycon == ''){
            $('.replysub').text('还没有填写内容呢，不想打字试试图片表情吧~');
            setTimeout(function(){
                $('.replysub').text('评论话题');
            },1000);
            return false;
        }

        $.ajax({
            type:'post',
            url:'inc/post_reply.php',
            dataType:'text',
            data:{
                'reply':onereplycon,
                'postid':thepostid,
            },success:function(data){

                if(data==1){
                    alert('评论成功！');
                    window.location.reload();
                    return false;
                }
                if(data==2){
                    alert('感谢你的评论，但是还没有登录呢，支持一键qq、微博登录哦，很方便哒！');
                    //window.location.reload();
                }else{
                    alert('评论失败！');
                    //window.location.reload();
                    //return false;
                }

            },error:function(){
                alert('请求失败！');
                //window.location.reload();
            }
        });



    });

    $('.replysub1').click(function(){
        var name = $('#chilreplycon').attr('uname');
        var repid = $('#chilreplycon').attr('pid');
        var articleid = $('#chilreplycon').attr('aid');
        var uid = $('#chilreplycon').attr('uid');
        var con = $('#article_reply1').val();

        if(con.length==0){
            alert('评论不可以为空呐，不想打字，选个表情吧 ^_^ ');
            return false;
        }
        $.ajax({
            type:'post',
            url:'inc/post_reply_c.php',
            dataType:'text',
            data:{
                'name':name,
                'uid':uid,
                'rid':repid,
                'aid':articleid,
                'con':con
            },success:function(data){

                if(data==1){
                    alert('评论成功！');
                    window.location.reload();
                    return false;
                }
                if(data==2){
                    alert('感谢你的评论，但是还没有登录呢，支持一键qq、微博登录哦，很方便哒！');
                    //window.location.reload();
                }else{
                    alert('评论失败！');
                    //window.location.reload();
                    //return false;
                }

            },error:function(){
                alert('请求失败！');
                //window.location.reload();
            }
        });
    });
    
});

//div加边框
var lineclass = '.emoticon';
$(lineclass).hover(function(){
    n1 = $(lineclass).width();
    h1 = $(lineclass).height();

    var becurr = "background:#ff8400;position:absolute;"
    // top边框
    var divTop ="<div style='"+becurr+"top:-1px;left:-1px;width:0px;height:1px' class='divTop'></div>";

    // right边框
    var divRight ="<div style='"+becurr+"top:-1px;right:-1px;width:1px;height:0px;' class='divRight'></div>";

    // Bottom边框
    var divBottom ="<div style='"+becurr+"bottom:-1px;right:-1px;width:0px;height:1px' class='divBottom'></div>";

    // Left边框
    var divLeft ="<div style='"+becurr+"bottom:-1px;left:-1px;width:1px;height:0px;' class='divLeft'></div>";

    $(this).append(divTop,divRight,divBottom,divLeft);

    $(this).find(".divTop").stop().animate({width:n1+3},200,function(){
        $(this).parent().find(".divRight").stop().animate({height:h1+3},200,function(){
            $(this).parent().find(".divBottom").stop().animate({width:n1+3},200,function(){
                $(this).parent().find(".divLeft").stop().animate({height:h1+3},200)
            });
        });
    })
},function(){
    $(this).find(".divTop,.divRight,.divBottom,.divLeft").stop();
    $(this).find(".divLeft").stop().animate({height:0},200,function(){
        $(this).parent().find(".divBottom").stop().animate({width:0},200,function(){
            $(this).parent().find(".divRight").stop().animate({height:0},200,function(){
                $(this).parent().find(".divTop").stop().animate({width:0},200,function(){
                    $(".divTop,.divRight,.divBottom,.divLeft").remove()
                })
            });
        });
    })

})


//阅读模式
$('.readselect .rsmode0').click(function(){
    setCookie('readmode','');
    delCookie('readmode');
    $('.pcontent').attr('class','pcontent');
});
$('.readselect .rsmode1').click(function(){
    setCookie('readmode','readmode1');
    $('.pcontent').attr('class','pcontent readmode1');
});
$('.readselect .rsmode2').click(function(){
    setCookie('readmode','readmode2');
    $('.pcontent').attr('class','pcontent readmode2');
});
$('.readselect .rsmode3').click(function(){
    setCookie('readmode','readmode3');
    $('.pcontent').attr('class','pcontent readmode3');
});

$(function(){
    $('.window .wleft ul li').each(function(wli){
        $(this).hover(function(){
            $(this).find('.leftdata').show();
        },function(){
            $(this).find('.leftdata').hide();
        });
    });

    $('.bannerimg a').eq(0).show().siblings('a').hide();

    var radius = '';
    for(b=0;b<$('.bannerimg a').length;b++){
        if(b==0){
            radius += '<a class="active" href="javascript:;"></a>';
        }else{
            radius += '<a href="javascript:;"></a>';
        }
    }
    $('.select').html(radius);


    var banner_index = 0;
    var banner='';

    function startbanner(){
        banner = setInterval(function(){

            if(banner_index > ($('.bannerimg a').length -1)){
                banner_index = 0;
            }
            selectimg(banner_index);
            banner_index++;
        },3500);
    }
    

    function selectimg(banner_i){
         $('.wright .wrbanner .bannerimg a').eq(banner_i).fadeIn().siblings('a').fadeOut();
         $('.wright .wrbanner .select a').eq(banner_i).addClass('active').siblings('a').removeClass('active');
         banner_index = banner_i;
    }

    $('.wright .wrbanner .select a').each(function(index){
        $(this).click(function(){
            selectimg(index);
        });
    })

    $('.wright .wrbanner').hover(function(){
        clearInterval(banner);
    },function(){
        startbanner();
    });

    $('.wrbanner .returnleft').click(function(){
        if(banner_index <=0){
            banner_index--;
            selectimg(banner_index);
        }else{
            banner_index = $('.bannerimg a').length -1;
            selectimg(banner_index);
        }
    });

    $('.wrbanner .returnright').click(function(){
        if(banner_index >= $('.bannerimg a').length -1){
            banner_index = 0;
            selectimg(banner_index);
            //alert(banner_index);
        }else{
            banner_index++;
            selectimg(banner_index);
            //alert(banner_index);
        }
    });

    startbanner();
});


//javscript====================================================================================


function writes(img){
    var str = $('#con').val();
    var strs = str+img.attr('val');
    $('#con').val(strs);
    $('.qqs,.emos,.wangwang').fadeOut();
}
function writes1(img){
    var str1 = $('#article_reply1').val();
    var strs1 = str1+img.attr('val');
    $('#article_reply1').val(strs1);
    $('.qqs1,.emos1,.wangwang1').fadeOut();
}

//一键分享
function shareTo(stype){
    var ftit = '';
    var flink = '';
    var lk = '';
    ftit = $('.pctitle').text();
    flink = $('.pcdetails img').eq(0).attr('src');
    if(typeof flink == 'undefined'){
        flink='';
    }

    if(flink == ''){
        lk = 'http://'+window.location.host+'/static/images/logo.png';
    }
    if(flink.indexOf('/uploads/') != -1) {
        lk = 'http://'+window.location.host+flink;
    }
    if(flink.indexOf('ueditor') != -1){
        lk = flink;
    }

    if(stype=='qzone'){
        window.open('https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url='+document.location.href+'?sharesource=qzone&title='+ftit+'&pics='+lk+'&summary='+document.querySelector('meta[name="description"]').getAttribute('content'));
    }
    if(stype=='sina'){
        window.open('http://service.weibo.com/share/share.php?url='+document.location.href+'?sharesource=weibo&title='+ftit+'&pic='+lk+'&appkey=2706825840');
    }
    if(stype == 'qq'){
        window.open('http://connect.qq.com/widget/shareqq/index.html?url='+document.location.href+'?sharesource=qzone&title='+ftit+'&pics='+lk+'&summary='+document.querySelector('meta[name="description"]').getAttribute('content')+'&desc=php自学网，一个web开发交流的网站');
    }
    if(stype == 'wechat'){
        window.open('inc/qrcode_img.php?url='+document.location.href);
    }

}


//本站运行时间
if($('html').find('.runtime')){
    setInterval(function(){
        $('.runtime').html(runformat());
    },500);
}
function runformat(){
   // 获取当前时间戳
   var timestamp = Date.parse(new Date());
   timestamp = timestamp / 1000;
   // 获取指定时间格式的时间戳
    var stringTime1 = "2015-06-05 00:00:00";
    timestamp1 = Date.parse(new Date(stringTime1));
    timestamp1 = timestamp1 / 1000;
    //console.log('now:'+timestamp+',start:'+timestamp1);
    //时间戳差
    var howlong = timestamp - timestamp1;
    //时间年
    var years = parseInt((howlong / (60*60*24*30*12)));
    //时间月
    var month = parseInt((howlong % (60*60*24*30*12))/(60*60*24*30));
    //时间日
    var day = parseInt(((howlong % (60*60*24*30*12))%(60*60*24*30))/(60*60*24));
    //时间时
    var hours = parseInt((((howlong % (60*60*24*30*12))%(60*60*24*30))%(60*60*24))/(60*60));
    //时间分
    var minutes = parseInt(((((howlong % (60*60*24*30*12))%(60*60*24*30))%(60*60*24))%(60*60))/60);
    //时间秒
    var seconds = parseInt((((((howlong % (60*60*24*30*12))%(60*60*24*30))%(60*60*24))%(60*60))%60));
    return "<i></i>已稳定运行："+years+'年'+month+'月'+day+'天'+hours+'小时'+minutes+'分钟'+seconds+'秒';
}


//走动时间
function showtimes(){
    //获取当前日期
    var date_time = new Date();
    //定义星期
    var week;
    //switch判断
     switch (date_time.getDay()){
    	 case 1: week="星期一"; break;
    	 case 2: week="星期二"; break;
    	 case 3: week="星期三"; break;
    	 case 4: week="星期四"; break;
    	 case 5: week="星期五"; break;
    	 case 6: week="星期六"; break;
    	 default:week="星期天"; break;
     }

    //年
    var year = date_time.getFullYear();
    //判断小于10，前面补0
    if(year<10){
        year="0"+year;
    }

    //月
    var month = date_time.getMonth()+1;
    //判断小于10，前面补0
    if(month<10){
        month="0"+month;
    }

    //日
    var day = date_time.getDate();
    //判断小于10，前面补0
    if(day<10){
        day="0"+day;
    }

    //时
    var hours =date_time.getHours();
    //判断小于10，前面补0
    if(hours<10){
        hours="0"+hours;
    }

    //分
    var minutes =date_time.getMinutes();
    //判断小于10，前面补0
    if(minutes<10){
        minutes="0"+minutes;
    }

    //秒
    var seconds=date_time.getSeconds();
    //判断小于10，前面补0
    if(seconds<10){
        seconds="0"+seconds;
    }

    //拼接年月日时分秒
    //var date_str = year+"年"+month+"月"+day+"日 "+hours+":"+minutes+":"+seconds+" "+week;
    var date_str = year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds+" "+week;

    //显示在id为showtimes的容器里
    document.getElementById("showtime").innerHTML= date_str;

}

//设置半秒调用一次showtimes函数
setInterval("showtimes()",500);

//设置cookie
function setCookie(name,value)
{
    var Days = 1;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}

//获取cookie
function getCookie(name)
{
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}

//删除cookie
function delCookie(name)
{
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null)
        document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}


//标签云---------------
var radius = 100;
var d = 200;
var dtr = Math.PI / 180;
var mcList = [];
var lasta = 1;
var lastb = 1;
var distr = true;
var tspeed = 11;
var size = 200;
var mouseX = 0;
var mouseY = 10;
var howElliptical = 1;
var aA = null;
var oDiv = null;
window.onload=function ()
{
    var i=0;
    var oTag=null;
    oDiv=document.getElementById('tagscloud');
    if(!oDiv){
    	return false;
    }
    aA=oDiv.getElementsByTagName('a');
    for(i=0;i<aA.length;i++)
    {
        oTag={};
        aA[i].onmouseover = (function (obj) {
            return function () {
                obj.on = true;
                this.style.zIndex = 9999;
                this.style.color = '#fff';
                this.style.padding = '5px 5px';
                this.style.filter = "alpha(opacity=100)";
                this.style.opacity = 1;
            }
        })(oTag)
        aA[i].onmouseout = (function (obj) {
            return function () {
                obj.on = false;
                this.style.zIndex = obj.zIndex;
                this.style.color = '#fff';
                this.style.padding = '5px';
                this.style.filter = "alpha(opacity=" + 100 * obj.alpha + ")";
                this.style.opacity = obj.alpha;
                this.style.zIndex = obj.zIndex;
            }
        })(oTag)
        oTag.offsetWidth = aA[i].offsetWidth;
        oTag.offsetHeight = aA[i].offsetHeight;
        mcList.push(oTag);
    }
    sineCosine( 0,0,0 );
    positionAll();
    (function () {
        update();
        setTimeout(arguments.callee, 40);
    })();
};
function update()
{
    var a, b, c = 0;
    a = (Math.min(Math.max(-mouseY, -size), size) / radius) * tspeed;
    b = (-Math.min(Math.max(-mouseX, -size), size) / radius) * tspeed;
    lasta = a;
    lastb = b;
    if (Math.abs(a) <= 0.01 && Math.abs(b) <= 0.01) {
        return;
    }
    sineCosine(a, b, c);
    for (var i = 0; i < mcList.length; i++) {
        if (mcList[i].on) {
            continue;
        }
        var rx1 = mcList[i].cx;
        var ry1 = mcList[i].cy * ca + mcList[i].cz * (-sa);
        var rz1 = mcList[i].cy * sa + mcList[i].cz * ca;

        var rx2 = rx1 * cb + rz1 * sb;
        var ry2 = ry1;
        var rz2 = rx1 * (-sb) + rz1 * cb;

        var rx3 = rx2 * cc + ry2 * (-sc);
        var ry3 = rx2 * sc + ry2 * cc;
        var rz3 = rz2;

        mcList[i].cx = rx3;
        mcList[i].cy = ry3;
        mcList[i].cz = rz3;

        per = d / (d + rz3);

        mcList[i].x = (howElliptical * rx3 * per) - (howElliptical * 2);
        mcList[i].y = ry3 * per;
        mcList[i].scale = per;
        var alpha = per;
        alpha = (alpha - 0.6) * (10 / 6);
        mcList[i].alpha = alpha * alpha * alpha - 0.2;
        mcList[i].zIndex = Math.ceil(100 - Math.floor(mcList[i].cz));
    }
    doPosition();
}
function positionAll()
{
    var phi = 0;
    var theta = 0;
    var max = mcList.length;
    for (var i = 0; i < max; i++) {
        if (distr) {
            phi = Math.acos(-1 + (2 * (i + 1) - 1) / max);
            theta = Math.sqrt(max * Math.PI) * phi;
        } else {
            phi = Math.random() * (Math.PI);
            theta = Math.random() * (2 * Math.PI);
        }
        //坐标变换
        mcList[i].cx = radius * Math.cos(theta) * Math.sin(phi);
        mcList[i].cy = radius * Math.sin(theta) * Math.sin(phi);
        mcList[i].cz = radius * Math.cos(phi);

        aA[i].style.left = mcList[i].cx + oDiv.offsetWidth / 2 - mcList[i].offsetWidth / 2 + 'px';
        aA[i].style.top = mcList[i].cy + oDiv.offsetHeight / 2 - mcList[i].offsetHeight / 2 + 'px';
    }
}
function doPosition()
{
    var l = oDiv.offsetWidth / 2;
    var t = oDiv.offsetHeight / 2;
    for (var i = 0; i < mcList.length; i++) {
        if (mcList[i].on) {
            continue;
        }
        var aAs = aA[i].style;
        if (mcList[i].alpha > 0.1) {
            if (aAs.display != '')
                aAs.display = '';
        } else {
            if (aAs.display != 'none')
                aAs.display = 'none';
            continue;
        }
        aAs.left = mcList[i].cx + l - mcList[i].offsetWidth / 2 + 'px';
        aAs.top = mcList[i].cy + t - mcList[i].offsetHeight / 2 + 'px';
        //aAs.fontSize=Math.ceil(12*mcList[i].scale/2)+8+'px';
        //aAs.filter="progid:DXImageTransform.Microsoft.Alpha(opacity="+100*mcList[i].alpha+")";
        aAs.filter = "alpha(opacity=" + 100 * mcList[i].alpha + ")";
        aAs.zIndex = mcList[i].zIndex;
        aAs.opacity = mcList[i].alpha;
    }
}
function sineCosine( a, b, c)
{
    sa = Math.sin(a * dtr);
    ca = Math.cos(a * dtr);
    sb = Math.sin(b * dtr);
    cb = Math.cos(b * dtr);
    sc = Math.sin(c * dtr);
    cc = Math.cos(c * dtr);
}
//标签云---------------


//点击复制文本
function copytext(html){
    var con=document.getElementById(html);
    con.select(); // 选择对象
    document.execCommand("Copy"); // 执行浏览器复制命令
   
    layer.tips('已复制到剪贴板', '#copy', {
        tips: [1, '#78BA32']
    });

}

//点击复制文本
function copytext1(html){
    var con=html.children('textarea');
    con.select(); // 选择对象
    document.execCommand("Copy"); // 执行浏览器复制命令
   
    layer.tips('已复制到剪贴板', con, {
        tips: [1, '#78BA32']
    });

}

