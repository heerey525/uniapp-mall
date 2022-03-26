<template>
	<view class="member">
		<view class="userInfo" v-if="userInfo.nickName">
			<image :src="userInfo.avatarUrl"></image>
			<text>{{ userInfo.nickName }}</text>
		</view>
		<view class="userInfo" @click="login" v-else>
			<image src="../../static/icon/member.png"></image>
			<text>未登录</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: {}
			}
		},
		onShow() {
			const userInfo = uni.getStorageSync('userInfo')
			this.userInfo = userInfo
		},
		methods: {
			login() {
				// #ifndef H5 || MP-WEIXIN
				uni.getUserInfo({
					success(res) {
						console.log(res)
					}
				})
				// #endif
				// #ifdef MP-WEIXIN
				uni.getUserProfile({
					desc: '展示',
					success(res) {
						uni.setStorageSync('userInfo', res.userInfo)
					}
				})
				// #endif
			}
		}
	}
</script>

<style lang="scss">
	.member {
		.userInfo {
			height: 100rpx;
			// background-color: red;
			padding: 20rpx 40rpx;
			line-height: 100rpx;
			display: flex;
			border-bottom: 2rpx solid #CCCCCC;
			
			
			image {
				height: 100rpx;
				width: 100rpx;
				margin-right: 60rpx;
				display: block;
				border-radius: 50%;
				border: 2rpx solid #CCCCCC;
			}
		}
	}
</style>
