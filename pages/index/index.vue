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
				background-color: #B50E03;
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
</style>
