import React from 'react';

class Cat extends React.Component {
	render() {
		const mouse = this.props.mouse;
		return (
			<img
				src='https://www.diyifanwen.com/files/sucai/shoujitupian/2008-7/13/0871302281223620.jpg'
				style={{ marginLeft: mouse.state.x, marginTop: mouse.state.y }}
				draggable='false'
				alt=''
				onMouseUp={e => mouse.onMouseUp(e, false)}
				onMouseDown={e => mouse.onMouseDown(e, true)}
			/>
		);
	}
}

class Mouse extends React.Component {
	constructor(props) {
		super(props);
		this.handleMouseMove = this.handleMouseMove.bind(this);
		this.setMove = this.setMove.bind(this);
		this.state = {
			x: 0,
			y: 0,
			move: false,
			saveX: 0,
			saveY: 0,
			clientX: 0,
			clientY: 0
		};
	}

	handleMouseMove(event) {
		if (!this.state.move) return;
		console.log('mouse move');
		let x = this.state.clientX + event.clientX - this.state.saveX;
		let y = this.state.clientY + event.clientY - this.state.saveY;
		this.setState({
			x: x,
			y: y
		});
	}

	setMove(e, bol) {
		console.log(e.clientX, e.clientY);
		if (bol) {
			this.setState({
				move: bol,
				saveX: e.clientX,
				saveY: e.clientY
			});
		} else {
			this.setState({
				move: bol,
				clientX: this.state.x,
				clientY: this.state.y
			});
		}
	}

	render() {
		return (
			<div
				style={{
					height: '100%',
					width: '100%',
					position: 'fixed',
					top: '0',
					left: '0'
				}}
				onMouseMove={this.handleMouseMove}>
				{/*
            Instead of providing a static representation of what <Mouse> renders,
            use the `render` prop to dynamically determine what to render.
          */}
				{this.props.render({
					state: this.state,
					onMouseUp: this.setMove,
					onMouseDown: this.setMove
				})}

				{/* {this.props.children({
					state: this.state,
					onMouseUp: this.setMove,
					onMouseDown: this.setMove
				})} */}
			</div>
		);
	}
}

class MouseTracker extends React.Component {
	render() {
		return (
			<div>
				<h1>移动鼠标!</h1>
				<Mouse render={mouse => <Cat mouse={mouse} />} />
				{/* <Mouse>{mouse => <Cat mouse={mouse} />}</Mouse> */}
			</div>
		);
	}
}

export default MouseTracker;
