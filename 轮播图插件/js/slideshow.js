class Slideshow{
	constructor(obj){
		
		//参数obj:要添加轮播图的盒子对象要添加类名carousel
		//盒子中的图片盒子的className是img-list
		//按钮盒子的className是btn-list
		this.el = obj;
		//获取图片盒子的对象
		this.oImgList = obj.getElementsByClassName('img-list')[0];
		//要添加轮播图的盒子的宽度
		this.width = obj.offsetWidth;
		
		//获取图片集合
		this.aImgList = Array.from(this.oImgList.children);
		
		//获取小按钮区域
		this.oBntList = obj.getElementsByClassName('btn-list')[0];
		this.aBtnList = null;
		//图片下标
		this.iImgIndex = 0;
		//小按钮下标
		this.iBtnIndex = 0
		
		this.iTimer = null;
		//获取左右按钮
		this.left = obj.getElementsByClassName('left')[0];
		this.right = obj.getElementsByClassName('right')[0];
//		console.log(this.left);
		//设置图片盒子的宽度(显示区域宽度*图片数)
		this.oImgList.style.width = this.width * this.aImgList.length +'px'; 
		
		//添加小按钮
		this.innerBtn();
		
		//鼠标放上，左右按钮显示，鼠标移开，左右按钮消失
		this.mouseenter();
		
		//为实现无缝切换，图片盒子再添加一次第一张图片
		this.addFirstImg();
		
		//点击右按钮，向右切换
		this.bindClickRight();
		
		this.bindClickLeft();
		
		this.bindMouseover();
		
		//自动切换
		this.autoMove();
		
		
	}
	
	//添加小按钮函数，小按钮数对应图片数
	innerBtn(){
		var sHtml = '';
		for(var i = 0;i < this.aImgList.length - 1;i++){
			if(i === 0){
				sHtml += '<li class="active"></li>';
			}
			sHtml += '<li></li>';
		}
		this.oBntList.innerHTML = sHtml;
		//使小按钮水平居中
		this.oBntList.style.marginLeft = '-' + this.oBntList.offsetWidth/2 + 'px';
		
		//获取小按钮集合
		this.aBtnList = Array.from(this.oBntList.getElementsByTagName('li'));
	}
	
	//为实现无缝切换，图片盒子再添加一次第一张图片
	addFirstImg(){
		this.firstImg = this.oImgList.children[0];
		this.oImgList.innerHTML += this.firstImg.outerHTML;
		//获取图片集合
		this.aImgList = Array.from(this.oImgList.children);
		//再次设置图片盒子宽度
		this.oImgList.style.width = this.width * this.aImgList.length +'px';
	}
	//mouseenter()鼠标放上显示左右按钮
	mouseenter(){
		this.el.onmouseenter =() => {
			this.left.style.display = 'block';
			this.right.style.display = 'block';   
			//清除自动切换的定时器
			clearInterval(this.iTimer);
		}
		
		//鼠标离开。左右按钮消失
		this.el.onmouseleave =() => {
			this.left.style.display = 'none';
			this.right.style.display = 'none';
			//启动自动切换
			this.autoMove();
		}
		

	}
	
	//点击，向右切换
	bindClickRight(){
		this.right.onclick = () => {
			//图片下标自增1
			this.iImgIndex++;
			if(this.iImgIndex >= this.aImgList.length){
				this.oImgList.style.left = 0;
				this.iImgIndex = 1;
			}
			//运动显示对应图片
			bufferMove(this.oImgList,{left:-this.iImgIndex * this.width});
			
			//小按钮下标自增1
			this.iBtnIndex++;
			if(this.iBtnIndex >= this.aBtnList.length){
				this.iBtnIndex = 0;
			}
			this.aBtnList.forEach((v,i) => {
				v.className = '';
			});
			//显示对应小按钮
			this.aBtnList[this.iBtnIndex].className = 'active';

		}
	}
	
	//点击，向左切换
	bindClickLeft(){
		this.left.onclick = () => {
			//图片下标自增1
			this.iImgIndex--;
			if(this.iImgIndex < 0 ){
				this.oImgList.style.left = -(this.aImgList.length-1) * this.width + 'px';
				this.iImgIndex = this.aImgList.length-2;
			}
			//运动显示对应图片
			bufferMove(this.oImgList,{left:-this.iImgIndex * this.width});
			
			//小按钮下标自增1
			this.iBtnIndex--;
			if(this.iBtnIndex < 0 ){
				this.iBtnIndex = this.aBtnList.length - 1;
			}
			this.aBtnList.forEach((v,i) => {
				v.className = '';
			});
			//显示对应小按钮
			this.aBtnList[this.iBtnIndex].className = 'active';

		}
	}
	
	//鼠标放到小按钮上切换
	bindMouseover(){
		this.aBtnList.forEach((v,i) => {
			v.onmouseover = function(){
				//小按钮改变
				this.iBtnIndex = i;
				this.aBtnList.forEach((v1) => {v1.className = ''});
				this.aBtnList[this.iBtnIndex].className ='active';
				
				//图片改变
				this.iImgIndex = i;
				bufferMove(this.oImgList,{left:-this.iImgIndex * this.width});
				
			}.bind(this);
		});
	}
	//自动切换
	autoMove(){
		this.iTimer = setInterval(() => {
			//图片下标自增1
			this.iImgIndex++;
			if(this.iImgIndex >= this.aImgList.length){
				this.oImgList.style.left = 0;
				this.iImgIndex = 1;
			}
			//运动显示对应图片
			bufferMove(this.oImgList,{left:-this.iImgIndex * this.width});
			
			//小按钮下标自增1
			this.iBtnIndex++;
			if(this.iBtnIndex >= this.aBtnList.length){
				this.iBtnIndex = 0;
			}
			this.aBtnList.forEach((v,i) => {
				v.className = '';
			});
			//显示对应小按钮
			this.aBtnList[this.iBtnIndex].className = 'active';
			
			
		},3000);
	}
	
}
