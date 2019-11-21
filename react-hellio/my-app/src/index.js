import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import QiPanGame from './qipan';
import BoilingVerdict from './boilingVerdict';
import WelcomeDialog from './slot';
import LifeParent from './life';

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

	forceUpdateFun() {
		this.forceUpdate();
	}

	render() {
		return (
			<div>
				<QiPanGame></QiPanGame>
				<BoilingVerdict></BoilingVerdict>
				<ThemeContext.Provider
					value={{ background: this.state.background }}>
					<WelcomeDialog setContext={this.setContext}></WelcomeDialog>
				</ThemeContext.Provider>
				<div onClick={this.forceUpdateFun.bind(this)}>点击强制更新</div>
				{/* <WelcomeDialog>
				{'若用这个则使用了ThemeContext默认值'}
				</WelcomeDialog> */}
				<LifeParent></LifeParent>
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
