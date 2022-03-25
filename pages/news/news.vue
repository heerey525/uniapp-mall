<template>
	<view class="news">
		<news-item :news="news" @itemClick="itemClick"></news-item>
	</view>
</template>

<script>
	import NewsItem from '@/components/news-item/news-item.vue'
	export default {
		name: 'news',
		components: { NewsItem },
		data() {
			return { news: [] }
		},
		onLoad() {
			this.getNews()
		},
		methods: {
			// 获取资讯列表
			async getNews() {
				const res = await this.$myRequest({ url: '/api/getnewslist' })
				console.log('获取资讯列表', res)
				this.news = res.data.message
			},
			itemClick(id) {
				uni.navigateTo({ url: '/pages/news-detail/news-detail?id=' + id })
			}
		}
	}
</script>

<style lang="scss">
.news {
	
}
</style>
