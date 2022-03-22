<template>
	<view>
		<view>样式学习</view>
		<view class="box">
			<view class="contentBox">
				<text>白色</text>
			</view>
		</view>
		<view class="iconfont icon-tupian"></view>
	</view>
</template>

<script>
</script>

<style lang="scss">
	@import './uni-style.css';
	.box {
		width: 750rpx;
		height: 300rpx;
		background-color: #007AFF;
	}
	.contentBox {
		width: 375rpx;
		height: 200rpx;
		background-color: #333333;
		text {
			color: $global-color;
		}
	}
</style>
