<template>
	<view class="pics">
		<scroll-view class="left" scroll-y>
			<view
			  @click="setActive(index, item.id)"
				:class="active === index ? 'active' : ''"
				v-for="(item, index) in types"
				:key="item.id"
			>{{ item.title }}</view>
		</scroll-view>
		<scroll-view class="right" scroll-y>
			<view class="item" v-for="item in rightData" :key="item.id">
				<image @click="previewImg(item.img_url)" :src="item.img_url"></image>
				<text>{{ item.title }}</text>
			</view>
			<text v-if="!rightData.length">暂无数据</text>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				types: [],
				active: 0,
				rightData: []
			}
		},
		onLoad() {
			this.getPics()
		},
		methods: {
			// 获取图片分类
			async getPics() {
				const res = await this.$myRequest({ url: '/api/getimgcategory' })
				console.log('获取图片分类', res)
				this.types = res.data.message
				this.setActive(0, this.types[0].id)
			},
			// 点击左侧获取右侧数据
			async setActive(index, id) {
				this.active = index
				const res = await this.$myRequest({ url: '/api/getimages/' + id })
				console.log('点击左侧获取右侧数据', res)
				this.rightData = res.data.message
			},
			previewImg(current) {
				const urls = this.rightData.map(item => item.img_url)
				uni.previewImage({
					current,
					urls
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
	}

	.pics {
		display: flex;
		height: 100%;

		.left {
			width: 200rpx;
			height: 100%;
			border-right: 2rpx solid #EEEEEE;

			view {
				line-height: 120rpx;
				height: 120rpx;
				color: #333333;
				text-align: center;
				font-size: 30rpx;
				border-top: 2rpx solid #EEEEEE;

				&.active {
					background-color: $mall-color-primary;
					color: #FFFFFF;
				}
			}
		}

		.right {
			height: 100%;
			width: 520rpx;
			margin: 0 auto;
			.item {
				image {
					width: 520rpx;
					height: 520rpx;
					border-radius: 5rpx;
				}
				text {
					font-size: 30rpx;
					line-height: 60rpx;
				}
			}
			
		}
	}
</style>
