<template>
	<view>
		<view>数据绑定</view>
		<view>{{ msg }}</view>
		<view>{{ 1+'niss' }}</view>
		<view>{{ 'hello'+'world' }}</view>
		<view>{{ 6+7 }}</view>
		<view>{{ msg ? 'true' : 'false' }}</view>
		<image :src="imgUrl" mode="aspectFit"></image>
		<view v-for="(item,index) in list" :key="index">
			<text>姓名：{{ item.name }} 年龄：{{ item.age }}</text>
		</view>
		<button type="primary" @click="click('参数', $event)">点击按钮</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				msg: '这是msg',
				imgUrl: 'https://img02.sogoucdn.com/app/a/100520021/0d4345360e53a726255173248987c419',
				list: [
					{ name: '张三', age: 20 },
					{ name: '李四', age: 21 },
					{ name: '王五', age: 22 },
				]
			}
		},
		methods: {
			click(text, event) {
				console.log('点击事件对象', event, '参数：', text)
			}
		}
	}
</script>

<style>
</style>
