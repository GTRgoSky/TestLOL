import React from 'react';
class EventComp extends React.Component {
	constructor() {
		super();
		this.clipboardData.bind(this);
		this.focusHandle.bind(this);
	}
	clipboardData(e) {
		// 只有onPaste才能获取剪切板的值
		console.log(e.clipboardData.getData('Text'));
	}
	keyHandle(e, t) {
		console.log(t, ':', e.key, e.keyCode);
	}
	focusHandle(e, t) {
		console.log(t, ':', e);
	}
	formHandle(e, t) {
		console.log(t, ':', e);
	}
	render() {
		return (
			<div>
				<h5>剪切板事件</h5>
				<div
					onCopy={this.clipboardData}
					// onCut={this.clipboardData}
					// onPaste={this.clipboardData}
				>
					剪切板事件
				</div>
				<input onPaste={this.clipboardData}></input>
				<h5>键盘事件</h5>
				<input
					onKeyDown={event => {
						this.keyHandle(event, 1);
					}}
					onKeyPress={event => {
						this.keyHandle(event, 2);
					}}
					onKeyUp={event => {
						this.keyHandle(event, 3);
					}}
				/>
				<h5>焦点事件</h5>
				<input
					onFocus={event => {
						this.focusHandle(event, 1);
					}}
					onBlur={event => {
						this.focusHandle(event, 2);
					}}
				/>
				<h5>表单事件</h5>
				{/* onchange事件只在键盘或者鼠标操作改变对象属性，且失去焦点时触发，脚本触发无效 */}
				<input
					pattern='^1\d{10}$'
					onPointerDown={event => {
						this.formHandle(event, 4);
					}}
					onChange={event => {
						this.formHandle(event, 1);
					}}
					onInput={event => {
						this.formHandle(event, 2);
					}}
					onInvalid={event => {
						this.formHandle(event, 3);
					}}></input>
			</div>
		);
	}
}

export default EventComp;
