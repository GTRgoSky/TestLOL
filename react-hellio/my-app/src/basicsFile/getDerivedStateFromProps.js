import React from 'react';

// getDerivedStateFromProps 的存在只有一个目的：让组件在 props 变化时更新 state
/**
 * getDerivedStateFromProps 会在调用 render 方法之前调用，
 * 并且在初始挂载及后续更新时都会被调用。它应返回一个对象来更新 state，
 * 如果返回 null 则不更新任何内容。
 *
 * getSnapshotBeforeUpdate() 在最近一次渲染输出（提交到 DOM 节点）之前调用。
 * 它使得组件能在发生更改之前从 DOM 中捕获一些信息（例如，滚动位置）。
 * 此生命周期的任何返回值将作为参数传递给 componentDidUpdate()。
 */
class ExampleComponent extends React.Component {
	state = {
		hehe: 12
	};

	static getDerivedStateFromProps(props, state) {
		// 更新了state的值
		// Store prevId in state so we can compare when props change.
		// Clear out previously-loaded data (so we don't render stale stuff).
		console.log(state, props);
		if (props.id !== state.prevId) {
			return {
				externalData: null,
				prevId: props.id
			};
		}

		// No state update necessary
		return null;
	}

	constructor(props) {
		super(props);
		// 在此设置则上面的无效
		this.state = {
			externalData: null
		};
	}

	componentDidMount() {
		this._loadAsyncData(this.props.id);
	}

	getSnapshotBeforeUpdate(prevProps, prevState) {
		// 我们是否在 list 中添加新的 items ？
		// 捕获滚动​​位置以便我们稍后调整滚动位置。

		// if (prevProps.list.length < this.props.list.length) {
		// 	const list = this.listRef.current;
		// 	return list.scrollHeight - list.scrollTop;
		// }
		return null;
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.state.externalData === null) {
			this._loadAsyncData(this.props.id);
		}
	}

	componentWillUnmount() {
		if (this._asyncRequest) {
			this._asyncRequest.cancel();
		}
	}

	render() {
		if (this.state.externalData === null) {
			// Render loading state ...
			return <p>getDerivedStateFromProps - null</p>;
		} else {
			// Render real UI ...
			return <p>getDerivedStateFromProps - UNnull</p>;
		}
	}

	_loadAsyncData(id) {
		this._asyncRequest = setTimeout(() => {
			let externalData = { a: 1 };
			this._asyncRequest = null;
			this.setState({ externalData });
		}, 300);
	}
}

//getSnapshotBeforeUpdate 当我们解决异步更新视图的情况下使用。使用案例如下
/**
 * In the above example, componentWillUpdate is used to read the DOM property. However with async rendering, there may be delays between “render” phase lifecycles (like componentWillUpdate and render) and “commit” phase lifecycles (like componentDidUpdate). If the user does something like resize the window during this time, the scrollHeight value read from componentWillUpdate will be stale.

    The solution to this problem is to use the new “commit” phase lifecycle, getSnapshotBeforeUpdate. This method gets called immediately before mutations are made (e.g. before the DOM is updated). It can return a value for React to pass as a parameter to componentDidUpdate, which gets called immediately after mutations.

    The two lifecycles can be used together like this:
 */
// eslint-disable-next-line
class ScrollingList extends React.Component {
	listRef = null;

	getSnapshotBeforeUpdate(prevProps, prevState) {
		// Are we adding new items to the list?
		// Capture the scroll position so we can adjust scroll later.
		if (prevProps.list.length < this.props.list.length) {
			return this.listRef.scrollHeight - this.listRef.scrollTop;
		}
		return null;
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		// If we have a snapshot value, we've just added new items.
		// Adjust scroll so these new items don't push the old ones out of view.
		// (snapshot here is the value returned from getSnapshotBeforeUpdate)
		if (snapshot !== null) {
			this.listRef.scrollTop = this.listRef.scrollHeight - snapshot;
		}
	}

	render() {
		return <div ref={this.setListRef}>{/* ...contents... */}</div>;
	}

	setListRef = ref => {
		this.listRef = ref;
	};
}

export { ExampleComponent };

// Error boundaries
/**
 * Error boundaries 是 React 组件，它会在其子组件树中的任何位置捕获 JavaScript 错误，
 * 并记录这些错误，展示降级 UI 而不是崩溃的组件树。Error boundaries 组件会捕获在渲染期间，
 * 在生命周期方法以及其整个树的构造函数中发生的错误。
 * 如果 class 组件定义了生命周期方法 static getDerivedStateFromError() 或
 * componentDidCatch() 中的任何一个（或两者），它就成为了 Error boundaries。
 * 通过生命周期更新 state 可让组件捕获树中未处理的 JavaScript 错误并展示降级 UI。
 */

// static getDerivedStateFromError(error)
/**
 * 此生命周期会在后代组件抛出错误后被调用。 它将抛出的错误作为参数，并返回一个值以更新 state
 */

// componentDidCatch()
/**
 * 此生命周期在后代组件抛出错误后被调用。 它接收两个参数：
    error —— 抛出的错误。
    info —— 带有 componentStack key 的对象，其中包含有关组件引发错误的栈信息
    ---
    componentDidCatch() 会在“提交”阶段被调用，因此允许执行副作用。 它应该用于记录错误之类的情况：
 */

// eslint-disable-next-line
class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error) {
		// 更新 state 使下一次渲染可以显降级 UI
		return { hasError: true };
	}

	componentDidCatch(error, info) {
		// info.componentStack -->
		// "组件堆栈" 例子:
		//   in ComponentThatThrows (created by App)
		//   in ErrorBoundary (created by App)
		//   in div (created by App)
		//   in App
	}
	render() {
		if (this.state.hasError) {
			// 你可以渲染任何自定义的降级  UI
			return <h1>Something went wrong.</h1>;
		}

		return this.props.children;
	}
}
