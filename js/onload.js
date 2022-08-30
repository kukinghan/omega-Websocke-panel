onload = function() {
	classSwitch("list-mian");
	onloadEffecct()
};

async function onloadEffecct() {
	let playerSelect = $("player-select-1-1");
	let effectFiv = $("player-select-3-1");
	playerSelect.innerHTML += `
		<option value="kill">杀死玩家</option>
		<option value="clearItem">清空背包</option>
		<option value="chearBox">清空末影箱</option>
		<option value="chearPet">清除宠物背包</option>
		<option value="">装备皮革套</option>
	`;
	effectFiv.innerHTML +=`
		<option value="clear">清除效果</option>
		<option value="speed">速度</option>
		<option value="slowness">缓慢</option>
		<option value="haste">急迫</option>
		<option value="mining_fatigue">挖掘疲劳</option>
		<option value="strength">力量</option>
		<option value="instant_health">瞬间治疗</option>
		<option value="instant_damage">瞬间伤害</option>
		<option value="jump_boost">跳跃提升</option>
		<option value="nausea">反胃</option>
		<option value="regeneration">生命恢复</option>
		<option value="resistance">抗性提升</option>
		<option value="fire_resistance">防火</option>
		<option value="water_breathing">水下呼吸</option>
		<option value="invisibility">隐身</option>
		<option value="blindness">失明</option>
		<option value="night_vision">夜视</option>
		<option value="hunger">饥饿</option>
		<option value="weakness">虚弱</option>
		<option value="poison">中毒</option>
		<option value="wither">凋零</option>
		<option value="health_boost">生命提升</option>
		<option value="absorption">伤害吸收</option>
		<option value="saturation">饱和</option>
		<option value="levitation">飘浮</option>
		<option value="slow_falling">缓降</option>
	`;

}
