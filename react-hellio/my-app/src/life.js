// 生命周期测试
import React from 'react';
import { timeConsole } from 'utils';

class LifeParent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			context: 'LifeParent',
			propschild: 'parent-give-props'
		};
		timeConsole('parent-constructor');
	}

	// componentWillMount() { //旧名字
	// 	timeConsole('parent-componentWillMount');
	// }
	UNSAFE_componentWillMount() {
		//新名字
		timeConsole('parent-UNSAFE_componentWillMount');
	}
	// componentWillReceiveProps() { //旧名字
	// 	timeConsole('parent-componentWillReceiveProps');
	// }
	UNSAFE_componentWillReceiveProps() {
		//新名字
		timeConsole('parent-UNSAFE_componentWillReceiveProps');
	}
	// componentWillUpdate() {
	// 	timeConsole('parent-componentWillUpdate');
	// }
	UNSAFE_componentWillUpdate() {
		//新名字
		timeConsole('parent-UNSAFE_componentWillUpdate');
	}

	render() {
		timeConsole('parent-render');
		return (
			<>
				<p>parent-state: {this.state.context}</p>

				<p>parent-props: {this.props.context}</p>

				<button onClick={this.setStateFun.bind(this)}>
					设置父的state
				</button>
				<button onClick={this.setPropsFun.bind(this)}>
					设置父传给子的props
				</button>
				<LifePChild context={this.state.propschild}></LifePChild>
			</>
		);
	}
	componentDidUpdate(prevProps) {
		timeConsole('parent-componentDidUpdate');
	}
	componentDidMount() {
		timeConsole('parent-componentDidMount');
	}

	componentWillUnmount() {
		timeConsole('parent-componentWillUnmount');
	}

	setStateFun() {
		this.setState({
			context: 'LifeParent-' + new Date().valueOf()
		});
	}

	setPropsFun() {
		this.setState({
			propschild: 'parent-give-props-' + new Date().valueOf()
		});
	}
}

class LifePChild extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			context: 'LifePChild'
		};
		timeConsole('child-constructor');
	}

	// componentWillMount() { //旧名字
	// 	timeConsole('child-componentWillMount');
	// }
	UNSAFE_componentWillMount() {
		//新名字
		timeConsole('child-UNSAFE_componentWillMount');
	}
	// componentWillReceiveProps() {
	// 	//旧名字
	// 	timeConsole('child-componentWillReceiveProps');
	// }
	UNSAFE_componentWillReceiveProps(nextProps) {
		//新名字
		timeConsole('child-UNSAFE_componentWillReceiveProps', nextProps);
	}
	// componentWillUpdate() {
	// 	timeConsole('child-componentWillUpdate');
	// }
	UNSAFE_componentWillUpdate() {
		//新名字
		timeConsole('child-UNSAFE_componentWillUpdate');
	}

	render() {
		timeConsole('child-render');
		return (
			<div>
				<p>child-state: {this.state.context}</p>

				<p>child-props: {this.props.context}</p>

				<button onClick={this.setStateFun.bind(this)}>
					设置子的state
				</button>
			</div>
		);
	}
	componentDidUpdate() {
		timeConsole('child-componentDidUpdate');
	}
	componentDidMount() {
		timeConsole('child-componentDidMount');
	}

	componentWillUnmount() {
		timeConsole('child-componentWillUnmount');
	}

	setStateFun() {
		this.setState({
			context: 'LifePChild' + new Date().valueOf()
		});
	}
}

export default LifeParent;
