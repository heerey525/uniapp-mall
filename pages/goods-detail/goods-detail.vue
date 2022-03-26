<template>
	<view class="goods_detail">
		<!-- 轮播图区域 -->
		<swiper class="swiper" indicator-dots circular>
			<swiper-item v-for="item in swipers">
				<image :src="item.src"></image>
			</swiper-item>
		</swiper>
		<view class="header">
			<view class="price">
				<text>￥{{ goodsInfo.sell_price }}</text>
				<text>￥{{ goodsInfo.market_price }}</text>
			</view>
			<view class="goods_name">{{ goodsInfo.title }}</view>
		</view>
		<view class="line"></view>
		<view class="container">
			<view>货号：{{ goodsInfo.goods_no }}</view>
			<view>库存：{{ goodsInfo.stock_quantity }}</view>
		</view>
		<view class="line"></view>
		<view class="footer">
			<view class="title">
				详情介绍
			</view>
			<view class="content">
				<rich-text :nodes="content"></rich-text>
			</view>
		</view>
		<view class="goods_nav">
			<uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick"
				@buttonClick="buttonClick" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: '',
				swipers: [],
				goodsInfo: {},
				content: '',
				options: [{
					icon: 'headphones',
					text: '客服'
				}, {
					icon: 'shop',
					text: '店铺',
					info: 0,
					infoBackgroundColor: '#007aff',
					infoColor: "red"
				}, {
					icon: 'cart',
					text: '购物车',
					info: 0
				}, ],
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				]
			}
		},
		onLoad(options) {
			this.id = options.id
			console.log('this.id', this.id)
			this.getSwipers()
			this.getInfos()
			this.getDesc()
			
			const cart = uni.getStorageSync('cart')
			if (cart) {
				if (cart.length === 1) {
					this.options[2].info = cart[0].num
				} else {
					const { num } = cart.reduce((a,b) => {
						return {...a, num: a.num + b.num}
					})
					this.options[2].info = num
				}
			}
		},
		methods: {
			// 获取详情轮播图
			async getSwipers() {
				const res = await this.$myRequest({ url: '/api/getthumimages/' + this.id })
				// console.log('获取详情轮播图', res)
				this.swipers = res.data.message
			},
			// 获取详情参数
			async getInfos() {
				const res = await this.$myRequest({ url: '/api/goods/getinfo/' + this.id })
				// console.log('获取详情参数', res)
				this.goodsInfo = res.data.message[0]
			},
			// 获取详细介绍
			async getDesc() {
				const res = await this.$myRequest({ url: '/api/goods/getdesc/' + this.id })
				// console.log('获取详细介绍', res)
				this.content = res.data.message[0].content
			},
			onClick (e) {
				uni.showToast({
					title: `点击${e.content.text}`,
					icon: 'none'
				})
				
				if (e.index === 2) {
					uni.switchTab({
						url: '/pages/cart/cart'
					})
				}
			},
			buttonClick (e) {
				if (e.index === 0) {
					this.options[2].info++
					const cart = uni.getStorageSync('cart')
					const { id, sell_price, title } = this.goodsInfo
					const _cart = { id, sell_price, title, img_url: this.swipers[0].src, num: 1, checked: false }
					if (!cart) {
						uni.setStorageSync('cart', [_cart])
					} else {
						const index = cart.findIndex(item => item.id == id)
						if (index > -1) {
							cart[index].num++
						} else {
							cart.push(_cart)
						}
						uni.setStorageSync('cart', cart)
					}
				} else {
					console.log('立即购买')
				}
			}
		}
	}
</script>

<style lang="scss">
	.goods_detail {
		.swiper {
			width: 750rpx;
			height: 700rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.header {
			padding: 20rpx;

			.price {
				font-size: 35rpx;
				color: $mall-color-primary;
				line-height: 80rpx;

				text:nth-child(2) {
					color: #CCCCCC;
					font-size: 25rpx;
					text-decoration: line-through;
					margin-left: 20rpx;
				}
			}

			.goods_name {
				font-size: 32rpx;
				line-height: 60rpx;
			}
		}

		.line {
			height: 10rpx;
			width: 100%;
			background-color: #EEEEEE;
		}

		.container {
			padding: 10rpx;
			font-size: 32rpx;
			line-height: 70rpx;
		}

		.footer {
			padding-bottom: 100rpx;

			.title {
				font-size: 32rpx;
				padding-left: 10rpx;
				border-bottom: 2rpx solid #EEEEEE;
				line-height: 70rpx;
			}

			.content {
				padding: 10rpx;
				font-size: 30rpx;
				line-height: 50rpx;

				/deep/.gomeImgLoad {
					width: 730rpx;
					height: auto;
				}
			}
		}
		
		.goods_nav {
			position: fixed;
			bottom: 0;
			width: 100%;
		}
	}
</style>
