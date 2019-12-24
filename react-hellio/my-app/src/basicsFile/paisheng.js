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

	render() {
		return <p>{this.state.email}</p>;
	}
}

function EmailInput(props) {
	return <input onChange={props.onChange} value={props.email} />;
}

export default Parent;
