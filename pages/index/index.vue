<template>
	<view class="home">
		<!-- 轮播图区域 -->
		<swiper class="swiper" indicator-dots circular>
			<swiper-item v-for="item in swipers">
				<image :src="item.img"></image>
			</swiper-item>
		</swiper>
		<!-- 导航区域 -->
		<view class="nav">
			<view class="nav_item" v-for="item in navs">
				<view :class="['iconfont', item.icon]"></view>
				<text>{{ item.name }}</text>
			</view>
		</view>
		<!-- 推荐商品 -->
		<view class="hots_goods">
			<view class="title">推荐商品</view>
			<view class="goods_list">
				<view class="goods_item" v-for="item in goods">
					<image :src="item.imgUrl"></image>
					<view class="price">
						<text>￥{{ item.price }}</text>
						<text>￥{{ item.beforePrice }}</text>
					</view>
					<view class="name">{{ item.name }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swipers: [],
				navs: [
					{ name: 'uniapp超市', icon: 'icon-ziyuan' },
					{ name: '联系我们', icon: 'icon-guanyuwomen' },
					{ name: '社区图片', icon: 'icon-tupian' },
					{ name: '学习视频', icon: 'icon-shipin' },
				],
				goods: [
					{ name: '华为（HUAWEI）荣耀6Plus 16G双4G版', price: 2199, beforePrice: 2499, imgUrl: require('@/static/icon/home-active.png') },
					{ name: '华为（HUAWEI）荣耀6Plus 16G双4G版', price: 2199, beforePrice: 2499, imgUrl: require('@/static/icon/home-active.png') },
					{ name: '华为（HUAWEI）荣耀6Plus 16G双4G版', price: 2199, beforePrice: 2499, imgUrl: require('@/static/icon/home-active.png') },
					{ name: '华为（HUAWEI）荣耀6Plus 16G双4G版', price: 2199, beforePrice: 2499, imgUrl: require('@/static/icon/home-active.png') },
					{ name: '华为（HUAWEI）荣耀6Plus 16G双4G版', price: 2199, beforePrice: 2499, imgUrl: require('@/static/icon/home-active.png') },
				]
			}
		},
		onLoad() {
			this.getSwipers()
		},
		methods: {
			// 获取轮播图
			async getSwipers() {
				const res = await this.$myRequest({ url: '/api/getlunbo', })
				this.swipers = res.data.message
			}
		}
	}
</script>

<style lang="scss">
	@import '@/static/font/iconfont.css';
	.home {
		.swiper {
			width: 750rpx;
			height: 380rpx;
		
			image {
				width: 100%;
				height: 100%;
			}
		}
		.nav {
			display: flex;
			.nav_item {
				width: 25%;
				text-align: center;
				.iconfont {
					width: 120rpx;
					height: 120rpx;
					background-color: $mall-color-primary;
					border-radius: 50%;
					margin: 10rpx auto;
					line-height: 120rpx;
					color: #FFFFFF;
					font-size: 50rpx;
				}
				.icon-tupian {
					font-size: 45rpx;
				}
				text {
					font-size: 30rpx;
				}
			}
		}
		.hots_goods {
			background-color: #EEEEEE;
			margin-top: 20rpx;
			overflow: hidden;
			.title {
				height: 100rpx;
				line-height: 100rpx;
				color: $mall-color-primary;
				text-align: center;
				letter-spacing: 30rpx;
				text-indent: 30rpx;
				background-color: #FFFFFF;
				margin: 7rpx 0;
			}
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
		}
	}
</style>
