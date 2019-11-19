import React from 'react';
import { ThemeContext } from '../context/theme-context';
// 测试一
// function WelcomeDialog() {
// 	return (
// 		<FancyBorder color='blue'>
// 			<h1 className='Dialog-title'>Welcome</h1>
// 			<p className='Dialog-message'>
// 				Thank you for visiting our spacecraft!
// 			</p>
// 		</FancyBorder>
// 	);
// }

//测试二
function Dialog(props) {
	return (
		<FancyBorder color='blue' setContext={props.setContext}>
			<h1 className='Dialog-title'>{props.title}</h1>
			<p className='Dialog-message'>{props.message}</p>
			{props.children}
		</FancyBorder>
	);
}

class SignUpDialog extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.handleSignUp = this.handleSignUp.bind(this);
		this.state = { login: '' };
	}

	static contextType = ThemeContext;

	render() {
		let theme = this.context;
		return (
			<Dialog
				title='Mars Exploration Program'
				message='How should we refer to you?'
				setContext={this.props.setContext}>
				<input value={this.state.login} onChange={this.handleChange} />
				<button onClick={this.handleSignUp}>Sign Me Up!</button>
				<p onClick={() => this.props.setContext('hhml')}>
					parent: {theme.background}
				</p>
			</Dialog>
		);
	}

	handleChange(e) {
		this.setState({ login: e.target.value });
	}

	handleSignUp() {
		alert(`Welcome aboard, ${this.state.login}!`);
	}
}

function FancyBorder(props) {
	let contextType = ThemeContext;
	return (
		<div className={'FancyBorder FancyBorder-' + props.color}>
			{props.children}
			<contextType.Consumer>
				{value => (
					<p
						onClick={() => {
							props.setContext('hhlh');
						}}>
						{value.background}
					</p>
				)}
			</contextType.Consumer>
		</div>
	);
}

export default SignUpDialog;
