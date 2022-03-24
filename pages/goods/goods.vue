<template>
	<view class="goodsBox">
		<goods-list :goods="goods"></goods-list>
	</view>
</template>

<script>
	import GoodsList from '@/components/goods-list/goods-list.vue'
	export default {
		name: 'goods',
		components: { GoodsList },
		data() {
			return { goods: [], pageindex: 1, }
		},
		onLoad() {
			this.getHotGoods()
		},
		methods: {
			// 获取推荐商品
			async getHotGoods() {
				const res = await this.$myRequest({ url: '/api/getgoods?pageindex=' + this.pageindex })
				console.log('获取推荐商品', res)
				this.goods = res.data.message
			}
		}
	}
</script>

<style>
	.goodsBox {
		background-color: #EEEEEE;
	}
</style>
