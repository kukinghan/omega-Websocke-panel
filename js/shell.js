let timeVal;
onload = function(){
	mianSwitch();
}

// 页面切换（排他法）
	// 隐藏
	function showNone(){
		let obj = document.getElementsByClassName("show");
		for (var i = 0; i < obj.length; i++) {
			obj[i].style = "display: none;"
		}
	}
	// 显示
	function showSwitch(obj){
		document.getElementById(obj).style = "display: inline";
	}
	function mianSwitch(){
		showNone();
		showSwitch("list-mian");
	}
	function commandSwitch(){
		showNone();
		showSwitch("list-command");
	}
	function worldSwitch(){
		showNone();
		showSwitch("list-world");
	}
	function playerSwitch(){
		showNone();
		showSwitch("list-player");
	}
	function inputSwitch(){
		showNone();
		showSwitch("list-input");
	}
	function jsonsetSwitch(){
		showNone();
		showSwitch("list-jsonset");
	}
	function inquireSwitch(){
		showNone();
		showSwitch("list-slelect");
	}

// 发送请求
	// jsonMsg
	function msgShell(){
		msg = document.getElementById("msg-json").value;
		shellMsg(msg);
	};
	//WebsocketMsg
	function msgWebsocket(){
		let msgObj = document.getElementById("msg-Websocket").value;
		WebsocketMsg(msgObj)
	};
	//PlayerMsg
	function msgPlayer(){
		let msgObj = document.getElementById("msg-Player").value;
		PlayerMsg(msgObj)
	};
	
// 时间显示
	function numValueGain(){
		let valNum = document.getElementById("timeRangeValue");
		timeVal = document.getElementById("timeRange").value;	
		valNum.innerHTML = timeVal;
	};
	function msgTimeSet(){
		WebsocketMsg("/time set "+timeVal)
	};

	
// {"client":1,"violate":false,"data":{"result":{"CommandOrigin":{"Origin":5,"UUID":"342e271e-09b1-11ed-b269-525400b670a0","RequestID":"96045347-a6a3-4114-94c0-1bc4cc561694","PlayerUniqueID":0},"OutputType":4,"SuccessCount":1,"OutputMessages":[],"DataSet":"{\n \"message\" : \"hi\",\n \"statusCode\" : 0\n}\n"}}}