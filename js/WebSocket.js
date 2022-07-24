var msg;
var msgID = 0;
var div = document.getElementById("msg-div");
window.onload = setSocket();
var socket;//WebSocket，非必要，待优化

// WebSocket连接
function setSocket(){
	let classs = document.getElementsByClassName("omgLink");
	for (let i = 0; i < classs.length; i++) {
		classs[i].innerHTML = '<span style="color: orange;">正在尝试与omg通信❥~~~</span>'
	}
	
	socket = new WebSocket('ws://'+String(document.getElementById("socket").value)+'/omega_side ')

	socket.addEventListener('open', function() {
		for (let i = 0; i < classs.length; i++) {
			classs[i].innerHTML = '<span style="color: green;">连接服务成功了</span>'
		}
	})
	//接收websocket服务的数据
	socket.addEventListener('message', function(e) {
		console.log(e.data)
		let jsonMsg = JSON.parse(e.data)
		div.innerHTML += "<br />"
		for (let val in jsonMsg) {
			div.innerHTML +=  jsonMsg[val];
		}
	})
	socket.addEventListener('close', function() {
		for (let i = 0; i < classs.length; i++) {
			classs[i].innerHTML = '<span style="color: red;">服务断开连接</span>'
		}
	})
}

// 重连WebSocket//留个函数等扩展
function socketClose(){
	try{
		socket.close();
	}catch(e){
		console.log("无连接")
	}
	// 返回main
	showNone();
	document.getElementById("list-mian").style = "display: inline"
	setSocket();
}

// 通信
function shellMsg(msg){
	socket.send(msg);
}
//Websocket
function WebsocketMsg(msgObj){
	msg = `{"client":`+(msgID+=1)+`,"function":"send_ws_cmd","args":{"cmd":"`+msgObj+`"}}`
	socket.send(msg)
}
//Player
function PlayerMsg(msgObj){
	msg = `{"client":`+(msgID+=1)+`,"function":"send_player_cmd","args":{"cmd":"`+msgObj+`"}}`
	socket.send(msg)
}

