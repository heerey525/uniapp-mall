<template>
	<view>
		<!-- <view>
			<text>普通text文本</text>
		</view>
		<view>
			<text selectable>长按可选中</text>
		</view>
		<view>
			<text selectable space="emsp">中文字符空格 一半大小</text>
		</view>
		<view>
			<text selectable space="emsp">中文字符空格 大小</text>
		</view>
		<view>
			<text selectable space="nbsp" style="font-size: 20px;">根据字体设置的空格 大小</text>
		</view>
		<view>
			<text>decode可解码&amp;</text>
		</view> -->
		<!-- <view class="box" hover-class="boxHover">
			<view>view相当于html中div</view>
			<view class="viewClass" hover-class="viewClassHover">view点击效果</view>
			<view class="viewClass1" hover-class="viewClassHover1" hover-stop-propagation>view点击效果阻止冒泡</view>
			<view
				class="viewClass2"
				hover-class="viewClassHover2"
				hover-stop-propagation
				hover-start-time="1000"
				hover-stay-time="2000"
			>view按住后1s出现点击态,手指松开后2s点击态保留时间</view>
		</view> -->
		<!-- <button size="mini" disabled>禁用小按钮</button>
		<button type="primary" plain>镂空蓝色按钮</button>
		<button type="primary" loading>蓝色按钮</button> -->
		<image src="../../static/logo.png" mode=""></image>
		<image src="../../static/logo.png" mode="aspectFit"></image>
		<image src="../../static/logo.png" mode="aspectFill"></image>
	</view>
</template>

<script>
	export default {
		onLoad(options) {
			console.log('接受参数', options)
		}
	}
</script>

<style>
	.box {
		width: 400px;
		height:450px;
		background-color: #CCCCCC;
	}
	.boxHover {
		background-color: #4CD964;
	}
	.viewClass {
		width: 100px;
		height: 100px;
		background-color: #007AFF;
	}
	.viewClassHover {
		background-color: red;
	}
	.viewClass1 {
		width: 100px;
		height: 100px;
		background-color: #F0AD4E;
	}
	.viewClassHover1 {
		background-color: #8F8F94;
	}
	.viewClass2 {
		width: 100%;
		height: 100px;
		background-color: #DD524D;
	}
	.viewClassHover2 {
		background-color: #8F8F94;
	}
</style>
