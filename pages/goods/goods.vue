<template>
	<view class="goodsBox">
		<goods-list :goods="goods" @goodsItemClick="goGoodsDetail"></goods-list>
		<view class="isOver" v-if="visible">------我是有底线的------</view>
	</view>
</template>

<script>
	import GoodsList from '@/components/goods-list/goods-list.vue'
	export default {
		name: 'goods',
		components: { GoodsList },
		data() {
			return {
				goods: [],
				pageindex: 1,
				visible: false,
			}
		},
		onLoad() {
			this.getHotGoods()
		},
		// 下拉加载
		onReachBottom() {
			if (this.visible) return
			this.pageindex++
			this.getHotGoods()
		},
		// 上拉刷新
		onPullDownRefresh() {
			this.goods = []
			this.pageindex = 1
			this.visible = false
			this.getHotGoods('isPullDown')
		},
		methods: {
			// 获取推荐商品
			async getHotGoods(isPullDown) {
				const res = await this.$myRequest({ url: '/api/getgoods?pageindex=' + this.pageindex })
				if (isPullDown) { // 只有上拉刷新才执行
					setTimeout(() => {
						uni.stopPullDownRefresh()
					}, 1000)
				}
				this.goods = [...this.goods, ...res.data.message]
				if (res.data.message.length < 10) this.visible = true
			},
			goGoodsDetail(id) {
				uni.navigateTo({
					url: '/pages/goods-detail/goods-detail?id=' + id
				})
			}
		}
	}
</script>

<style lang="scss">
	.goodsBox {
		background-color: #EEEEEE;
		.isOver {
			width: 100%;
			height: 100rpx;
			line-height: 100rpx;
			text-align: center;
			color: #CCCCCC;
		}
	}
</style>
