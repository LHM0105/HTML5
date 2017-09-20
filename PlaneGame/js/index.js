let 
 	aBullets = {},//存储我方子弹
 	aEnemies = {};//存储敌方飞机
 	
window.onload=function(){
	let 
		oBox = $('box'),
		oList = $('list'),
		aLi = Array.from(oList.children),
		oLogo = $('logo'),
		oLoading = $('loading'),
		oMe = $('me');//存储敌方飞机
		
		aLi.forEach((v) => {
			v.onclick = function(){
				//选项消失
				oList.style.display = 'none';
				
				//背景图动起来
				let iPos = 0;
				setInterval(function(){
					iPos+=6;
					
					oBox.style.backgroundPosition='0 ' + iPos + 'px';
					
				},50);
				
				//开机动画
				//显示logo
				bufferMove(oLogo,{top:100},() => {
					//显示动画。
					oLoading.style.display='block';
					let iIndexLoad = 1;
					let iTimer=setInterval(()=>{
						//更改加载图片src
						oLoading.src='images/loading'+iIndexLoad+'.png';
						iIndexLoad++;
						if(iIndexLoad >3){
							iIndexLoad=1;
						}
					},200);
					//3s后清除动画
					setTimeout(() => {
						//清除定时器（图片不动）
						clearInterval(iTimer);
						//动画图片消失
						oLoading.style.display='none';
						//开机画面消失
						oLogo.style.display='none';
						//设置我方飞机水平位置在屏幕中央
						oMe.style.left = document.documentElement.clientWidth/2-oMe.offsetWidth/2;
						
						//给我方飞机添加鼠标跟随事件
						document.onmousemove = function(ev){
							let e = ev || window.event;
							//计算我方飞机水平位置
							let iL = e.clientX - oMe.offsetWidth/2;
							//限制我方飞机运动范围
							let iMin = oBox.offsetLeft;
							let iMax = oBox.offsetLeft + oBox.offsetWidth - oMe.offsetWidth;
							if(iL < iMin){
								iL=iMin;
							}
							if(iL > iMax){
								iL = iMax;
							}
							
							oMe.style.left = iL+'px';
						}
						
						//我方飞机动态出场
						bufferMove(oMe,{bottom:0},() => {
							
							//我方飞机动态出场后
							
							//子弹出现(0.5s一个)
							setInterval(() => {
								var oBullet = new Bullet(me);
								
							},500);
							
							//敌方飞机出现
							//小飞机(1s一个)
							setInterval(() => {
								var oEnemy = new Enemy(oBox,'1');
							},500);
							//中型飞机（2s一个）
							setInterval(() => {
								var oEnemy = new Enemy(oBox,'2');
							},2000);
							//大飞机（5s一个）
							setInterval(() => {
								var oEnemy = new Enemy(oBox,'3');
							},5000);
							
							
							//检测敌方飞机和我方子弹是否发生碰撞
							//每30s检测一次
							setInterval(() => {
								//遍历子弹
								for(var b in aBullets){
									//遍历敌方飞机
									for(var e in aEnemies){
										//检测二者是否碰撞
										if(pz(aBullets[b].el,aEnemies[e].el)){
											//如果碰撞了就销毁两个
											aBullets[b].destroy();
											aEnemies[e].destroy();
											break;
										}
									}
								}
							},30);
							
							
						});
					},3000);
				});
			}
		});
}
