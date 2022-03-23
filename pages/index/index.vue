<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
			<text>hhh</text>
		</view>
		<test v-if="visible" :name="name" @setFarther="getChild"></test>
		<button type="default" @click="visible = !visible">test组件显隐切换</button>
		<view>全局事件渲染：{{ num }}</view>
	</view>
</template>

<script>
	import test from '@/components/test.vue'
	export default {
		components: {
			test
		},
		data() {
			return {
				title: 'Hello',
				visible: true,
				name: 'props传值',
				num: 0
			}
		},
		onLoad(options) {
			console.log('页面加载', options)
		},
		onShow() {
			console.log('页面显示')
		},
		onReady() {
			console.log('页面初次渲染完成')
		},
		onHide() {
			console.log('页面隐藏')
		},
		created() {
			uni.$on('globalEvent', num => {
				this.num += num
			})
		},
		methods: {
			getChild(val) {
				console.log('子组件传值', val)
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
