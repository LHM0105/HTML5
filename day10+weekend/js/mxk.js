window.onload=function(){
	var oIpt=document.getElementById("secIpt");
	//输入框获取焦点
	oIpt.onfocus=function(){
		oIpt.value='';
		oIpt.style.color='#000000';
	}
	oIpt.onblur=function(){
		oIpt.value='跑步鞋';
	}
	//顶部，鼠标移至选项卡，显示下拉栏
	var oA1=document.getElementById('a1');
	var oList=document.getElementById('list');
	oA1.addEventListener('mouseover',function(){
		oList.style.display='block';
		oA1.style.background='#fff';
		oA1.style.marginTop='-4px';
		oA1.style.height='20px';
		//改变行高。使字体仍然竖直居中
		oA1.children[0].style.lineHeight='24px';
		
		oList.style.borderTop='none';
	});
	oA1.onmouseout=function(){
		oList.style.display='none';
		oA1.style.background='none';
		oA1.style.height='16px';
		oA1.style.marginTop='0';
		oA1.children[0].style.lineHeight='16px';
		
	}
		
	//nav-l鼠标移至，显示选选项卡
	var oAllgoods=document.getElementById('allgoods');
	var oListShoes=oAllgoods.nextElementSibling;
	//鼠标进入
	oAllgoods.onmouseover=function(){
		oListShoes.style.display='block';
		
	}
	//鼠标离开列表
	oListShoes.onmouseleave=function(){
		oListShoes.style.display='none';
	}
	
	//鼠标放到a1上
	var oRunshoes=document.getElementById('runshoes');
	var oshoesOfman=document.getElementById('shoesOfman');
	//鼠标进入选项卡，子选项卡出现
	oRunshoes.onmouseenter=function(){
		oshoesOfman.style.display='block';
	}
	//鼠标离开选选项卡，子选项卡消失
	oRunshoes.onmouseleave=function(){
		oshoesOfman.style.display='none';
	}
}
