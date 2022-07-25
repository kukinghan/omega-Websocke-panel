一个用于通过omega和游戏交互的静态程序

避免非服务器运行（双击index）打开产生的跨域问题，所有内容将保存在同一页面上



- 获得 player 列表:
和/list指令不一样的是，包含了 runtime ID, uinqueID, UUID 和 playerName  
-> {"client":c,"function":"get_players_list","args":{}}  
<- {"client":c,"violate":false,"data":players_list} 