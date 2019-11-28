import React from 'react';

//

function logProps(Component) {
	class LogProps extends React.Component {
		componentDidUpdate(prevProps) {
			console.log('old props:', prevProps);
			console.log('new props:', this.props);
		}

		render() {
			const { forwardedRef, ...rest } = this.props;
			// 将自定义的 prop 属性 “forwardedRef” 定义为 ref
			return <Component ref={forwardedRef} {...rest} />;
		}
	}

	// 注意 React.forwardRef 回调的第二个参数 “ref”。
	// 我们可以将其作为常规 prop 属性传递给 LogProps，例如 “forwardedRef”
	// 然后它就可以被挂载到被 LogPros 包裹的子组件上。
	return React.forwardRef((props, ref) => {
		return <LogProps {...props} forwardedRef={ref} />;
	});
}

//ref.current.focus()

class Child extends React.Component {
	test() {
		console.log('parent click me');
	}
	render() {
		return (
			<div>
				<input></input>
				<button
					className='FancyButton'
					onClick={() => this.props.showClick(123)}>
					{this.props.children}
				</button>
			</div>
		);
	}
}

const Children = logProps(Child);

class Father extends React.Component {
	constructor(props) {
		super(props);
		this.myRef = React.createRef();
	}
	componentDidMount() {
		console.log(this.myRef.current);
	}
	showClick(item) {
		console.log(item);
		this.myRef.current.test();
	}
	render() {
		return (
			<Children showClick={v => this.showClick(v)} ref={this.myRef}>
				{this.props.children}
			</Children>
		);
	}
}

export default Father;
