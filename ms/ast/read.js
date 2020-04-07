//https://segmentfault.com/a/1190000016231512?utm_source=tag-newest
const recast = require('recast');
const TNT = recast.types.namedTypes;

/**
 * node read可以读取demo.js文件，并将demo.js内容转化为ast对象。
 * 同时它还提供了一个printSource函数，随时可以将ast的内容转换回源码，以方便调试。
 */
recast.run(function(ast, printSource) {
	// recast.parse(ast);
	const asts = recast.parse(printSource(ast));
	const add = asts.program.body[0];
	console.log(add);
});

/**
 * recast.visit将AST对象内的节点进行逐个遍历。
 */
// recast.run(function(ast, printSource) {
// 	recast.visit(ast, {
// 		visitExpressionStatement: function({ node }) {
// 			console.log(node);
// 			return false;
// 		}
// 	});
// });

/**
 * 想操作函数声明，就使用visitFunctionDelaration遍历，
 * 想操作赋值表达式，就使用visitExpressionStatement。
 * 只要在 AST对象文档中定义的对象，在前面加visit，即可遍历
 *
 * 通过node可以取到AST对象
 *
 * 每个遍历函数后必须加上return false，或者选择以下写法，否则报错
 *
 * 调试时，如果你想输出AST对象，可以console.log(node)
 * 如果你想输出AST对象对应的源码，可以printSource(node)
 */
// recast.run(function(ast, printSource) {
// 	recast.visit(ast, {
// 		visitExpressionStatement: function(path) {
// 			const node = path.node;
// 			printSource(node);
// 			this.traverse(path);
// 		}
// 	});
// });

/**
 * TNT: 用来判断AST对象是否为指定的类型
 * TNT.(AST对象).assert() ->类型不匹配->报错退出
 * TNT.(AST对象).check()，则可以判断类型是否一致，并输出False和True
 */

// recast.run(function(ast, printSource) {
// 	recast.visit(ast, {
// 		visitExpressionStatement: function(path) {
// 			const node = path.value;
// 			// 判断是否为ExpressionStatement，正确则输出一行字。
// 			if (TNT.ExpressionStatement.check(node)) {
// 				console.log('这是一个ExpressionStatement');
// 			}
// 			this.traverse(path);
// 		}
// 	});
// });

// recast.run(function(ast, printSource) {
// 	recast.visit(ast, {
// 		visitExpressionStatement: function(path) {
// 			const node = path.node;
// 			// 判断是否为ExpressionStatement，正确不输出，错误则全局报错
// 			TNT.ExpressionStatement.assert(node);
// 			this.traverse(path);
// 		}
// 	});
// });
