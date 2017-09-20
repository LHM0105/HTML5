window.onload = function(){
	//获取要添加轮播图效果的box(集合，存到数组中)
	let aBox = Array.from(document.getElementsByClassName('carousel'));
	
	//在oBox中新建轮播图对象
	//遍历要加轮播图效果的dom对象数组
	//依次向其中添加轮播图效果
	aBox.forEach((v) => {
		new Slideshow(v);
	});
	
}
