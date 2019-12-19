// 目前方法太少，先不区分
import { timeFormat, whichType } from 'wing-time';
// 时间的打印工具
export function timeConsole(str) {
	let _str = timeFormat('YYYY-MM-DD hh:mm:ss') + ' :   ' + str;
	console.log('%c' + _str, 'color:#ec7259;');
}

export { whichType };
