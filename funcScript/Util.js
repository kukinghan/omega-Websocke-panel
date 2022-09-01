/*工具函数库
 *
 *	这里是封装好的工具
 *
 */

// DomID
function $(id) {
	return document.getElementById(id);
}

// 药水效果
function effect(player,effect,time,level){
	console.log("药水效果[玩家:"+player+"效果："+effect+"持续时间:"+time+"]")
	if (effect == "clear") {
		WebsocketMsg("/effect "+player+" "+effect)
	} else{
		WebsocketMsg("/effect "+player+" "+effect+" "+time+" "+level)
	}
}

// 布尔显示转中文
function tozhcn(obj) {
	if (obj == true) {
		return "是";
	} else if (obj == false) {
		return "否";
	}
	return "获取失败";
}

//修改游戏难度
function difficulty(value) {
	WebsocketMsg("/difficulty " + value);
}

//修改游戏规则
function gamerule(value) {
	WebsocketMsg("/gamerule " + value);
}
