<template>
	<view>
		<view>message 页面</view>
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
</style>
