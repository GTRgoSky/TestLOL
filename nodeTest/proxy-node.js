var proxy = require('http-proxy-middleware').createProxyMiddleware;
const express = require('express');
var app = express();

var options = {
	target: '', // 目标主机 （配置后台请求地址）
	changeOrigin: true, // 需要虚拟主机站点
	onProxyRes: onProxyRes,
	onProxyReq: onProxyReq,
};
var exampleProxy = proxy(options); //开启代理功能，并加载配置

function onProxyRes(proxyRes, req, res) {
	// proxyRes.headers['x-added'] = 'foobar';     // add new header to response
	// delete proxyRes.headers['x-removed'];       // remove header from response
	// console.log(proxyRes, req, res)
	// proxyRes.headers['cache-control'] = 'public, max-age=31536000';
}

function onProxyReq(proxyReq, req, res) {
	// add custom header to request
	// proxyReq.setHeader('cache-control', 'public, max-age=31536000');
	// or log the req
	// console.log(proxyReq, req, res)
}

app.use('/', exampleProxy); //对地址为’/‘的请求全部转发

var server = app.listen(8081, () => {
	// 设置本地端口号：请求时写成localhost:8081即可
	var host = server.address().address;
	var port = server.address().port;
	console.log('server start at ' + host + ':' + port);
});

//
