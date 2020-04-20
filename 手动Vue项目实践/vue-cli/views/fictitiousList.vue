<template>
	<div class="fictitious-list" @scroll="viewScroll" @click="viewClick">
		<div
			class="viewpoint-parent"
			:style="{ height: contentHeight }"
			v-if="true"
		>
			<div ref="content" class="viewpoint-cont">
				<div v-for="(item, index) in dataListUse" :key="index">
					{{ item.value }}
				</div>
			</div>
		</div>
		<div
			class="viewpoint-parent"
			:style="{ height: contentHeightT + 'px' }"
			v-else
		>
			<div ref="content" class="viewpoint-cont">
				<div v-for="(item, index) in dataListUse" :key="index">
					{{ item.value }}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		let data = [];
		for (let i = 0; i < 10000; i++) {
			data.push({ value: i });
		}
		return {
			dataList: data,
			dataListUse: [],
			itemHeight: 30,
			saveIndex: 0,
			contentHeightT: 0,
		};
	},
	mounted() {
		// 计算可是区域
		this.calculateVisibleData();
	},
	computed: {
		contentHeight() {
			// 整体内容的高度
			return this.dataList.length * this.itemHeight + 'px';
		},
	},
	methods: {
		viewScroll() {
			let scrollTop = this.$el.scrollTop;
			console.log(scrollTop);
			this.calculateVisibleData(scrollTop);
		},
		viewClick() {
			console.log(this.$el.clientHeight);
		},
		calculateVisibleData(scrollTop = 0) {
			// 根据偏移量，计算可见数据
			const visbleCount = Math.ceil(
				this.$el.clientHeight / this.itemHeight
			);
			// 开始的索引
			const start = Math.floor(scrollTop / this.itemHeight);
			const end = start + visbleCount;
			this.dataListUse = this.dataList.slice(start, end);
			this.$refs.content.style.webkitTransform = `translate3d(0,${
				start * this.itemHeight
			}px,0)`;
		},
		//scrollTop为滚动条在Y轴上的滚动距离。

		// clientHeight为内容可视区域的高度。

		// scrollHeight为内容可视区域的高度加上溢出（滚动）的距离。

		// viewScroll() {
		// 	let scrollTop = this.$el.scrollTop;
		// 	console.log(
		// 		this.$el.clientHeight,
		// 		this.$refs.content.scrollHeight,
		// 		scrollTop,
		// 		this.saveIndex
		// 	);
		// 	if (
		// 		this.$el.clientHeight * (1 + this.saveIndex) + scrollTop >
		// 		this.$refs.content.scrollHeight * (1 + this.saveIndex) + 30
		// 	) {
		// 		this.$refs.content.style.webkitTransform = `translate3d(0,${
		// 			this.$refs.content.scrollHeight * (1 + this.saveIndex) +
		// 			30 -
		// 			this.$el.clientHeight * (1 + this.saveIndex)
		// 		}px,0)`;
		// 		this.saveIndex++;
		// 		this.calculateVisibleData(1);
		// 		console.log('here');
		// 	} else if (
		// 		this.$el.clientHeight * this.saveIndex + scrollTop <
		// 		this.$refs.content.scrollHeight * this.saveIndex
		// 	) {
		// 		//其实是移动了scrollTop但是不准所以用等式替换
		// 		this.saveIndex--;
		// 		this.calculateVisibleData(2);
		// 		this.$refs.content.style.webkitTransform = `translate3d(0,${
		// 			this.$refs.content.scrollHeight * this.saveIndex -
		// 			this.$el.clientHeight * this.saveIndex
		// 		}px,0)`;

		// 		console.log('there');
		// 	}
		// },
		// viewClick() {
		// 	console.log(this.$el.clientHeight);
		// },
		// calculateVisibleData(t) {
		// 	this.dataListUse = [];
		// 	this.dataListUse.push(
		// 		...this.dataList.slice(
		// 			this.saveIndex * 100,
		// 			(this.saveIndex + 1) * 100
		// 		)
		// 	);
		// 	this.$nextTick(() => {
		// 		this.contentHeightT = this.$refs.content.scrollHeight * 100;
		// 	});
		// },
	},
};
</script>

<style lang="less" scoped>
.fictitious-list {
	height: 500px;
	overflow-y: scroll;
	&::-webkit-scrollbar {
	}
}
</style>
