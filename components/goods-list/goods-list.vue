<template>
	<view class="goods_list">
		<view class="goods_item" v-for="item in goods" :key="item.id" @click="navigator(item.id)">
			<image :src="item.img_url"></image>
			<view class="price">
				<text>￥{{ item.sell_price }}</text>
				<text>￥{{ item.market_price }}</text>
			</view>
			<view class="name">{{ item.title }}</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'goods-list',
		props: {
			goods: {
				type: Array,
				default: () => {
					return []
				}
			}
		},
		methods: {
			navigator(id) {
				this.$emit('goodsItemClick', id)
			}
		}
	}
</script>

<style lang="scss">
	.goods_list {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		padding: 0 15rpx;
		.goods_item {
			background-color: #FFFFFF;
			width: 355rpx;
			margin: 10rpx 0;
			padding: 15rpx;
			box-sizing: border-box;
			image {
				width: 80%;
				height: 300rpx;
				display: block;
				margin: 0 auto;
			}
			.price {
				color: $mall-color-primary;
				font-size: 36rpx;
				margin: 20rpx 0 10rpx 0;
				text:nth-child(2) {
					color: #CCCCCC;
					font-size: 28rpx;
					margin-left: 15rpx;
					text-decoration: line-through;
				}
			}
			.name {
				font-size: 28rpx;
				line-height: 50rpx;
				padding-bottom: 15rpx;
				margin-top: 10rpx;
			}
		}
	}
</style>
