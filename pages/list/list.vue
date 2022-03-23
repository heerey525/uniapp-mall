<template>
	<view>
		<button type="default" @click="getRequest">发送请求</button>
		<view>列表页</view>
		<view v-for="(item,index) in list" :key="index" class="listBox">
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
		onReachBottom() {
			console.log('列表触底')
			const leng = this.list.length
			for (let i = 0; i < 10; i++) {
				this.list.push(i+leng)
			}
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
			},
			getRequest() {
				uni.request({
				    url: 'http://localhost:8082/api/getlunbo',
				    success: (res) => {
				        console.log(res.data);
				        // this.text = 'request success';
				    }
				});
			}
		}
	}
</script>

<style>
	.listBox {
		height: 200rpx;
	}
</style>
