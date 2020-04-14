<template>
  <div class="analysis-statistics-parent">
	  <div class="analysis-sp-top">
		  <canvas id="myCanvas" width="400" height="200"></canvas>
		  <echart id="hahah" :options="option"></echart>
	  </div>
  </div>
</template>

<script>
import echart from '../../components/echarts/Echarts';
export default {
	components: {
		echart
	},
	data() {
		return {
			ctx: null,
			angleList: [],
			scopeList: [],
			r: 64,
			R: 64,
			line: 18,
			option: {
				series: [
					{
						name: '访问来源',
						type: 'pie',
						radius: ['50%', '70%'],
						avoidLabelOverlap: false,
						label: {
							show: false,
							position: 'center'
						},
						emphasis: {
							label: {
								show: true,
								fontSize: '30',
								fontWeight: 'bold'
							}
						},
						labelLine: {
							show: false
						},
						data: [
						{value: 335, name: '直接访问'},
						{value: 310, name: '邮件营销'},
						{value: 234, name: '联盟广告'},
						{value: 135, name: '视频广告'},
						{value: 1548, name: '搜索引擎'}
						]
					}
				]
			}
		};
	},
	mounted() {
		this.r -= this.line / 2;
		this.R += this.line / 2;
		this.initCanvas();
	},
	methods: {
		initCanvas() {
			var canvas = document.getElementById('myCanvas');
			if (canvas.getContext) {
				var ctx = this.ctx = canvas.getContext('2d');
			};
			//解决毛边
			canvas.width = 400;
			canvas.height = 200;
			// 画图
			ctx.beginPath(); 
			// 原点x, 原点y, 半径, 角度起始, 角度中止, 逆时针画（true）还是顺时针画（false）。
			ctx.arc(200, 100, 64, 0, Math.PI * 2 * 0.4, false); 
			ctx.lineWidth = 18; 
			ctx.strokeStyle = 'red'; 
			ctx.stroke();
			this.angleList.push(Math.PI * 2 * 0.4 - 0);

			ctx.beginPath(); 
			ctx.arc(200, 100, 64, Math.PI * 2 * 0.4, Math.PI * 2, false); 
			ctx.lineWidth = 18; 
			ctx.strokeStyle = 'blue'; 
			ctx.stroke();
			this.angleList.push(Math.PI * 2 - Math.PI * 2 * 0.4);

			//画中心文字
			//计算中心角度
			
			// 设置字体
			ctx.font = '12px 微软雅黑'; 
			//设置文字基线
			ctx.textBaseline = 'bottom';
			// 设置对齐方式
			ctx.textAlign = 'center';
			// 设置填充颜色
			ctx.fillStyle = '#000'; 
			// 设置字体内容，以及在画布上的位置
			// width = 200 (宽度/2)； height = 100 (高度/2)；
			ctx.fillText('圈层围闭度', 200, 100);
			ctx.textBaseline = 'top'; 
			ctx.fillText('28%', 200, 100);

			this.createAreaPoint();
			//创建hover
			this.createHover();
		},
		createHover() {
			// 创建hover效果
			let self = this;
			var ctx = this.ctx;
			ctx.canvas.addEventListener('mousemove', (e) => {
				self.scopeList.find((el, idx) => {
					if(el.call(self, e.offsetX - 200, e.offsetY - 100)) {
						console.log(idx);
						ctx.beginPath(); 
						ctx.arc(200, 100, 64, Math.PI * 2 * 0.4, Math.PI * 2, false); 
						ctx.lineWidth = 18; 
						ctx.strokeStyle = 'green'; 
						ctx.stroke();
					}
				});
			});
			// ctx.canvas.addEventListener('mouseenter', self.debounce((e) => {
			// 	console.log(e);
			// 	if(!self.createAreaPoint(e.offsetX - 200, e.offsetY - 100)) return;
			// 	ctx.beginPath(); 
			// 	ctx.arc(200, 100, 64, Math.PI * 2 * 0.4, Math.PI * 2, false); 
			// 	ctx.lineWidth = 18; 
			// 	ctx.strokeStyle = 'green'; 
			// 	ctx.stroke();
			// }, 1000));
			ctx.canvas.addEventListener('mouseleave', self.debounce((e) => {
				console.log(e);
				ctx.beginPath(); 
				ctx.arc(200, 100, 64, Math.PI * 2 * 0.4, Math.PI * 2, false); 
				ctx.lineWidth = 18; 
				ctx.strokeStyle = 'blue'; 
				ctx.stroke();
			}, 1000));
		},
		//创建一个节流
		debounce (func, wait) {
			let timeout;
			return function () {
				let context = this;
				let args = arguments;

				if (timeout) clearTimeout(timeout);
        
				timeout = setTimeout(() => {
					func.apply(context, args);
				}, wait);
			};
		},
		//创建角度计算器 -- 用于计算面积点位的交互
		createAreaPoint() {
			let MathPi = this.MathPi;
			let dx = function(x, y) {
				let pow = Math.pow(x, 2) + Math.pow(y, 2);
				return pow > Math.pow(this.r, 2) && pow < Math.pow(this.R, 2);
			}.bind(this);
			this.scopeList = this.angleList.map(el => {
				if(el < MathPi(90)) {
					return function(x, y) {
						console.log(x, y);
						return y < 0 && y > x * Math.tan(el) && dx(x, y);
					};
				}else if(MathPi(90) <= el < MathPi(180)) {
					return function(x, y) {
						console.log(x, y);
						return y < 0 && y < x * Math.tan(MathPi(180) - (el)) && dx(x, y);
					};
				}else if(MathPi(180) <= el < MathPi(270)) {
					return function(x, y) {
						console.log(x, y);
						return (y < 0 && dx(x, y)) || (y > 0 && y > x * Math.tan(MathPi(180) - (el)) && dx(x, y));
					};
				}else {
					return function(x, y) {
						console.log(x, y);
						return dx(x, y) && !(y > 0 && y < (x * Math.tan(MathPi(360) - (el))));
					};
				}
			});
		},
		// Math p是度数
		MathPi(p) {
			// 360° * 百分比
			return Math.PI * 2 * (p / 360);
		}
	}
};
</script>

<style>

</style>