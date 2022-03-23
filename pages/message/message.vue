<template>
	<view>
		<view class="title">message 页面</view>
		<!-- #ifdef H5 -->
		<view>只在h5展示</view>
		<!-- #endif -->
		<!-- #ifdef MP-WEIXIN -->
		<view>只在微信小程序展示</view>
		<!-- #endif -->
		<button type="primary" @click="chooseImg">上传图片</button>
		<image v-for="(item,index) in imgList" :src="item" @click="previewImg(item)"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgList: []
			}
		},
		onLoad() {
			// #ifdef H5
			console.log('只在h5打印')
			// #endif

			// #ifdef MP-WEIXIN
			console.log('只在微信小程序打印')
			// #endif
		},
		methods: {
			chooseImg() {
				uni.chooseImage({
					count: 6, //默认9
					// sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					// sourceType: ['album'], //从相册选择
					success: res => {
						this.imgList = res.tempFilePaths
						console.log(res);
					}
				})
			},
			previewImg(current) {
				uni.previewImage({
					current: current,
					urls: this.imgList,
					loop: true, // App可用
					indicator: 'default' // App可用
					// longPressActions: {
					// 	itemList: ['发送给朋友', '保存图片', '收藏'],
					// 	success: function(data) {
					// 		console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
					// 	},
					// 	fail: function(err) {
					// 		console.log(err.errMsg);
					// 	}
					// }
				});
			}
		}
	}
</script>

<style>
	.title {
		/* #ifdef H5 */
		color: red;
		/* #endif */
		/* #ifdef MP-WEIXIN */
		color: green;
		/* #endif */
	}
</style>
