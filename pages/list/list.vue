<template>
	<view>
		<button type="default" @click="getRequest">发送请求</button>
		<button type="primary" @click="setStorage">本地存储</button>
		<button type="primary" @click="getStorage">获取本地存储</button>
		<button type="warn" @click="removeStorage">删除本地存储</button>
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
			},
			setStorage() {
				uni.setStorageSync('key', 'keykey')
			},
			getStorage() {
				console.log(uni.getStorageSync('key'))
				const res = uni.getStorageInfoSync()
				console.log('本地存储信息', res, res.keys, res.currentSize, res.limitSize)
			},
			removeStorage() {
				uni.removeStorageSync('key')
			}
		}
	}
</script>

<style>
	.listBox {
		height: 200rpx;
	}
</style>
