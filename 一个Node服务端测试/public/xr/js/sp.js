// 首屏加载

document.getElementById('Js').innerHTML = '我是Js返回的文案';

/*注释：
    当我们把JS放在底部，不会影响首屏加载时间,而放在顶部，浏览器会在加载完JS后进行首次Paint
*/