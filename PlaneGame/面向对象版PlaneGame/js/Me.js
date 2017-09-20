//创建我方飞机

const Me = {
	el:null,
	
	//创建飞机
	create() {
		//创建飞机
		this.el = document.createElement('img');
		this.el.src = 'images/me.png';
		this.el.className = "me";
		document.body.appendChild(this.el);
		
	},
	show(i){
		//如果没有我方飞机，就创建
		if(!this.el){
			this.create();
		}
		
		//指定我方飞机的位置
		//获取战场div的dom对象
		this.el.style.left = (document.documentElement.clientWidth - this.el.offsetWidth) / 2 + 'px';
		
		//飞机位置随鼠标移动
		document.onmousemove = function(ev){
			//获取鼠标事件对象
			let e = ev || window.event;
			//计算我方飞机的位置
			let iL = e.clientX - this.el.offsetWidth/2;
			//限制我方飞机运动范围
			let oBattlefield = document.getElementById('battle-field');
			let iLMax = oBattlefield.offsetLeft + oBattlefield.offsetWidth - this.el.offsetWidth,
			iLMin = oBattlefield.offsetLeft;
			if(iL > iLMax){
				iL = iLMax;
			}
			if(iL < iLMin){
				iL = iLMin;
			}
			
			//改变飞机位置
			this.el.style.left = iL +'px';
		}.bind(this)
		
		//运动上场
		bufferMove(this.el,{top:document.documentElement.clientHeight-this.el.offsetHeight},() => {
			//回调函数
			//我方飞机运动上场后，发射子弹
			//i决定子弹速度
			this.shoot(i);
		});
	},
	
	//发射子弹
	shoot(i){
		//创建子弹
		setInterval(()=>{
			new Bullet(this,i);
		},1000);
	}
}
