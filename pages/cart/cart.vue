<template>
	<view class="revice_address_row">
		<!-- 未选择收货地址 -->
		<view class="address_btn" v-if="!addressInfo.userName">
			<button @click="chooseAddress" type="primary" plain>获取收货地址</button>
		</view>
		<!-- 已选择收货地址 -->
		<view v-else class="user_info_row">
			<view class="user_info">
				<view>{{ addressInfo.userName }}</view>
				<view>{{ addressDetail }}</view>
			</view>
			<view class="user_phone">{{ addressInfo.telNumber }}</view>
		</view>
		<!-- 购物车列表 -->
		<view class="cart_content">
			<view class="cart_title">购物车</view>
			<scroll-view class="cart_main" scroll-y>
				<!-- <view class="cart_main"> -->
					<view class="cart_item" v-for="(item, index) in list" :key="item.id">
						<view class="cart_check_wrap">
							<checkbox-group @change="checkChange(index, $event)">
								<checkbox value="0" :checked="item.checked" />
							</checkbox-group>
						</view>
						<navigator class="cart_img_wrap">
							<image :src="item.img_url"></image>
						</navigator>
						<view class="cart_info_wrap">
							<view class="goods_name">{{ item.title }}</view>
							<view class="goods_price_wrap">
								<view class="goods_price">￥{{ item.sell_price }}</view>
								<view class="cart_num_tool">
									<view class="num_edit" @click="numChange(index, '-')">-</view>
									<view class="goods_num">{{ item.num }}</view>
									<view class="num_edit" @click="numChange(index, '+')">+</view>
								</view>
							</view>
						</view>
					</view>
				<!-- </view> -->
			</scroll-view>
		</view>
		<!-- 底部结算 -->
		<view class="footer_tool">
			<view class="all_check_wrap">
				<checkbox-group name="" @change="allCheckChange">
					<checkbox value="0" :checked="allCheck"/>全选
				</checkbox-group>
			</view>
			<view class="total_price_wrap">
				<view class="total_price">
					合计：<text class="total_price_text">￥{{ price }}</text>
				</view>
				<view>包含运费</view>
			</view>
			<view class="order_pay_wrap" @click="pay">
				{{ num ? `结算(${num})` : '结算' }}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				addressInfo: {},
				addressDetail: '',
				list: [],
				allCheck: false,
				num: 0,
				price: 0
			}
		},
		onShow() {
			const address = uni.getStorageSync('address')
			console.log('address', address, address.userName)
			if (address) {
				this.addressInfo = address
				this.addressDetail = address.provinceName + address.cityName + address.countyName + address.detailInfo
			}
			
			const cart = uni.getStorageSync('cart')
			if (cart) {
				this.list = cart
			}
			this.isCheckAll()
			this.settlement()
		},
		methods: {
			chooseAddress() {
				uni.chooseAddress({ // 仅支持微信小程序	支付宝小程序	百度小程序	字节跳动小程序
					success: (res) => {
						console.log('获取收货地址成功', res)
						uni.setStorageSync('address', res);
						this.addressInfo = res
						this.addressDetail = res.provinceName + res.cityName + res.countyName + res.detailInfo
					}
				})
			},
			checkChange(index, e) {
				console.log('check', index, e)
				const cart = uni.getStorageSync('cart')
				cart[index].checked = !!e.detail.value.length
				uni.setStorageSync('cart', cart)
				
				this.$nextTick(() => {
					this.isCheckAll()
					this.settlement()
				})
			},
			allCheckChange(e) {
				const cart = uni.getStorageSync('cart')
				const _cart = cart.map(item => {
					item.checked = !!e.detail.value.length
					return item
				})
				uni.setStorageSync('cart', _cart)
				this.list = [..._cart]
				this.settlement()
			},
			isCheckAll() {
				const cart = uni.getStorageSync('cart')
				const unChecked = cart.filter(item => item.checked == false)
				this.allCheck = !unChecked.length
			},
			settlement() {
				const cart = uni.getStorageSync('cart')
				if (cart) {
					const filters = cart.filter(item => item.checked === true)
					if (!filters.length) {
						this.num = 0
						this.price = 0
					} else if (filters.length === 1) {
						const { num, sell_price } = filters[0]
						this.num = num
						this.price = sell_price * num
					} else {
						const { num, price } = filters.reduce((a,b) => {
							const price = a.price ? a.price : a.num * a.sell_price
							return {...a, num: a.num + b.num, price: price + b.num * b.sell_price }
						})
						this.num = num
						this.price = price
					}
				} else {
					this.num = 0
					this.price = 0
				}
			},
			numChange(index, mark) {
				const cart = uni.getStorageSync('cart')
				if (mark === '-') {
					if (cart[index].num === 1) {
						cart.splice(index, 1)
					} else {
						cart[index].num--
					}
				} else {
					cart[index].num++
				}
				
				uni.setStorageSync('cart', cart)
				this.list = [...cart]
				
				this.isCheckAll()
				this.settlement()
			},
			pay() {
				uni.showToast({
					title: '去支付',
					icon: 'none'
				})
			}
		}
	}
