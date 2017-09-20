//创建子弹的构造函数
//创建子弹的构造函数
//type是飞机类型
function Enemy(oBox,type){
	this.el = null;
	this.iTimer = null;
	this.create(oBox,type).move();
	
}
Enemy.prototype = {
	constructor: Bullet,
	//存放小飞机被销毁时动画的图片
	ENEMYDIE1:['url(images/plane1_die1.png)','url(images/plane1_die2.png)','url(images/plane1_die3.png)'],
	//存放中型飞机被销毁时的动画
	ENEMYDIE2:['url(images/plane2_die1.png)','url(images/plane2_die2.png)','url(images/plane2_die3.png)','url(images/plane2_die4.png)'],
	
	//存放大型飞机被销毁时的动画
	ENEMYDIE3:['url(images/plane3_die1.png)','url(images/plane3_die2.png)','url(images/plane3_die3.png)','url(images/plane3_die4.png)','url(images/plane3_die5.png)','url(images/plane6_die3.png)'],
	
	
	//创建敌方飞机对象
	//
	create(oBox,type){
		let oEnemy = document.createElement('div');
		oEnemy.className='enemy'+type;	
		document.body.appendChild(oEnemy);
		
		//飞机类型type
		this.type = type;
		
		this.el = oEnemy;
		
		//敌方飞机出现的位置
		//竖直方向
		let iTop = -this.el.offsetHeight;
		//水平方向随机
		let iRandom = Math.round(Math.random() * (oBox.offsetWidth - this.el.offsetWidth)) +oBox.offsetLeft;
		
		let iLeft = iRandom;
		//赋值
		this.el.style.left = iLeft +'px';
		this.el.style.top = iTop +'px';
		
		//把创建的子弹存储到对象中
		let iKey = createUniqueKey();
		aEnemies[iKey] = this;
		this.key = iKey;
		
		return this;
	},
	//敌方飞机运动
	move(){
		//定时器实现飞机运动
		this.iTimer = setInterval(() => {
			this.el.style.top = (this.el.offsetTop + 10) +'px';
			//判断子弹是否飞出窗口,飞出窗口就销毁子弹
			let iMaxT = document.documentElement.clientHeight;; 
			if(this.el.offsetTop >= iMaxT){
				this.destroy();
			}
		},50);
	},
//	//销毁飞机
	destroy(){
		//销毁敌方飞机
		//1.清除定时器(飞机运动的定时器)
		clearInterval(this.iTimer);
		
		//移除对象中的这个飞机
		delete aEnemies[this.key];
		
		//销毁动画
		//通过定时器更换动画
		let iIndex = 0;
		let imgNum = null;
		let iTimer = setInterval(() => {
			if(this.type === '1'){
				this.el.style.background=this.ENEMYDIE1[iIndex];
				 imgNum = 3;
				
			}else if(this.type === '2'){
				this.el.style.background=this.ENEMYDIE2[iIndex];
				 imgNum = 4;
				
			}else if(this.type ==='3'){
				this.el.style.background=this.ENEMYDIE3[iIndex];
				 imgNum = 6;
				
			}
			iIndex++;
			if(iIndex >= imgNum){
				//清除定时器（飞机销毁时的动画）
				clearInterval(iTimer);
				//2.删除其在页面上的dom节点
				document.body.removeChild(this.el);
			}
		},200);
	}
		
}