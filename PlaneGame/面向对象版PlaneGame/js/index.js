window.onload = function(){
	//获取dom对象
	let 
		oList = $('list'),
		aList = Array.from(oList.getElementsByTagName('li')),
		oScore = $('score');
		
	//点击游戏难度选项卡
	aList.forEach((v,i) => {
		v.onclick = function(){
			//选项卡消失
			oList.style.display = 'none';
			
			//游戏开始
			//把分数显示区域的dom对象通过传参的形式传入游戏引擎，以便同步显示分数
			//i:作为游戏难度的参数0，1，2，3
			Engine.start(oScore,i);
			
		}
	});
		
	
	
}
