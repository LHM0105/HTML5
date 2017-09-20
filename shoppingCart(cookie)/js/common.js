//添加cookie
function setCookie(name,sName,iDay,path){
	var oDate=new Date();
	oDate.setDate(oDate.getDate()+iDay);
	document.cookie=name+'='+encodeURIComponent(sName)+';expires='+oDate+';path='+path;
}
//查询cookie
function getCookie(sName){
	var sCookie=document.cookie;
	var aCookie=sCookie.split('; ');
	//遍历数组
	for(var i=0;i<aCookie.length;i++){
		var aTemp=aCookie[i].split('=');
		
		if(aTemp[0]===sName){
			return decodeURIComponent(aTemp[1]);
		}
	}
}

//删除cookie
function removeCookie(sName,path){
	document.cookie=sName+'=;expires=-1;path='+path;
};