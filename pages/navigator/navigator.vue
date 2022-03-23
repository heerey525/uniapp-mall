<template>
	<view>
		<view>navigator组件</view>
		<view>声明式跳转</view>
		<navigator url="/pages/detail/detail?id=99&name=zhangsan">跳转到普通页面</navigator>
		<navigator url="/pages/message/message" open-type="switchTab">跳转到tabber</navigator>
		<navigator url="/pages/detail/detail" open-type="redirect">重定向到普通页面</navigator>
		
		<view>编程式跳转</view>
		<button type="default" @click="go(1)">跳转到普通页面</button>
		<button type="default" @click="go(2)">跳转到tabber</button>
		<button type="default" @click="go(3)">重定向到普通页面</button>
	</view>
</template>

<script>
	export default {
		onUnload() {
			console.log('navigator组件卸载')
		},
		methods: {
			go(index) {
				if (index === 1) {
					uni.navigateTo({
						url: '/pages/detail/detail?id=88888&name=lisi'
					});
				} else if (index === 2) {
					uni.switchTab({
						url: '/pages/message/message'
					});
				} else {
					uni.redirectTo({
						url: '/pages/detail/detail'
					});
				}
				
			}
		}
	}
</script>

<style>
</style>