</script>

<style lang="scss">
	.revice_address_row {
		.address_btn {
			padding: 20rpx;

			button {
				width: 60%;
			}
		}

		.user_info_row {
			display: flex;
			padding: 20rpx;

			.user_info {
				flex: 5;
			}

			.user_phone {
				flex: 3;
			}
		}

		.cart_content {
			.cart_title {
				padding: 20rpx;
				font-size: 36rpx;
				color: $mall-color-primary;
				border-top: 2rpx solid $mall-color-primary;
				border-bottom: 2rpx solid $mall-color-primary;
			}

			.cart_main {
				// #ifdef H5 || APP-PLUS
				height: calc(100vh - 500rpx);
				// #endif
				// #ifdef MP-WEIXIN
				height: calc(100vh - 350rpx);
				// #endif
				.cart_item {
					display: flex;
					padding: 10rpx;
					border-bottom: 2rpx solid #CCCCCC;

					.cart_check_wrap {
						flex: 1;
						display: flex;
						justify-content: center;
						align-items: center;
					}

					.cart_img_wrap {
						flex: 2;
						display: flex;
						justify-content: center;
						align-items: center;

						image {
							width: 200rpx;
							height: 200rpx;
						}
					}

					.cart_info_wrap {
						flex: 4;
						display: flex;
						flex-direction: column;
						justify-content: space-between;

						.goods_name {
							display: -webkit-box;
							overflow: hidden;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 2;
							color: #666666;
						}

						.goods_price_wrap {
							display: flex;
							justify-content: space-between;

							.goods_price {
								color: $mall-color-primary;
								font-size: 34rpx;
							}

							.cart_num_tool {
								display: flex;

								.num_edit,
								.goods_num {
									width: 55rpx;
									height: 55rpx;
									display: flex;
									justify-content: center;
									align-items: center;
									border: 2rpx solid #CCCCCC;
								}

								.goods_num {
									border: 0;
								}
							}
						}
					}
				}
			}
		}
	
		.footer_tool {
			position: fixed;
			// #ifdef H5 || APP-PLUS
			bottom: 100rpx;
			// #endif
			// #ifdef MP-WEIXIN
			bottom: 0;
			// #endif
			left: 0;
			width: 100%;
			height: 90rpx;
			background-color: #FFFFFF;
			display: flex;
			border-top: 2rpx solid #CCCCCC;
			.all_check_wrap {
				flex:2;
				display: flex;
				justify-content: center;
				align-items: center;
			}
			.total_price_wrap {
				flex: 5;
				padding-right: 15rpx;
				text-align: right;
				.total_price{
					.total_price_text{
						color: $mall-color-primary;
						font-size: 34rpx;
						font-weight: 600;
					}
				}
				
			}
			.order_pay_wrap{
				flex: 3;
				background-color: $mall-color-primary;
				color: #FFFFFF;
				font-size: 32rpx;
				font-weight: 600;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
	}
</style>
