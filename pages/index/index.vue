<template>
	<view class="home">
		<swiper class="swiper" indicator-dots circular>
			<swiper-item v-for="item in swipers">
				<image :src="item.img"></image>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swipers: []
			}
		},
		onLoad() {
			this.getSwipers()
		},
		methods: {
			// 获取轮播图
			async getSwipers() {
				const res = await this.$myRequest({
					url: '/api/getlunbo',
				})
				this.swipers = res.data.message
			}
		}
	}
</script>

<style lang="scss">
	.swiper {
		width: 750rpx;
		height: 380rpx;

		image {
			width: 100%;
			height: 100%;
		}
	}
</style>
