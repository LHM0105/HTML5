//子弹的类
class Bullet{
	constructor(me,i){
		
		this.create(me);
		this.move(i);
	}
	//创建子弹，初始位置是飞机顶点
	create(me){
		//传入我方飞机对象以便获取我方飞机位置
		
		this.el = document.createElement('img');
		this.el.src = 'images/bullet.png';
		this.el.className = 'bullet';
		
		document.body.appendChild(this.el);
		
		//指定子弹位置
		this.el.style.left = me.el.offsetLeft + (me.el.offsetWidth - this.el.offsetWidth)/2 +'px';
		this.el.style.top = me.el.offsetTop - this.el.offsetHeight + 'px';
		
		//把此对象存入bullets{}
		let key = createUniqueKey();
		Engine.bullets[key] = this;
		//给每个子弹对象指定唯一键名
		this.key = key;
	}
	
	//子弹运动
	move(i){
		let iSpeed = 6 + 5*i;//i = 0,1,2,3,子弹速度最小是6，最大是21
		
		this.iTimer = setInterval(() => {
			let iT = this.el.offsetTop - iSpeed;
			this.el.style.top = iT +'px';
			
			//如果子弹打出窗口，就自行销毁
			if(iT <= -this.el.offsetHeight){
				this.destroy();
			}
		},50);
	}
	
	//子弹销毁
	destroy(){
		//清除子弹运动的定时器
		clearInterval(this.iTimer);
		
		//从bullets对象中删除对应的子弹（属性：属性值）
		delete Engine.bullets[this.key];
		
		//删除dom节点
		document.body.removeChild(this.el);
	}
	
	
	
}
