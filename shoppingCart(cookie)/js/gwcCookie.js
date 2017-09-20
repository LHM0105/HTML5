window.onload=function(){
	//获取a链接对象
	var oAdd=document.getElementsByTagName('a');
	//存放多个商品信息
	var agoods=[];
	//添加购物车a链接点击事件
	for(var i=0;i<oAdd.length;i++){
		oAdd[i].onclick=function(){
			
			//获取被点击的商品信息(商品信息都被添加给a标签的属性了)
			var sId=this.getAttribute('dataId');
			var sSrc=this.getAttribute('dataSrc');
			var sTitle=this.getAttribute('dataTitle');
			var sPrice=this.getAttribute('dataPrice');
			var iNum=1;
			//创建a链接对象，存入cookie
			var agood={
				id:sId,
				src:sSrc,
				title:sTitle,
				price:sPrice,
				num:iNum
			};
			//获取当前cookie,查看当前cookie是否存在商品对象列表，存在的话则继续添加，不存在就创建
			var agoods=getCookie('goods');
			
			var b=true;//设置布尔值，true表示商品被加入数组
			if(agoods===undefined){
				agoods=[];
			}else{
				//获取cookie中的字符串并将其转为对象数组
				agoods=JSON.parse(getCookie('goods'));
				
				//判断cookie中是否存在当前商品
				for(var j=0;j<agoods.length;j++){
					if(agoods[j].id===sId){
						agoods[j].num+=1;
						b=false;
					}
				}
			}
			
			if(b===true){
					//把商品加入数组
					agoods.push(agood);
			}
			//存入cookie(存入cookie的值必须为基本类型，所以这里把数组转化成字符串)
			setCookie('goods',JSON.stringify(agoods),7,'/');
			
		}
	}
}
















//window.onload=function(){
////	function setCookie(name,value,path,){
////		
////	}
//	//获取a链接对象
//	var oAdd=document.getElementsByTagName('a');
//	console.log(oAdd);
//	for(var i=0;i<oAdd.length;i++){
//		oAdd[i].index=i;
//		oAdd[i].onclick=function(){
//			document.cookie='id'+this.index+'='+this.index+';path="/"';
////			document.cookie='num'+this.index+'=1;path="/"';
//		}
//	}
//}
