
    def do_echo(self,msg:str,cb:Callable[[EchoResp],None])->EchoResp:
        return self._send_request(RequestMsg(function="echo",args={"msg":msg}),cb=cb)
    
    def do_send_ws_cmd(self,cmd:str,cb:Callable[[CmdResp],None])->CmdResp:
        return self._send_request(RequestMsg(function="send_ws_cmd",args={"cmd":cmd}),cb=cb)
    
    def do_send_player_cmd(self,cmd:str,cb:Callable[[CmdResp],None])->CmdResp:
        return self._send_request(RequestMsg(function="send_player_cmd",args={"cmd":cmd}),cb=cb)
    
    def do_send_wo_cmd(self,cmd:str,cb:Callable[[AcknowledgeResp],None])->AcknowledgeResp:
        return self._send_request(RequestMsg(function="send_wo_cmd",args={"cmd":cmd}),cb=cb)
    
    def do_get_uqholder(self,cb:Callable[[dict],None])->dict:
        return self._send_request(RequestMsg(function="get_uqholder",args={}),cb=cb)
    
    def do_get_players_list(self,cb:Callable[[List[PlayerInfo]],None])->List[PlayerInfo]:
        return self._send_request(RequestMsg(function="get_players_list",args={}),cb=cb)
    
    def do_get_get_player_next_param_input(self,player:str,hint:str,cb:Callable[[PlayerParamInput],None])->PlayerParamInput:
        return self._send_request(RequestMsg(function="player.next_input",args={"player":player,"hint":hint}),cb=cb)
    
    def do_send_player_msg(self,player:str,msg:str,cb:Callable[[AcknowledgeResp],None])->AcknowledgeResp:
        return self._send_request(RequestMsg(function="player.say_to",args={"player":player,"msg":msg}),cb=cb)
    
    def do_set_player_title(self,player:str,msg:str,cb:Callable[[AcknowledgeResp],None])->AcknowledgeResp:
        return self._send_request(RequestMsg(function="player.title_to",args={"player":player,"msg":msg}),cb=cb)
    
    def do_set_player_subtitle(self,player:str,msg:str,cb:Callable[[AcknowledgeResp],None])->AcknowledgeResp:
        return self._send_request(RequestMsg(function="player.subtitle_to",args={"player":player,"msg":msg}),cb=cb)
        
    def do_set_player_actionbar(self,player:str,msg:str,cb:Callable[[AcknowledgeResp],None])->AcknowledgeResp:
        return self._send_request(RequestMsg(function="player.actionbar_to",args={"player":player,"msg":msg}),cb=cb)
    
    def do_get_player_pos(self,player:str,limit:str,cb:Callable[[PlayerPoseResp],None])->PlayerPoseResp:
        return self._send_request(RequestMsg(function="player.pos",args={"player":player,"limit":limit}),cb=cb)
    
    def do_set_player_data(self,player:str,entry:str,data:any,cb:Callable[[AcknowledgeResp],None])->AcknowledgeResp:
        return self._send_request(RequestMsg(function="player.set_data",args={"player":player,"entry":entry,"data":data}),cb=cb)
    
    def do_get_player_data(self,player:str,entry:any,cb:Callable[[PlayerDataResponse],None])->PlayerDataResponse:
        return self._send_request(RequestMsg(function="player.get_data",args={"player":player,"entry":entry}),cb=cb)
    
    def do_get_item_mapping(self,cb:Callable[[ItemMappingResp],None])->ItemMappingResp:
        return self._send_request(RequestMsg(function="query_item_mapping",args={}),cb=cb)
    
    def do_get_block_mapping(self,cb:Callable[[BlockMappingResp],None])->BlockMappingResp:
        return self._send_request(RequestMsg(function="query_block_mapping",args={}),cb=cb)
    
    def do_get_scoreboard(self,cb:Callable[[Dict[str,Dict[str,int]]],None])->Callable[[Dict[str,Dict[str,int]]],None]:
        return self._send_request(RequestMsg(function="query_memory_scoreboard",args={}),cb=cb)
    
    def do_send_fb_cmd(self,cmd:str,cb:Callable[[AcknowledgeResp],None])->AcknowledgeResp:
        return self._send_request(RequestMsg(function="send_fb_cmd",args={"cmd":cmd}),cb=cb)
    
    def do_send_qq_msg(self,msg:str,cb:Callable[[AcknowledgeResp],None])->AcknowledgeResp:
        return self._send_request(RequestMsg(function="send_qq_msg",args={"msg":msg}),cb=cb)
    
    def listen_omega_menu(self,triggers:List[str],argument_hint:str,usage:str,cb:Callable[[RegMenuResp],None],on_menu_invoked=Callable[[PlayerInput],None])->RegMenuResp:
        sub_id=f"{triggers}{argument_hint}{usage}"
        self.on_menu_triggered_cbs[sub_id]=on_menu_invoked
        return self._send_request(RequestMsg(function="reg_menu",args={"triggers":triggers,"argument_hint":argument_hint,"usage":usage,"sub_id":sub_id}),cb=cb)
    
    def listen_mc_packet(self,pkt_type:str,cb:Callable[[ListenPacketAcknowledgeResp],None],on_new_packet_cb:Callable[[dict],None])->ListenPacketAcknowledgeResp:
        if not pkt_type in self.on_typed_mc_pkt_cbs.keys():
            self.on_typed_mc_pkt_cbs[pkt_type]=[]
        self.on_typed_mc_pkt_cbs[pkt_type].append(on_new_packet_cb)
        return self._send_request(RequestMsg(function="regMCPkt",args={"pktID":pkt_type}),cb=cb)
    
    def listen_any_mc_pakcet(self,cb:Callable[[ListenPacketAcknowledgeResp],None],on_new_packet_cb:Callable[[dict],None])->ListenPacketAcknowledgeResp:
        self.on_any_mc_pkt_cbs.append(on_new_packet_cb)
        return self._send_request(RequestMsg(function="regMCPkt",args={"pktID":"all"}),cb=cb)
    
    def listen_player_login(self,cb:Callable[[AcknowledgeResp],None],on_player_login_cb:Callable[[PlayerInfo],None])->AcknowledgeResp:
        self._add_normal_callback("playerLogin",sub="",cb=on_player_login_cb)
        return self._send_request(RequestMsg(function="reg_login",args={}),cb=cb)

    def listen_player_logout(self,cb:Callable[[AcknowledgeResp],None],on_player_login_cb:Callable[[PlayerInfo],None])->AcknowledgeResp:
        self._add_normal_callback("playerLogout",sub="",cb=on_player_login_cb)
        return self._send_request(RequestMsg(function="reg_logout",args={}),cb=cb)

    def listen_block_update(self,cb:Callable[[AcknowledgeResp],None],on_block_update:Callable[[PlayerInfo],None])->AcknowledgeResp:
        self._add_normal_callback("blockUpdate",sub="",cb=on_block_update)
        return self._send_request(RequestMsg(function="reg_block_update",args={}),cb=cb)
