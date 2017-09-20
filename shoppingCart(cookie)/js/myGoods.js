window.onload=function(){
	//读取cookie,并转化为对象数组
	var agoods=JSON.parse(getCookie('goods'));
	console.log(agoods);
	//获取ul对象
	var oList=document.getElementById('list');
	for(var i=0;i<agoods.length;i++){
		var sId=agoods[i].id;
		var sSrc=agoods[i].src;
		var sTitle=agoods[i].title;
		var sPrice=agoods[i].price;
		var iNum=agoods[i].num;
		var oLi=document.createElement('li');
		//模板字符串
		oLi.innerHTML=`<a href="javascript:;"dataId=${sId}>移除此商品</a>
		<img src=${sSrc}/>
		<div class="title">${sTitle}</div>
		<span>数量：${iNum}</span>
		<div class="price">${sPrice}</div>`;
		oList.appendChild(oLi);
	}
//	获取页面中的li对象集合
	var oLis=oList.getElementsByTagName('li');
	for(var j=0;j<oLis.length;j++){
		oLis[j].onclick=function(ev){
			var e=ev || window.event;
			var oTarget=e.target || e.srcElement;
//			判断被点击的是不是a标签
			if(oTarget.nodeName==='A'){
//				获取商品数量
				var oSpan=this.getElementsByTagName('span')[0];
				var sNum=oSpan.innerHTML;
				var iNum=Number(sNum.split('：')[1]);
//				获取商品id
				var oA=this.getElementsByTagName('a')[0];
				var sId=oA.getAttribute('dataId');
				
//				判断商品数量是否为1,是1的话就删除商品在页面上的显示,否则数量减1
				if(iNum===1){
//					页面上移除此商品
					oList.removeChild(this);
//					删除数组中此商品对象的记录（遍历数组通过id找出此对象）
					for(var x=0;x<agoods.length;x++){
						if(agoods[x].id===sId){
							agoods.splice(x,1);//移除数组中的商品
						}
					}	
					
				}else{
//					页面显示的商品数量-1
					iNum -= 1;
					oSpan.innerHTML="数量："+iNum;
//					数组中该商品的数量-1
					for(var x=0;x<agoods.length;x++){
						if(agoods[x].id===sId){
							agoods[x].num-=1;//数组中的此商品的数量-1
						}
					}
				}
				
				//修改cookie中的记录，把新数组agoods存入cookie
				setCookie('goods',JSON.stringify(agoods),7,'/');
			}
		}
	}
}




//window.onload=function(){
//	//获取dom对象
//	var oList=document.getElementsByTagName('ul')[0];
//	var sCookies=document.cookie;
//	var aCookies=sCookies.split('; ');
//	
//	//console.log(aCookies);
//	var aId=[];//存放从cookie中取到的id值
//	for(var i=0;i<aCookies.length;i++){
//		var aCookie=aCookies[i].split('=');
//		if(aCookie[0].slice(0,2)=='id'){//如果cookie名为id开头
//			aId.push(aCookie[1]);//把id值存入数组
//		}
//	}
//	for(var j=0;j<aId.length;j++){
//		var oLi=document.createElement('li');
//		oLi.innerHTML='商品编号：'+aId[j];
//		oList.appendChild(oLi);
//	}
//	
//	console.log(aId);
//}
