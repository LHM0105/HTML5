//加载动画
//加载动画只有一份，用单例模式，const

const Loading = {
	el:null,
	iTimer:null,
	//创建加载动画
	create(){
		this.el = document.createElement('img');
		this.el.src = 'images/loading1.png';
		this.el.className = 'loading';
		
		document.body.appendChild(this.el);
	},
	
	//显示加载动画
	show(){
		//判断是不是已经存在加载动画，没有的话再创建
		if(!this.el){
			this.create();
		}
		//动画
		let iIndex = 1;
		this.iTimer = setInterval(() => {
			iIndex++;
			if(iIndex > 3){
				iIndex = 1;
			}
			
			this.el.src = 'images/loading' + iIndex + '.png';
			
		},200);
		//显示loading
		this.el.style.display = 'block';
		
	},
	
	hide(){
		//隐藏动画
		this.el.style.display = 'none';
		//清除定时器
		clearInterval(this.iTimer);
	}
	
}
