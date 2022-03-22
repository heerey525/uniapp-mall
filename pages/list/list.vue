<template>
	<view>
		<view>列表页</view>
		<view v-for="(item,index) in list" :key="index">
			{{ '第' + item + '行' }}
		</view>
		<button type="primary" @click="pullDown">手动触发下拉刷新</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: []
			}
		},
		onPullDownRefresh() {
			console.log('触发下拉刷新事件')
			setTimeout(() => {
				this.list.sort((a, b) => {
					return b - a
				})
				uni.stopPullDownRefresh()
			}, 1000)
		},
		onReady() {
			this.initMethod()
		},
		methods: {
			initMethod() {
				let list = []
				for (let i = 0; i < 10; i++) {
					list.push(i)
				}
				this.list = list
			},
			pullDown() {
				uni.startPullDownRefresh()
			}
		}
	}
</script>

<style>
</style>
