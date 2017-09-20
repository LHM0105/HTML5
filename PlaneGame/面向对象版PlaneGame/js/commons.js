//公共函数
//根据id获取dom对象
function $(id){
	return document.getElementById(id);
}

//获取实际起作用是元素样式的值
function getStyle(obj,sAttr){
	if(obj.currentStyle){
		return obj.currentStyle[sAttr];
	}else{
		return getComputedStyle(obj,null)[sAttr];
	}
}

/*多属性同时缓冲运动的封装函数
 *obj:要运动的对象
 * target：一个对象，属性和属性值是obj要运动到的最终状态，注：不透明度opacity取值范围是0-100
*/
function bufferMove(obj,target,fn){
	//1.清除老的定时器
	clearInterval(obj.iTimer);
	//2.开启新的定时器
	obj.iTimer=setInterval(function(){
		//假设所有属性值均运动完毕
		let bBtn=true;
		//3.遍历要包含运动属性以及终点值的对象
		for(var sAttr in target){
			//3获取当前值
			let iCur;
			if(sAttr==='opacity'){
				iCur=Math.round(parseFloat(getStyle(obj,sAttr))*100);//Math.round()四舍五入
			}else{
				iCur=Math.round(parseFloat(getStyle(obj,sAttr)));
								
			}

			//4计算速度
			let iSpeed=(target[sAttr]-iCur)/8;
			
			//辨别方向
			iSpeed=iSpeed>0? Math.ceil(iSpeed) : Math.floor(iSpeed);//Math.ceil()向上取整，Math.floor()向下取整
			
			//5计算下一次的值
			let iNext=iCur+iSpeed;
			
			//6赋值
			if(sAttr==='opacity'){
				obj.style[sAttr]=iNext/100;
				obj.filter='alpha(opacity='+iNext+')';
			}else{
				obj.style[sAttr]=iNext+'px';	
			}

			
			//7判断当前属性是否运动完毕
			if(iNext!==target[sAttr]){
				bBtn=false;
			}	
		}
		//8清除定时器
		if(bBtn===true){
			clearInterval(obj.iTimer);
			//判断是否传入了回调函数，如果传入了，就执行
			if(fn){
				fn();
			}
		}
		
	},50);
}


//检测碰撞
function pz(obj1,obj2){
	let i1L = obj1.offsetLeft;
	let i1T = obj1.offsetTop;
	let i1W = obj1.offsetWidth;
	let i1H = obj1.offsetHeight;
	let i2L = obj2.offsetLeft;
	let i2T = obj2.offsetTop;
	let i2W = obj2.offsetWidth;
	let i2H = obj2.offsetHeight;
	
	if( i1L+i1W <= i2L ||
		i1T+i1H <= i2T ||
		i2L+i2W <= i1L ||
		i2T+i2H <= i1T){
			return false;
		}else{
			return true;
		}
}


//生成独一无二的key
function createUniqueKey(){
	return ''+ new Date().getTime() + Math.random();
}

//绑定事件obj：绑定事件的对象；type:绑定的事件类型，不加on，如点击事件是click；fn触发事件执行的函数
function bindEvent(obj,type,fn){
	if(obj.attachEvent){
	 	return obj.attachEvent(obj,'on'+type,fn);
	}else{
		return obj.addEventListener(obj,type,fn);
	}
}

// 添加、修改cookie
function setCookie(sName, sValue, iDay, path) {
	var oDate = new Date();
	oDate.setDate(oDate.getDate() + iDay);
	document.cookie = sName + '=' + encodeURIComponent(sValue) + ';expires=' + oDate + ';path=' + path;
}


// 查询cookie
function getCookie(sName) {
	var sCookie = document.cookie;
	var aCookie = sCookie.split('; ');
	for(var i = 0; i < aCookie.length; i++) {
		var aTemp = aCookie[i].split('=');
		if(aTemp[0] === sName) {
			return decodeURIComponent(aTemp[1]);
		}
	}
}



// 删除cookie
function removeCookie(sName, path) {
	document.cookie = sName + '=;expires=-1;path=' + path;
};



