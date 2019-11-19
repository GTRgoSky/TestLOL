import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import QiPanGame from './qipan';
import BoilingVerdict from './boilingVerdict';
import WelcomeDialog from './slot';

import { ThemeContext } from '../context/theme-context';

class Index extends React.Component {
	render() {
		return (
			<div>
				<QiPanGame></QiPanGame>
				<BoilingVerdict></BoilingVerdict>
				<ThemeContext.Provider value='dark'>
					<WelcomeDialog></WelcomeDialog>
				</ThemeContext.Provider>
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
