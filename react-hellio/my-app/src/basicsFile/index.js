import React from 'react';
import ReactDOM from 'react-dom';
import { ExampleComponent } from './getDerivedStateFromProps';
import Parent from './paisheng';

// React.Component
class Greeting extends React.Component {
	render() {
		return (
			<div>
				<h1>Hello, {this.props.name}</h1>
				<ChildrenTest>
					<p>hahahahahahaha{this.props.name}</p>
					<span>hehehehehehe{this.props.name}</span>
				</ChildrenTest>
			</div>
		);
	}
}

//React.PureComponent -- ;
/**
 * shouldComponentUpdate();如果返回true则执行render，若返回false则复用最近的一次更新
 */

//React.memo
/**
 * 如果你的函数组件在给定相同 props 的情况下渲染相同的结果，
 * 那么你可以通过将其包装在 React.memo 中调用，
 * 以此通过记忆组件渲染结果的方式来提高组件的性能表现。
 * 这意味着在这种情况下，React 将跳过渲染组件的操作并直接复用最近一次渲染的结果。
 */
const MyComponent = React.memo(function MyComponent(props) {
	/* 使用 props 渲染 */
});

// eslint-disable-next-line
function MyComponents(props) {
	/* 使用 props 渲染 */
}
function areEqual(prevProps, nextProps) {
	/*
    如果把 nextProps 传入 render 方法的返回结果与
    将 prevProps 传入 render 方法的返回结果一致则返回 true，
    否则返回 false
    */
}
React.memo(MyComponent, areEqual);

//createElement()
//* React.createElement(type, [props], [...children]);

// cloneElement
/**
 * 以 element 元素为样板克隆并返回新的 React 元素。
 * 返回元素的 props 是将新的 props 与原始元素的 props 浅层合并后的结果。
 * 新的子元素将取代现有的子元素，而来自原始元素的 key 和 ref 将被保留。
 */
/**
 * React.cloneElement(
 *  element：必须是一个存在的React组件或者原生DOM,
 *  [props：配置当前element的props],
 *  [...children]);
 */
// 见 ChildrenTest 里面的方法 --

class TestcloneElement extends React.Component {
	render() {
		console.log('TestcloneElement:', this.props);
		return <strong>666 </strong>;
	}
}

//isValidElement() -> 验证对象是否为 React 元素，返回值为 true 或 false。
console.log('isValidElement:', React.isValidElement(<Greeting></Greeting>));

//React.Children
/**
 * React.Children 提供了用于处理 this.props.children 不透明数据结构的实用方法。
 */
class ChildrenTest extends React.Component {
	render() {
		let children = this.props.children;
		console.log(children); // 一个child是对象;两个是数组
		let arr = React.Children.map(children, (c, i) => {
			console.log(c, '|', i);
			if (i === 1) {
				return React.cloneElement(c, { name: 'CloneElementName' + i });
			} else {
				return React.cloneElement(
					c,
					{ name: 'CloneElementName' + i },
					<TestcloneElement></TestcloneElement>
				);
			}
		});
		console.log(arr);
		let num = React.Children.count(children);
		console.log(num);
		return (
			<div>
				<section>{this.props.children}</section>
				{arr.map(E => {
					console.log(E);
					return (
						<p key={E.props.name}>
							{E.props.children} + {E.props.name}
						</p>
					);
				})}
			</div>
		);
	}
}

//React.Fragment
/**
 * React.Fragment 组件能够在不额外创建 DOM 元素的情况下，让 render() 方法中返回多个元素
 * <></> 也可以
 */

//React.createRef(); 创建一个能够通过 ref 属性附加到 React 元素的 ref。

// React.forwardRef(); 转发ref，详见refs.js模块

// React.lazy();
/**
 * 允许你定义一个动态加载的组件。这有助于缩减 bundle 的体积，并延迟加载在初次渲染时未用到的组件。
 * // 这个组件是动态加载的
    const SomeComponent = React.lazy(() => import('./SomeComponent'));
 */

//React.Suspense
/**
 * 可以指定加载指示器（loading indicator），以防其组件树中的某些子组件尚未具备渲染条件
 * 目前，懒加载组件是 <React.Suspense> 支持的唯一用例
 * // 该组件是动态加载的
    const OtherComponent = React.lazy(() => import('./OtherComponent'));

    function MyComponent() {
    return (
        // 显示 <Spinner> 组件直至 OtherComponent 加载完成
        <React.Suspense fallback={<Spinner />}>
        <div>
            <OtherComponent />
        </div>
        </React.Suspense>
    );
    }
 */

class CommonParent extends React.Component {
	render() {
		return (
			<>
				<Greeting></Greeting>
				<h4>----分割线(getDerivedStateFromProps测试)----</h4>
				<ExampleComponent></ExampleComponent>
				<h4>----父子见的关系实践----</h4>
				<Parent></Parent>
			</>
		);
	}
}

ReactDOM.render(<CommonParent />, document.getElementById('root'));
