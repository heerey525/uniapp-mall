<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		onError: function(err) {
			console.log('App Error', err)
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import './static/fonts/iconfont.css';
	.box {
		background-color: #3F536E;
	}
</style>
