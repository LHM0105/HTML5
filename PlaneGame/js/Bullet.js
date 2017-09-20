//创建子弹的构造函数
//创建子弹的构造函数
function Bullet(){
	this.el = null;
	this.iTimer = null;
	this.create(me).move();
}
Bullet.prototype = {
	constructor: Bullet,
	//创建子弹对象
	create(me){
		let oBullet = document.createElement('div');
		oBullet.className='bullet';	
		document.body.appendChild(oBullet);
		this.el = oBullet;
		//计算子弹位置，出现时水平方向跟我方飞机一样
		let iLeft = me.offsetLeft + (me.offsetWidth - this.el.offsetWidth) / 2;
		let iTop = me.offsetTop - this.el.offsetHeight;
		oBullet.style.left = iLeft +'px';
		oBullet.style.top = iTop + 'px';
		
		//把创建的子弹存储到对象中
		let iKey = createUniqueKey();
		aBullets[iKey] = this;
		this.key = iKey;
		
		//返回对象本身，便于链式调用方法
		return this;
	},
	//子弹运动
	move(){
		//定时器实现子弹运动
		this.iTimer = setInterval(() => {
			this.el.style.top = (this.el.offsetTop - 10) +'px';
			//判断子弹是否飞出窗口,飞出窗口就销毁子弹
			if(this.el.offsetTop <=0){
				this.destroy();
			}
		},50);
	},
	//销毁子弹
	destroy(){
		//销毁子弹
		//1.清除定时器
		clearInterval(this.iTimer);
		//2.删除其在页面上的dom节点
		document.body.removeChild(this.el);
		
		//移除对象中的这个子弹
		
		delete aBullets[this.key];
	}
		
}