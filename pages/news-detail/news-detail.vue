<template>
	<view class="new_detail">
		<view class="tilte">
			{{ detailInfo.title }}
		</view>
		<view class="info">
			<text>发表时间：{{ detailInfo.add_time | formatDate }}</text>
			<text>浏览：{{ detailInfo.click }}</text>
		</view>
		<view class="content">
			<rich-text :nodes="detailInfo.content"></rich-text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: '',
				detailInfo: {}
			}
		},
		onLoad(options) {
			this.id = options.id
			this.getNewsDetail()
		},
		methods: {
			// 获取资讯详情
			async getNewsDetail() {
				const res = await this.$myRequest({ url: '/api/getnew/' + this.id })
				console.log('获取资讯详情', res)
				this.detailInfo = res.data.message[0]
			},
		}
	}
</script>

<style lang="scss">
	.new_detail {
		font-size: 30rpx;
		padding: 0 20rpx;
	
	.tilte {
			text-align: center;
			width: 710rpx;
			display: block;
			margin: 20rpx 0;
		}

		.info {
			display: flex;
			justify-content: space-between;
			margin-bottom: 20rpx;
		}
	}
</style>
