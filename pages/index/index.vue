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
			<navigator class="nav_item" v-for="item in navs" :key="item.icon" :url="item.path">
				<view :class="['iconfont', item.icon]"></view>
				<text>{{ item.name }}</text>
			</navigator>
		</view>
		<!-- 推荐商品 -->
		<view class="hots_goods">
			<view class="title">推荐商品</view>
			<goods-list :goods="goods"></goods-list>
		</view>
	</view>
</template>

<script>
	import GoodsList from '@/components/goods-list/goods-list.vue'
	export default {
		components: { GoodsList },
		data() {
			return {
				swipers: [],
				navs: [
					{ name: 'uniapp超市', icon: 'icon-ziyuan', path: '/pages/goods/goods' },
					{ name: '联系我们', icon: 'icon-guanyuwomen', path: '/pages/contact/contact' },
					{ name: '社区图片', icon: 'icon-tupian', path: '/pages/pics/pics' },
					{ name: '学习视频', icon: 'icon-shipin', path: '/pages/videos/videos' },
				],
				goods: [
					{ title: '华为（HUAWEI）荣耀6Plus 16G双4G版', sell_price: 2199, market_price: 2499, img_url: require('@/static/icon/home-active.png') },
				],
				pageindex: 1
			}
		},
		onLoad() {
			this.getSwipers()
			this.getHotGoods()
		},
		methods: {
			// 获取轮播图
			async getSwipers() {
				const res = await this.$myRequest({ url: '/api/getlunbo', })
				this.swipers = res.data.message
			},
			// 获取推荐商品
			async getHotGoods() {
				const res = await this.$myRequest({ url: '/api/getgoods?pageindex=' + this.pageindex })
				console.log('获取推荐商品', res)
				this.goods = res.data.message
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
		}
	}
</style>
