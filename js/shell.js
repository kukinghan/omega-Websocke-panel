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
	for (var i = 0; i < obj.length; i++) {
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
	let omgMsgTime = document.getElementById("world-omgMsgTime");//数据更新时间
	let GameMode = document.getElementById("world-GameMode");//游戏模式
	let Difficulty = document.getElementById("world-Difficulty");//游戏难度
	let DayTime = document.getElementById("world-DayTime");//游戏时间
	let SpawnPosition = document.getElementById("world-SpawnPosition");//世界出生点
	let CommandsEnabled = document.getElementById("world-CommandsEnabled");//命令状态
	let showcoordinates  = document.getElementById("world-showcoordinates");//坐标显示
	let doweathercycle = document.getElementById("world-doweathercycle");//天气更替
	let pvp = document.getElementById("world-pvp");//玩家伤害
	// let  = document.getElementById("world-");//火焰蔓延
	// let  = document.getElementById("world-");//TNT爆炸
	// let  = document.getElementById("world-");//重生锚爆炸
	// let  = document.getElementById("world-");//死亡掉落
	// let  = document.getElementById("world-");//生物破坏
	msg = `{"client":` + (msgID += 1) + `,"function":"get_uqholder","args":{}}`;
	shellMsg(msg);
	setTimeout(function() {
		omgMsgTime.innerHTML = omgData.data.data.ConnectTime;

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
				Difficulty.innerHTML = "和平";
				break;
			case 1:
				Difficulty.innerHTML = "简单";
				break;
			case 2:
				Difficulty.innerHTML = "普通";
				break;
			case 3:
				Difficulty.innerHTML = "困难";
				break;
			default:
				Difficulty.innerHTML = "获取失败";
				break;
		}
		DayTime.innerHTML  = Math.trunc(omgData.data.DayTimePercent*24)+"点";
		SpawnPosition.innerHTML = omgData.data.OnConnectWoldSpawnPosition;
		CommandsEnabled.innerHTML = omgData.data.CommandsEnabled;
		showcoordinates.innerHTML = omgData.data.GameRules.showcoordinates.Value;
		doweathercycle.innerHTML = omgData.data.doweathercycle.Value;
		pvp.innerHTML = omgData.data.pvp.Value;
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
	msg = `{"client":` + (msgID += 1) + `,"function":"get_players_list","args":{}}`;
	shellMsg(msg);
	setTimeout(function() {
		for (let i = 0; i < omgData.data.length; i++) {
			msgDiv.innerHTML += "玩家：" + omgData.data[i].name + "<br />";
			playerArray.push(omgData.data[i].name);
		}
	}, 10);
	playerListArray = playerArray;
	console.log(playerListArray);
	// 将玩家写入页面

	msg = `{"client":` + (msgID += 1) + `,"function":"send_player_cmd","args":{"cmd":"/msg @s @a[]"}}`;
	shellMsg(msg);
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

// {"client":1,"violate":false,"data":{"result":{"CommandOrigin":{"Origin":5,"UUID":"342e271e-09b1-11ed-b269-525400b670a0","RequestID":"96045347-a6a3-4114-94c0-1bc4cc561694","PlayerUniqueID":0},"OutputType":4,"SuccessCount":1,"OutputMessages":[],"DataSet":"{\n \"message\" : \"hi\",\n \"statusCode\" : 0\n}\n"}}}
