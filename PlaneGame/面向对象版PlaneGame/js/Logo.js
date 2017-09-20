//游戏的logo
const Logo = {
	el:null,
	//创建logo
	create(){
		this.el = document.createElement('img');
		this.el.src = 'images/logo.png';
		this.el.className = 'logo';
		document.body.appendChild(this.el);
	},
	
	//显示logo
	show(fn){
		//判断是不是已经有logo，没有的话就创建
		if(!this.el){
			this.create();
		}
		//显示logo
		this.el.style.display = 'block';
		
		//如果传入回调函数，就执行
		fn && fn();
	},
	
	//隐藏logo
	hide(){
		this.el.style.display = 'none';
	}
	
}
