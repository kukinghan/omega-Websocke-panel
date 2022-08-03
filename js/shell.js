let timeVal; //设定时间值
var playerListArray = {}; //临时储存的玩家列表
onload = function() {
	mianSwitch();
};


/*
 *
 *	这里是界面逻辑
 *	
 */
// 页面切换（排它显示）
// 隐藏
function showNone() {
	let obj = document.getElementsByClassName("show");
	for (let i = 0; i < obj.length; i++) {
		obj[i].style = "display: none;"
	};
};

// 显示
function showSwitch(obj) {
	document.getElementById(obj).style = "display: inline";
};

function mianSwitch() {
	showNone();
	showSwitch("list-mian");
};

function commandSwitch() {
	showNone();
	showSwitch("list-command");
};

function worldSwitch() {
	showNone();
	showSwitch("list-world");
};

function playerSwitch() {
	showNone();
	showSwitch("list-player");
};

function inputSwitch() {
	showNone();
	showSwitch("list-input");
};

function jsonsetSwitch() {
	showNone();
	showSwitch("list-jsonset");
};

function inquireSwitch() {
	showNone();
	showSwitch("list-slelect");
};


/*命令执行页
 *
 *	这里是命令执行页功能
 *
 */
// 发送请求
// jsonMsg
function msgShell() {
	msg = document.getElementById("command-msg-json").value;
	shellMsg(msg);
};
//WebsocketMsg
function msgWebsocket() {
	let msgObj = document.getElementById("command-msg-Websocket").value;
	WebsocketMsg(msgObj)
};
//PlayerMsg
function msgPlayer() {
	let msgObj = document.getElementById("command-msg-Player").value;
	PlayerMsg(msgObj)
};
//控制台命令
function msgCmd() {
	let msgObj = document.getElementById("command-cmd-json").value;
	cmdMsg(msgObj)
};
//群服互通消息
function msgQq() {
	let msgObj = document.getElementById("command-qq-json").value;
	qqMsg(msgObj)
};
// 执行omg函数
function msgFunction() {
	let msg1 = document.getElementById("command-function").value;
	let msg2 = document.getElementById("command-args").value;
	let msg3 = document.getElementById("command-value").value;
	if (msg2 == "" || msg3 == "") {
		functionMsg(msg1);
	} else {
		functionMsg2(msg1, msg2, msg3);
	}
}



/*世界控制页
 *
 *	这里是界面功能
 *
 */

// 时间显示
function numValueGain() {
	let valNum = document.getElementById("world-timeRangeValue");
	timeVal = document.getElementById("world-timeRange").value;
	valNum.innerHTML = timeVal;
};

function msgTimeSet() {
	WebsocketMsg("/time set " + timeVal);
};

// 天气控制
function weatherClear() {
	WebsocketMsg("/weather clear"); //晴
};

function weatherRain() {
	WebsocketMsg("/weather rain"); //雨
};

function weatherThunder() {
	WebsocketMsg("/weather thunder"); //暴雨
};

//实体清理
function killItems() {
	WebsocketMsg("/kill @e[type=item]");
};
//获取世界信息
function worldInfo() {
	let omgMsgTime = $("world-omgMsgTime"); //数据更新时间
	let GameMode = $("world-GameMode"); //游戏模式
	let Difficulty = $("world-Difficulty"); //游戏难度
	let DayTime = $("world-DayTime"); //游戏时间
	let SpawnPosition = $("world-SpawnPosition"); //世界出生点
	let CommandsEnabled = $("world-CommandsEnabled"); //命令状态
	let showcoordinates = $("world-showcoordinates"); //坐标显示
	let doweathercycle = $("world-doweathercycle"); //天气更替
	let pvp = $("world-pvp"); //玩家伤害
	let doimmediaterespawn = $("world-doimmediaterespawn"); //立即重生
	let dofiretick = $("world-dofiretick"); //火焰蔓延
	let tntexplodes = $("world-tntexplodes"); //TNT爆炸
	let respawnblocksexplode = $("world-respawnblocksexplode"); //重生锚爆炸
	let keepinventory = $("world-keepinventory"); //死亡掉落
	let mobgriefing = $("world-mobgriefing"); //生物破坏
	functionMsg("get_uqholder");
	setTimeout(function() {
		omgMsgTime.innerHTML = omgData.data.ConnectTime;

		switch (omgData.data.WorldGameMode) {
			case 0:
				GameMode.innerHTML = "生存";
				break;
			case 1:
				GameMode.innerHTML = "创造";
				break;
			case 2:
				GameMode.innerHTML = "冒险";
				break;
			default:
				GameMode.innerHTML = "获取失败";
				break;
		};
		switch (omgData.data.WorldDifficulty) {
			case 0:
				Difficulty.value = "peaceful";
				break;
			case 1:
				Difficulty.value = "easy";
				break;
			case 2:
				Difficulty.value = "normal";
				break;
			case 3:
				Difficulty.value = "hard";
				break;
			default:
				Difficulty.value = "获取失败";
				break;
		}
		DayTime.innerHTML = Math.trunc(omgData.data.DayTimePercent * 24) + "点";
		SpawnPosition.innerHTML = omgData.data.OnConnectWoldSpawnPosition;
		CommandsEnabled.value = omgData.data.CommandsEnabled;
		showcoordinates.value = omgData.data.GameRules.showcoordinates.Value;
		doweathercycle.value = omgData.data.GameRules.doweathercycle.Value;
		pvp.value = omgData.data.GameRules.pvp.Value;
		doimmediaterespawn.value = omgData.data.GameRules.doimmediaterespawn.Value;
		dofiretick.value = omgData.data.GameRules.dofiretick.Value;
		tntexplodes.value = omgData.data.GameRules.tntexplodes.Value;
		respawnblocksexplode.value = omgData.data.GameRules.respawnblocksexplode.Value;
		keepinventory.value = omgData.data.GameRules.keepinventory.Value;
		mobgriefing.value = omgData.data.GameRules.mobgriefing.Value;
	}, 100);
}

/*玩家控制页
 *
 *	这里是界面功能
 *
 */
// 获取玩家列表
function playerList() {
	// 获取玩家
	let msgDiv = document.getElementById("player-list");
	let playerArray = []; //局部临时玩家列表
	msgDiv.innerHTML = "";
	functionMsg("get_players_list");
	setTimeout(function() {
		for (let i = 0; i < omgData.data.length; i++) {
			msgDiv.innerHTML += "玩家：" + omgData.data[i].name + "<br />";
			playerArray.push(omgData.data[i].name);
		}
	}, 10);
	playerListArray = playerArray;
	console.log(playerListArray);
	// 将玩家写入页面
};

/*建筑导入页
 *
 *	这里是界面功能
 *
 */



/*配置编辑页
 *
 *	这里是界面功能
 *
 */



/*数据查询页
 *
 *	这里是界面功能
 *
 */


/*工具函数
 *
 *	这里是封装好的工具
 *
 */

// function tozhcn(obj){
// 	if (obj == true) {
// 		return "是";
// 	} else if(obj == false){
// 		return "否";
// 	}
// 	return "获取失败";
// }

//修改游戏难度
function difficulty(value){
	WebsocketMsg("/difficulty "+value);
}

//修改游戏规则
function gamerule(value){
	WebsocketMsg("/gamerule " + value);
}

// DomID
function $(id){
	return document.getElementById(id);
}