import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

function Example() {
	// 声明一个叫 “count” 的 state 变量。
	const [count, setCount] = useState(0);

	useEffect(() => {
		console.log(count, 2);
	});

	console.log(count, 1); // 每次更新都会执行(先于 - useEffect)

	return (
		<div>
			<p>You clicked {count} times</p>
			<button onClick={() => setCount(count + 1)}>Click me</button>
		</div>
	);
}

ReactDOM.render(<Example />, document.getElementById('root'));
