import React from 'react';

class Parent extends React.Component {
	state = {
		email: 'test@email.com'
	};

	handleChange(e) {
		this.setState({
			email: e.target.value
		});
	}

	render() {
		return (
			<div>
				{/* <input
					onChange={this.handleChange.bind(this)}
					value={this.state.email}
				/> */}
				<h3>派生</h3>
				<Child email={this.state.email}></Child>
				<EmailInput
					onChange={this.handleChange.bind(this)}
					email={this.state.email}></EmailInput>
			</div>
		);
	}
}

class Child extends React.Component {
	state = {
		email: this.props.email
	};

	componentWillReceiveProps(nextProps) {
		// 只要 props.email 改变，就改变 state
		if (nextProps.email !== this.props.email) {
			this.setState({
				email: nextProps.email
			});
		}
	}

	changeEmail() {
		this.setState({
			email: 999
		});
	}

	render() {
		return (
			<p onClick={this.changeEmail.bind(this)}>
				Child： {this.state.email}
			</p>
		);
	}
}

function EmailInput(props) {
	let state = props.email;
	return <input onChange={props.onChange} value={state} />;
	// return (
	// 	<input
	// 		onChange={e => {
	// 			state = e.target.value;
	// 		}}
	// 		defaultValue={state}
	// 	/>
	// );
}

export default Parent;
