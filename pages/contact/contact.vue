<template>
	<view class="contact">
		<image class="img" src="http://www.itcast.cn/2018czydz/images/gywmban.jpg"></image>
		<view class="info">
			<view>联系电话：<text @click="phoneCall">114</text>（点击拨打）</view>
			<view>地址：杭州市上城区五星路181号 CBD公园</view>
		</view>
		<map class="map" :latitude="latitude" scale="13" :longitude="longitude" :markers="covers"></map>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				latitude: 30.238376,
				longitude: 120.21272,
				covers: [{
					latitude: 30.238376,
					longitude: 120.21272,
					iconPath: '../../static/location.png',
					width: 30,
					height: 30
				}]
			}
		},
		methods: {
			phoneCall() {
				uni.makePhoneCall({ phoneNumber: '114' })
			}
		}
	}
</script>

<style lang="scss">
	.contact {
		.img {
			width: 100%;
			height: 320rpx;
		}

		.info {
			padding: 10rpx 20rpx;
			font-size: 30rpx;

			view {
				line-height: 80rpx;
				border-bottom: 2rpx solid #EEEEEE;
			}
		}

		.map {
			width: 100%;
			height: 750rpx;
		}
	}
</style>
