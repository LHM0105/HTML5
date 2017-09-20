window.onload=function(){
	var oBox = document.getElementById('box');
	console.log(1);
	bufferMove1(oBox,{width:200,height:200},function(){
		bufferMove1(oBox,{left:400},function(){
			bufferMove1(oBox,{top:500,opacity:30});
		});
	});
}
