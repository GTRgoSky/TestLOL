import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import QiPanGame from './qipan';
import BoilingVerdict from './boilingVerdict';
import WelcomeDialog from './slot';
import RefsTest from './refs';

import { ThemeContext } from '../context/theme-context';
class Index extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			background: 'stateDefault'
		};
		this.setContext = this.setContext.bind(this);
	}
	setContext(text) {
		this.setState({
			background: text
		});
		console.log(text);
	}
	render() {
		return (
			<div>
				<QiPanGame></QiPanGame>
				<BoilingVerdict></BoilingVerdict>
				<RefsTest>btn</RefsTest>
				<ThemeContext.Provider
					value={{ background: this.state.background }}>
					<WelcomeDialog setContext={this.setContext}></WelcomeDialog>
				</ThemeContext.Provider>
				{/* <WelcomeDialog>
				{'若用这个则使用了ThemeContext默认值'}
				</WelcomeDialog> */}
			</div>
		);
	}
}
// ========================================

ReactDOM.render(<Index />, document.getElementById('root'));

// const numbers = [1, 2, 3, 4, 5];
// const listItems = numbers.map((number) =>
//   <li>{number}</li>
// );

// ReactDOM.render(
// 	<ul>{listItems}</ul>,
// 	document.getElementById('root2')
// );
