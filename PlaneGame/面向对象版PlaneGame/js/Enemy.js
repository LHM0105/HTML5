//敌机，类，多个，不是单例

class Enemy{
	constructor(type){
		switch (type){
			case 'small':
				this.src = 'images/plane1.png';
				this.className = 'enemy1';
				this.blood = 10;
				this.BLOOD = 10;
				this.dieImg = ['images/plane1_die1.png','images/plane1_die2.png','images/plane1_die3.png'];
				break;
			case 'middle':
				this.src = 'images/plane2.png';
				this.className = 'enemy2';
				this.blood = 20;
				this.BLOOD = 20;
				this.dieImg = ['images/plane2_die1.png','images/plane2_die2.png','images/plane2_die3.png','images/plane2_die4.png'];
				break;
			case 'big':
				this.src = 'images/plane3.png';
				this.className = 'enemy3';
				this.blood = 30;
				this.BLOOD = 30;
				this.dieImg = ['images/plane3_die1.png','images/plane3_die2.png','images/plane3_die3.png','images/plane3_die4.png','images/plane3_die5.png','images/plane3_die6.png'];
				
				break;
		}
		this.create();
		this.move();
//		//销毁动画的图片
//		this.dieImg = ['images/plane1_die1.png','images/plane1_die2.png','images/plane1_die3.png'];
	}
	
	//创建敌机
	create(){
		this.el = document.createElement('img');
		this.el.src = this.src;
		this.el.className = this.className;
		
		document.body.appendChild(this.el);
		//给敌机定位，水平位置是随机的
		this.el.style.top = -this.el.offsetHeight + 'px';
		
		//获取战场div的dom对象
		let oBattlefied = document.getElementById('battle-field');
		
		this.el.style.left = oBattlefied.offsetLeft+Math.round(Math.random()*(oBattlefied.offsetWidth - this.el.offsetWidth)) + 'px';
		
		//把创建出来的敌机对象存入enemies对象（属性：属性值）
		let key = createUniqueKey();
		Engine.enemies[key] = this;
		
		//给每个敌机对象指定唯一键名
		this.key = key;
		
	}
	//敌机运动
	move(){
		let iSpeed = 5;
		this.iTimer = setInterval(()=>{
			let iT = this.el.offsetTop + iSpeed;
			this.el.style.top = iT + 'px';
			//如果敌机超出窗口，就销毁
			if(iT >= document.documentElement.clientHeight + this.el.offsetHeight){
				this.destroy();
				
				//飞机自行坠毁，游戏失去的血增加
				Engine.missScore += this.BLOOD;
				console.log(Engine.missScore);
				if(Engine.missScore >= 100){
					alert('精力用完了！再来一局？');
					//重新加载页面
					location.reload();
				}
			}
		},50);
	}
	
	//销毁敌机
	destroy(){
		//清除运动的定时器
		clearInterval(this.iTimer);
		
		//从enemies对象中删除对应的键值对
		delete Engine.enemies[this.key];
		
		//销毁动画
		this.dieMove();
		
		//敌机被销毁，分数增加
		Engine.score += this.BLOOD;
	}

//	销毁动画
	dieMove(){
		let iIndex = 0;
		this.iTimerM = setInterval(()=>{
			if(iIndex > this.dieImg.length - 1){
				//清除定时器
				clearInterval(this.iTimerM);
				//移除dom节点
				document.body.removeChild(this.el);
			}else{
				this.el.src = this.dieImg[iIndex];
			}
			
			iIndex++;
		},100);
	}
}
