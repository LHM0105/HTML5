//游戏引擎
/*一个游戏只有一个游戏引擎，所以用单例模式*/
const Engine = {
	//在头部统一定义属性，便于观察
	//存储创建出来的子弹对象
	bullets:{},
	//存储创建出来的敌机对象
	enemies:{},
	//分数
	score:0,
	//没被打到的飞机的总血值，达到100游戏失败
	missScore:0,
	//开始游戏
	start(oScore,i){
		//背景图开始运动
		this.moveBg();
		
		//logo出现
		Logo.show(() => {
			bufferMove(Logo.el,{top:100},() => {
				//显示logo之后，显示加载动画
				//加载动画出现
				Loading.show();
				
				//3s之后加载动画隐藏，logo隐藏
				setTimeout(() => { 
					//logo隐藏
					Logo.hide();
					//加载动画隐藏
					Loading.hide();
					
					//我方飞机出场，并且发射子弹
					//i代表游戏难度，从index.js传入，由用户点击的决定
					Me.show(i);
					
					//敌机出场
					//3s一个小飞机
					setInterval(() => {
						new Enemy('small');
					},3000);
					
					//7s一个中型飞机
					setInterval(() => {
						new Enemy('middle');
					},7000);
					
					//11s一个大飞机
					setInterval(() => {
						new Enemy('big');
					},11000);
					
					//检测子弹和敌机是否碰撞
					this.checkImpact(oScore);
					
					
					
				},3000);
			});
		});
		
	},
	
	//检测子弹和敌机是否碰撞
	//oScore:显示分数的dom对象
	checkImpact(oScore){
		setInterval(()=>{
			for(var b in this.bullets){
				for(var e in this.enemies){
					//判断子弹和敌机是否碰撞
					if(pz(this.bullets[b].el, this.enemies[e].el)){
						//销毁子弹
						this.bullets[b].destroy();
						
						//子弹与敌机碰撞一次，敌机掉血10
						this.enemies[e].blood -=10;
						
						//敌机血槽为0时就被销毁
						if(this.enemies[e].blood <= 0){
							//销毁敌机
							this.enemies[e].destroy();
							
							//改变分数显示区域的内容
							oScore.innerHTML = this.score;
							
							//分数达到1000分，提示
							if(this.score >= 1000){
								alert('哇塞，太厉害了！去挑战更高难度吧！');
								//重新加载页面
								location.reload();
							}
							
						}
						//如果子弹和敌机碰撞，则跳出此次对敌机的遍历（否则会报错）
						break;
					}
				}
			}
		},30);
	},
	
	//背景图运动
	moveBg(){
		//获取战场的dom对象
		let oBattleField = $('battle-field');
		let iPos = 0;
		setInterval(() => {
			iPos -= 5;
			oBattleField.style.backgroundPosition = '0 ' + iPos + 'px';
			
		},50);
	}
	
}
