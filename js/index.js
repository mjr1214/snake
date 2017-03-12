$(function(){
	var start=$('.start');
	var reset=$('.reset');
	var end=$('.end');
	var score=$('.score');
	var time=$('.time');
	var audio=$('audio').get(0);
	var shijian=0;
	var fengmian=$('.fengmian');
	var zailai=$('.again');
	var fanhui=$('.fanhui');
	var audio1=$('.aud').get(0);
	var audio2=$('.over').get(0);
	var jieshao=$('.jieshao');
	var sco=0;
	var index=0;
	var now=300;
	var timeId;
	var min=0;
	var xin=0;
	$(document).on('mousedown',function(){
		return false;
	});
	// console.log(move()())
	score.text('得 分'+': '+'00');
	time.text('用 时'+': '+'00'+':'+'00')
	start.one('click',function(){
		timeId=setInterval(move,now);
		console.log(now)
		xin=setInterval(zou,1000);
		function zou(){
			shijian+=1;
			if(shijian>59){
				min+=1;
				shijian=0;
			}
			var minute=min<10?'0'+min:min;
			var second=shijian<10?'0'+shijian:shijian;
			time.text('用时'+':'+minute+':'+second)
		}
		audio1.play();
	});
	reset.on('click',function(){
		window.location.reload();
	});
	$('.neirong').slideUp();
	jieshao.on('click',function(){
		$('.neirong').slideToggle();
	});
	end.on('click',function(){
		$('.tuiye').addClass('tuiyexian');
	});
	$('.vol').on('click',function(){
		$('.vol').toggleClass('volone');
		if($('.vol').hasClass('volone')){
			audio1.pause();
		}else{
			audio1.play();
		}
	})
	$('.true').on('click',function(){
		window.close()
	});
	$('.false').on('click',function(){
		$('.tuiye').removeClass('tuiyexian');
	});
	fengmian.on('click',function(){
		fengmian.addClass('feng')
	});
	zailai.on('click',function(){
		window.location.reload();
	});
	fanhui.on('click',function(){
		$('.zihui').removeClass('zihuixian')
		$('.zhuangqiang').removeClass('zhuangqiangxian');
	});
	//创建横20 竖20 个小块
	for (var i = 0; i < 20; i++) {
		for (var j = 0; j < 20; j++) {
			$('<div>')
				.attr('id',i+'_'+j)
				.addClass('block')
				.css('backgroundColor','rgb(0,0,0,0.5)')
				.appendTo('.scene')
		}
	}

	var she=[{x:0,y:0},{x:0,y:1},{x:0,y:2}];
	var shebiao={'0_0':true,'0_1':true,'0_2':true};
	function findDiv(x,y){
		return $('#'+x+'_'+y);
	}
	$.each(she,function(i,v){
		findDiv(v.x,v.y).addClass('she');
	});
	$('.she').eq($('.she').length-1).addClass('shetouyou');
	//放置食物
	function fangshiwu(){
		do{
			var x=Math.floor(Math.random()*19);
			var y=Math.floor(Math.random()*19);
		}while(shebiao[x+'_'+y]);

		findDiv(x,y).addClass('shiwu');
		return {x:x,y:y};
	}
	var shiwu=fangshiwu();

	//设置方向
	direction='you';


	function move(){
		var jiutou=she[she.length-1];
		var xintou={x:jiutou.x,y:jiutou.y+1};
		if(direction=='you'){
			var xintou={x:jiutou.x,y:jiutou.y+1};

		}
		if(direction=='zuo'){
			var xintou={x:jiutou.x,y:jiutou.y-1};
		}
		if(direction=='shang'){
			var xintou={x:jiutou.x-1,y:jiutou.y};
		}
		if(direction=='xia'){
			var xintou={x:jiutou.x+1,y:jiutou.y};
		}
		if(shebiao[xintou.x+'_'+xintou.y]){
			clearInterval(timeId);
			$('.zihui').addClass('zihuixian');
			audio2.play();
			audio1.pause();
			// alert('撞到自己了');
			clearInterval(xin);
			return;
		}
		if(xintou.y>19||xintou.y<0||xintou.x<0||xintou.x>19){
			clearInterval(timeId);
			clearInterval(xin);
			audio1.pause();
			audio2.play();
			$('.zhuangqiang').addClass('zhuangqiangxian');
			// alert('撞了');
			return;
		}

		she.push(xintou);

		shebiao[xintou.x+'_'+xintou.y]=true;
		findDiv(xintou.x,xintou.y).addClass('she');

		if(direction=='you'){
			$('.she').removeClass('shetouzuo');
			$('.she').removeClass('shetouyou');
			$('.she').removeClass('shetoushang');
			$('.she').removeClass('shetouxia');
			$('#'+xintou.x+'_'+xintou.y).addClass('shetouyou');
		}
		if(direction=='zuo'){
			$('.she').removeClass('shetouyou');
			$('.she').removeClass('shetouzuo');
			$('.she').removeClass('shetoushang');
			$('.she').removeClass('shetouxia');
			$('#'+xintou.x+'_'+xintou.y).addClass('shetouzuo');
		}
		if(direction=='shang'){
			$('.she').removeClass('shetouyou');
			$('.she').removeClass('shetouzuo');
			$('.she').removeClass('shetoushang');
			$('.she').removeClass('shetouxia');
			$('#'+xintou.x+'_'+xintou.y).addClass('shetoushang');
		}
		if(direction=='xia'){
			$('.she').removeClass('shetouyou');
			$('.she').removeClass('shetouzuo');
			$('.she').removeClass('shetouxia');
			$('.she').removeClass('shetoushang');
			$('#'+xintou.x+'_'+xintou.y).addClass('shetouxia');
		}
		// $('#'+xintou.x+'_'+xintou.y).addClass('shetou');
		console.log(now)
		if(xintou.x===shiwu.x&&xintou.y==shiwu.y){
			index++;
				if(index%5==0){
					now-=50;
					$('.speed').addClass('spe');
					clearInterval(timeId);
					timeId=setInterval(move,now)
			}else{
				if($('.speed').hasClass('spe')){
					$('.speed').removeClass('spe');
				}
			}
			findDiv(shiwu.x,shiwu.y).removeClass('shiwu');
			sco+=10;
			score.text('得 分'+': '+sco)
			audio.play();
			shiwu=fangshiwu();
		}else{
			var weiba=she.shift();
			shebiao[weiba.x+'_'+weiba.y]=false;
			findDiv(weiba.x,weiba.y).removeClass('she');
		}
	}

	$(document).on('keyup',function(e){
		var biao={37:'zuo',38:'shang',39:'you',40:'xia'};
		var fanbiao={'zuo':37,'shang':38,'you':39,'xia':40};
		if(Math.abs(e.keyCode-fanbiao[direction])===2){
			return;
		}
		if(biao[e.keyCode]){
			direction=biao[e.keyCode];
		}

	})
})