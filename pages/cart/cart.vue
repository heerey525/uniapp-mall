<template>
	<view class="revice_address_row">
		<view class="address_btn" v-if="!addressInfo.userName">
			<button @click="chooseAddress" type="primary" plain>获取收货地址</button>
		</view>
		<view v-else class="user_info_row">
			<view class="user_info">
				<view>{{ addressInfo.userName }}</view>
				<view>{{ addressDetail }}</view>
			</view>
			<view class="user_phone">{{ addressInfo.telNumber }}</view>
		</view>
		<view class="cart_content">
			<view class="cart_title">购物车</view>
			<view class="cart_main">
				<view class="cart_item">
					<view class="cart_check_wrap">
						<checkbox-group>
							<checkbox value="0" />
						</checkbox-group>
					</view>
					<navigator class="cart_img_wrap">
						<image src="../../static/icon/cart-active.png" mode="widthFix"></image>
					</navigator>
					<view class="cart_info_wrap">
						<view class="goods_name">回家的回家大数据大数据大数据环境的时间促进伤口</view>
						<view class="goods_price_wrap">
							<view class="goods_price">￥999</view>
							<view class="cart_num_tool">
								<view class="num_edit">-</view>
								<view class="goods_num">10</view>
								<view class="num_edit">+</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				addressInfo: {},
				addressDetail: ''
			}
		},
		onLoad() {
			const address = uni.getStorageSync('address')
			console.log('address', address, address.userName)
			if (address) {
				this.addressInfo = address
				this.addressDetail = address.provinceName + address.cityName + address.countyName + address.detailInfo
			}
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
	}
</style>
