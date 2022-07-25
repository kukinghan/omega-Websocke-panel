一个用于通过omega和游戏交互的静态程序

避免非服务器运行（双击index）打开产生的跨域问题，所有内容将保存在同一页面上



- 获得 player 列表:
和/list指令不一样的是，包含了 runtime ID, uinqueID, UUID 和 playerName  
-> {"client":1,"function":"get_players_list","args":{}}  
<- {"client":c,"violate":false,"data":players_list} 

{"client":1,"violate":false,"data":[{"name":"FAdiminSysB","runtimeID":0,"uuid":"00000000-0000-4000-8000-0000af06c966","uniqueID":-403726903269},{"name":"面具的男人","runtimeID":22358,"uuid":"00000000-0000-4000-8000-000056e467d1","uniqueID":-399431916857}]}

/list
{"client":1,"violate":false,"data":{"result":{"CommandOrigin":{"Origin":5,"UUID":"24d6e0e0-0be1-11ed-9505-525400b670a0","RequestID":"96045347-a6a3-4114-94c0-1bc4cc561694","PlayerUniqueID":0},"OutputType":4,"SuccessCount":1,"OutputMessages":[{"Success":true,"Message":"commands.players.list","Parameters":["2","20"]},{"Success":true,"Message":"commands.players.list.names","Parameters":["面具的男人, FAdiminSysB"]}],"DataSet":"{\n   \"currentPlayerCount\" : 2,\n   \"maxPlayerCount\" : 20,\n   \"players\" : \"面具的男人, FAdiminSysB\",\n   \"statusCode\" : 0\n}\n"}}}