/**
 * @author Perlou 
 * 100du.js
 */

$(function(){
	//搜索
	(function(){
		var aLi=$('#menu li'),
			oTxt=$('#search').find('.form .text'),
			arrText = [
				'例如：荷棠鱼坊烧鱼 或 樱花日本料理',
				'例如：昌平区育新站龙旗广场2号楼609室',
				'例如：万达影院双人情侣券',
				'例如：东莞出事了，大老虎是谁？',
				'例如：北京初春降雪，天气变幻莫测'
			],
			iNow=0;
		
		oTxt.val(arrText[iNow]);
		aLi.each(function( index ) {
            $(this).click(function(){
				aLi.attr('class','gradient');
				$(this).attr('class','active');
				
				iNow=index; 
				oTxt.val(arrText[iNow]);	
			});
        });	
		
		oTxt.focus(function(){
			if($(this).val() == arrText[iNow] ){
				$(this).val('');
			}
		});	
		
		oTxt.blur(function(){
			if($(this).val() == ''){
				oTxt.val(arrText[iNow]);	
			}	
		});
	
	})();	
	
	//update
	(function(){
		var oDiv=$('.update'),
			oUl=oDiv.find('ul'),
			iH=0, 
			iNow=0,
			arrData = [
				{ 'name':'萱萱', 'time':4, 'title':'那些灿烂华美的瞬间', 'url':'#' },
				{ 'name':'畅畅', 'time':5, 'title':'广东3天抓获涉黄疑犯', 'url':'#' },
				{ 'name':'萱萱', 'time':6, 'title':'国台办回应王郁琦', 'url':'#' },
				{ 'name':'畅畅', 'time':7, 'title':'那些灿烂华美的瞬间', 'url':'#' },
				{ 'name':'萱萱', 'time':8, 'title':'那些灿烂华美的瞬间', 'url':'#' },
				{ 'name':'畅畅', 'time':9, 'title':'广东3天抓获涉黄疑犯', 'url':'#' },
				{ 'name':'萱萱', 'time':10, 'title':'国台办回应王郁琦', 'url':'#' },
				{ 'name':'畅畅', 'time':11, 'title':'那些灿烂华美的瞬间', 'url':'#' }
			],
			str='',
			timer=null,
			oBtnUp=$('#updateUp'),
			oBtnDown=$('#updateDown');
		
		for(var i=0;i<arrData.length;i++){
			str+='<li><a href="#"><strong>'+arrData[i].name+'</strong> <span>'+arrData[i].time+'分钟前</span> 写了一篇新文章：'+arrData[i].title+'</a></li>'
		}
		
		oUl.html(str);
		
		iH=oUl.find('li').height();
		
		oBtnDown.click(function(){
			doMove(-1);	
		});
		
		oBtnUp.click(function(){
			doMove(1);	
		});

		oDiv.hover(function(){
			clearInterval(timer);	
		},autoPlay);
		
		function autoPlay(){
			timer=setInterval(function(){
				doMove(-1);	
			},2000);	
		}
		autoPlay();
		
		function doMove(num){
			iNow+=num
			if(Math.abs(iNow)>arrData.length-1){
				iNow=0;
			}
			if(iNow>0){
				iNow=-(arrData.length-1);
			}
			
			oUl.stop().animate({'top':iH*iNow},500);
		};
		
			
	})();

	//options选项卡
	
	(function (){
		
		fnTab( $('.tabNav1'), $('.tabCon1'), 'click' );
		fnTab( $('.tabNav2'), $('.tabCon2'), 'click' );
		fnTab( $('.tabNav3'), $('.tabCon3'), 'mouseover' );
		fnTab( $('.tabNav4'), $('.tabCon4'), 'mouseover' );
		
		function fnTab( oNav, aCon, sEvent ) {
			var aElem = oNav.children();
			aCon.hide().eq(0).show();
			
			aElem.each(function (index){
				
				$(this).on(sEvent, function (){
					aElem.removeClass('active').addClass('gradient');
					$(this).removeClass('gradient').addClass('active');
					aElem.find('a').attr('class', 'triangle_down_gray');
					$(this).find('a').attr('class', 'triangle_down_red');
					
					aCon.hide().eq( index ).show();
				});
				
			});
		}
	})();

	//焦点图
	
	(function(){
		var oDiv=$('#fade'),
			aUlli=oDiv.find('ul li'),
			aOlli=oDiv.find('ol li'),
			oP=oDiv.find('p'),
			arr = [ '爸爸去哪儿啦~', '人像摄影中的光影感', '娇柔妩媚、美艳大方' ],
			iNow=0,
			timer=null;
		
		fnFade();
		
		aOlli.click(function(){
			iNow=$(this).index();
			fnFade();	
		});
		
		oDiv.hover(function(){
			clearInterval( timer );
		},autoPlay);
		
		function autoPlay(){
			timer=setInterval(function(){
				iNow++;
				iNow%=arr.length;
				fnFade();
			},2000);	
		};
		autoPlay();
		
		function fnFade(){
			aUlli.each(function(i){
				if(i!=iNow){
					aUlli.eq(i).fadeOut().css('zIndex',1);
					aOlli.eq(i).removeClass('active');
				}
				else{
					aUlli.eq(i).fadeIn().css('zIndex',2);
					aOlli.eq(i).addClass('active');
				}	
			});	
		};	
	})();
	
	//日历
	
	(function(){
		var aSpan=$('.calendar h3 span'),
			aImg=$('.calendar .img'),
			oPrompt=$('.today_info'),
			oImg=oPrompt.find('img'),
			oStrong=oPrompt.find('strong'),
			oP=oPrompt.find('p');
		
		aImg.hover(function(){
			var iTop=$(this).parent().position().top-30;
			var iLeft=$(this).parent().position().left+55;
			var index=$(this).parent().index()%aSpan.size();
			
			oPrompt.show().css({'top':iTop , 'left':iLeft});
			oImg.attr('src',$(this).attr('src'));
			oP.text($(this).attr('info'));
			oStrong.text(aSpan.eq(index).text());	
		},function(){
			oPrompt.hide();
		});
				
	})();
	
	//BBS
	
	(function(){
		var aLi=$('.bbs ol li');
		
		aLi.mouseover(function(){
			aLi.removeClass('active');
			$(this).addClass('active');	
		});

	})();
	
	//HOT鼠标提示
	
	(function(){
		var arr = [
			'',
			'用户1<br />人气1',
			'用户名：性感宝贝<br />区域：朝阳CBD<br />人气：124987',
			'用户3<br />人气3',
			'用户4<br />人气4',
			'用户5<br />人气5',
			'用户6<br />人气6',
			'用户7<br />人气7',
			'用户8<br />人气8',
			'用户9<br />人气9',
			'用户10<br />人气10'
		];
		$('.hot_area li').mouseover(function(){
			if($(this).index() == 0) return;
			
			$('.hot_area li p').remove();
			
			$(this).append('<p style=" width:'+($(this).width()-12)+'px;">'+arr[$(this).index()]+'</p>');	
		});	
	})();

});









